import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-svh bg-[#0a0a0a] font-sans text-white antialiased selection:bg-white/20">
      <AdminApp />
    </div>
  );
}
