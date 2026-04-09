"use client";

import Sidebar from "@/components/pages/resources/cli/cli-sidebar";
import Content from "@/components/pages/resources/cli/cli-content";
import { useLocale } from "next-intl";

export default function CliDocument() {
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";

  return (
    <div className="cli-doc-page min-h-screen bg-[#F7F5F0] dark:bg-[#09090B] transition-colors duration-300" style={{ fontFamily: bodyFontFamily }}>
      {/* ── Three-col layout ── */}
      <div className="mx-auto flex w-full max-w-7xl items-start pt-22">
        {/* Left sidebar */}
        <Sidebar />

        {/* Content + Right TOC (TOC is rendered inside Content) */}
        <Content />
      </div>
    </div>
  );
}
