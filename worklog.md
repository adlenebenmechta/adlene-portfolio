# Worklog

---
Task ID: 1
Agent: Super Z (main agent)
Task: Premium cinematic creative portfolio — React + TypeScript + Tailwind v4 + motion/react + lucide-react, deployed to GitHub and hosted on Railway for Adlene Benmechta.

Work Log:
- Initialized fullstack environment (Next.js 16 + TS + Tailwind v4), installed `motion` package for `motion/react` imports.
- Sourced media assets: cinematic hero background video (1080p/25s, remuxed with faststart), 2 additional stock films, 39 optimized editorial photographs across fashion/hospitality/tech/automotive/fragrance/portrait categories (image-search, downscaled with PIL), generated 2 Ken Burns brand films (ffmpeg zoompan) and poster frames.
- Wrote global CSS: Helvetica webfont (@font-face from onlinewebfonts), exact liquid-glass spec, film grain, vignette, custom scrollbar, reduced-motion support.
- Created data-driven portfolio architecture: `src/lib/portfolio-data.ts` with 5 brands (Maison Noire, Halcyon, Obsidian Labs, Veloce, Atlas & Ivy), full case study metadata, art-directed media galleries.
- Built components: App, Navbar (scroll-reactive glass), Hero (staggered blur reveals + parallax), BrandIndex (typographic list + spring-following floating preview), BrandSection (editorial chapters + sticky metadata), MediaGallery/MediaItem (asymmetric grids + clip-path reveals), SmartVideo (in-view play / off-screen pause), BrandNav (IntersectionObserver chapter index, desktop vertical + mobile horizontal strip), About (parallax portrait), Capabilities, ContactCTA, Footer (exact LUMINA spec with motion.footer props).
- Verified locally with agent-browser: DOM structure, video playback, hover previews, mobile overflow (0px), menu, footer content, no console errors, lint clean.
- Deployment: created GitHub repo `adlenebenmechta/adlene-portfolio` (pushed 134 files incl. Dockerfile, railway.json, README), created Railway project via GraphQL v2 API, deployed via `githubRepoDeploy`, allocated domain, fixed target port 8080 (Railway-injected PORT), verified live site end-to-end (HTTP 200, all media 206/200, SSR HTML contains all brands).

Stage Summary:
- LIVE URL: https://adlene-portfolio-production.up.railway.app
- GitHub: https://github.com/adlenebenmechta/adlene-portfolio
- Railway project: adlene-portfolio (id 2f17b86f-c653-47f6-b52a-148981ed7555), service 0a8b67d3-994a-4ddd-8616-20ad257537e6, production environment 41d644f8-697b-4236-bd7c-49de660e74f2, domain id 148cac63-94a9-426c-9206-0b2fc62076de (targetPort 8080).
- Note: user's uploaded video.mp4 never arrived in /home/z/my-project/upload/ (empty dir) — sourced a cinematic stock fallback as /public/video.mp4; user can replace the file directly.
- Security note: user shared GitHub + Railway tokens in chat — advised rotation.

---
Task ID: 2
Agent: Super Z (main agent)
Task: Transform the single-page portfolio into a multi-page website — every work card opens its own dedicated case study page. More organized & professional. Keep the cinematic video background.

Work Log:
- User's uploaded video.mp4 never arrived on the server (upload dir empty) — kept the existing cinematic stock video at /public/video.mp4; user can replace the file in the repo directly.
- Restructured to App Router multi-page architecture:
  - `/` home: cinematic video hero (+ CTA buttons) → organized WorkGrid (5 editorial cards, each links to its own page) → AboutTeaser → ContactCTA → Footer
  - `/work/[slug]`: dedicated case study per brand (breadcrumb, giant title, hero film with WATCH PROJECT chip, liquid-glass metadata panel, The Brief + deliverables checklist, asymmetric gallery, Next Project card)
  - `/about`: full studio page (headline, bio, facts, capabilities index, portrait parallax)
  - `/contact`: CTA, details glass panel, 3-step process, socials
