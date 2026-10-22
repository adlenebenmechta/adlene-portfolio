#!/bin/bash
# ============================================================
# hobby-deploy.sh — phased deploy into the euroluxe project,
# surviving the Railway incident pause.
#
# Phases (each fits one tool call, re-runnable, no duplicates):
#   trigger   retry githubRepoDeploy until accepted (≤8 min),
#             then set env vars + persist service id
#   wait      poll build status until SUCCESS (≤9 min)
#   domain    create + rename service domain (port 8080)
#   verify    curl all routes
#   status    show state
# Exit codes: 0 done · 42 keep calling again · 1 hard fail
# ============================================================
set -euo pipefail

ROOT="/home/z/my-project"
STATE="$ROOT/scripts/railway.env"
GQL="https://backboard.railway.com/graphql/v2"
REPO="adlenebenmechta/adlene-portfolio"
BRANCH="main"
PORT="8080"
DOMAIN_NAME="adlene-portfolio-production.up.railway.app"

say()  { echo -e "\033[1;36m[hobby-deploy]\033[0m $*"; }
fail() { echo -e "\033[1;31m[hobby-deploy][FAIL]\033[0m $*" >&2; exit 1; }

[ -f "$STATE" ] || fail "no state file"
# shellcheck disable=SC1090
source "$STATE"
[ -n "${RAILWAY_TOKEN:-}" ] || fail "RAILWAY_TOKEN missing"
PROJECT_ID="${PROJECT_ID:?}"
ENV_ID="${ENV_ID:?}"

gq() { curl -s -X POST "$GQL" -H "Authorization: Bearer $RAILWAY_TOKEN" -H 'Content-Type: application/json' --data-binary "@$1"; }

save_state() {
  if grep -q "^$1=" "$STATE" 2>/dev/null; then sed -i "s|^$1=.*|$1=$2|" "$STATE"; else echo "$1=$2" >> "$STATE"; fi
}

