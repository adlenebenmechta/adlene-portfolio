"use client";

import type { PageTexts } from "@/lib/site-content";
import { Area, Field, Btn } from "./ui";

/* ────────────────────────────────────────────────────────────────
   Texts tab — edit every word on the public site:
   Home hero, About, Work page, Contact, Case-study labels, Footer.
   Saves together with the rest of the dashboard (one Save button).
   ──────────────────────────────────────────────────────────────── */

export function TextsTab({
  pages,
  update,
}: {
  pages: PageTexts;
  update: (mut: (draft: PageTexts) => void) => void;
}) {
  return (
    <section className="mt-8 space-y-12">
      <p className="text-[13px] text-white/50">
        Every headline, paragraph and label on the site — edit and press Save.
        The name below drives the hero, the curtain signature and the footer.
      </p>

      {/* ── HOME ─────────────────────────────────────────────── */}
      <Group title="Home — Hero">
        <Field
          label='Line 1 (italic — "Hi, my name is")'
          value={pages.home.heroIntro}
          onChange={(v) => update((d) => void (d.home.heroIntro = v))}
        />
        <Field
          label="Your name (hero + signature + footer)"
          value={pages.home.heroName}
          onChange={(v) => update((d) => void (d.home.heroName = v))}
        />
        <Field
          label='Line 3 (italic — "and this is")'
          value={pages.home.heroLine}
          onChange={(v) => update((d) => void (d.home.heroLine = v))}
        />
        <Field
          label='Boxed link (→ /work — "my portfolio")'
          value={pages.home.heroBox}
          onChange={(v) => update((d) => void (d.home.heroBox = v))}
        />
        <Area
          label="Work section headline (home page)"
          rows={2}
          value={pages.home.workTitle}
          onChange={(v) => update((d) => void (d.home.workTitle = v))}
        />
      </Group>

      {/* ── ABOUT ─────────────────────────────────────────────── */}
      <Group title="About page">
        <Area
          label="Headline"
          rows={2}
          value={pages.about.headline}
          onChange={(v) => update((d) => void (d.about.headline = v))}
        />
        <Area
          label="Paragraph 1"
          rows={5}
          value={pages.about.bio1}
          onChange={(v) => update((d) => void (d.about.bio1 = v))}
        />
        <Area
          label="Paragraph 2"
          rows={5}
          value={pages.about.bio2}
          onChange={(v) => update((d) => void (d.about.bio2 = v))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Portrait caption — name"
            value={pages.about.portraitName}
            onChange={(v) => update((d) => void (d.about.portraitName = v))}
          />
          <Field
            label="Portrait caption — role"
            value={pages.about.portraitRole}
            onChange={(v) => update((d) => void (d.about.portraitRole = v))}
          />
        </div>

        <ListEditor
          label="Facts (Experience / Disciplines / …)"
          items={pages.about.facts}
          columns={["Label", "Value"]}
          get={(f) => [f.label, f.value]}
          set={(f, [label, value]) => ({ label, value })}
          make={() => ({ label: "New fact", value: "" })}
          onChange={(facts) => update((d) => void (d.about.facts = facts))}
        />

        <Area
          label="Capabilities title"
          rows={2}
          value={pages.about.capabilitiesTitle}
          onChange={(v) => update((d) => void (d.about.capabilitiesTitle = v))}
        />

        <ListEditor
          label="Capabilities list (About + Home)"
          items={pages.about.capabilities}
          columns={["Title", "Note"]}
          get={(c) => [c.title, c.note]}
          set={(c, [title, note]) => ({ index: c.index, title, note })}
          make={() => ({
            index: "00",
            title: "New capability",
            note: "",
          })}
          onChange={(caps) => update((d) => void (d.about.capabilities = caps))}
        />

        <Divider label="Home teaser (About preview on the home page)" />
        <Area
          label="Teaser headline"
          rows={2}
          value={pages.about.teaserHeadline}
          onChange={(v) => update((d) => void (d.about.teaserHeadline = v))}
        />
        <Area
          label="Teaser paragraph"
          rows={4}
          value={pages.about.teaserBio}
          onChange={(v) => update((d) => void (d.about.teaserBio = v))}
        />
      </Group>

      {/* ── WORK PAGE ────────────────────────────────────────── */}
      <Group title="Work page">
        <Field
          label="Kicker (small line above the title)"
          value={pages.work.kicker}
          onChange={(v) => update((d) => void (d.work.kicker = v))}
        />
        <Area
          label="Headline"
          rows={2}
          value={pages.work.headline}
          onChange={(v) => update((d) => void (d.work.headline = v))}
        />
        <Area
          label="Intro paragraph"
          rows={3}
          value={pages.work.intro}
          onChange={(v) => update((d) => void (d.work.intro = v))}
        />
      </Group>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <Group title="Contact page + CTA blocks">
        <Area
          label="Headline (use Enter for a line break)"
          rows={2}
          value={pages.contact.headline}
          onChange={(v) => update((d) => void (d.contact.headline = v))}
        />
        <Area
          label="Sub-line"
          rows={2}
          value={pages.contact.subline}
          onChange={(v) => update((d) => void (d.contact.subline = v))}
        />
        <Field
          label="Button label"
          value={pages.contact.ctaButton}
          onChange={(v) => update((d) => void (d.contact.ctaButton = v))}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Location"
            value={pages.contact.location}
            onChange={(v) => update((d) => void (d.contact.location = v))}
          />
          <Field
            label="Availability"
            value={pages.contact.availability}
            onChange={(v) => update((d) => void (d.contact.availability = v))}
          />
          <Field
            label="Response"
            value={pages.contact.response}
            onChange={(v) => update((d) => void (d.contact.response = v))}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            label="Location — sub"
            value={pages.contact.locationSub}
            onChange={(v) => update((d) => void (d.contact.locationSub = v))}
          />
          <Field
            label="Availability — sub"
            value={pages.contact.availabilitySub}
            onChange={(v) => update((d) => void (d.contact.availabilitySub = v))}
          />
          <Field
            label="Response — sub"
            value={pages.contact.responseSub}
            onChange={(v) => update((d) => void (d.contact.responseSub = v))}
          />
        </div>
        <Field
          label="Location tag (bottom of CTA blocks)"
          value={pages.contact.locationTag}
          onChange={(v) => update((d) => void (d.contact.locationTag = v))}
        />
        <Field
          label="Steps section title"
          value={pages.contact.stepsTitle}
          onChange={(v) => update((d) => void (d.contact.stepsTitle = v))}
        />
        <ListEditor
          label="Process steps"
          items={pages.contact.steps}
          columns={["Title", "Note"]}
          get={(s) => [s.title, s.note]}
          set={(s, [title, note]) => ({ index: s.index, title, note })}
          make={() => ({ index: "00", title: "New step", note: "" })}
          onChange={(steps) => update((d) => void (d.contact.steps = steps))}
        />
      </Group>

      {/* ── CASE STUDY ───────────────────────────────────────── */}
      <Group title="Case-study labels">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Back link (→ All Work)"
            value={pages.caseStudy.backLabel}
            onChange={(v) => update((d) => void (d.caseStudy.backLabel = v))}
          />
          <Field
            label="Brief section title"
            value={pages.caseStudy.briefTitle}
            onChange={(v) => update((d) => void (d.caseStudy.briefTitle = v))}
          />
          <Field
            label="Work section title"
            value={pages.caseStudy.workTitle}
            onChange={(v) => update((d) => void (d.caseStudy.workTitle = v))}
          />
          <Field
            label="Next project label"
            value={pages.caseStudy.nextLabel}
            onChange={(v) => update((d) => void (d.caseStudy.nextLabel = v))}
          />
          <Field
            label="Open button label"
            value={pages.caseStudy.openLabel}
            onChange={(v) => update((d) => void (d.caseStudy.openLabel = v))}
          />
        </div>
      </Group>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <Group title="Footer">
        <Area
          label="Tagline"
          rows={3}
          value={pages.footer.tagline}
          onChange={(v) => update((d) => void (d.footer.tagline = v))}
        />
        <Field
          label="Copyright line"
          value={pages.footer.copyright}
          onChange={(v) => update((d) => void (d.footer.copyright = v))}
        />
        <Field
          label="Bottom line (Films · Photography · Identity)"
          value={pages.footer.bottomLine}
          onChange={(v) => update((d) => void (d.footer.bottomLine = v))}
        />
      </Group>
    </section>
  );
}

/* ── helpers ─────────────────────────────────────────────────── */

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.24em] text-white/70">
        {title}
      </h3>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <p className="pt-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
      — {label} —
    </p>
  );
}