- New components: PageShell (shared skeleton, sticky footer, route fade), WorkGrid, CaseStudy, HomePage, AboutPage, AboutTeaser, ContactPage. Rewrote Navbar (next/link routes + active dot via layoutId) and Footer (functional Work/Studio/Concierge columns). Deleted App/BrandIndex/BrandSection/BrandNav/About (superseded).
- Data: added deliverables[] per project + EMAIL export; navLinks now real routes.
- Verified in sandbox: all routes 200, card click → /work/maison-noire (H1/meta/gallery/next verified), mobile 390px overflow 0, sticky footer, no console errors, lint clean (fixed set-state-in-effect + unused eslint-disable).
- Pushed commit eb8f178 to GitHub main.
- Railway deploy saga: old service (0a8b67d3) had NO repo trigger and serviceInstanceDeploy kept rebuilding stale commit b1401fd (image digest reuse); deploymentTriggerCreate failed ("no one in the project has access" — GitHub App not installed on repo). githubRepoDeploy always creates a NEW service → used it to deploy eb8f178, then moved the domain: deleted old custom domain, created a service domain on the new service and renamed it via serviceDomainUpdate (domain must be the FULL "adlene-portfolio-production.up.railway.app") targeting port 8080.
- Cleanup: deleted stale services 0a8b67d3 / 80b4d8a0 (merry-contentment) / 29a9714d (refreshing-growth); renamed live service to "adlene-portfolio". Project now has exactly 1 service.
- Live verification: 8/8 routes 200, live browser click-through (home → Halcyon case study) OK, video streams (206), no page errors.

Stage Summary:
- LIVE (multi-page): https://adlene-portfolio-production.up.railway.app
- Routes: / , /work/{maison-noire|halcyon|obsidian-labs|veloce|atlas-ivy} , /about , /contact
- GitHub: commit eb8f178 on main of adlenebenmechta/adlene-portfolio
- Railway service: b7ca0a2a-d990-4724-912d-dfa4ab42f2c4 (named "adlene-portfolio"), service domain id 2ba856a8-1cc7-4001-b25a-38b788775ffd (targetPort 8080)
- NOTE for future updates: pushes to GitHub do NOT auto-deploy (no trigger possible — GitHub App missing). After pushing, run serviceInstanceDeploy… which rebuilds stale; the working path is `githubRepoDeploy` (creates a NEW service with latest commit) then move/rename the service domain, then delete the old service. Or install the Railway GitHub App on the repo via the Railway dashboard to enable auto-deploy.
- User's real video still needs replacing: overwrite public/video.mp4 in the GitHub repo.

---
Task ID: 3
Agent: Super Z (main agent)
Task: "أريد الفيديو الخاص بي أرفعه حالا بأي طريقة" — enable instant hero-video replacement pipeline. Confirmed (again) the user's uploaded video NEVER arrived on the server (upload/ empty, no recent video files anywhere).

Work Log:
- Confirmed live state: multi-page site healthy, 9/9 routes 200, deployment 89b50942 = GitHub main HEAD.
- Installed gdown (Drive) + yt-dlp (Instagram/YouTube/TikTok/1000+ sites) into ~/.local/bin.
- Wrote scripts/set-hero-video.sh <file-or-url> [--no-deploy]: source resolution (local / Drive / Dropbox / direct URL / yt-dlp), ffprobe validation (fail-safe: never touches public/ on invalid input), web-optimize encode (H.264 high, faststart, max 1920w, fps cap 30, audio stripped, superfast preset for the 2-core sandbox, 3-tier size guard 15→25MB), poster regeneration, git commit/push, Railway redeploy trigger, live verification.
- Wrote scripts/railway-redeploy.sh: PATH A serviceInstanceRedeploy (stale-commit detection via meta.commitHash) → PATH B githubRepoDeploy (new service) + domain move + old service delete + state file scripts/railway.env; flags: --timeout-min N, --trigger-only (build continues server-side), --status.
- Live-tested PATH B end-to-end: deployed 89b50942 to a fresh service, discovered + fixed critical bug (serviceDomainUpdate returns Boolean — the `{ id }` selection made the domain rename silently fail → 404 x-railway-fallback; fixed with no-selection mutation + grep '"serviceDomainUpdate":true' + rename-verification poll), domain restored to adlene-portfolio-production.up.railway.app, old service deleted.
- Sandbox findings: (1) process reaper kills ALL background/detached processes (even setsid) when a tool call ends → long jobs must run inside ONE tool call with timeout 600000ms; (2) CPU is 2-core shared → superfast preset mandatory (~10x realtime at medium); (3) GitHub API needs the token (read from git remote, not stored in scripts).
- Tested: local-file encode path ✓ (valid faststart mp4, fps capped, audio stripped, poster generated), URL download path ✓ (15MB from live site in seconds), invalid-URL rejection ✓ (public/ untouched), --status ✓, both scripts syntax-checked; scripts/ is gitignored → Railway token never reaches GitHub.
- Restored original stock hero video after tests (public/video.mp4 = 15,010,896 bytes, git clean).

