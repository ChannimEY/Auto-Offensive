"use client";

import { useCallback, useEffect, useState } from "react";
import CICDContent from "./ci-cd-content";
import {
  LeftSidebar,
  RightSidebar,
  type SidebarSection,
  type TocItem,
} from "./ci-cd-sidebar";
import { useLocale } from "next-intl";

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    label: "Overview",
    items: [
      { id: "overview", title: "Introduction" },
      { id: "workflow", title: "CI/CD Workflow" },
      { id: "auth", title: "Authentication" },
      { id: "endpoints", title: "API Endpoints" },
    ],
  },
  {
    label: "Pipeline Flow",
    items: [
      { id: "trigger", title: "Trigger Scan" },
      { id: "status", title: "Job Status" },
      { id: "results", title: "Result Retrieval" },
      { id: "report", title: "Report Download" },
    ],
  },
  {
    label: "Guides",
    items: [
      { id: "pipeline", title: "Pipeline Example" },
      { id: "thresholds", title: "Severity Thresholds" },
      { id: "access", title: "Access Scoping" },
    ],
  },
];

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "workflow", label: "CI/CD Workflow" },
  { id: "auth", label: "Authentication" },
  { id: "endpoints", label: "API Endpoints" },
  { id: "trigger", label: "Triggering a Scan" },
  { id: "status", label: "Job Status" },
  { id: "results", label: "Result Retrieval" },
  { id: "report", label: "Report Download" },
  { id: "pipeline", label: "Pipeline Example" },
  { id: "thresholds", label: "Severity Thresholds" },
  { id: "access", label: "Access Scoping" },
];

const ALL_SECTION_IDS = TOC.map((item) => item.id);

export default function CICDDocument() {
  const [activeId, setActiveId] = useState("overview");
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-90px 0px -45% 0px",
      }
    );

    sections.forEach((section) => {
      if (ALL_SECTION_IDS.includes(section.id)) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#09090B] transition-colors duration-300" style={{ fontFamily: bodyFontFamily }}>
      <div className="mx-auto flex w-full max-w-7xl items-start pt-22">
        <LeftSidebar
          sections={SIDEBAR_SECTIONS}
          activeId={activeId}
          onNavigate={navigate}
        />

        <main className="flex-1 min-w-0">
          <CICDContent />
        </main>

        <RightSidebar toc={TOC} activeId={activeId} onNavigate={navigate} />
      </div>
    </div>
  );
}
