#!/bin/bash
# ============================================================
# railway-redeploy.sh — zero-downtime deploy (reconstructed)
#
#   --trigger-only          create new service from GitHub main (live untouched)
#   --finalize [--wait]     poll build → move domain → delete old service
#   --status                report current state
#   --set-vars              upsert env vars (ADMIN_PASSWORD, GITHUB_TOKEN)
#                           onto the service in scripts/railway.env
#
# Requires RAILWAY_TOKEN in scripts/railway.env:
#   RAILWAY_TOKEN="..."
# ============================================================
set -euo pipefail

ROOT="/home/z/my-project"
STATE="$ROOT/scripts/railway.env"
GQL="https://backboard.railway.com/graphql/v2"

PROJECT_ID="2f17b86f-c653-47f6-b52a-148981ed7555"
ENV_ID="41d644f8-697b-4236-bd7c-49de660e74f2"
REPO="adlenebenmechta/adlene-portfolio"
BRANCH="main"
DOMAIN="adlene-portfolio-production.up.railway.app"
PORT="8080"

say()  { echo -e "\033[1;35m[redeploy]\033[0m $*"; }
fail() { echo -e "\033[1;31m[redeploy][FAIL]\033[0m $*" >&2; exit 1; }

[ -f "$STATE" ] || fail "no state file — create scripts/railway.env with RAILLY_TOKEN first"
# shellcheck disable=SC1090
source "$STATE"
[ -n "${RAILWAY_TOKEN:-}" ] || fail "RAILWAY_TOKEN missing in scripts/railway.env"

gq() { # gq <query-file>  → prints response json
  curl -s -X POST "$GQL" \
    -H "Authorization: Bearer $RAILWAY_TOKEN" \
    -H 'Content-Type: application/json' \
    --data-binary "@$1"
}

