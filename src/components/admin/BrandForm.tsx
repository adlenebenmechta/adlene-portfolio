"use client";

import { useState } from "react";
import type { Project, MediaItem } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Field, Area, Btn, Uploader } from "./ui";

/* Add / edit a brand — full case-study fields + media manager. */

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
        index: "00",
        brand: "",
        shortName: "",
        logo: "",
        tagline: "",
        industry: "",
        location: "",
        year: String(new Date().getFullYear()),
        services: [],
        role: "Creative Director",
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

  const valid = slugOk && !slugTaken && p.brand.trim() !== "";

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
          placeholder="e.g. Maison Noire"
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
            placeholder="Fashion & Luxury"
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
          placeholder="Paris, FR"
        />
        <Field
          label="Role"
          value={p.role}
          onChange={(v) => set("role", v)}
          placeholder="Creative Director"
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
            label="Upload preview (16/10 landscape works best)"
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

      {/* media items */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
            Case study media ({p.media.length})
          </p>
          <div className="flex gap-3">
            <Uploader
              label="Add image"
              accept="image/*"
              compact
              onDone={(url) =>
                setP((d) => ({
                  ...d,
                  media: [
                    ...d.media,
                    { type: "image", src: url, alt: d.brand, span: "half" },
                  ],
                }))
              }
            />
            <Uploader
              label="Add video"
              accept="video/mp4,video/webm,.mov"
              compact
              onDone={(url) =>
                setP((d) => ({
                  ...d,
                  media: [
                    ...d.media,
                    { type: "video", src: url, alt: d.brand, span: "full" },
                  ],
                }))
              }
            />
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {p.media.map((m, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-white/10 bg-black/30 p-3"
            >
              {m.type === "image" ? (
                <img
                  src={mediaUrl(m.src)}
                  alt=""
                  className="h-14 w-24 shrink-0 rounded-md object-cover"
                />
              ) : (
                <video
                  src={mediaUrl(m.src)}
                  className="h-14 w-24 shrink-0 rounded-md bg-black object-cover"
                  muted
                  playsInline
                />
              )}
              <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
                <Field
                  label="Alt text"
                  value={m.alt}
                  onChange={(v) =>
                    setP((d) => {
                      d.media[i].alt = v;
                      return { ...d };
                    })
                  }
                />
                {m.type === "video" && (
                  <Field
                    label="Label chip (optional)"
                    value={m.label ?? ""}
                    onChange={(v) =>
                      setP((d) => {
                        d.media[i].label = v || undefined;
                        return { ...d };
                      })
                    }
                  />
                )}
                <label className="block">
                  <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-white/40">
                    Grid placement
                  </span>
                  <select
                    value={m.span}
                    onChange={(e) =>
                      setP((d) => {
                        d.media[i].span = e.target
                          .value as MediaItem["span"];
                        return { ...d };
                      })
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
              </div>
              <div className="flex gap-1.5">
                <Btn
                  ghost
                  onClick={() =>
                    setP((d) => {
                      const [m2] = d.media.splice(i, 1);
                      d.media.splice(Math.max(0, i - 1), 0, m2);
                      return { ...d };
                    })
                  }
                >
                  ↑
                </Btn>
                <Btn
                  ghost
                  onClick={() =>
                    setP((d) => {
                      const [m2] = d.media.splice(i, 1);
                      d.media.splice(
                        Math.min(d.media.length, i + 1),
                        0,
                        m2,
                      );
                      return { ...d };
                    })
                  }
                >
                  ↓
                </Btn>
                <Btn
                  ghost
                  onClick={() =>
                    setP((d) => {
                      d.media.splice(i, 1);
                      return { ...d };
                    })
                  }
                >
                  ✕
                </Btn>
              </div>
            </li>
          ))}
          {p.media.length === 0 && (
            <li className="text-[13px] text-white/35">
              No media yet — upload images and videos for the case study
              gallery.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
