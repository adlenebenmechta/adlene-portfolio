"use client";

import { useCallback, useEffect, useState } from "react";
import { mediaUrl } from "@/lib/media";
import { Btn } from "./ui";

/* Uploaded files manager — list / preview / delete repo uploads. */

interface RepoFile {
  name: string;
  path: string;
  size: number;
  url: string;
}

function human(n: number): string {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  if (n > 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${n} B`;
}

export function FilesTab({ onDeleted }: { onDeleted: () => void }) {
  const [files, setFiles] = useState<RepoFile[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/admin/files");
      if (!r.ok) throw new Error((await r.json()).error ?? "list failed");
      setFiles((await r.json()).files);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "list failed");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (f: RepoFile) => {
    if (
      !confirm(
        `Delete ${f.name}? Make sure no brand still uses it (otherwise its image will break).`,
      )
    )
      return;
    setBusy(f.path);
    try {
      const r = await fetch(`/api/admin/files?path=${encodeURIComponent(f.path)}`, {
        method: "DELETE",
      });
      if (!r.ok) throw new Error((await r.json()).error ?? "delete failed");
      await load();
      onDeleted();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "delete failed");
    } finally {
      setBusy(null);
    }
  };

  if (err)
    return <p className="mt-8 text-[13px] text-red-400">{err}</p>;
  if (!files)
    return <p className="mt-8 text-[13px] text-white/40">loading files…</p>;

  return (
    <section className="mt-8">
      <p className="max-w-xl text-[13px] leading-relaxed text-white/50">
        Every file you upload through this studio (brand logos, preview
        images, films, media) is stored in the repository and served via
        CDN. Delete the ones you no longer need.
      </p>
      {files.length === 0 ? (
        <p className="mt-6 text-[13px] text-white/35">
          No uploads yet.
        </p>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {files.map((f) => (
            <li
              key={f.path}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            >
              {/\.(mp4|webm|mov|m4v)$/i.test(f.name) ? (
                <video
                  src={mediaUrl(f.url)}
                  className="h-14 w-24 shrink-0 rounded-lg bg-black object-cover"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={mediaUrl(f.url)}
                  alt=""
                  className="h-14 w-24 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-white">{f.name}</p>
                <p className="text-[11px] text-white/40">{human(f.size)}</p>
              </div>
              <Btn
                ghost
                onClick={() => remove(f)}
                disabled={busy === f.path}
              >
                {busy === f.path ? "…" : "Delete"}
              </Btn>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