jqget() { python3 -c "
import json,sys
d=json.load(sys.stdin)
if d.get('errors'): print('GQL_ERROR:'+json.dumps(d['errors'])[:300]); sys.exit(0)
try: print(eval(\"d$1\"))
except Exception: print('')"; }

current_service() {
  cat > /tmp/q-cur.json << EOF
{"query":"query(\$pid:String!){ project(id:\$pid){ services{ edges{ node{ id name } } } } }","variables":{"pid":"$PROJECT_ID"}}
EOF
  gq /tmp/q-cur.json | jqget "['data']['project']['services']['edges']"
}

current_domain_id() {
  cat > /tmp/q-dom.json << EOF
{"query":"query(\$pid:String!,\$eid:String!,\$sid:String!){ domains(projectId:\$pid, environmentId:\$eid, serviceId:\$sid){ serviceDomains{ id domain } } }","variables":{"pid":"$PROJECT_ID","eid":"$ENV_ID","sid":"$1"}}
EOF
  gq /tmp/q-dom.json | jqget "['data']['domains']['serviceDomains']"
}

case "${1:-}" in
  --status)
    say "current services:"
    current_service
    if [ -n "${SERVICE_ID:-}" ]; then
      say "state service: $SERVICE_ID"
      say "domains: $(current_domain_id "$SERVICE_ID")"
    fi
    exit 0
    ;;
  --set-vars)
    SERVICE_ID="${SERVICE_ID:?SERVICE_ID not in state}"
    GH_TOKEN="${GITHUB_TOKEN:-$(git -C "$ROOT" remote get-url origin | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')}"
    for kv in "ADMIN_PASSWORD=${ADMIN_PASSWORD:-}" "GITHUB_TOKEN=$GH_TOKEN"; do
      name="${kv%%=*}"; value="${kv#*=}"
      [ -n "$value" ] || continue
      cat > /tmp/q-var.json << EOF
{"query":"mutation(\$i:VariableUpsertInput!){ variableUpsert(input:\$i) }","variables":{"i":{"projectId":"$PROJECT_ID","environmentId":"$ENV_ID","serviceId":"$SERVICE_ID","name":"$name","value":$(python3 -c "import json,sys;print(json.dumps('$value'))"),"skipDeploys":true}}}
EOF
      out=$(gq /tmp/q-var.json)
      echo "$out" | grep -q '"errors"' && fail "variableUpsert $name failed: $out" || say "set $name on $SERVICE_ID"
    done
    exit 0
    ;;
esac

# ── shared: find the OLD service (the one currently serving) ─────
OLD_SERVICE="${SERVICE_ID:-}"
if [ -z "$OLD_SERVICE" ]; then
  # discover: the service that owns the production domain
  svcs=$(current_service)
  say "services: $svcs"
  OLD_SERVICE=$(echo "$svcs" | python3 -c "
import json,sys
edges=json.loads(sys.stdin.read().replace(\"'\",'\"'))
for e in edges:
    if e['node']['name'] and 'portfolio' in e['node']['name'].lower():
        print(e['node']['id']); break" 2>/dev/null || true)
  [ -n "$OLD_SERVICE" ] || fail "cannot discover old service — set SERVICE_ID in scripts/railway.env"
fi

case "${1:-}" in
  --trigger-only)
    cat > /tmp/q-trig.json << EOF
{"query":"mutation(\$i:GitHubRepoDeployInput!){ githubRepoDeploy(input:\$i) }","variables":{"i":{"repo":"$REPO","branch":"$BRANCH","projectId":"$PROJECT_ID","environmentId":"$ENV_ID"}}}
EOF
    out=$(gq /tmp/q-trig.json)
    NEW_SERVICE=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['githubRepoDeploy'] if 'data' in d and d['data'] and d['data'].get('githubRepoDeploy') else '')" 2>/dev/null || true)
    [ -n "$NEW_SERVICE" ] || fail "githubRepoDeploy failed: $out"
    # persist state
    sed -i "s/^NEW_SERVICE_ID=.*/NEW_SERVICE_ID=\"$NEW_SERVICE\"/" "$STATE" 2>/dev/null || echo "NEW_SERVICE_ID=\"$NEW_SERVICE\"" >> "$STATE"
    sed -i "s/^SERVICE_ID=.*/SERVICE_ID=\"$OLD_SERVICE\"/" "$STATE" 2>/dev/null || true
    say "build triggered on $NEW_SERVICE (old/live: $OLD_SERVICE untouched)"
    say "finish with: $0 --finalize --wait"
    ;;

  --finalize)
    NEW_SERVICE="${NEW_SERVICE_ID:-}"
    [ -n "$NEW_SERVICE" ] || fail "no NEW_SERVICE_ID in state — run --trigger-only first"

    if [ "${2:-}" = "--wait" ]; then
      say "waiting for build on $NEW_SERVICE…"
      for i in $(seq 1 120); do
        cat > /tmp/q-dep.json << EOF
{"query":"query(\$eid:String!,\$sid:String!){ deployments(input:{environmentId:\$eid, serviceId:\$sid}){ edges{ node{ id status meta } } } }","variables":{"eid":"$ENV_ID","sid":"$NEW_SERVICE"}}
EOF
        out=$(gq /tmp/q-dep.json)
        status=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); e=d['data']['deployments']['edges']; print(e[0]['node']['status'] if e else 'NONE')" 2>/dev/null || echo "PARSE_FAIL")
        case "$status" in
          SUCCESS) say "build SUCCESS"; break ;;
          FAILED|CRASHED|REMOVED|SKIPPED) fail "build ended: $status" ;;
          *) sleep 5 ;;
        esac
      done
    fi

    # ── move the domain: delete old → create on new → rename ──
    OLD_DOMAINS=$(current_domain_id "$OLD_SERVICE")
    say "old domains: $OLD_DOMAINS"
    OLD_DOMAIN_ID=$(echo "$OLD_DOMAINS" | python3 -c "import json,sys; d=json.loads(sys.stdin.read()); print(d[0]['id'] if d else '')" 2>/dev/null || true)
    if [ -n "$OLD_DOMAIN_ID" ]; then
      cat > /tmp/q-ddel.json << EOF
{"query":"mutation(\$id:String!){ serviceDomainDelete(id:\$id) }","variables":{"id":"$OLD_DOMAIN_ID"}}
EOF
      gq /tmp/q-ddel.json >/dev/null && say "old domain binding released"
    fi

    cat > /tmp/q-dnew.json << EOF
{"query":"mutation(\$i:ServiceDomainCreateInput!){ serviceDomainCreate(input:\$i){ id domain } }","variables":{"i":{"serviceId":"$NEW_SERVICE","environmentId":"$ENV_ID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-dnew.json)
    NEW_DOMAIN_ID=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['serviceDomainCreate']['id'])" 2>/dev/null || true)
    [ -n "$NEW_DOMAIN_ID" ] || fail "serviceDomainCreate failed: $out"
    say "new domain id: $NEW_DOMAIN_ID"

    cat > /tmp/q-dupd.json << EOF
{"query":"mutation(\$i:ServiceDomainUpdateInput!){ serviceDomainUpdate(input:\$i) }","variables":{"i":{"serviceDomainId":"$NEW_DOMAIN_ID","domain":"$DOMAIN","serviceId":"$NEW_SERVICE","environmentId":"$ENV_ID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-dupd.json)
    echo "$out" | grep -q '"serviceDomainUpdate":true' || fail "serviceDomainUpdate failed: $out"
    say "domain $DOMAIN -> new service (port $PORT)"

    # ── verify the rename actually took effect ───────────────────
    # Railway can return true yet silently keep the auto-generated name while
    # the previous binding is still releasing — poll and retry the mutation.
    rename_ok() { current_domain_id "$NEW_SERVICE" | grep -q "\"$DOMAIN\""; }
    ok_seen=0
    for attempt in 1 2 3 4; do
      sleep 8
      if rename_ok; then ok_seen=1; say "rename verified: $DOMAIN on $NEW_SERVICE"; break; fi
      say "rename not visible yet (attempt $attempt/4) — retrying serviceDomainUpdate"
      out=$(gq /tmp/q-dupd.json)
      echo "$out" | grep -q '"serviceDomainUpdate":true' || fail "serviceDomainUpdate retry failed: $out"
    done
    [ "$ok_seen" = "1" ] || fail "domain never settled on $DOMAIN — check Railway dashboard"

    # ── delete the old service ─────────────────────────────────────
    cat > /tmp/q-sdel.json << EOF
{"query":"mutation(\$id:String!,\$eid:String!){ serviceDelete(id:\$id, environmentId:\$eid) }","variables":{"id":"$OLD_SERVICE","eid":"$ENV_ID"}}
EOF
    gq /tmp/q-sdel.json >/dev/null && say "old service $OLD_SERVICE deleted"

    # update state
    sed -i "s/^SERVICE_ID=.*/SERVICE_ID=\"$NEW_SERVICE\"/" "$STATE"
    sed -i "s/^DOMAIN_ID=.*/DOMAIN_ID=\"$NEW_DOMAIN_ID\"/" "$STATE" 2>/dev/null || echo "DOMAIN_ID=\"$NEW_DOMAIN_ID\"" >> "$STATE"
    sed -i "s/^NEW_SERVICE_ID=.*/NEW_SERVICE_ID=\"\"/" "$STATE"

    # ── verify ────────────────────────────────────────────────────
    say "edge propagation wait (25s)…"
    sleep 25
    code=$(curl -s -o /dev/null -w '%{http_code}' "https://$DOMAIN" || echo 000)
    say "LIVE https://$DOMAIN → HTTP $code"
    [ "$code" = "200" ] && say "MIGRATION COMPLETE" || fail "site not 200 after migration (wait longer or check logs)"
    ;;

  *)
    echo "usage: $0 --trigger-only | --finalize [--wait] | --status | --set-vars"
    exit 1
    ;;
esac