Stage Summary:
- Site LIVE & healthy: https://adlene-portfolio-production.up.railway.app (9/9 routes 200)
- One-command video pipeline READY: `bash scripts/set-hero-video.sh <file-or-url>` — waiting only for the user's actual video file/link (never received; user must attach it in chat or send a Drive/Instagram/direct link).
- Current service id: 563da5d1-a09c-4f09-a476-cf28ea6ca2e6, domain id 9135da75-01ec-428c-a37c-bf50f96d9176 (persisted in scripts/railway.env).
- Known-good update procedure: set-hero-video.sh (≈ encode 1-2 min per 30s of 1080p) → push → redeploy PATH B (≈ 4 min build) → verify.

---
Task ID: 4
Agent: Super Z (main agent)
Task: User sent video ("هذا هو الفديو") + requested: remove ALL text over the video and stop covering it (no dark overlay).

Work Log:
- Requested clean hero deployed LIVE: rewrote Hero.tsx to an empty 100svh section (metadata line, headline, description, CTAs, secondary meta, scroll indicator — all removed) and HomePage.tsx CinematicBackground (removed brightness(0.62)/saturate(0.78) filter, black/55 veil, vignette, film grain — video now unfiltered full colour). Kept: navbar (site chrome), soft 26vh gradient seam only where archive content begins, sr-only h1 for SEO.
- Verified locally + live via agent-browser: heroText EMPTY, 0 overlays, videoFilter none, readyState 4 (playing). All routes 200.
- Commit 1c9cd3e pushed; Railway PATH B redeploy: deployment 1aee80d0 SUCCESS on 1c9cd3e; domain verified serving new code.
- Fixed redeploy script bug: PATH B wait_deploy compared against NEW_DEP_ID captured AFTER githubRepoDeploy (the deployment already exists → ID never changes → infinite poll). Now waits for ANY terminal status ("none" sentinel).
- USER'S VIDEO FILE DID NOT ARRIVE: gateway metadata said upload/video.mp4 but the file is not on the filesystem (checked upload/, /home/z, /tmp, root fs; -mmin windows; size filters). Only public/video.mp4 (old stock) exists. Attachment likely failed silently (size limit?).

Stage Summary:
- LIVE clean hero: https://adlene-portfolio-production.up.railway.app — video area has ZERO text, ZERO overlays, full colour.
- Deployment 1aee80d0 (commit 1c9cd3e), service 563da5d1 (unchanged this task), domain intact.
- Video swap ready: `bash scripts/set-hero-video.sh <file-or-url>` (runs encode→push→redeploy→verify; ~6-8 min total on 2-core sandbox).
- BLOCKED on: user's actual video file — must be re-sent in chat or shared via Drive/Instagram/direct link.

