#!/usr/bin/env python3
"""Bootstrap content.json from the TS defaults (src/lib/site-content.ts)."""
import re, json

src = open("/home/z/my-project/src/lib/site-content.ts").read()

def ts_to_json(txt: str) -> str:
    txt = re.sub(r"(?m)^(\s*)([A-Za-z_][A-Za-z0-9_]*)(\??):", r'\1"\2":', txt)
    txt = re.sub(r",(\s*[}\]])", r"\1", txt)
    return txt

m_seed = re.search(r"const seedProjects: Project\[\] = (\[.*?\n\]);", src, re.S)
assert m_seed, "seedProjects not found"
m_def = re.search(r"export const DEFAULT_CONTENT: SiteContent = (\{.*?\n\});", src, re.S)
assert m_def, "DEFAULT_CONTENT not found"

txt = ts_to_json(m_def.group(1)).replace(
    '"projects": seedProjects', '"projects": ' + ts_to_json(m_seed.group(1))
)
data = json.loads(txt)

out = "/home/z/my-project/content.json"
with open(out, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"wrote {out}: {len(data['projects'])} projects, hero={data['hero']['video']}")
