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
   remote content, recursively per field:

   - untouched by the user  → remote value wins (agent fixes survive)
   - changed by the user    → user value wins (their edit is applied)
   - plain objects          → merged key by key, recursively
   - projects array         → merged per project id (add / remove /
                              reorder preserved), each project then
                              merged field by field
   - any other array        → last writer wins as a unit
   ──────────────────────────────────────────────────────────────── */

export function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isObj(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function obj(v: unknown): Record<string, unknown> {
  return isObj(v) ? v : {};
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

function idOf(p: unknown): string | null {
  const id = obj(p).id;
  return typeof id === "string" && id ? id : null;
}

/** Recursive three-way merge of one value. */
function mergeValue(base: unknown, draft: unknown, latest: unknown): unknown {
  /* the user did not touch it → the remote truth survives */
  if (deepEqual(draft, base)) return latest;

  /* user changed it; when all three are plain objects, merge deeper
   * so a remote edit to one field survives a user edit to another */
  if (isObj(draft) && isObj(base) && isObj(latest)) {
    return mergeObjects(base, draft, latest);
  }

  /* scalars / arrays / type changes → the user's value wins */
  return draft;
}

function mergeObjects(
  base: Record<string, unknown>,
  draft: Record<string, unknown>,
  latest: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const keys = new Set([
    ...Object.keys(draft),
    ...Object.keys(latest),
    ...Object.keys(base),
  ]);
  for (const key of keys) {
    out[key] = mergeValue(base[key], draft[key], latest[key]);
  }
  return out;
}

/** Projects merge by id: draft order, remote additions appended,
 *  user removals dropped, each surviving project merged per field. */
function mergeProjects(
  base: unknown[],
  draft: unknown[],
  latest: unknown[],
): unknown[] {
  const bMap = new Map<string, unknown>();
  for (const p of base) {
    const id = idOf(p);
    if (id) bMap.set(id, p);
  }
  const lMap = new Map<string, unknown>();
  for (const p of latest) {
    const id = idOf(p);
    if (id) lMap.set(id, p);
  }

  const seen = new Set<string>();
  const projects: unknown[] = [];
  for (const p of draft) {
    const id = idOf(p);
    if (!id) {
      projects.push(p); // no id — pass through untouched
      continue;
    }
    seen.add(id);
    const was = bMap.get(id);
    if (was === undefined) {
      projects.push(p); // added by the user → draft wins
    } else {
      const remote = lMap.get(id);
      if (remote === undefined) {
        /* untouched by the user, deleted remotely → dropped */
        if (deepEqual(p, was)) continue;
        /* user edited it while remote deleted it → keep the edit */
        projects.push(p);
        continue;
      }
      projects.push(mergeValue(was, p, remote)); // per-field merge
    }
  }
  /* projects added remotely (unknown to the user's base) → appended */
  for (const p of latest) {
    const id = idOf(p);
    if (id && !seen.has(id) && !bMap.has(id)) projects.push(p);
  }
  return projects;
}

export function mergeContent(
  base: unknown,
  draft: unknown,
  latest: unknown,
): Record<string, unknown> {
  const b = obj(base);
  const d = obj(draft);
  const l = obj(latest);

  const out = mergeObjects(b, d, l);
  /* the projects array keeps its by-id entity semantics (order,
   * additions, removals) instead of wholesale replacement */
  out.projects = mergeProjects(arr(b.projects), arr(d.projects), arr(l.projects));
  return out;
}