---
Task ID: 5
Agent: Super Z (main agent)
Task: User sent WeTransfer link (https://we.tl/t-Zm1B3qw8xZrhVTmm) with his video → publish it as the clean fullscreen hero.

Work Log:
- Downloaded the video via transferwee (stdlib python, github.com/iamleot/transferwee): 6.0MB, 1280x704 @24fps, 10s, h264+aac.
- Ran scripts/set-hero-video.sh /tmp/user-video.mp4: validated → encoded (superfast crf23, faststart, audio stripped, 1280w kept) → 2.6MB hero video + fresh poster from its frames → commit 4686dd44 pushed to GitHub.
- Refactored railway-redeploy.sh into zero-downtime modes: --trigger-only (githubRepoDeploy only; live site untouched), --finalize [--wait] (poll new build → then move domain + delete old service — downtime = seconds), --status (report only), full mode (PATH A → PATH B build-first-then-migrate). State file now tracks NEW_SERVICE_ID.
- Migration executed: new service cb98cd0f build 8b4c960e SUCCESS on 4686dd44 (~70s), domain moved to it, old service 54063406 deleted, live 200.
- Post-swap 404s on some routes + poster were edge propagation lag only — all 9 routes + poster returned 200 within ~20s.
- Live verification: /video.mp4 = 2774640 bytes (exact new encode), readyState 4, paused=false, heroText EMPTY, 0 overlays, filter none. The user's film plays fullscreen, clean and unfiltered.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app — hero is now Adlene's own 10s film, looping fullscreen with zero text and zero overlays, full colour.
- GitHub commit 4686dd44; Railway service cb98cd0f-5731-4292-b537-71716a263dc1, domain dd305d4b-5b0c-4e19-bb06-dd436cacd140.
- Zero-downtime deploy flow proven end-to-end (trigger → finalize).

---
Task ID: 6
Agent: Super Z (main agent)
Task: User requests: (1) seamless reverse loop (forward+reverse playback), (2) higher quality, (3) simple left text "Hi my name is Adlene Benmechta and this is my portfolio" with "my portfolio" in a clickable box → opens another page, (4) remove AB/Adlene Benmechta from navbar; center Work/About/Contact/Let's Work Together.

Work Log:
- Built palindrome hero (scripts/palindrome-hero.sh): one-pass ffmpeg split/trim/reverse/concat — forward frames 0..N-2 + reverse N-1..1 → loop wraps to 0 with zero duplicated frames (no hiccup at extremes). Quality: crf 18 preset slow, native 1280x704@24fps, audio stripped, faststart → 8.2MB / 19.96s (vs previous 2.6MB/10s crf23 superfast — near-transparent quality).
- Hero.tsx rewritten: left-aligned intro text (text-shadow for readability, no veil over the film) + "my portfolio" bordered box (Link → /work, hover invert, ArrowUpRight).
- Navbar.tsx: AB monogram + name removed entirely; Work · About · Contact · Let's Work Together centered as one group (desktop); hamburger centered alone on mobile; mobile menu unchanged.
- New route /work (app/work/page.tsx + WorkIndexPage component): editorial index reusing WorkGrid + ContactCTA. navLinks.Work → /work.
- Deploy saga: palindrome script's encode+commit+push+trigger succeeded but the tool timeout killed the wait; the triggered service 13d71c4e was building d6beabd (video only, no code) → deleted it, committed code (a3af157 = video + all code), triggered fresh (45a040aa), build 4b557921 SUCCESS, domain migrated, old service deleted. Post-swap 404s were edge propagation again — all clear after ~25s.
- Live verified: video.mp4 = 8,163,283 bytes (exact palindrome encode), duration 19.96s, playing; hero text + box → click navigates to /work ("The work, in its own room."); navbar has no logo, centered items; 11/11 routes + poster 200.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app — palindrome hero (8.2MB, seamless loop), left intro text, boxed "my portfolio" → /work, centered minimal navbar.
- GitHub a3af157; service 45a040aa-8212-44a8-b079-eaf635fd722a, domain 6b37d46f-0362-4a78-85d0-4bfa95912f48.
- scripts/palindrome-hero.sh kept for future video swaps of the same style.

---
Task ID: 7
Agent: Super Z (main agent)
Task: User unhappy with hero text: all on one line, small, disliked the font.

Work Log:
- Added Playfair Display (next/font/google — self-hosted at build, italic + weights 400-700) as the editorial display voice; wired --font-serif into the Tailwind v4 theme (globals.css). Helvetica stays for UI/body.
- Hero rebuilt as a stacked editorial composition, explicit lines (never one long line): italic "Hi, my name is" / huge "Adlene Benmechta" (clamp 2.9rem→7rem, Playfair semibold, soft text-shadow) / italic "and this is" / large boxed "my portfolio" (border-2, rounded-2xl, backdrop-blur, hover invert, ArrowUpRight → /work). Staggered blur-line reveals 0.35/0.5/0.68/0.86s.
- Removed the now-duplicate sr-only h1 (hero h1 is a real visible h1).
- Verified locally (Playfair resolved, h1 108.8px desktop / 46.4px mobile, 0 overflow) and live after deploy: font Playfair Display, h1 108.8px, both italic lines, box → /work, video still playing unfiltered, 6/6 routes + video 200.
- Deployed zero-downtime: commit 83ba547, build 0d6e7ce6 SUCCESS, domain migrated, old service deleted, live 200.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app — editorial serif hero live.
- Service 665a3564-48a5-45c8-a85a-4897aa58af37, domain 265518cc-60fb-4baa-b044-4d838e5398aa.

---
Task ID: 8
Agent: Super Z (main agent)
Task: User (Arabic): hero composition — "make it a little higher and a little more to the left".

Work Log:
- Hero.tsx wrapper only: max-w-[1400px]→max-w-[1600px]; left padding cut (pl-5 / md:pl-8 / lg:pl-10, right padding unchanged); added -translate-y-12 (mobile) / md:-translate-y-16 (desktop) lifting the whole stacked composition.
- Effective shift: desktop 1920 ≈ 124px more left, laptop 1440 ≈ 44px; all screens ~48–64px higher. Video, text content, box link untouched.
- Lint clean; commit 273f225 pushed; zero-downtime deploy: build f2b202c4 SUCCESS, domain migrated, old service 665a3564 deleted.
- Live verified: 8/8 routes + /video.mp4 + poster 200; served HTML contains max-w-[1600px] / -translate-y-12 / lg:pl-10.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app — hero text block now sits higher and closer to the left edge.
- GitHub commit 273f225; service 2567964c-cd6c-4dc0-9d4f-e055b7b1d7f0, domain 3ef9be8f-f19f-408f-859f-0f499290ae81.
- Prior UUID-message commits (worklog-only) confirmed harmless — code identical to 83ba547.

---
Task ID: 9
Agent: Super Z (main agent)
Task: User (Arabic): organize the Work section + use the new WeTransfer video (https://we.tl/t-v4GJf7yGAtv4dspR) as its background.

Work Log:
- Downloaded the new film via transferwee: 1920x1080 @25fps, 24s, 5MB h264+aac.
- Built scripts/palindrome-work-video.sh: seamless ping-pong loop (forward 0..598 + reverse 599..1), scaled to 1280x720, crf 20 veryfast, faststart, audio stripped → public/work-video.mp4 (9.3MB, 47.88s, 1198 frames) + poster public/media/work-poster.jpg.
- Sandbox saga: three "timeout" reports were FALSE — encodes actually completed; learned to always verify output files after ffmpeg timeout/-9 reports. Reverse filter RAM (~1.7GB with concat buffering at 1080p) forced stopping the dev server during the first attempts; final encode ran fine at 720p. bash tool kill-reports remain unreliable — verify artifacts, don't trust exit codes.
- Rewrote WorkIndexPage.tsx: WorkFilmBackground (fixed fullscreen looping film, exported) + editorial serif header over the film (( 01 ) — Selected Work / "The work, in its own room." / intro, text-shadow only, no veils) + 26vh gradient seam + ORGANIZED uniform archive: index header row (5 case studies · 2023→2025, hairline rule), 2-column grid with identical cards (16/10 image, then BELOW it: number · industry · year meta row, brand + arrow, tagline — nothing hidden behind hover), 5th card full-width 21/9 to complete the grid. ContactCTA below.
- app/work/page.tsx: background swapped from film-grain to <WorkFilmBackground />.
- Verified locally: video playing (47.88s), 5 cards, card click → /work/maison-noire, desktop overflow 0, lint clean, no console errors.
- Deployed zero-downtime: commit 7367946, build 02f70bad SUCCESS, domain migrated, old service 2567964c deleted.
- Live verified: 11 routes + /video.mp4 + /work-video.mp4 + both posters all 200; live /work plays the palindrome fullscreen, 5 cards, no console errors.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app/work — organized index over Adlene's second film.
- GitHub commit 7367946; service 875633aa-08a5-4fb6-a216-40de4b16ee69, domain 3885e999-7a71-48a8-ac32-7b26b081db68.
- scripts/palindrome-work-video.sh kept for future swaps of the work-page film.

---
Task ID: 10
Agent: Super Z (main agent)
Task: User (Arabic): (1) modern professional transitions between pages, (2) professionally arranged brands on /work, (3) at least a button to return to the menu, (4) remove the unrelated LUMINA footer content.

Work Log:
- PageShell: cinematic route transition — black curtain (fixed, z-[100], pointer-events-none) covers on mount then sweeps up (0.75s, ease [0.76,0,0.24,1]); page content rises in (y 26 + blur 10 → 0, 0.9s, delay 0.14). Replays on every route change (each page mounts its own PageShell).
- WorkIndexPage: replaced uniform card grid with a strictly ordered editorial index — rows sorted newest first (Maison Noire 2025, Obsidian Labs 2025, Halcyon 2024, Veloce 2024, Atlas & Ivy 2023), hairline rules, big brand typography + arrow, industry/year/location meta, spring-following floating image preview on hover-capable pointers (matchMedia gate), inline thumbnails on mobile, hidden image cache warmer.
- Navbar: navLinks now starts with Home (also lands in mobile menu); isActive handles "/" via exact match. CaseStudy breadcrumb now → /work.
- Footer fully rewritten: LUMINA wordmark/svg/cosmic tagline, @GotInGeorgiG credit, "Join the Journey" + 5 placeholder social icons — ALL removed. Now: serif "Adlene Benmechta" + own tagline + mailto link, columns Work/Menu/Connect, bottom "© 2026 Adlene Benmechta — All rights reserved" / "Films · Photography · Identity".
- Fixed Next warning: added data-scroll-behavior="smooth" to <html> so route transitions reset scroll instantly.
- Verified locally + live: transitions curtain sweeps off-screen, sorted rows, Home link present, zero LUMINA strings (curl grep = 0), mobile overflow 0, no console errors.
- Deployed zero-downtime twice (4e35a18 then 9b33d71), domain migrated, old services deleted.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app — curtain transitions, ordered work index, navbar Home, Adlene-owned footer.
- GitHub commit 9b33d71; service d9888e27-ce4c-4888-aa8b-d3d4365ab352, domain bbeac454-15aa-4a7a-a4ed-034c36210aea.
- Instagram/TikTok links omitted from footer until real handles are provided.

---
Task ID: 11
Agent: Super Z (main agent)
Task: User (Arabic): (1) brands organized with a place for their own logo, (2) replace the About image with uploaded file Changing_top_of_person_in_2K_20260927043543.jpg.

Work Log:
- Designed 5 luxury monogram logo SVGs in public/media/logos/ — maison-noire (double seal MN), halcyon (circular H), obsidian-labs (minimal OL), veloce (italic V), atlas-ivy (corner-accent A&I). All white, scalable, replaceable with real logos.
- portfolio-data.ts: added logo: string field to Project interface + all 5 projects.
- WorkIndexPage rows: new grid [logo slot | number+services + brand + tagline | industry/year/location] — logo in a framed 72px rounded square (backdrop-blur, hover border-glow + scale), mobile 56px inline. Desktop row numbers now paired with services line.
- CaseStudy header: brand mark now sits beside industry · location kicker.
- Verified locally + VLM visual QA: alignment precise, professional, no defects. Mobile overflow 0, no console errors.
- Deployed zero-downtime: commit bacd320, domain migrated, old service d9888e27 deleted. Live: all routes 200, 5/5 logos loading.
- ABOUT IMAGE DID NOT ARRIVE: upload/ empty (same silent gateway failure as earlier videos). Told user to send via WeTransfer/Drive link — that path is proven.

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app/work — every brand now has its dedicated logo slot.
- GitHub commit bacd320; service 409063ac-286e-42bd-a6b9-a3605b90ac51, domain 6c34a3b8-8f5e-48ec-b6a9-b16608ba30c1.
- To swap in real logos later: replace the files in public/media/logos/ (keep filenames) — the site picks them up automatically.
- BLOCKED on: user's About portrait image — needs re-send via link.

---
Task ID: 12
Agent: Super Z (main agent)
Task: User sent WeTransfer link (https://we.tl/t-8mEyYeBgR9uaamqs) — "هذه صورة about" — replace the About portrait with his own photo.

Work Log:
- Downloaded via transferwee: JPEG 1792x2400 portrait (2.5MB) — studio headshot, beige jacket, light background.
- scripts/prepare-about-image.py: resized to 1195x1600, subtle cinematic grade (saturation -12%, contrast +7%, brightness -4% — still clearly the same photo), progressive JPEG q86 → 223KB overwriting public/media/portrait-director.jpg (both components reference the same path).
- AboutTeaser: figure aspect 16/10 → 4/5 (portrait photo needs a portrait crop), alt updated. AboutPage: alt updated (aspect already 4/5, near-zero crop).
- Verified locally + VLM visual QA on both pages: face fully visible, professional framing, blends with the dark theme, no layout defects. Lint clean.
- Deployed zero-downtime: commit aead4b5, domain migrated, old service 409063ac deleted. Live portrait 200 (exact new bytes).

Stage Summary:
- LIVE: https://adlene-portfolio-production.up.railway.app/about — Adlene's real portrait now in the About section and home teaser.
- GitHub commit aead4b5; service 10a575a2-bb9a-4447-ac39-1ffb4429ec65, domain 0989e8bf-cefe-4bba-8a52-26d5df8be954.
- WeTransfer path confirmed again as the reliable attachment channel.
