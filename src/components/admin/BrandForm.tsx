"use client";

import { useState } from "react";
import type {
  Project,
  MediaItem,
  ProjectSection,
  ProjectChapter,
} from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Field, Area, Btn, Uploader } from "./ui";

/* Add / edit a brand — full case-study fields + organised sections,
   chapters (sub-pages) and media managers for all of them. */

const SPANS: MediaItem["span"][] = [
  "full", "wide", "half", "half-tall", "third", "portrait",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/* ── media rows with upload / replace / reorder / remove ────────── */

function MediaListEditor({
  media,
  onChange,
}: {
  media: MediaItem[];
  onChange: (m: MediaItem[]) => void;
}) {
  const set = (i: number, patch: Partial<MediaItem>) =>
    onChange(media.map((m, j) => (j === i ? { ...m, ...patch } : m)));
  const move = (i: number, dir: -1 | 1) => {
    const next = [...media];
    const j = Math.max(0, Math.min(media.length - 1, i + dir));
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <Uploader
          label="Add image"
          accept="image/*"
          compact
          onDone={(url) =>
            onChange([...media, { type: "image", src: url, alt: "", span: "half" }])
          }
        />
        <Uploader
          label="Add video"
          accept="video/mp4,video/webm,.mov"
          compact
          onDone={(url) =>
            onChange([...media, { type: "video", src: url, alt: "", span: "full" }])
          }
        />
        <span className="text-[11px] text-white/30">
          empty slots show as elegant placeholders on the site
        </span>
      </div>

      <ul className="mt-4 space-y-3">
        {media.map((m, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-black/30 p-3"
          >
            {m.src && m.type === "image" ? (
              <img
                src={mediaUrl(m.src)}
                alt=""
                className="h-14 w-24 shrink-0 rounded-md object-cover"
              />
            ) : m.src ? (
              <video
                src={mediaUrl(m.src)}
                className="h-14 w-24 shrink-0 rounded-md bg-black object-cover"
                muted
                playsInline
              />
            ) : (
              <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-md border border-dashed border-white/15 bg-white/[0.015] text-[9px] uppercase tracking-[0.2em] text-white/30">
                {m.type === "video" ? "film" : "photo"}
              </div>
            )}

            <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
              {m.type === "video" && (
                <Field
                  label="Label chip (optional)"
                  value={m.label ?? ""}
                  onChange={(v) => set(i, { label: v || undefined })}
                />
              )}
              <label className="block">
                <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Grid placement
                </span>
                <select
                  value={m.span}
                  onChange={(e) =>
                    set(i, { span: e.target.value as MediaItem["span"] })
                  }
                  className="w-full rounded-lg border border-white/12 bg-[#141414] px-3 py-2.5 text-[13px] text-white focus:border-white/35 focus:outline-none"
                >
                  {SPANS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex items-end">
                <Uploader
                  label={m.src ? "Upload / replace" : "Upload into slot"}
                  accept={
                    m.type === "video"
                      ? "video/mp4,video/webm,.mov"
                      : "image/*"
                  }
                  compact
                  onDone={(url) => set(i, { src: url })}
                />
              </div>
            </div>

            <div className="flex gap-1.5">
              <Btn ghost onClick={() => move(i, -1)}>
                ↑
              </Btn>
              <Btn ghost onClick={() => move(i, 1)}>
                ↓
              </Btn>
              <Btn ghost onClick={() => onChange(media.filter((_, j) => j !== i))}>
                ✕
              </Btn>
            </div>
          </li>
        ))}
        {media.length === 0 && (
          <li className="text-[13px] text-white/35">
            No media yet — add images and videos, or keep slots empty as
            placeholders.
          </li>
        )}
      </ul>
    </>
  );
}

/* ── one organised section (Video Ads / Styles / Results …) ─────── */

function SectionBlock({
  section,
  onChange,
  onRemove,
  onMove,
}: {
  section: ProjectSection;
  onChange: (s: ProjectSection) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
        >
          {open ? "▾" : "▸"} {section.label || "Untitled section"}
          <span className="ml-2 text-white/30">({section.media.length} items)</span>
        </button>
        <div className="ml-auto flex gap-1.5">
          <Btn ghost onClick={() => onMove(-1)}>
            ↑
          </Btn>
          <Btn ghost onClick={() => onMove(1)}>
            ↓
          </Btn>
          <Btn ghost onClick={onRemove}>
            ✕
          </Btn>
        </div>
      </div>
      {open && (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Section title"
              value={section.label}
              onChange={(v) => onChange({ ...section, label: v })}
              placeholder="Video Ads"
            />
            <Field
              label="Section note (optional)"
              value={section.note ?? ""}
              onChange={(v) => onChange({ ...section, note: v || undefined })}
              placeholder="Shown beside the title"
            />
          </div>
          <MediaListEditor
            media={section.media}
            onChange={(media) => onChange({ ...section, media })}
          />
        </div>
      )}
    </li>
  );
}

function SectionsEditor({
  sections,
  onChange,
  title = "Case-study sections",
  hint,
}: {
  sections?: ProjectSection[];
  onChange: (s: ProjectSection[]) => void;
  title?: string;
  hint?: string;
}) {
  const list = sections ?? [];
  const move = (i: number, dir: -1 | 1) => {
    const next = [...list];
    const j = Math.max(0, Math.min(list.length - 1, i + dir));
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          {title} ({list.length})
        </p>
        <Btn
          ghost
          onClick={() =>
            onChange([
              ...list,
              {
                id: `section-${Date.now().toString(36)}`,
                label: "New section",
                media: [],
              },
            ])
          }
        >
          + Add section
        </Btn>
      </div>
      {hint && <p className="mt-2 text-[11px] leading-relaxed text-white/30">{hint}</p>}
      <ul className="mt-4 space-y-3">
        {list.map((s, i) => (
          <SectionBlock
            key={s.id}
            section={s}
            onChange={(ns) => onChange(list.map((x, j) => (j === i ? ns : x)))}
            onRemove={() => onChange(list.filter((_, j) => j !== i))}
            onMove={(dir) => move(i, dir)}
          />
        ))}
        {list.length === 0 && (
          <li className="text-[13px] text-white/35">
            No sections — the page falls back to the plain media gallery.
          </li>
        )}
      </ul>
    </div>
  );
}

/* ── chapters — sub-pages like ACF 2025 / ACF 2026 ──────────────── */

function ChapterBlock({
  chapter,
  existingIds,
  onChange,
  onRemove,
  onMove,
}: {
  chapter: ProjectChapter;
  existingIds: string[];
  onChange: (c: ProjectChapter) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
}) {
  const [open, setOpen] = useState(true);
  const idTaken = chapter.id.trim() === "" || (existingIds.filter((x) => x === chapter.id).length > 1);

  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-white"
        >
          {open ? "▾" : "▸"} {chapter.year} — {chapter.title || "Untitled"}
        </button>
        <div className="ml-auto flex gap-1.5">
          <Btn ghost onClick={() => onMove(-1)}>
            ↑
          </Btn>
          <Btn ghost onClick={() => onMove(1)}>
            ↓
          </Btn>
          <Btn ghost onClick={onRemove}>
            ✕
          </Btn>
        </div>
      </div>
      {open && (
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Chapter id (URL — e.g. 2026)"
              value={chapter.id}
              onChange={(v) => onChange({ ...chapter, id: slugify(v) })}
              placeholder="2026"
              error={idTaken ? "each chapter needs a unique id" : undefined}
              hint={`Page lives at /work/…/${chapter.id || "…"}`}
            />
            <Field
              label="Year (display)"
              value={chapter.year}
              onChange={(v) => onChange({ ...chapter, year: v })}
              placeholder="2026"
            />
            <Field
              label="Title (e.g. TEAM MANAGER)"
              value={chapter.title}
              onChange={(v) => onChange({ ...chapter, title: v })}
              placeholder="TEAM MANAGER"
            />
            <Field
              label="Role"
              value={chapter.role}
              onChange={(v) => onChange({ ...chapter, role: v })}
              placeholder="Team Manager"
            />
          </div>
          <Area
            label="Description (the chapter story)"
            value={chapter.description}
            onChange={(v) => onChange({ ...chapter, description: v })}
            rows={4}
          />
          <SectionsEditor
            title="Chapter sections"
            sections={chapter.sections}
            onChange={(sections) => onChange({ ...chapter, sections })}
          />
        </div>
      )}
    </li>
  );
}

function ChaptersEditor({
  chapters,
  onChange,
}: {
  chapters?: ProjectChapter[];
  onChange: (c: ProjectChapter[]) => void;
}) {
  const list = chapters ?? [];
  const ids = list.map((c) => c.id);
  const move = (i: number, dir: -1 | 1) => {
    const next = [...list];
    const j = Math.max(0, Math.min(list.length - 1, i + dir));
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          Chapters — sub-pages ({list.length})
        </p>
        <Btn
          ghost
          onClick={() =>
            onChange([
              ...list,
              {
                id: "",
                year: String(new Date().getFullYear()),
                title: "",
                role: "",
                description: "",
                sections: [],
              },
            ])
          }
        >
          + Add chapter
        </Btn>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-white/30">
        When chapters exist, the project page shows one card per chapter
        (e.g. ACF → 2025 / 2026) instead of its own sections.
      </p>
      <ul className="mt-4 space-y-3">
        {list.map((c, i) => (
          <ChapterBlock
            key={i}
            chapter={c}
            existingIds={ids}
            onChange={(nc) => onChange(list.map((x, j) => (j === i ? nc : x)))}
            onRemove={() => onChange(list.filter((_, j) => j !== i))}
            onMove={(dir) => move(i, dir)}
          />
        ))}
      </ul>
    </div>
  );
}

/* ── the brand form itself ──────────────────────────────────────── */

export function BrandForm({
  project,
  existingIds,
  onSave,
  onCancel,
}: {
  project: Project | null;
  /** slugs of the already-saved brands — the slug must stay unique */
  existingIds: string[];
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const isNew = !project;
  const [p, setP] = useState<Project>(
    structuredClone(
      project ?? {
        id: "",
        index: "",
        brand: "",
        shortName: "",
        logo: "",
        tagline: "",
        industry: "",
        location: "",
        year: String(new Date().getFullYear()),
        services: [],
        role: "",
        description: "",
        deliverables: [],
        preview: { type: "image", src: "", alt: "" },
        media: [],
      },
    ),
  );

  const set = <K extends keyof Project>(k: K, v: Project[K]) =>
    setP((d) => ({ ...d, [k]: v }));

  /* slug rules — apply to new AND existing brands:
     valid format + must not collide with another brand's page */
  const slugTaken =
    p.id !== project?.id && existingIds.includes(p.id);
  const slugOk = /^[a-z0-9-]{2,40}$/.test(p.id);
  const chaptersOk = (p.chapters ?? []).every(
    (c) => c.id && (p.chapters ?? []).filter((x) => x.id === c.id).length === 1,
  );

  const valid =
    slugOk && !slugTaken && p.brand.trim() !== "" && chaptersOk;

  return (
    <section className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-serif text-xl text-white">
          {isNew ? "New brand" : `Editing — ${p.brand}`}
        </p>
        <div className="flex gap-3">
          <Btn ghost onClick={onCancel}>
            Cancel
          </Btn>
          <Btn
            onClick={() => {
              const out = structuredClone(p);
              if (isNew && !out.id) out.id = slugify(out.brand);
              if (!out.shortName) out.shortName = out.brand.split(" ")[0];
              if (!isNew && out.id !== project.id) {
                if (
                  !confirm(
                    `Rename the page URL from /work/${project.id} to /work/${out.id}?\n\nThe old address will stop working — anyone opening an old link will see a 404.`,
                  )
                )
                  return;
              }
              onSave(out);
            }}
            disabled={!valid}
          >
            {isNew ? "Add brand" : "Apply changes"}
          </Btn>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Brand name"
          value={p.brand}
          onChange={(v) => set("brand", v)}
          placeholder="e.g. Armoray"
        />
        <Field
          label="URL slug"
          value={p.id}
          onChange={(v) => set("id", slugify(v))}
          placeholder="auto from name"
          error={
            slugTaken
              ? `"${p.id}" is already used by another brand — pick a different slug`
              : undefined
          }
          hint={
            isNew
              ? `Page will live at /work/${p.id || "…"}`
              : p.id !== project.id
                ? `Page will move to /work/${p.id || "…"} — the old link will stop working`
                : `Page lives at /work/${p.id}`
          }
        />
        <Field
          label="Tagline"
          value={p.tagline}
          onChange={(v) => set("tagline", v)}
          placeholder="One-line promise"
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Industry"
            value={p.industry}
            onChange={(v) => set("industry", v)}
            placeholder="E-Commerce"
          />
          <Field
            label="Year"
            value={p.year}
            onChange={(v) => set("year", v)}
            placeholder="2025"
          />
        </div>
        <Field
          label="Location"
          value={p.location}
          onChange={(v) => set("location", v)}
          placeholder="Annaba, DZ"
        />
        <Field
          label="Role"
          value={p.role}
          onChange={(v) => set("role", v)}
          placeholder="Creative — Video & Static Ads"
        />
        <Field
          label="Website — clicking the brand name opens it"
          value={p.website ?? ""}
          onChange={(v) => set("website", v || undefined)}
          placeholder="https://armoray.com"
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Stat (big number, optional)"
            value={p.stat ?? ""}
            onChange={(v) => set("stat", v || undefined)}
            placeholder="+5M"
          />
          <Field
            label="Stat label"
            value={p.statLabel ?? ""}
            onChange={(v) => set("statLabel", v || undefined)}
            placeholder="Trusted Athletes & Happy Customers"
          />
        </div>
        <Field
          label="Context link label (optional)"
          value={p.linkLabel ?? ""}
          onChange={(v) => set("linkLabel", v || undefined)}
          placeholder="Amazon Store"
        />
        <Field
          label="Context link URL"
          value={p.linkUrl ?? ""}
          onChange={(v) => set("linkUrl", v || undefined)}
          placeholder="https://www.amazon.com/stores/…"
        />
      </div>

      {/* logo */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          Logo
        </p>
        <div className="mt-4 flex items-center gap-4">
          {p.logo && (
            <img
              src={mediaUrl(p.logo)}
              alt=""
              className="h-16 w-16 rounded-lg border border-white/10 bg-white/5 object-contain p-1.5"
            />
          )}
          <Uploader
            label="Upload logo (SVG or PNG, square)"
            accept=".svg,.png,.jpg,.jpeg,.webp"
            compact
            onDone={(url) => set("logo", url)}
          />
          {p.logo && (
            <Btn ghost onClick={() => set("logo", "")}>
              Remove
            </Btn>
          )}
        </div>
        <p className="mt-2 text-[11px] text-white/30">
          The logo is also the box visual until an index preview image is uploaded.
        </p>
      </div>

      {/* preview image */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          Index preview image
        </p>
        <div className="mt-4 flex items-center gap-4">
          {p.preview.src && (
            <img
              src={mediaUrl(p.preview.src)}
              alt=""
              className="h-16 w-28 rounded-lg border border-white/10 object-cover"
            />
          )}
          <Uploader
            label="Upload preview (4/5 portrait works best)"
            accept="image/*"
            compact
            onDone={(url) =>
              set("preview", { type: "image", src: url, alt: p.brand })
            }
          />
          {p.preview.src && (
            <Btn ghost onClick={() => set("preview", { type: "image", src: "", alt: p.brand })}>
              Remove
            </Btn>
          )}
        </div>
      </div>

      {/* long text */}
      <Area
        label="Description (case study body)"
        value={p.description}
        onChange={(v) => set("description", v)}
        rows={5}
      />
      <div className="grid gap-5 md:grid-cols-2">
        <Area
          label="Services (one per line)"
          value={p.services.join("\n")}
          onChange={(v) =>
            set(
              "services",
              v.split("\n").map((s) => s.trim()).filter(Boolean),
            )
          }
          rows={4}
        />
        <Area
          label="Deliverables (one per line)"
          value={p.deliverables.join("\n")}
          onChange={(v) =>
            set(
              "deliverables",
              v.split("\n").map((s) => s.trim()).filter(Boolean),
            )
          }
          rows={4}
        />
      </div>

      {/* organised sections */}
      <SectionsEditor
        sections={p.sections}
        onChange={(sections) => set("sections", sections)}
        hint="Each section renders as its own titled chapter on the page — keep the slots empty until the media is ready; they show as elegant placeholders."
      />

      {/* chapters — sub-pages */}
      <ChaptersEditor
        chapters={p.chapters}
        onChange={(chapters) => set("chapters", chapters)}
      />

      {/* flat media gallery (legacy / simple mode) */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          Flat media gallery ({p.media.length}) — shown only when no sections
        </p>
        <div className="mt-4">
          <MediaListEditor
            media={p.media}
            onChange={(media) => set("media", media)}
          />
        </div>
      </div>
    </section>
  );
}
