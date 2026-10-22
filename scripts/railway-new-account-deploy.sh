#!/bin/bash
# ============================================================
# railway-new-account-deploy.sh — full site deployment onto a
# FRESH Railway account (no existing project).
#
#   --create-project   create project "adlene-portfolio", save ids to state
#   --deploy           githubRepoDeploy from main + set vars (build starts)
#   --domain           create service domain + rename to $DOMAIN_NAME
#   --verify           curl the live URL (all routes)
#
# Requires scripts/railway.env: RAILWAY_TOKEN, GITHUB_TOKEN, ADMIN_PASSWORD
# ============================================================
set -euo pipefail

ROOT="/home/z/my-project"
STATE="$ROOT/scripts/railway.env"
GQL="https://backboard.railway.com/graphql/v2"
REPO="adlenebenmechta/adlene-portfolio"
BRANCH="main"
PORT="8080"
DOMAIN_NAME="adlene-portfolio-production.up.railway.app"

say()  { echo -e "\033[1;36m[new-deploy]\033[0m $*"; }
fail() { echo -e "\033[1;31m[new-deploy][FAIL]\033[0m $*" >&2; exit 1; }

[ -f "$STATE" ] || fail "no state file"
# shellcheck disable=SC1090
source "$STATE"
[ -n "${RAILWAY_TOKEN:-}" ] || fail "RAILWAY_TOKEN missing"
[ -n "${GITHUB_TOKEN:-}" ] || fail "GITHUB_TOKEN missing"
[ -n "${ADMIN_PASSWORD:-}" ] || fail "ADMIN_PASSWORD missing"

gq() { curl -s -X POST "$GQL" -H "Authorization: Bearer $RAILWAY_TOKEN" -H 'Content-Type: application/json' --data-binary "@$1"; }

save_state() { # key value
  if grep -q "^$1=" "$STATE" 2>/dev/null; then sed -i "s|^$1=.*|$1=$2|" "$STATE"; else echo "$1=$2" >> "$STATE"; fi
}

