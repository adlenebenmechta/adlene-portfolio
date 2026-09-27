"use client";

import type { SiteContent } from "@/lib/site-content";
import { mediaUrl } from "@/lib/media";
import { Uploader, Btn } from "./ui";

/* The three site-wide media slots: hero film, work film, portrait. */

export function SiteMediaTab({
  content,
  update,
}: {
  content: SiteContent;
  update: (mut: (draft: SiteContent) => void) => void;
}) {
  return (
    <section className="mt-8 space-y-6">
      <p className="max-w-xl text-[13px] leading-relaxed text-white/50">
        These films and the portrait are the site-wide media slots. Upload a
        replacement and Save — it replaces the previous one everywhere.
        Videos loop fullscreen (keep them under 20MB for the CDN).
      </p>

      <Slot
        title="Home hero film"
        desc="Plays fullscreen behind the home page title."
        video={content.hero.video}
        poster={content.hero.poster}
        onVideo={(url) => update((d) => { d.hero.video = url; })}
        onPoster={(url) => update((d) => { d.hero.poster = url; })}
      />
      <Slot
        title="Work page film"
        desc="Plays fullscreen behind the /work index title."
        video={content.workFilm.video}
        poster={content.workFilm.poster}
        onVideo={(url) => update((d) => { d.workFilm.video = url; })}
        onPoster={(url) => update((d) => { d.workFilm.poster = url; })}
      />

      {/* portrait */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[13px] font-medium text-white">About portrait</p>
        <p className="mt-1 text-[12px] text-white/40">
          Shown in the home teaser and the About page. Square works best.
        </p>
        <div className="mt-4 flex items-center gap-4">
          {content.portrait.src && (
            <img
              src={mediaUrl(content.portrait.src)}
              alt=""
              className="h-20 w-20 rounded-lg border border-white/10 object-cover"
            />
          )}
          <Uploader
            label="Upload portrait"
            accept="image/*"
            compact
            onDone={(url) =>
              update((d) => {
                d.portrait.src = url;
              })
            }
          />
        </div>
      </div>

      {/* email */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[13px] font-medium text-white">Contact email</p>
        <p className="mt-1 text-[12px] text-white/40">
          Used across the contact page and footer.
        </p>
        <div className="mt-4 max-w-md">
          <label className="block">
            <input
              value={content.settings.email}
              onChange={(e) =>
                update((d) => {
                  d.settings.email = e.target.value;
                })
              }
              className="w-full rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-[14px] text-white focus:border-white/35 focus:outline-none"
            />
          </label>
        </div>
      </div>
    </section>
  );
}

function Slot({
  title,
  desc,
  video,
  poster,
  onVideo,
  onPoster,
}: {
  title: string;
  desc: string;
  video: string;
  poster: string;
  onVideo: (url: string) => void;
  onPoster: (url: string) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-[13px] font-medium text-white">{title}</p>
      <p className="mt-1 text-[12px] text-white/40">{desc}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <video
          src={mediaUrl(video)}
          poster={mediaUrl(poster)}
          className="h-20 w-36 rounded-lg border border-white/10 bg-black object-cover"
          muted
          playsInline
        />
        <Uploader
          label="Replace film"
          accept="video/mp4,video/webm,.mov"
          compact
          onDone={onVideo}
        />
        <Uploader
          label="Replace poster (optional)"
          accept="image/*"
          compact
          onDone={onPoster}
        />
      </div>
    </div>
  );
}
