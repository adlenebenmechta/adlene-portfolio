"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  resolvePages,
  type SiteContent,
  type Project,
  type MediaItem,
  type PageTexts,
} from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { BrandForm } from "./BrandForm";
import { SiteMediaTab } from "./SiteMediaTab";
import { FilesTab } from "./FilesTab";
import { TextsTab } from "./TextsTab";
import { Uploader, Field, Btn } from "./ui";

/* ────────────────────────────────────────────────────────────────
   /admin — hidden content studio.
   Login gate → dashboard with four tabs:
     Brands (add / edit / reorder / delete), Texts (every page headline / paragraph / label),
     Site Media (hero film, work film, portrait),
     Files (uploaded media manager).
   Saves commit content.json to GitHub; the site picks changes up
   within seconds (no rebuild needed).
   ──────────────────────────────────────────────────────────────── */

type Tab = "brands" | "texts" | "media" | "files";

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((j) => setAuthed(j.authed))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="grid min-h-svh place-items-center text-white/40">
        checking access…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="grid min-h-svh place-items-center px-6">
        <form
          className="w-full max-w-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoginError("");
            const r = await fetch("/api/admin/session", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password }),
            });
            if (r.ok) setAuthed(true);
            else setLoginError("Wrong password — try again.");
          }}
        >
          <p className="font-serif text-3xl text-white">Content Studio</p>
          <p className="mt-2 text-sm text-white/50">
            Private area — Adlene Benmechta only.
          </p>
          <div className="mt-8">
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
            />
          </div>
          {loginError && (
            <p className="mt-3 text-[13px] text-red-400">{loginError}</p>
          )}
          <div className="mt-6">
            <Btn type="submit" full>
              Enter
            </Btn>
          </div>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}

/* ──────────────────────────────────────────────────────────────── */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("brands");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const msgTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const flash = (t: string) => {
    setMsg(t);
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setMsg(""), 3500);
  };

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/content");
    if (r.status === 401) return onLogout();
    setContent(await r.json());
    setDirty(false);
  }, [onLogout]);

  useEffect(() => {
    load();
  }, [load]);

  /** resolved page texts (defaults fill any missing field) */
  const pages: PageTexts | null = content
    ? resolvePages(content.pages)
    : null;

  if (!content) {
    return (
      <div className="grid min-h-svh place-items-center text-white/40">
        loading content…
      </div>
    );
  }

  const update = (mut: (draft: SiteContent) => void) => {
    setContent((c) => {
      const draft = structuredClone(c as SiteContent);
      mut(draft);
      return draft;
    });
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const r = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (r.status === 401) return onLogout();
      if (!r.ok) throw new Error((await r.json()).error ?? "save failed");
      setDirty(false);
      flash("Saved — the site updates within a few seconds ✓");
    } catch (e) {
      flash(`Save failed: ${e instanceof Error ? e.message : "error"}`);
    } finally {
      setSaving(false);
    }
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= content.projects.length) return;
    update((d) => {
      const [p] = d.projects.splice(i, 1);
      d.projects.splice(j, 0, p);
      d.projects.forEach((p, k) => (p.index = String(k + 1).padStart(2, "0")));
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pb-32 pt-10 md:px-8">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-serif text-2xl text-white md:text-3xl">
            Content Studio
          </p>
          <p className="mt-1 text-[13px] text-white/45">
            {content.projects.length} brands · everything saves to the live
            site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
          >
            View site ↗
          </a>
          <button
            onClick={async () => {
              await fetch("/api/admin/session", { method: "DELETE" });
              onLogout();
            }}
            className="text-[11px] uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-white"
          >
            Log out
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-8 flex gap-2 border-b border-white/10 pb-3">
        {(
          [
            ["brands", "Brands"],
            ["texts", "Texts"],
            ["media", "Site Media"],
            ["files", "Files"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => {
              setTab(id);
              setEditing(null);
            }}
            className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors ${
              tab === id
                ? "bg-white text-black"
                : "text-white/50 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {msg && (
            <span className="text-[12px] text-white/60">{msg}</span>
          )}
          {dirty && (
            <span className="text-[12px] text-amber-300/90">unsaved</span>
          )}
          <Btn onClick={save} disabled={!dirty || saving}>
            {saving ? "Saving…" : "Save"}
          </Btn>
        </div>
      </div>

      {/* ── BRANDS TAB ─────────────────────────────────────────── */}
      {tab === "brands" && editing === null && (
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-white/50">
              Add, edit, reorder or remove brands. Every change goes live
              after Save.
            </p>
            <Btn onClick={() => setEditing("new")}>+ Add brand</Btn>
          </div>

          <ul className="mt-6 space-y-3">
            {content.projects.map((p, i) => (
              <li
                key={p.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <img
                  src={mediaUrl(p.logo)}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg border border-white/10 bg-white/5 object-contain p-1"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium text-white">
                    {p.brand}
                  </p>
                  <p className="truncate text-[12px] text-white/40">
                    {p.industry} · {p.year} · {p.media.length} media ·
                    /work/{p.id}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <IconBtn
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    label="Move up"
                  >
                    ↑
                  </IconBtn>
                  <IconBtn
                    onClick={() => move(i, 1)}
                    disabled={i === content.projects.length - 1}
                    label="Move down"
                  >
                    ↓
                  </IconBtn>
                  <IconBtn onClick={() => setEditing(i)} label="Edit">
                    ✎
                  </IconBtn>
                  <IconBtn
                    danger
                    label="Delete"
                    onClick={() => {
                      if (
                        !confirm(
                          `Delete "${p.brand}" and its case study page? This cannot be undone (unless you Save nothing).`,
                        )
                      )
                        return;
                      update((d) => d.projects.splice(i, 1));
                    }}
                  >
                    ✕
                  </IconBtn>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "brands" && editing !== null && (
        <BrandForm
          project={editing === "new" ? null : content.projects[editing]}
          onCancel={() => setEditing(null)}
          onSave={(project) => {
            update((d) => {
              if (editing === "new") {
                d.projects.push(project);
                d.projects.forEach(
                  (p, k) => (p.index = String(k + 1).padStart(2, "0")),
                );
              } else {
                d.projects[editing] = project;
              }
            });
            setEditing(null);
          }}
        />
      )}

      {/* ── TEXTS TAB ─────────────────────────────────────────── */}
      {tab === "texts" && pages && (
        <TextsTab
          pages={pages}
          update={(mut) =>
            update((d) => {
              d.pages ??= {};
              const resolved = resolvePages(d.pages);
              mut(resolved);
              d.pages = resolved;
            })
          }
        />
      )}

      {/* ── SITE MEDIA TAB ─────────────────────────────────────── */}
      {tab === "media" && (
        <SiteMediaTab content={content} update={update} />
      )}

      {/* ── FILES TAB ──────────────────────────────────────────── */}
      {tab === "files" && <FilesTab onDeleted={load} />}
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  disabled,
  danger,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-8 w-8 place-items-center rounded-lg border text-[13px] transition-colors disabled:opacity-25 ${
        danger
          ? "border-red-400/25 text-red-300/80 hover:border-red-400/60 hover:bg-red-400/10"
          : "border-white/15 text-white/70 hover:border-white/40 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

export { Uploader, Field, Btn };
export type { Project, MediaItem };