case "${1:-}" in
  # ──────────────────────────────────────────────────────────
  --create-project)
    WS="${WORKSPACE_ID:?set WORKSPACE_ID in railway.env}"
    cat > /tmp/q-proj.json << EOF
{"query":"mutation(\$i:ProjectCreateInput!){ projectCreate(input:\$i){ id name environments { edges { node { id name } } } } }","variables":{"i":{"name":"adlene-portfolio","workspaceId":"$WS"}}}
EOF
    out=$(gq /tmp/q-proj.json)
    echo "$out" | grep -q '"errors"' && fail "projectCreate: $out"
    PID=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['projectCreate']['id'])")
    EID=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); [print(e['node']['id']) for e in d['data']['projectCreate']['environments']['edges'] if e['node']['name']=='production']")
    [ -n "$PID" ] && [ -n "$EID" ] || fail "no project/env id: $out"
    save_state "PROJECT_ID" "\"$PID\""
    save_state "ENV_ID" "\"$EID\""
    say "project created: $PID (env $EID)"
    ;;

  # ──────────────────────────────────────────────────────────
  --deploy)
    PID="${PROJECT_ID:?run --create-project first}"
    EID="${ENV_ID:?run --create-project first}"
    cat > /tmp/q-trig.json << EOF
{"query":"mutation(\$i:GitHubRepoDeployInput!){ githubRepoDeploy(input:\$i) }","variables":{"i":{"repo":"$REPO","branch":"$BRANCH","projectId":"$PID","environmentId":"$EID"}}}
EOF
    out=$(gq /tmp/q-trig.json)
    echo "$out" | grep -q '"errors"' && fail "githubRepoDeploy: $out"
    SID=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['githubRepoDeploy'] if d.get('data') and d['data'].get('githubRepoDeploy') else '')")
    [ -n "$SID" ] || fail "no service id: $out"
    save_state "NEW_SERVICE_ID" "\"$SID\""
    say "deploy triggered — service $SID building $BRANCH"

    # set env vars DURING build (skipDeploys=true → no restart churn)
    for kv in "ADMIN_PASSWORD=$ADMIN_PASSWORD" "GITHUB_TOKEN=$GITHUB_TOKEN"; do
      name="${kv%%=*}"; value="${kv#*=}"
      cat > /tmp/q-var.json << EOF
{"query":"mutation(\$i:VariableUpsertInput!){ variableUpsert(input:\$i) }","variables":{"i":{"projectId":"$PID","environmentId":"$EID","serviceId":"$SID","name":"$name","value":$(python3 -c "import json,sys;print(json.dumps('$value'))"),"skipDeploys":true}}}
EOF
      out=$(gq /tmp/q-var.json)
      echo "$out" | grep -q '"errors"' && fail "variableUpsert $name: $out" || say "set $name"
    done

    # wait for build (up to 10 min)
    say "waiting for build…"
    for i in $(seq 1 100); do
      cat > /tmp/q-dep.json << EOF
{"query":"query(\$eid:String!,\$sid:String!){ deployments(input:{environmentId:\$eid, serviceId:\$sid}){ edges{ node{ id status meta } } } }","variables":{"eid":"$EID","sid":"$SID"}}
EOF
      out=$(gq /tmp/q-dep.json)
      status=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); e=d['data']['deployments']['edges']; print(e[0]['node']['status'] if e else 'NONE')" 2>/dev/null || echo PARSE_FAIL)
      [ "$status" = "SUCCESS" ] && { say "BUILD SUCCESS"; break; }
      case "$status" in FAILED|CRASHED) fail "build $status: $out";; esac
      sleep 6
    done
    [ "$status" = "SUCCESS" ] || fail "build still $status after timeout"
    save_state "SERVICE_ID" "\"$SID\""
    ;;

  # ──────────────────────────────────────────────────────────
  --domain)
    PID="${PROJECT_ID:?}"; EID="${ENV_ID:?}"; SID="${SERVICE_ID:?}"
    cat > /tmp/q-dom.json << EOF
{"query":"mutation(\$i:ServiceDomainCreateInput!){ serviceDomainCreate(input:\$i){ id domain } }","variables":{"i":{"serviceId":"$SID","environmentId":"$EID","targetPort":$PORT}}
EOF
    # fix json (targetPort number + closing brace)
    cat > /tmp/q-dom.json << EOF
{"query":"mutation(\$i:ServiceDomainCreateInput!){ serviceDomainCreate(input:\$i){ id domain } }","variables":{"i":{"serviceId":"$SID","environmentId":"$EID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-dom.json)
    echo "$out" | grep -q '"errors"' && fail "serviceDomainCreate: $out"
    DID=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['serviceDomainCreate']['id'])")
    AUTO=$(echo "$out" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['data']['serviceDomainCreate']['domain'])")
    save_state "DOMAIN_ID" "\"$DID\""
    say "domain created: $AUTO (id $DID)"

    # rename to the preferred name (may be globally taken → keep auto name)
    cat > /tmp/q-ren.json << EOF
{"query":"mutation(\$i:ServiceDomainUpdateInput!){ serviceDomainUpdate(input:\$i) }","variables":{"i":{"serviceDomainId":"$DID","domain":"$DOMAIN_NAME","serviceId":"$SID","environmentId":"$EID","targetPort":$PORT}}}
EOF
    out=$(gq /tmp/q-ren.json)
    if echo "$out" | grep -q '"errors"'; then
      say "rename to $DOMAIN_NAME REJECTED (likely taken by the old account) — keeping $AUTO"
      save_state "DOMAIN" "\"$AUTO\""
    else
      sleep 3
      # VERIFY rename actually applied (railway can silently no-op)
      cat > /tmp/q-chk.json << EOF
{"query":"query(\$eid:String!,\$sid:String!){ domains(projectId:\"$PID\",environmentId:\$eid,serviceId:\$sid){ serviceDomains{ id domain } } }","variables":{"eid":"$EID","sid":"$SID"}}
EOF
      cur=$(gq /tmp/q-chk.json | python3 -c "import json,sys; d=json.load(sys.stdin); sds=d['data']['domains']['serviceDomains']; print(sds[0]['domain'] if sds else '')")
      if [ "$cur" = "$DOMAIN_NAME" ]; then
        say "renamed OK → $DOMAIN_NAME"
        save_state "DOMAIN" "\"$DOMAIN_NAME\""
      else
        say "rename did not settle (now: $cur) — keeping auto name"
        save_state "DOMAIN" "\"$AUTO\""
      fi
    fi
    ;;

  # ──────────────────────────────────────────────────────────
  --verify)
    DOM="${DOMAIN:?run --domain first}"
    BASE="https://$DOM"
    failcnt=0
    for path in / /work /about /contact /admin /video.mp4 /work-video.mp4; do
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE$path" || echo 000)
      [ "$code" = "200" ] && say "OK  $path" || { say "BAD $path → $code"; failcnt=$((failcnt+1)); }
    done
    for slug in maison-noire halcyon obsidian-labs veloce atlas-ivy; do
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "$BASE/work/$slug" || echo 000)
      [ "$code" = "200" ] && say "OK  /work/$slug" || { say "BAD /work/$slug → $code"; failcnt=$((failcnt+1)); }
    done
    [ "$failcnt" = "0" ] && say "ALL ROUTES 200 ✓" || fail "$failcnt routes failing"
    ;;

  *) echo "usage: $0 --create-project | --deploy | --domain | --verify" ;;
esac
