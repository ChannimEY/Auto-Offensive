"use client";

import { useState } from "react";
import { Search, ChevronRight, BookOpen, Shield, Zap, Users, CreditCard, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

function FAQAccordion({
  searchQuery,
  faqItems,
  emptyText,
}: {
  searchQuery: string;
  faqItems: FAQItem[];
  emptyText: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFAQs = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-0">
      {filteredFAQs.map((item) => (
        <div key={item.id} className="border-t border-black/[0.14] dark:border-white/[0.14]">
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full bg-transparent border-none cursor-pointer py-5 md:py-7 text-left flex items-center justify-between gap-4"
          >
            <span className="text-base md:text-[1.1rem] font-semibold tracking-[-0.01em] text-[#1A1A1A] dark:text-[#EDEDED]">
              {item.question}
            </span>
            <span
              className={`w-8 h-8 border rounded-full flex items-center justify-center text-xl leading-none shrink-0 transition-all duration-300 ${
                openId === item.id
                  ? "bg-[#00BCA1] border-[#00BCA1] text-white rotate-45"
                  : "border-black/[0.14] dark:border-white/[0.14] text-[#5C5C5C] dark:text-[#9A9A9A]"
              }`}
            >
              +
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openId === item.id ? "block pb-9" : "hidden"}`}>
            {item.answer}
          </div>
        </div>
      ))}
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#5C5C5C] dark:text-[#9A9A9A]">{emptyText}</p>
        </div>
      )}
    </div>
  );
}

export default function HelpCenterContent() {
  const t = useTranslations("helpCenterPage");
  const [activeCategory, setActiveCategory] = useState<string>("getting-started");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "getting-started", label: t("categories.gettingStarted"), icon: BookOpen },
    { id: "account", label: t("categories.account"), icon: Shield },
    { id: "scanning", label: t("categories.scanning"), icon: Zap },
    { id: "team", label: t("categories.team"), icon: Users },
    { id: "billing", label: t("categories.billing"), icon: CreditCard },
    { id: "contact", label: t("categories.contact"), icon: Mail },
  ];

  const answerClass = "text-[20px] leading-[1.9] text-[#5C5C5C] dark:text-[#9A9A9A]";

  const faqItems: FAQItem[] = [
    {
      id: "what-is",
      question: t("faq.whatIs.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.whatIs.p1")}</p>
          <p>{t("faq.whatIs.p2")}</p>
        </div>
      ),
    },
    {
      id: "who-for",
      question: t("faq.whoFor.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.whoFor.intro")}</p>
          <ul className="list-none space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCA1]">→</span>
                {t(`faq.whoFor.items.${i}`)}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "how-start",
      question: t("faq.howStart.question"),
      answer: (
        <div className={answerClass}>
          <ol className="list-decimal list-inside space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i}>{t(`faq.howStart.steps.${i}`)}</li>
            ))}
          </ol>
          <p className="mt-4">{t("faq.howStart.note")}</p>
        </div>
      ),
    },
    {
      id: "legal-scanning",
      question: t("faq.legalScanning.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.legalScanning.p1")}</p>
          <div className="border-l-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 rounded-r-lg">
            <p className="text-amber-800 dark:text-amber-200">{t("faq.legalScanning.warning")}</p>
          </div>
          <p className="mt-4">{t("faq.legalScanning.p2")}</p>
        </div>
      ),
    },
    {
      id: "free-tier",
      question: t("faq.freeTier.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.freeTier.intro")}</p>
          <ul className="space-y-2 mb-4">
            {Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCA1]">→</span>
                {t(`faq.freeTier.items.${i}`)}
              </li>
            ))}
          </ul>
          <p>{t("faq.freeTier.outro")}</p>
        </div>
      ),
    },
    {
      id: "tools-available",
      question: t("faq.toolsAvailable.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.toolsAvailable.intro")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded px-3 py-2 text-[#1A1A1A] dark:text-[#EDEDED]">
                {t(`faq.toolsAvailable.items.${i}`)}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "api-access",
      question: t("faq.apiAccess.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.apiAccess.intro")}</p>
          <ul className="space-y-2 mb-4">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCA1]">→</span>
                {t(`faq.apiAccess.items.${i}`)}
              </li>
            ))}
          </ul>
          <p>{t("faq.apiAccess.outro")}</p>
        </div>
      ),
    },
    {
      id: "data-security",
      question: t("faq.dataSecurity.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.dataSecurity.intro")}</p>
          <ul className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i}>{t(`faq.dataSecurity.items.${i}`)}</li>
            ))}
          </ul>
          <p className="mt-4">{t("faq.dataSecurity.outro")}</p>
        </div>
      ),
    },
    {
      id: "team-collab",
      question: t("faq.teamCollab.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.teamCollab.intro")}</p>
          <ul className="space-y-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCA1]">→</span>
                {t(`faq.teamCollab.items.${i}`)}
              </li>
            ))}
          </ul>
          <p>{t("faq.teamCollab.outro")}</p>
        </div>
      ),
    },
    {
      id: "export-data",
      question: t("faq.exportData.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.exportData.intro")}</p>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {["JSON", "CSV", "PDF"].map((format, i) => (
              <div key={format} className="bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded p-4 text-center">
                <div className="text-[24px] font-bold text-[#00BCA1] mb-1">{format}</div>
                <div className="text-[14px] text-[#9A9A9A]">{t(`faq.exportData.formats.${i}`)}</div>
              </div>
            ))}
          </div>
          <p>{t("faq.exportData.outro")}</p>
        </div>
      ),
    },
    {
      id: "upgrade-plan",
      question: t("faq.upgradePlan.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.upgradePlan.intro")}</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i}>{t(`faq.upgradePlan.steps.${i}`)}</li>
            ))}
          </ol>
          <p>{t("faq.upgradePlan.outro")}</p>
        </div>
      ),
    },
    {
      id: "refund-policy",
      question: t("faq.refundPolicy.question"),
      answer: (
        <div className={answerClass}>
          <p>{t("faq.refundPolicy.p1")}</p>
          <p className="mt-4">{t("faq.refundPolicy.p2")}</p>
          <p className="mt-4">{t("faq.refundPolicy.p3")}</p>
        </div>
      ),
    },
    {
      id: "report-bug",
      question: t("faq.reportBug.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.reportBug.intro")}</p>
          <div className="bg-[#111113] dark:bg-[#1A1A1A] border border-black/[0.14] dark:border-white/[0.14] rounded p-4 mb-4">
            <div className="text-[20px] text-[#00BCA1] font-medium">security@auto-offensive.com</div>
            <div className="text-[16px] text-[#9A9A9A] mt-1">{t("faq.reportBug.response")}</div>
          </div>
          <p>{t("faq.reportBug.include")}</p>
          <ul className="space-y-1 mt-2">
            {Array.from({ length: 3 }, (_, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00BCA1]">→</span>
                {t(`faq.reportBug.items.${i}`)}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "get-support",
      question: t("faq.getSupport.question"),
      answer: (
        <div className={answerClass}>
          <p className="mb-4">{t("faq.getSupport.intro")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded p-4">
                <div className="text-[16px] text-[#00BCA1] font-medium mb-2">{t(`faq.getSupport.cards.${i}.title`)}</div>
                <div className="text-[14px]">{t(`faq.getSupport.cards.${i}.value`)}</div>
                <div className="text-[12px] text-[#9A9A9A] mt-1">{t(`faq.getSupport.cards.${i}.meta`)}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F7F5F0] dark:bg-[#09090B]">
      <div className="max-w-7xl mx-auto" style={{ padding: "clamp(40px,6vw,72px) clamp(24px,6vw,80px)" }}>
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded-lg text-[#1A1A1A] dark:text-[#EDEDED] placeholder:text-[#9A9A9A] text-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#00BCA1] text-white"
                    : "bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] text-[#5C5C5C] dark:text-[#9A9A9A] hover:border-[#00BCA1]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded-xl p-6 md:p-10">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] mb-8 font-sans">{t("faqTitle")}</h2>
          <FAQAccordion searchQuery={searchQuery} faqItems={faqItems} emptyText={t("noResults")} />
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#5C5C5C] dark:text-[#9A9A9A] mb-4">{t("contactPrompt")}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact-us" className="flex items-center gap-2 px-6 py-3 bg-[#00BCA1] text-white rounded-lg font-medium hover:bg-[#00A390] transition-colors">
              {t("contactCta")} <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] text-[#1A1A1A] dark:text-[#EDEDED] rounded-lg font-medium hover:border-[#00BCA1] transition-colors">
              {t("viewDocs")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
