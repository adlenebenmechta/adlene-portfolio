#!/usr/bin/env bash
# Probe the Railway GraphQL v2 API: mutations available for
# deploys, domains, volumes and variables. Read-only introspection.
set -euo pipefail

TOKEN=$(git -C /home/z/my-project remote get-url origin | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
[ -n "$TOKEN" ] || { echo "no token in git remote"; exit 1; }
GQL="https://backboard.railway.com/graphql/v2"

q() { curl -s -X POST "$GQL" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "$1"; }

echo '=== 1. Mutation fields of interest ==='
q '{"query":"{ __type(name: \"Mutation\") { fields { name } } }"}' \
  | python3 -c '
import json,sys
d=json.load(sys.stdin)
names=[f["name"] for f in d["data"]["__type"]["fields"]]
want=[n for n in names if any(k in n.lower() for k in ("volume","githubrepodeploy","servicedomain","serviceupdate","variable","deployment"))]
print("\n".join(sorted(want)))'

echo; echo '=== 2. volumeCreate input ==='
q '{"query":"{ __type(name: \"VolumeCreateInput\") { inputFields { name type { kind name ofType { kind name } } } } }"}' \
  | python3 -c 'import json,sys; d=json.load(sys.stdin); [print(f["name"],"->",f["type"]["kind"],f["type"].get("name") or (f["type"]["ofType"] or {}).get("name")) for f in d["data"]["__type"]["inputFields"]]'

echo; echo '=== 3. volumeAttach / detach / update signatures ==='
for M in volumeAttach volumeDetach volumeUpdate serviceVariableCollectionUpsert variableCollectionUpsert; do
  echo "--- $M ---"
  q "{\"query\":\"{ __type(name: \\\"Mutation\\\") { fields { name args { name type { kind name ofType { kind name ofType { kind name } } } } } } }\"}" \
    | python3 -c "
import json,sys
d=json.load(sys.stdin)
for f in d['data']['__type']['fields']:
    if f['name']=='$M':
        for a in f['args']: print(' ', a['name'], '->', a['type'])
        break
    else:
        pass"
done

echo; echo '=== 4. current services ==='
q '{"query":"{ environment(id: \"41d644f8-697b-4236-bd7c-49de660e74f2\") { services { edges { node { id name volumes { edges { node { id name mountPath } } } } } } } }"}' \
  | python3 -m json.tool | tail -30
