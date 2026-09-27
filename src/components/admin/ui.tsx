"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";

/* Shared dark-luxury admin UI atoms */

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/25 focus:border-white/35 focus:outline-none"
      />
      {hint && <span className="mt-1 block text-[11px] text-white/30">{hint}</span>}
    </label>
  );
}

export function Area({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[14px] leading-relaxed text-white placeholder:text-white/25 focus:border-white/35 focus:outline-none"
      />
    </label>
  );
}

export function Btn({
  children,
  onClick,
  disabled,
  type = "button",
  full,
  ghost,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  full?: boolean;
  ghost?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all disabled:opacity-40 ${
        ghost
          ? "border border-white/20 text-white/70 hover:border-white/50 hover:text-white"
          : "bg-white text-black hover:bg-white/85"
      } ${full ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

/**
 * Upload a file → /api/admin/upload → returns { url } (" /gh/... ").
 * Shows progress + error; onDone receives the URL.
 */
export function Uploader({
  label,
  accept,
  onDone,
  compact,
}: {
  label: string;
  accept: string;
  onDone: (url: string) => void;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "upload failed");
      onDone(j.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className={`inline-flex items-center gap-2 rounded-lg border border-dashed border-white/25 px-4 text-[12px] text-white/60 transition-colors hover:border-white/50 hover:text-white disabled:opacity-40 ${
          compact ? "py-2" : "py-3"
        }`}
      >
        <Upload size={13} aria-hidden="true" />
        {busy ? "Uploading…" : label}
      </button>
      {err && <p className="mt-1.5 text-[11px] text-red-400">{err}</p>}
    </div>
  );
}
