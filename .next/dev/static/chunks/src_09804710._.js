(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/portfolio-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* ────────────────────────────────────────────────────────────────────
   PORTFOLIO DATA
   Add a new brand by appending one object to `projects` below —
   the whole site (brand index, case study, gallery, navigation)
   picks it up automatically.
   Replace any media `src` with your own files in /public/media.
   ──────────────────────────────────────────────────────────────────── */ __turbopack_context__.s([
    "EMAIL",
    ()=>EMAIL,
    "capabilities",
    ()=>capabilities,
    "navLinks",
    ()=>navLinks,
    "projects",
    ()=>projects
]);
const projects = [
    {
        id: "maison-noire",
        index: "01",
        brand: "Maison Noire",
        shortName: "Noire",
        logo: "/media/logos/maison-noire.svg",
        tagline: "Parisian couture, reimagined for a new generation.",
        industry: "Fashion & Luxury",
        location: "Paris, FR",
        year: "2025",
        services: [
            "Creative Direction",
            "Campaign",
            "Photography",
            "Social Content"
        ],
        role: "Creative Director",
        description: "Developed an autumn campaign designed to reintroduce the house to a younger international audience. The visual language pairs the brand's couture heritage with a raw, nocturnal Paris — deep blacks, sculptural silhouettes and street-cast energy. Every frame was built to feel like the beginning of a film rather than the end of a lookbook.",
        deliverables: [
            "60-second campaign film — NOIRE/SS25",
            "18 campaign photographs — full key visual set",
            "Social content system — 40+ assets",
            "Campaign photography book — 48 pages"
        ],
        preview: {
            type: "image",
            src: "/media/fashion-portrait-01.jpg",
            alt: "Maison Noire campaign — portrait in black couture"
        },
        media: [
            {
                type: "video",
                src: "/video.mp4",
                poster: "/media/hero-poster.jpg",
                alt: "Maison Noire — NOIRE/SS25 campaign film",
                label: "Campaign Film — NOIRE/SS25",
                span: "full"
            },
            {
                type: "image",
                src: "/media/fashion-portrait-01.jpg",
                alt: "Campaign portrait — draped black couture",
                span: "half-tall"
            },
            {
                type: "image",
                src: "/media/fashion-wide.jpg",
                alt: "Editorial still — studio lighting study",
                span: "half"
            },
            {
                type: "image",
                src: "/media/fashion-hero.png",
                alt: "Key visual — sculptural silhouette",
                span: "half"
            },
            {
                type: "image",
                src: "/media/backstage-portrait.jpg",
                alt: "Backstage — fitting before the show",
                span: "half-tall"
            },
            {
                type: "image",
                src: "/media/fashion-alt.jpg",
                alt: "Campaign wide shot — night atmosphere",
                label: "Social Content — Key Frames",
                span: "wide"
            },
            {
                type: "image",
                src: "/media/street-night.jpg",
                alt: "Street content — Paris after dark",
                span: "third"
            },
            {
                type: "image",
                src: "/media/street-square.jpg",
                alt: "Street content — detail study",
                span: "third"
            },
            {
                type: "image",
                src: "/media/street-urban.jpg",
                alt: "Street content — urban texture",
                span: "third"
            },
            {
                type: "image",
                src: "/media/backstage-prep.jpg",
                alt: "Behind the scenes — campaign production",
                label: "Behind the Scenes",
                span: "wide"
            }
        ]
    },
    {
        id: "halcyon",
        index: "02",
        brand: "Halcyon",
        shortName: "Halcyon",
        logo: "/media/logos/halcyon.svg",
        tagline: "A quiet language for slow hospitality.",
        industry: "Hospitality",
        location: "Geneva, CH",
        year: "2024",
        services: [
            "Brand Identity",
            "Art Direction",
            "Photography",
            "Content"
        ],
        role: "Creative Director & Brand Strategist",
        description: "A complete identity and content system for a collection of boutique hotels moving away from decor-led luxury toward atmosphere-led hospitality. We built a restrained visual world — warm low light, honest materials, and rooms photographed as they are meant to be felt. The campaign rolled out across print, digital and in-house touchpoints in fourteen properties.",
        deliverables: [
            "Brand identity & art direction guidelines",
            "Brand film — The Quiet Hours",
            "Print campaign — rolled out in 14 properties",
            "Content system & photography library"
        ],
        preview: {
            type: "image",
            src: "/media/hotel-lobby.jpg",
            alt: "Halcyon — lobby in warm evening light"
        },
        media: [
            {
                type: "video",
                src: "/media/halcyon-film.mp4",
                poster: "/media/halcyon-film-poster.jpg",
                alt: "Halcyon — brand film, slow reveal of the atrium",
                label: "Brand Film — The Quiet Hours",
                span: "full"
            },
            {
                type: "image",
                src: "/media/hotel-suite.jpg",
                alt: "Signature suite — morning light",
                span: "half-tall"
            },
            {
                type: "image",
                src: "/media/hotel-lobby.jpg",
                alt: "Lobby — warm evening atmosphere",
                span: "half"
            },
            {
                type: "image",
                src: "/media/hotel-restaurant.jpg",
                alt: "Restaurant — editorial still life",
                span: "third"
            },
            {
                type: "image",
                src: "/media/hotel-detail.jpg",
                alt: "Interior detail — material study",
                span: "third"
            },
            {
                type: "image",
                src: "/media/hotel-atrium.jpg",
                alt: "Atrium — architectural composition",
                span: "third"
            },
            {
                type: "image",
                src: "/media/hotel-wide.jpg",
                alt: "Grand corridor — campaign key visual",
                label: "Print Campaign — SS24",
                span: "wide"
            }
        ]
    },
    {
        id: "obsidian-labs",
        index: "03",
        brand: "Obsidian Labs",
        shortName: "Obsidian",
        logo: "/media/logos/obsidian-labs.svg",
        tagline: "Making deep tech feel inevitable.",
        industry: "Technology",
        location: "Berlin, DE",
        year: "2025",
        services: [
            "Creative Direction",
            "Brand Identity",
            "Digital Experience",
            "Film"
        ],
        role: "Creative Director",
        description: "Positioning and full creative direction for a research-driven technology house entering the consumer market. The identity is deliberately silent: monochrome surfaces, generous negative space and product imagery treated like sculpture. A launch film and modular design system carried the brand from landing page to keynote stage without a single stock visual.",
        deliverables: [
            "Positioning & brand narrative",
            "Complete visual identity system",
            "Launch film — Silent Machines",
            "Keynote & digital launch visuals"
        ],
        preview: {
            type: "image",
            src: "/media/tech-detail-01.webp",
            alt: "Obsidian Labs — product on dark surface"
        },
        media: [
            {
                type: "video",
                src: "/media/film-noir-texture.mp4",
                poster: "/media/film-noir-poster.jpg",
                alt: "Obsidian Labs — launch film, Silent Machines",
                label: "Launch Film — Silent Machines",
                span: "full"
            },
            {
                type: "image",
                src: "/media/tech-wide.jpg",
                alt: "Hero visual — device in controlled darkness",
                span: "half"
            },
            {
                type: "image",
                src: "/media/tech-product.jpg",
                alt: "Product study — object as sculpture",
                span: "half"
            },
            {
                type: "image",
                src: "/media/tech-panorama.jpg",
                alt: "Panoramic key visual — edge lighting",
                label: "Launch Key Visuals",
                span: "wide"
            },
            {
                type: "image",
                src: "/media/tech-detail-01.webp",
                alt: "Detail macro — material texture",
                span: "third"
            },
            {
                type: "image",
                src: "/media/tech-detail-02.jpg",
                alt: "Detail macro — form study",
                span: "third"
            },
            {
                type: "image",
                src: "/media/tech-ambient.webp",
                alt: "Ambient application — environment shot",
                span: "third"
            }
        ]
    },
    {
        id: "veloce",
        index: "04",
        brand: "Veloce",
        shortName: "Veloce",
        logo: "/media/logos/veloce.svg",
        tagline: "Performance, photographed at night.",
        industry: "Automotive",
        location: "Turin, IT",
        year: "2024",
        services: [
            "Campaign",
            "Film",
            "Photography",
            "Social Content"
        ],
        role: "Creative Director",
        description: "A night-drive campaign for a performance marque that wanted to trade daylight gloss for cinematic realism. Shot over three nights in Turin with available light and a single rigged car, the imagery leans on reflection, speed and restraint. The launch content outperformed every benchmark in the brand's previous campaign history.",
        deliverables: [
            "Campaign film — Night Drive",
            "Key visual set — Asfalt",
            "12 campaign photographs",
            "Social launch kit — teaser & rollout"
        ],
        preview: {
            type: "image",
            src: "/media/auto-front.jpg",
            alt: "Veloce — front grille in night light"
        },
        media: [
            {
                type: "video",
                src: "/media/veloce-film.mp4",
                poster: "/media/veloce-film-poster.jpg",
                alt: "Veloce — night drive film",
                label: "Campaign Film — Night Drive",
                span: "full"
            },
            {
                type: "image",
                src: "/media/auto-portrait-01.png",
                alt: "Vertical campaign visual — street portrait",
                span: "half-tall"
            },
            {
                type: "image",
                src: "/media/auto-front.jpg",
                alt: "Front composition — signature night light",
                span: "half"
            },
            {
                type: "image",
                src: "/media/auto-curve.jpg",
                alt: "Cornering study — motion and reflection",
                label: "Key Visuals — Asfalt",
                span: "wide"
            },
            {
                type: "image",
                src: "/media/auto-night.png",
                alt: "Night environment — city traffic",
                span: "third"
            },
            {
                type: "image",
                src: "/media/auto-portrait-02.jpg",
                alt: "Detail — light signature",
                span: "third"
            }
        ]
    },
    {
        id: "atlas-ivy",
        index: "05",
        brand: "Atlas & Ivy",
        shortName: "Atlas",
        logo: "/media/logos/atlas-ivy.svg",
        tagline: "Objects of quiet ritual.",
        industry: "Lifestyle & Fragrance",
        location: "Copenhagen, DK",
        year: "2023",
        services: [
            "Brand Identity",
            "Packaging",
            "Campaign",
            "Social Content"
        ],
        role: "Creative Director",
        description: "Naming, identity and launch campaign for a slow-living fragrance house. The world we built is deliberately still — stone, smoke and low northern light — so the product becomes the only moving element. Art direction extended across packaging, unboxing ritual and a social system built on negative space rather than product repetition.",
        deliverables: [
            "Naming & brand identity",
            "Packaging & unboxing system",
            "Launch campaign — First Light",
            "Social system — Rituals"
        ],
        preview: {
            type: "image",
            src: "/media/fragrance-detail.jpg",
            alt: "Atlas & Ivy — bottle detail"
        },
        media: [
            {
                type: "image",
                src: "/media/fragrance-hero.jpg",
                alt: "Hero still — bottle in stone landscape",
                label: "Launch Campaign — First Light",
                span: "half-tall"
            },
            {
                type: "image",
                src: "/media/fragrance-still.jpg",
                alt: "Still life — morning ritual",
                span: "half"
            },
            {
                type: "image",
                src: "/media/fragrance-campaign.jpg",
                alt: "Campaign key visual — wide composition",
                span: "wide"
            },
            {
                type: "image",
                src: "/media/fragrance-portrait.jpg",
                alt: "Product portrait — vertical crop",
                span: "portrait"
            },
            {
                type: "image",
                src: "/media/fragrance-detail.jpg",
                alt: "Detail macro — cap and label",
                span: "portrait"
            },
            {
                type: "image",
                src: "/media/fragrance-wide.jpg",
                alt: "Environment — northern light interior",
                label: "Social System — Rituals",
                span: "wide"
            }
        ]
    }
];
const capabilities = [
    {
        index: "01",
        title: "Creative Direction",
        note: "Vision, world-building & art direction from concept to final frame"
    },
    {
        index: "02",
        title: "Brand Identity",
        note: "Naming, identity systems, typography & visual languages"
    },
    {
        index: "03",
        title: "Campaign Development",
        note: "Seasonal & launch campaigns across film, photo and digital"
    },
    {
        index: "04",
        title: "Art Direction",
        note: "Set design, casting direction & photographic language"
    },
    {
        index: "05",
        title: "Photography & Video",
        note: "Editorial, product and documentary storytelling"
    },
    {
        index: "06",
        title: "Social Content",
        note: "Content systems built for rhythm, not volume"
    },
    {
        index: "07",
        title: "Digital Experiences",
        note: "Websites and interactive worlds with editorial pacing"
    },
    {
        index: "08",
        title: "Creative Strategy",
        note: "Positioning, narrative and brand architecture"
    }
];
const navLinks = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Work",
        href: "/work"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];
