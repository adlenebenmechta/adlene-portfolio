import type { Metadata } from "next";
import { ContactPage } from "@/components/portfolio/ContactPage";
import { PageShell } from "@/components/portfolio/PageShell";

export const metadata: Metadata = {
  title: "Contact — Adlene Benmechta",
  description:
    "Start a project with Adlene Benmechta — creative direction, brand identity, campaigns and digital experiences.",
  openGraph: {
    title: "Contact — Adlene Benmechta",
    description:
      "Have a project in mind? Let's create something worth remembering.",
    type: "website",
  },
};

export default function Contact() {
  return (
    <PageShell background={<div className="film-grain" aria-hidden="true" />}>
      <ContactPage />
    </PageShell>
  );
}
