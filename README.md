# Adlene Benmechta — Creative Portfolio

A premium, cinematic personal creative portfolio built with **React + TypeScript**, **Tailwind CSS v4**, **motion/react** and **lucide-react**.

> Creative work for brands that want to be remembered.

## Stack

- **Next.js 16** (App Router, standalone output)
- **TypeScript 5**
- **Tailwind CSS v4**
- **motion/react** — cinematic scroll & hover animation
- **lucide-react** — iconography

## Getting started

```bash
# install
npm install

# develop
npm run dev

# production build (standalone)
npm run build
npm start
```

## Adding your own brands & media

All portfolio content lives in one file:

```
src/lib/portfolio-data.ts
```

- **Add a brand** — append one object to `projects[]`. The brand index, case-study section, media gallery and floating navigation pick it up automatically.
- **Replace media** — drop your videos and images into `public/media/` and update the `src` fields. Videos autoplay muted, loop, pause off-screen and support `poster` fallbacks.
- **Hero background** — replace `public/video.mp4` (and optionally `public/media/hero-poster.jpg`) with your own film.

## Deploying on Railway

The repo ships with a `Dockerfile` and `railway.json`. Railway auto-detects the Dockerfile and builds a lean standalone Next.js image. `PORT` is injected by Railway.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # metadata, fonts, dark shell
│   ├── page.tsx            # route entry → <App />
│   └── globals.css         # Helvetica webfont, liquid glass, film grain
├── components/portfolio/
│   ├── App.tsx             # composition root (cinematic video background)
│   ├── Navbar.tsx           # floating liquid-glass navigation
│   ├── Hero.tsx              # staggered editorial headline + parallax
│   ├── BrandIndex.tsx        # typographic brand list + hover preview
│   ├── BrandSection.tsx      # editorial case-study chapters
│   ├── MediaGallery.tsx      # asymmetric art-directed grids
│   ├── MediaItem.tsx         # image / video frame with clip reveals
│   ├── SmartVideo.tsx        # in-view play / off-screen pause
│   ├── BrandNav.tsx          # floating chapter index (desktop + mobile)
│   ├── About.tsx             # statement, bio, portrait with parallax
│   ├── Capabilities.tsx      # editorial capability list
│   ├── ContactCTA.tsx        # full-width call to action
│   └── Footer.tsx            # liquid-glass footer
└── lib/
    └── portfolio-data.ts   # ← all content lives here
```
