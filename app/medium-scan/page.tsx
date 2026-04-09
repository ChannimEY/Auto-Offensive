"use client";

import HeaderSection from "@/components/mediumscan/HeaderSection";
import ScanBox from "@/components/mediumscan/ScanBox";
import ToolLibrary from "@/components/mediumscan/ToolLibrary";
import Features from "@/components/mediumscan/Features";
import RecentScans from "@/components/mediumscan/RecentScans";
import Sidebar from "@/components/Sidebar";
import { useLocale } from "next-intl";

export default function MediumScanPage() {
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";

  return (
    <div className="flex min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors" style={{ fontFamily: bodyFontFamily }}>
      {/* Sidebar */}
      <aside className="w-64 hidden md:block border-r border-gray-200 dark:border-gray-900">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl w-auto mx-auto px-6 py-10 space-y-10">
          <HeaderSection />
          <ScanBox />
          <ToolLibrary />
          <Features />
          <RecentScans />
        </div>
      </main>
    </div>
  );
}
