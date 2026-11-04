/* ────────────────────────────────────────────────────────────────
   Three-way content merge — makes admin saves non-destructive.

   Problem it fixes: the admin loads content.json once and later PUTs
   the whole form state. If anything committed in between (the site
   agent fixing a logo path, another tab, an E2E roundtrip), the save
   silently reverted those changes — e.g. the ACF cutout logo
   regressing to the raw JPG when the Armoray logo was saved.

   Solution: the client sends { base: <content it loaded>, draft:
   <its edits> }. The server diffs base → draft (what the user
   actually changed) and re-applies ONLY that onto the newest
   remote content. Per-entity granularity:

   - projects      → merged by id (edited/new → draft wins,
                     untouched → remote wins, removed → dropped,
                     remote additions → appended)
   - other keys    → edited in draft → draft wins, else remote wins
   ──────────────────────────────────────────────────────────────── */

export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function obj(v: unknown): Record<string, unknown> {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : {};
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

function idOf(p: unknown): string | null {
  const id = obj(p).id;
  return typeof id === "string" && id ? id : null;
}

export function mergeContent(
  base: unknown,
  draft: unknown,
  latest: unknown,
): Record<string, unknown> {
  const b = obj(base);
  const d = obj(draft);
  const l = obj(latest);
  const out: Record<string, unknown> = {};

  /* ── non-project sections: last-writer-wins per key ─────────── */
  const keys = new Set([...Object.keys(d), ...Object.keys(l), ...Object.keys(b)]);
  for (const key of keys) {
    if (key === "projects") continue;
    const userEdited = key in d && !(key in b) || (key in b && key in d && !deepEqual(d[key], b[key]));
    if (userEdited) out[key] = d[key]; // user added/edited → draft wins
    else if (key in l) out[key] = l[key]; // untouched → remote truth
    else if (key in d) out[key] = d[key];
    /* in b only → user removed it (or remote dropped it) → stays out */
  }

  /* ── projects: merge per id ─────────────────────────────────── */
  const bMap = new Map<string, unknown>();
  for (const p of arr(b.projects)) {
    const id = idOf(p);
    if (id) bMap.set(id, p);
  }
  const lMap = new Map<string, unknown>();
  for (const p of arr(l.projects)) {
    const id = idOf(p);
    if (id) lMap.set(id, p);
  }

  const seen = new Set<string>();
  const projects: unknown[] = [];
  for (const p of arr(d.projects)) {
    const id = idOf(p);
    if (!id) {
      projects.push(p); // no id — pass through untouched
      continue;
    }
    seen.add(id);
    const was = bMap.get(id);
    if (!was || !deepEqual(p, was)) {
      projects.push(p); // new project or user-edited → draft wins
    } else if (lMap.has(id)) {
      projects.push(lMap.get(id)); // untouched → remote truth survives
    }
    /* untouched & deleted remotely → dropped */
  }
  /* projects added remotely (unknown to the user's base) → appended */
  for (const p of arr(l.projects)) {
    const id = idOf(p);
    if (id && !seen.has(id) && !bMap.has(id)) projects.push(p);
  }

  out.projects = projects;
  return out;
}