function ListEditor<T>({
  label,
  items,
  columns,
  get,
  set,
  make,
  onChange,
}: {
  label: string;
  items: T[];
  columns: [string, string];
  get: (item: T) => [string, string];
  set: (item: T, vals: [string, string]) => T;
  make: () => T;
  onChange: (items: T[]) => void;
}) {
  const patch = (i: number, vals: [string, string]) => {
    const next = items.slice();
    next[i] = set(next[i], vals);
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          {label} · {items.length}
        </p>
        <Btn
          ghost
          onClick={() => onChange([...items, make()])}
        >
          + Add
        </Btn>
      </div>
      <ul className="mt-3 space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="grid grid-cols-[1.6rem_1fr_1fr_3.4rem] items-start gap-2"
          >
            <span className="pt-2.5 text-center text-[11px] tabular-nums text-white/25">
              {i + 1}
            </span>
            <Field
              label={columns[0]}
              value={get(item)[0]}
              onChange={(v) => patch(i, [v, get(item)[1]])}
            />
            <Field
              label={columns[1]}
              value={get(item)[1]}
              onChange={(v) => patch(i, [get(item)[0], v])}
            />
            <div className="flex items-end gap-1 pb-0.5">
              <MiniBtn onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </MiniBtn>
              <MiniBtn
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
              >
                ↓
              </MiniBtn>
              <MiniBtn
                danger
                onClick={() => onChange(items.filter((_, k) => k !== i))}
              >
                ✕
              </MiniBtn>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniBtn({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`grid h-7 w-7 place-items-center rounded-md border text-[11px] transition-colors disabled:opacity-25 ${
        danger
          ? "border-red-400/25 text-red-300/80 hover:border-red-400/60 hover:bg-red-400/10"
          : "border-white/15 text-white/60 hover:border-white/40 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