cmd="${1:-status}"
case "$cmd" in

  trigger)
    # already triggered?
    if [ -n "${NEW_SERVICE_ID:-}" ]; then
      say "NEW_SERVICE_ID already set: $NEW_SERVICE_ID — skipping trigger"
    else
      ok=0
      for i in $(seq 1 8); do
        cat > /tmp/q-trig.json << EOF
{"query":"mutation(\$i:GitHubRepoDeployInput!){ githubRepoDeploy(input:\$i) }","variables":{"i":{"repo":"$REPO","branch":"$BRANCH","projectId":"$PROJECT_ID","environmentId":"$ENV_ID"}}}
EOF
        out=$(gq /tmp/q-trig.json)
        if echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); sys.exit(0 if d.get('data') and d['data'].get('githubRepoDeploy') else 1)" 2>/dev/null; then
          SID=$(echo "$out" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['githubRepoDeploy'])")
          save_state "NEW_SERVICE_ID" "\"$SID\""
          NEW_SERVICE_ID="$SID"
          say "TRIGGER ACCEPTED at $(date +%H:%M:%S) — service $SID"
          ok=1; break
        fi
        msg=$(echo "$out" | python3 -c "import json,sys; print(json.load(sys.stdin)['errors'][0]['message'][:80])" 2>/dev/null || echo "$out")
        say "attempt $i ($(date +%H:%M:%S)): $msg"
        [ "$i" = "8" ] || sleep 60
      done
      [ "$ok" = "1" ] || { say "still paused — run trigger again"; exit 42; }
    fi

    SID="${NEW_SERVICE_ID:?}"
    # env vars (retry ×3 each)
    for kv in "ADMIN_PASSWORD=${ADMIN_PASSWORD:?}" "GITHUB_TOKEN=${GITHUB_TOKEN:?}"; do
      name="${kv%%=*}"; value="${kv#*=}"
      for try in 1 2 3; do
        cat > /tmp/q-var.json << EOF
{"query":"mutation(\$i:VariableUpsertInput!){ variableUpsert(input:\$i) }","variables":{"i":{"projectId":"$PROJECT_ID","environmentId":"$ENV_ID","serviceId":"$SID","name":"$name","value":$(python3 -c "import json,sys;print(json.dumps(sys.argv[1]))" "$value"),"skipDeploys":true}}}
EOF
        out=$(gq /tmp/q-var.json)
        echo "$out" | grep -q '"errors"' || { say "set $name ✓"; break; }
        say "variableUpsert $name try $try: $out"; sleep 3
      done
    done
    say "trigger phase COMPLETE — next: wait"
    ;;

  wait)
    SID="${NEW_SERVICE_ID:?run trigger first}"
    say "waiting for build on $SID…"
    for i in $(seq 1 90); do
      cat > /tmp/q-dep.json << EOF
{"query":"query(\$eid:String!,\$sid:String!){ deployments(input:{environmentId:\$eid, serviceId:\$sid}){ edges{ node{ id status meta } } } }","variables":{"eid":"$ENV_ID","sid":"$SID"}}
EOF
      out=$(gq /tmp/q-dep.json)
      status=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); e=d['data']['deployments']['edges']; print(e[0]['node']['status'] if e else 'NONE')" 2>/dev/null || echo PARSE_FAIL)
      case "$status" in
        SUCCESS) save_state "SERVICE_ID" "\"$SID\""; say "BUILD SUCCESS ✓ (service $SID)"; exit 0;;
        FAILED|CRASHED) fail "build $status: $out";;
      esac
      [ $((i % 10)) = 0 ] && say "still $status after ${i}×6s…"
      sleep 6
    done
    say "still $status — run wait again"; exit 42
    ;;

  domain)
    PID="${PROJECT_ID:?}"; EID="${ENV_ID:?}"; SID="${SERVICE_ID:?run wait first}"
    cat > /tmp/q-dom.json << EOF
{"query":"mutation(\$i:ServiceDomainCreateInput!){ serviceDomainCreate(input:\$i){ id domain } }","variables":{"i":{"serviceId":"$SID","environmentId":"$EID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-dom.json)
    echo "$out" | grep -q '"errors"' && fail "serviceDomainCreate: $out"
    DID=$(echo "$out" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['serviceDomainCreate']['id'])")
    AUTO=$(echo "$out" | python3 -c "import json,sys; print(json.load(sys.stdin)['data']['serviceDomainCreate']['domain'])")
    save_state "DOMAIN_ID" "\"$DID\""
    say "domain created: $AUTO (id $DID)"

    cat > /tmp/q-ren.json << EOF
{"query":"mutation(\$i:ServiceDomainUpdateInput!){ serviceDomainUpdate(input:\$i) }","variables":{"i":{"serviceDomainId":"$DID","domain":"$DOMAIN_NAME","serviceId":"$SID","environmentId":"$EID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-ren.json)
    if echo "$out" | grep -q '"errors"'; then
      say "rename to $DOMAIN_NAME rejected — keeping $AUTO"
      save_state "DOMAIN" "\"$AUTO\""
    else
      sleep 4
      cat > /tmp/q-chk.json << EOF
{"query":"query(\$eid:String!,\$sid:String!){ domains(projectId:\"$PID\",environmentId:\$eid,serviceId:\$sid){ serviceDomains{ id domain } } }","variables":{"eid":"$EID","sid":"$SID"}}
EOF
      cur=$(gq /tmp/q-chk.json | python3 -c "import json,sys; d=json.load(sys.stdin); sds=d['data']['domains']['serviceDomains']; print(sds[0]['domain'] if sds else '')")
      if [ "$cur" = "$DOMAIN_NAME" ]; then say "renamed → $DOMAIN_NAME ✓"; save_state "DOMAIN" "\"$DOMAIN_NAME\""
      else say "rename didn't settle ($cur) — keeping auto"; save_state "DOMAIN" "\"$AUTO\""; fi
    fi
    ;;

  verify)
    DOM="${DOMAIN:?run domain first}"
    BASE="https://$DOM"
    bad=0
    for path in / /work /about /contact /admin /video.mp4 /work-video.mp4; do
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE$path" || echo 000)
      [ "$code" = "200" ] && say "OK  $path" || { say "BAD $path → $code"; bad=$((bad+1)); }
    done
    for slug in maison-noire halcyon obsidian-labs veloce atlas-ivy; do
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE/work/$slug" || echo 000)
      [ "$code" = "200" ] && say "OK  /work/$slug" || { say "BAD /work/$slug → $code"; bad=$((bad+1)); }
    done
    [ "$bad" = "0" ] && say "ALL ROUTES 200 ✓" || fail "$bad routes failing"
    ;;

  status)
    echo "NEW_SERVICE_ID=${NEW_SERVICE_ID:-<none>}"
    echo "SERVICE_ID=${SERVICE_ID:-<old 5a8b172b>}"
    echo "DOMAIN=${DOMAIN:-<none>}"
    ;;

  *) echo "usage: $0 trigger|wait|domain|verify|status";;
esac
