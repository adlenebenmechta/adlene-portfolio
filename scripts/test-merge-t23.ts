/* Task 23 — unit test for src/lib/content-merge.ts (run with bun).
 * Simulates the exact production failure: a stale admin tab saving the
 * Armoray logo must NOT revert a concurrent ACF logo fix. */
import { deepEqual, mergeContent } from "../src/lib/content-merge";

let pass = 0;
let fail = 0;
function check(name: string, cond: boolean) {
  if (cond) {
    pass++;
    console.log(`  ✓ ${name}`);
  } else {
    fail++;
    console.log(`  ✗ ${name}`);
  }
}

const base = {
  version: "1",
  settings: { title: "Adlene Benmechta", email: "a@b.c" },
  hero: { video: "/media/hero.mp4" },
  projects: [
    { id: "acf", brand: "ACF", logo: "/gh/media/uploads/acf-logo-mw2at0n5.jpg", index: "01" },
    { id: "armoray", brand: "Armoray", logo: "/media/logos/armoray.svg", index: "02" },
    { id: "salon", brand: "Salon", logo: "/media/logos/salon.svg", index: "03" },
  ],
};

/* 1 ── THE regression: agent fixed acf.logo remotely; user (stale tab)
 *       only changed armoray.logo → merge must keep BOTH */
{
  const draft = structuredClone(base);
  (draft.projects[1] as { logo: string }).logo = "/gh/media/uploads/armoray-log-mw2bzefs.png";
  const latest = structuredClone(base);
  (latest.projects[0] as { logo: string }).logo = "/media/logos/acf.png";
  const out = mergeContent(base, draft, latest) as typeof base;
  const acf = out.projects.find((p) => p.id === "acf")!;
  const arm = out.projects.find((p) => p.id === "armoray")!;
  check("user's armoray logo kept", arm.logo === "/gh/media/uploads/armoray-log-mw2bzefs.png");
  check("agent's acf cutout survives (the task-22 regression)", acf.logo === "/media/logos/acf.png");
  check("untouched salon project comes from latest", out.projects.find((p) => p.id === "salon") !== undefined);
  check("project count preserved", out.projects.length === 3);
}

/* 2 ── no drift: base === latest → draft wins everywhere */
{
  const draft = structuredClone(base);
  (draft.projects[0] as { logo: string }).logo = "/media/logos/acf.png";
  const out = mergeContent(base, draft, base) as typeof base;
  check("no-drift merge equals draft", deepEqual(out, draft));
}

/* 3 ── user edited the same project the agent edited → user wins (last writer) */
{
  const draft = structuredClone(base);
  (draft.projects[0] as { brand: string }).brand = "ACF Algeria";
  const latest = structuredClone(base);
  (latest.projects[0] as { logo: string }).logo = "/media/logos/acf.png";
  const out = mergeContent(base, draft, latest) as typeof base;
  const acf = out.projects.find((p) => p.id === "acf")!;
  check("same-project conflict → user's edit wins", acf.brand === "ACF Algeria");
}

/* 4 ── texts section: user edited a page text, agent edited hero remotely */
{
  const draft = structuredClone(base) as unknown as Record<string, unknown>;
  draft.pages = { about: { title: "New About" } };
  const latest = structuredClone(base) as unknown as Record<string, unknown>;
  latest.hero = { video: "/media/hero-new.mp4" };
  const out = mergeContent(base, draft, latest);
  check("user's pages edit kept", deepEqual((out as Record<string, unknown>).pages, { about: { title: "New About" } }));
  check("agent's hero edit kept", deepEqual((out as Record<string, unknown>).hero, { video: "/media/hero-new.mp4" }));
}

/* 5 ── agent ADDED a project remotely; user edited an existing one */
{
  const draft = structuredClone(base);
  (draft.projects[1] as { logo: string }).logo = "/gh/media/uploads/armoray-log-mw2bzefs.png";
  const latest = structuredClone(base);
  latest.projects.push({ id: "newbrand", brand: "New", logo: "/x.svg", index: "04" });
  const out = mergeContent(base, draft, latest) as typeof base & { projects: { id: string }[] };
  check("user's armoray edit kept", out.projects.find((p) => p.id === "armoray")!.logo === "/gh/media/uploads/armoray-log-mw2bzefs.png");
  check("agent's new project appended", out.projects.some((p) => p.id === "newbrand"));
  check("order: draft order then remote additions", out.projects.map((p) => p.id).join(",") === "acf,armoray,salon,newbrand");
}

/* 6 ── user DELETED a project; agent edited a different one */
{
  const draft = structuredClone(base);
  draft.projects = draft.projects.filter((p) => p.id !== "salon");
  const latest = structuredClone(base);
  (latest.projects[0] as { logo: string }).logo = "/media/logos/acf.png";
  const out = mergeContent(base, draft, latest) as typeof base;
  check("user's deletion respected", !out.projects.some((p) => p.id === "salon"));
  check("agent's acf edit kept despite deletion elsewhere", out.projects.find((p) => p.id === "acf")!.logo === "/media/logos/acf.png");
}

/* 7 ── user REORDERED projects (index renumbered) → draft order + remote fixes elsewhere */
{
  const draft = structuredClone(base);
  const moved = draft.projects.shift()!;
  draft.projects.push(moved); // acf moved to the end
  draft.projects.forEach((p, k) => (p.index = String(k + 1).padStart(2, "0")));
  const latest = structuredClone(base);
  (latest.projects[1] as { logo: string }).logo = "/media/logos/armoray-agent.svg"; // agent edited armoray
  const out = mergeContent(base, draft, latest) as typeof base;
  check("reorder applied (acf last)", out.projects.map((p) => p.id).join(",") === "armoray,salon,acf");
  const arm = out.projects.find((p) => p.id === "armoray")!;
  check("reorder renumbered every project → draft wins for armoray (accepted trade-off)", arm.index === "01");
}

/* 8 ── user ADDED a project remotely unknown */
{
  const draft = structuredClone(base);
  draft.projects.push({ id: "mynew", brand: "My New", logo: "/n.svg", index: "04" });
  const latest = structuredClone(base);
  (latest.projects[0] as { logo: string }).logo = "/media/logos/acf.png";
  const out = mergeContent(base, draft, latest) as typeof base;
  check("user's new project added", out.projects.some((p) => p.id === "mynew"));
  check("agent's acf fix survives user addition", out.projects.find((p) => p.id === "acf")!.logo === "/media/logos/acf.png");
}

console.log(`\n${fail === 0 ? "ALL PASS" : "FAILURES"} — ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
