"use client";

import PageHeader from "@/components/vulnerabilities/PageHeader";
import StatsRow from "@/components/vulnerabilities/buttons/StatsRow";
import FindingsTable from "@/components/vulnerabilities/mediumLowCards/Findingstable";
import GuestBanner from "@/components/vulnerabilities/pagination/GuestBanner";
import Sidebar from "@/components/Sidebar";
import { useLocale } from "next-intl";

export default function VulnerabilitiesPage() {
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900" style={{ fontFamily: bodyFontFamily }}>
      {/* Sidebar */}
      <aside className="w-64 hidden md:block border-r border-gray-200 dark:border-gray-800">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          <PageHeader />
          <StatsRow />
          <FindingsTable />

          {/* Fix spacing ABOVE and BELOW banner */}
          <div className="pt-6 pb-16">
            <GuestBanner />
          </div>
        </div>
      </main>
    </div>
  );
}