const EMAIL = "hello@adlenebenmechta.com";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EASE",
    ()=>EASE,
    "Reveal",
    ()=>Reveal,
    "SectionLabel",
    ()=>SectionLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
"use client";
;
;
const EASE = [
    0.16,
    1,
    0.3,
    1
];
function Reveal({ children, className, delay = 0, y = 32, once = true, amount = 0.3, variant = "up" }) {
    if (variant === "clip") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
            className: className,
            initial: {
                opacity: 0,
                clipPath: "inset(10% 8% 10% 8%)",
                scale: 1.05
            },
            whileInView: {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1
            },
            viewport: {
                once,
                amount
            },
            transition: {
                duration: 1.3,
                delay,
                ease: EASE
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/shared.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
        className: className,
        initial: {
            opacity: 0,
            y,
            filter: "blur(10px)"
        },
        whileInView: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        },
        viewport: {
            once,
            amount
        },
        transition: {
            duration: 1.1,
            delay,
            ease: EASE
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/shared.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = Reveal;
function SectionLabel({ index, children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
            y: 14,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-[11px]",
                children: [
                    index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tabular-nums text-white/25",
                        children: [
                            "( ",
                            index,
                            " )"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/shared.tsx",
                        lineNumber: 69,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        className: "h-px w-10 bg-white/20"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/shared.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/shared.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/shared.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/shared.tsx",
            lineNumber: 66,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/shared.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_c1 = SectionLabel;
var _c, _c1;
__turbopack_context__.k.register(_c, "Reveal");
__turbopack_context__.k.register(_c1, "SectionLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/portfolio-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Navbar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>setScrolled(window.scrollY > 48)
            }["Navbar.useEffect.onScroll"];
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    const isActive = (href)=>href === "/" ? pathname === "/" : pathname.startsWith(href);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].header, {
        initial: {
            y: -72,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        transition: {
            duration: 1.1,
            delay: 0.25,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
        },
        className: "fixed inset-x-4 top-4 z-50 md:top-6 md:inset-x-6 lg:inset-x-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].nav, {
                "aria-label": "Primary navigation",
                animate: {
                    backdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
                    WebkitBackdropFilter: scrolled ? "blur(16px)" : "blur(4px)",
                    backgroundColor: scrolled ? "rgba(255, 255, 255, 0.055)" : "rgba(255, 255, 255, 0.01)"
                },
                transition: {
                    duration: 0.6,
                    ease: "easeOut"
                },
                className: "liquid-glass flex items-center justify-center gap-7 rounded-full px-6 py-3 md:gap-10 md:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] md:flex",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navLinks"].map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: link.href,
                                    "aria-current": isActive(link.href) ? "page" : undefined,
                                    className: `relative transition-colors duration-300 focus-visible:outline-none ${isActive(link.href) ? "text-white" : "text-white/55 hover:text-white"}`,
                                    children: [
                                        link.label,
                                        isActive(link.href) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].span, {
                                            layoutId: "nav-dot",
                                            transition: {
                                                duration: 0.5,
                                                ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
                                            },
                                            className: "absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                            lineNumber: 64,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this)
                            }, link.href, false, {
                                fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Navbar.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/contact",
                        className: "hidden items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:inline-flex",
                        children: [
                            "Let's Work Together",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                size: 12,
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/Navbar.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setOpen((v)=>!v),
                        "aria-expanded": open,
                        "aria-label": open ? "Close menu" : "Open menu",
                        className: "grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-white/40 md:hidden",
                        children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16,
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/Navbar.tsx",
                            lineNumber: 92,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            size: 16,
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/Navbar.tsx",
                            lineNumber: 92,
                            columnNumber: 56
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Navbar.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/Navbar.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: -12,
                        filter: "blur(8px)"
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    },
                    exit: {
                        opacity: 0,
                        y: -12,
                        filter: "blur(8px)"
                    },
                    transition: {
                        duration: 0.5,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
                    },
                    className: "liquid-glass mt-2 rounded-3xl p-6 md:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "flex flex-col divide-y divide-white/10",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["navLinks"].map((link, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].li, {
                                    initial: {
                                        opacity: 0,
                                        x: -10
                                    },
                                    animate: {
                                        opacity: 1,
                                        x: 0
                                    },
                                    transition: {
                                        delay: 0.08 * i + 0.1,
                                        duration: 0.5,
                                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        onClick: ()=>setOpen(false),
                                        className: "flex items-baseline justify-between py-4 text-lg font-medium tracking-tight text-white/85 transition-colors hover:text-white",
                                        children: [
                                            link.label,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] tabular-nums text-white/30",
                                                children: [
                                                    "0",
                                                    i + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                                lineNumber: 121,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                        lineNumber: 115,
                                        columnNumber: 19
                                    }, this)
                                }, link.href, false, {
                                    fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                    lineNumber: 109,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/Navbar.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            onClick: ()=>setOpen(false),
                            className: "mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-[11px] uppercase tracking-[0.18em] text-black",
                            children: [
                                "Let's Work Together",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                    size: 13,
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/portfolio/Navbar.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/portfolio/Navbar.tsx",
                            lineNumber: 128,
                            columnNumber: 13
                        }, this)
                    ]
                }, "mobile-menu", true, {
                    fileName: "[project]/src/components/portfolio/Navbar.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/Navbar.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/portfolio/Navbar.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(Navbar, "Ys1CUbZf0CXmWzanstDWde8YPrI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/portfolio-data.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const MENU_LINKS = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Selected Work",
        href: "/work"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Contact",
        href: "/contact"
    }
];
const CONNECT_LINKS = [
    {
        label: "Start a Project",
        href: "/contact"
    },
    {
        label: "Email",
        href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMAIL"]}`
    }
];
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-10 w-full px-4 pb-10 sm:px-6 md:px-10 lg:px-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[1400px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].footer, {
                initial: {
                    opacity: 0,
                    y: 40
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 1,
                    delay: 0.35,
                    ease: "easeOut"
                },
                className: "liquid-glass w-full rounded-3xl p-6 mt-32 text-white/70 md:mt-48 md:p-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12 mb-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-serif text-2xl font-medium tracking-[-0.01em] text-white md:text-[2rem]",
                                        children: "Adlene Benmechta"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 max-w-sm text-sm leading-relaxed text-white/60",
                                        children: "Campaign films, photography and identities — a portfolio of selected work, made with patience and light."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMAIL"]}`,
                                        className: "group mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMAIL"],
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                size: 12,
                                                "aria-hidden": "true",
                                                className: "transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 49,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                lineNumber: 36,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        "aria-label": "Work",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "mb-4 text-sm font-medium uppercase tracking-wider text-white",
                                                children: "Work"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 60,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2 text-xs",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"].map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: `/work/${project.id}`,
                                                            className: "text-white/60 transition-colors hover:text-white",
                                                            children: project.brand
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                            lineNumber: 66,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, project.id, false, {
                                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        "aria-label": "Menu",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "mb-4 text-sm font-medium uppercase tracking-wider text-white",
                                                children: "Menu"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2 text-xs",
                                                children: MENU_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: link.href,
                                                            className: "text-white/60 transition-colors hover:text-white",
                                                            children: link.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, link.label, false, {
                                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        "aria-label": "Connect",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "mb-4 text-sm font-medium uppercase tracking-wider text-white",
                                                children: "Connect"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2 text-xs",
                                                children: CONNECT_LINKS.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: link.href,
                                                            className: "text-white/60 transition-colors hover:text-white",
                                                            children: link.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                            lineNumber: 102,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, link.label, false, {
                                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-white/40",
                                children: "© 2026 Adlene Benmechta — All rights reserved"
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] uppercase tracking-[0.2em] text-white/30",
                                children: "Films · Photography · Identity"
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/Footer.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/Footer.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/Footer.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/Footer.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/Footer.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/PageShell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PageShell",
    ()=>PageShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
/** curtain wipe ease — decisive start, soft landing */ const CURTAIN_EASE = [
    0.76,
    0,
    0.24,
    1
];
function PageShell({ children, background }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$MotionConfig$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfig"], {
        reducedMotion: "user",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex min-h-screen w-full flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white",
            children: [
                background,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    "aria-hidden": "true",
                    initial: {
                        y: 0
                    },
                    animate: {
                        y: "-100%"
                    },
                    transition: {
                        duration: 0.75,
                        ease: CURTAIN_EASE
                    },
                    className: "pointer-events-none fixed inset-0 z-[100] bg-[#050505]"
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/PageShell.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                    fileName: "[project]/src/components/portfolio/PageShell.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].main, {
                    initial: {
                        opacity: 0,
                        y: 26,
                        filter: "blur(10px)"
                    },
                    animate: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)"
                    },
                    transition: {
                        duration: 0.9,
                        delay: 0.14,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
                    },
                    className: "relative z-10 flex w-full flex-1 flex-col items-center",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/PageShell.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/src/components/portfolio/PageShell.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/portfolio/PageShell.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/PageShell.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = PageShell;
var _c;
__turbopack_context__.k.register(_c, "PageShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/Hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hero",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
/** staggered line reveal */ const lineIn = (delay)=>({
        initial: {
            opacity: 0,
            y: 42,
            filter: "blur(10px)"
        },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        },
        transition: {
            duration: 1.1,
            delay,
            ease: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EASE"]
        }
    });
function Hero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "top",
        "aria-label": "Introduction",
        className: "relative z-10 flex min-h-svh w-full items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto w-full max-w-[1600px] -translate-y-12 pl-5 pr-6 pb-24 pt-24 md:-translate-y-16 md:pl-8 md:pr-10 md:pb-28 md:pt-28 lg:pl-10 lg:pr-16",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl font-serif",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].p, {
                        ...lineIn(0.35),
                        className: "text-xl italic text-white/85 md:text-2xl",
                        style: {
                            textShadow: "0 2px 24px rgba(0,0,0,0.55)"
                        },
                        children: "Hi, my name is"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Hero.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].h1, {
                        ...lineIn(0.5),
                        className: "mt-3 text-[clamp(2.9rem,8.5vw,7rem)] font-semibold leading-[0.98] tracking-[-0.015em] text-white",
                        style: {
                            textShadow: "0 4px 40px rgba(0,0,0,0.55)"
                        },
                        children: "Adlene Benmechta"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Hero.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].p, {
                        ...lineIn(0.68),
                        className: "mt-3 text-xl italic text-white/85 md:text-2xl",
                        style: {
                            textShadow: "0 2px 24px rgba(0,0,0,0.55)"
                        },
                        children: "and this is"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Hero.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                        ...lineIn(0.86),
                        className: "mt-8 md:mt-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/work",
                            className: "group inline-flex items-center gap-3 rounded-2xl border-2 border-white/70 bg-black/25 px-7 py-4 text-2xl font-medium text-white backdrop-blur-md transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:gap-4 md:px-9 md:py-5 md:text-4xl",
                            children: [
                                "my portfolio",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                    size: 30,
                                    "aria-hidden": "true",
                                    className: "transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/portfolio/Hero.tsx",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/portfolio/Hero.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/Hero.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/Hero.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/Hero.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/Hero.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/WorkGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkGrid",
    ()=>WorkGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/portfolio-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
/** editorial layout rhythm per row of the index */ const LAYOUT = [
    {
        span: "md:col-span-7",
        aspect: "md:aspect-[16/10]"
    },
    {
        span: "md:col-span-5",
        aspect: "md:aspect-[16/10]"
    },
    {
        span: "md:col-span-5",
        aspect: "md:aspect-[16/10]"
    },
    {
        span: "md:col-span-7",
        aspect: "md:aspect-[16/10]"
    },
    {
        span: "md:col-span-12",
        aspect: "md:aspect-[21/9]"
    }
];
function WorkCard({ project, position }) {
    const layout = LAYOUT[position % LAYOUT.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
        delay: 0.05 * (position % 2),
        y: 28,
        className: `aspect-[4/3] ${layout.span} ${layout.aspect}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: `/work/${project.id}`,
            className: "group relative block h-full w-full outline-none focus-visible:opacity-80",
            "aria-label": `Open the ${project.brand} case study`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                className: "relative h-full w-full overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: project.preview.src,
                        alt: project.preview.alt,
                        loading: position < 2 ? "eager" : "lazy",
                        decoding: "async",
                        className: "absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-0 flex items-start justify-between p-4 md:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[10px] tabular-nums tracking-[0.2em] text-white/75 backdrop-blur-md",
                                children: project.index
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md",
                                children: project.industry
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] uppercase tracking-[0.26em] text-white/50 md:text-[10px]",
                                children: [
                                    project.year,
                                    " — ",
                                    project.location,
                                    " — ",
                                    project.services.slice(0, 2).join(" · ")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-end justify-between gap-x-6 gap-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-medium leading-none tracking-[-0.02em] text-white transition-transform duration-700 ease-out group-hover:-translate-y-0.5 sm:text-3xl md:text-4xl",
                                        children: project.brand
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].span, {
                                        className: "flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 md:text-[10px]",
                                        children: [
                                            "View Case Study",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                size: 11,
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-md text-[12px] leading-relaxed text-white/55 md:text-[13px]",
                                children: project.tagline
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = WorkCard;
function WorkGrid() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "work",
        "aria-label": "Selected work",
        className: "relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 pt-24 md:px-10 md:pt-32 lg:px-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionLabel"], {
                index: "01",
                children: "Selected Work"
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-7 flex flex-wrap items-end justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        delay: 0.05,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl",
                            children: "Brands I've had the opportunity to work with."
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        delay: 0.12,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] uppercase tracking-[0.26em] text-white/35 md:text-[11px]",
                            children: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"].length,
                                " case studies — 2023 → 2025"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-5",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$portfolio$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["projects"].map((project, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WorkCard, {
                        project: project,
                        position: i
                    }, project.id, false, {
                        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/portfolio/WorkGrid.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c1 = WorkGrid;
var _c, _c1;
__turbopack_context__.k.register(_c, "WorkCard");
__turbopack_context__.k.register(_c1, "WorkGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/AboutTeaser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AboutTeaser",
    ()=>AboutTeaser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function AboutTeaser() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "About Adlene Benmechta",
        className: "relative z-10 mx-auto w-full max-w-[1400px] border-t border-white/[0.08] px-6 py-24 md:px-10 md:py-36 lg:px-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid items-center gap-12 md:grid-cols-12 md:gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "order-first md:order-last md:col-span-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                        variant: "clip",
                        amount: 0.2,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                            className: "group relative aspect-[4/5] overflow-hidden rounded-lg bg-white/[0.03] md:rounded-xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/media/portrait-director.jpg",
                                    alt: "Adlene Benmechta — creative director, portrait",
                                    loading: "lazy",
                                    decoding: "async",
                                    className: "h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                            lineNumber: 17,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:col-span-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionLabel"], {
                            index: "02",
                            children: "About"
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.05,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-7 max-w-2xl text-[1.75rem] font-medium leading-[1.15] tracking-[-0.015em] text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
                                children: "I work at the intersection of strategy, culture and visual storytelling."
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.12,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-7 max-w-xl text-[15px] leading-[1.9] text-white/60 md:text-base",
                                children: "I'm Adlene Benmechta — a creative director and brand strategist based between Algiers and Europe. For the past eight years I've helped fashion houses, hotels, technology companies and lifestyle brands define how they look, speak and are remembered."
                            }, void 0, false, {
                                fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                            delay: 0.18,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                className: "group mt-9 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-white/85 transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:text-[11px]",
                                children: [
                                    "More About Me",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        size: 13,
                                        "aria-hidden": "true",
                                        className: "transition-transform duration-500 group-hover:rotate-45"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/AboutTeaser.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = AboutTeaser;
var _c;
__turbopack_context__.k.register(_c, "AboutTeaser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/ContactCTA.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContactCTA",
    ()=>ContactCTA
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/shared.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function ContactCTA() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "contact",
        "aria-label": "Contact",
        className: "relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center border-t border-white/[0.08] px-6 py-28 text-center md:px-10 md:py-44 lg:px-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionLabel"], {
                index: "04",
                className: "flex w-full justify-center",
                children: "Contact"
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                delay: 0.05,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mt-8 text-4xl font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-6xl md:text-7xl",
                    children: "Have a project in mind?"
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                delay: 0.12,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-7 max-w-md text-balance text-base leading-relaxed text-white/55 md:text-lg",
                    children: "Let's create something worth remembering."
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                delay: 0.2,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/contact",
                    className: "group mt-14 inline-flex items-center gap-4 rounded-full border border-white/25 px-9 py-5 text-[11px] uppercase tracking-[0.22em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black md:px-12 md:py-6 md:text-xs",
                    children: [
                        "Start a Project",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                            size: 17,
                            "aria-hidden": "true",
                            className: "transition-transform duration-500 group-hover:translate-x-1.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$shared$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reveal"], {
                delay: 0.28,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-16 text-[10px] uppercase tracking-[0.26em] text-white/30 md:text-[11px]",
                    children: "hello@adlenebenmechta.com — Algiers · Worldwide"
                }, void 0, false, {
                    fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/portfolio/ContactCTA.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = ContactCTA;
var _c;
__turbopack_context__.k.register(_c, "ContactCTA");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/portfolio/HomePage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomePage",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$PageShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/PageShell.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/Hero.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$WorkGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/WorkGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$AboutTeaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/AboutTeaser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$ContactCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/portfolio/ContactCTA.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$PageShell$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageShell"], {
        background: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CinematicBackground, {}, void 0, false, {
            fileName: "[project]/src/components/portfolio/HomePage.tsx",
            lineNumber: 19,
            columnNumber: 28
        }, void 0),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$Hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hero"], {}, void 0, false, {
                fileName: "[project]/src/components/portfolio/HomePage.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex w-full flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "h-[26vh] w-full bg-gradient-to-b from-transparent via-[#05050599] to-[#050505]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/portfolio/HomePage.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full flex-col items-center bg-[#050505]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$WorkGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkGrid"], {}, void 0, false, {
                                fileName: "[project]/src/components/portfolio/HomePage.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$AboutTeaser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AboutTeaser"], {}, void 0, false, {
                                fileName: "[project]/src/components/portfolio/HomePage.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$portfolio$2f$ContactCTA$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContactCTA"], {}, void 0, false, {
                                fileName: "[project]/src/components/portfolio/HomePage.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/portfolio/HomePage.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/portfolio/HomePage.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/portfolio/HomePage.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = HomePage;
/**
 * Fixed looping film background — full colour, unfiltered, uncovered.
 * No brightness filter, no dark veil, no vignette, no grain:
 * the video is shown exactly as the filmmaker made it.
 */ function CinematicBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
        className: "fixed inset-0 z-[0] h-full w-full object-cover",
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        poster: "/media/hero-poster.jpg",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
            src: "/video.mp4",
            type: "video/mp4"
        }, void 0, false, {
            fileName: "[project]/src/components/portfolio/HomePage.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/portfolio/HomePage.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c1 = CinematicBackground;
var _c, _c1;
__turbopack_context__.k.register(_c, "HomePage");
__turbopack_context__.k.register(_c1, "CinematicBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_09804710._.js.map