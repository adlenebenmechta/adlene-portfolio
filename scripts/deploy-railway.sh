#!/bin/bash
# ============================================================
# deploy-railway.sh — manual deploy of GitHub main to the live
# Railway service (auto-deploy webhook is not installed).
#
#   deploy-railway.sh <commit-sha>     deploy + poll to SUCCESS
#   deploy-railway.sh --status         latest deployment status
#
# IDs live in scripts/railway.env (rebuilt after sandbox resets).
# ============================================================
set -euo pipefail

ROOT="/home/z/my-project"
STATE="$ROOT/scripts/railway.env"
GQL="https://backboard.railway.com/graphql/v2"

say()  { echo -e "\033[1;35m[deploy]\033[0m $*"; }
fail() { echo -e "\033[1;31m[deploy][FAIL]\033[0m $*" >&2; exit 1; }

[ -f "$STATE" ] || fail "missing $STATE"
# shellcheck disable=SC1090
source "$STATE"
: "${RAILWAY_TOKEN:?}" "${RAILWAY_ENV_ID:?}" "${RAILWAY_SERVICE_ID:?}" "${RAILWAY_DOMAIN:?}"

gq() { curl -s -X POST "$GQL" -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H 'Content-Type: application/json' --data-binary "$1"; }

latest_status() {
  gq '{"query":"query($eid:String!,$sid:String!){ deployments(input:{environmentId:$eid,serviceId:$sid}){ edges{ node{ id status } } } }","variables":{"eid":"'"$RAILWAY_ENV_ID"'","sid":"'"$RAILWAY_SERVICE_ID"'"}}' \
  | python3 -c "import json,sys; d=json.load(sys.stdin); e=d.get('data',{}).get('deployments',{}).get('edges',[]); print(e[0]['node']['status'] if e else 'NONE')"
}

case "${1:-}" in
  --status)
    say "latest deployment: $(latest_status)"
    exit 0
    ;;
  *)
    SHA="${1:?usage: deploy-railway.sh <commit-sha> | --status}"
    ;;
esac

say "deploying $SHA to service $RAILWAY_SERVICE_ID…"
out=$(gq '{"query":"mutation($c:String,$e:String!,$s:String!){ serviceInstanceDeployV2(commitSha:$c,environmentId:$e,serviceId:$s) }","variables":{"c":"'"$SHA"'","e":"'"$RAILWAY_ENV_ID"'","s":"'"$RAILWAY_SERVICE_ID"'"}}')
echo "$out" | grep -q '"errors"' && fail "deploy mutation failed: $out"
say "deploy triggered: $(echo "$out" | head -c 200)"

say "polling build…"
for i in $(seq 1 180); do
  status=$(latest_status)
  case "$status" in
    SUCCESS) say "build SUCCESS"; break ;;
    FAILED|CRASHED|REMOVED|SKIPPED|CANCELED) fail "build ended: $status" ;;
    *) [ $((i % 6)) -eq 0 ] && say "  … still $status ($i)"; sleep 5 ;;
  esac
done
[ "$status" = "SUCCESS" ] || fail "no SUCCESS observed (last: $status)"

say "edge propagation wait (20s)…"
sleep 20
code=$(curl -s -o /dev/null -w '%{http_code}' "https://$RAILWAY_DOMAIN" || echo 000)
say "LIVE https://$RAILWAY_DOMAIN → HTTP $code"
[ "$code" = "200" ] && say "DEPLOY COMPLETE" || fail "site not 200 (wait longer or check logs)"
