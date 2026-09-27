import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

/** Editorial display serif — the voice of the hero & big statements */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adlene Benmechta — Creative Direction & Brand Identity",
  description:
    "Adlene Benmechta is a creative director and brand strategist crafting visual identities, campaigns, content and digital experiences for brands that want to be remembered.",
  keywords: [
    "creative direction",
    "brand identity",
    "campaign",
    "photography",
    "digital experiences",
    "art direction",
    "Adlene Benmechta",
  ],
  authors: [{ name: "Adlene Benmechta" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Adlene Benmechta — Creative Direction & Brand Identity",
    description:
      "Visual identities, campaigns, content and digital experiences for brands that want to be remembered.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={playfair.variable}
    >
      <body className="antialiased bg-[#050505] text-white">{children}</body>
    </html>
  );
}
