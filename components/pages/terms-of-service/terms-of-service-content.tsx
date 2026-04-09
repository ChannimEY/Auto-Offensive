"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

interface AccordionItem {
  id: string;
  index: string;
  title: string;
  content: React.ReactNode;
}

function AccItem({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div id={item.id} className="border-t border-black/[0.14] dark:border-white/[0.14]">
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full bg-transparent border-none cursor-pointer py-5 md:py-7 grid items-center text-left text-[#1A1A1A] dark:text-[#EDEDED] gap-5"
        style={{ gridTemplateColumns: "44px 1fr auto" }}
      >
        <span className="text-[11px] text-[#9A9A9A] tracking-[0.08em] font-sans">{item.index}</span>
        <span
          className={`text-base md:text-[1.1rem] font-semibold tracking-[-0.01em] transition-colors duration-200 font-heading ${
            isOpen ? "text-[#00BCA1]" : ""
          }`}
        >
          {item.title}
        </span>
        <span
          className={`w-8 h-8 border rounded-full flex items-center justify-center text-xl leading-none shrink-0 transition-all duration-300 ${
            isOpen
              ? "bg-[#00BCA1] border-[#00BCA1] text-white rotate-45"
              : "border-black/[0.14] dark:border-white/[0.14] text-[#5C5C5C] dark:text-[#9A9A9A]"
          }`}
        >
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "block pb-9 pl-16" : "hidden"}`}>
        {item.content}
      </div>
    </div>
  );
}

const BodyP = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[20px] leading-[1.9] text-[#5C5C5C] dark:text-[#9A9A9A] mb-4 ${className}`}>{children}</p>
);

const Notice = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div
    className={`border-l-[3px] border-[#00BCA1] px-4.5 py-3.5 rounded-r-lg text-[20px] leading-[1.7] my-4 ${
      dark
        ? "bg-[#1A1A1A] dark:bg-[#111113] text-[#F7F5F0] dark:text-[#EDEDED]"
        : "bg-[rgba(0,188,161,0.09)] dark:bg-[rgba(0,188,161,0.12)] text-[#1A1A1A] dark:text-[#EDEDED]"
    }`}
  >
    {children}
  </div>
);

const Warning = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-[3px] border-amber-500 bg-amber-50 dark:bg-amber-950/30 px-4.5 py-3.5 rounded-r-lg text-[20px] leading-[1.7] my-4">
    {children}
  </div>
);

const CheckList = ({ items }: { items: { text: string; no?: boolean }[] }) => (
  <ul className="list-none my-3">
    {items.map((item, i) => (
      <li key={i} className="text-[20px] text-[#5C5C5C] dark:text-[#9A9A9A] py-1.5 flex gap-2.5 items-start leading-[1.6]">
        <span className={`shrink-0 mt-px ${item.no ? "text-red-500" : "text-[#00BCA1]"}`}>{item.no ? "✕" : "→"}</span>
        <span>{item.text}</span>
      </li>
    ))}
  </ul>
);

const DataRow = ({ label, val, last = false }: { label: string; val: string; last?: boolean }) => (
  <div className={`flex justify-between items-center py-2.75 text-[20px] ${!last ? "border-b border-black/9 dark:border-white/9" : ""}`}>
    <span className="text-[#5C5C5C] dark:text-[#9A9A9A]">{label}</span>
    <span className="text-[#1A1A1A] dark:text-[#EDEDED] font-medium">{val}</span>
  </div>
);

export default function TermsOfServiceContent() {
  const t = useTranslations("termsPage");
  const [openId, setOpenId] = useState<string>("acceptance");
  const [activeNav, setActiveNav] = useState<string>("acceptance");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const accordionItems: AccordionItem[] = [
    {
      id: "acceptance",
      index: "01",
      title: t("sections.acceptance.title"),
      content: (
        <>
          <BodyP>{t("sections.acceptance.intro")}</BodyP>
          <CheckList
            items={[
              { text: t("sections.acceptance.allowed.0") },
              { text: t("sections.acceptance.allowed.1") },
              { text: t("sections.acceptance.allowed.2") },
              { text: t("sections.acceptance.allowed.3") },
              { text: t("sections.acceptance.allowed.4") },
              { text: t("sections.acceptance.blocked.0"), no: true },
              { text: t("sections.acceptance.blocked.1"), no: true },
              { text: t("sections.acceptance.blocked.2"), no: true },
              { text: t("sections.acceptance.blocked.3"), no: true },
            ]}
          />
          <Notice>{t("sections.acceptance.notice")}</Notice>
        </>
      ),
    },
    {
      id: "prohibited",
      index: "02",
      title: t("sections.prohibited.title"),
      content: (
        <>
          <BodyP>{t("sections.prohibited.intro")}</BodyP>
          <CheckList items={Array.from({ length: 8 }, (_, i) => ({ text: t(`sections.prohibited.items.${i}`), no: true }))} />
          <Warning>{t("sections.prohibited.warning")}</Warning>
        </>
      ),
    },
    {
      id: "account",
      index: "03",
      title: t("sections.account.title"),
      content: (
        <>
          <BodyP>{t("sections.account.intro")}</BodyP>
          <CheckList items={Array.from({ length: 5 }, (_, i) => ({ text: t(`sections.account.items.${i}`) }))} />
          <DataRow label={t("sections.account.rows.0.label")} val={t("sections.account.rows.0.value")} />
          <DataRow label={t("sections.account.rows.1.label")} val={t("sections.account.rows.1.value")} />
          <DataRow label={t("sections.account.rows.2.label")} val={t("sections.account.rows.2.value")} last />
          <Notice>{t("sections.account.notice")}</Notice>
        </>
      ),
    },
    {
      id: "scans",
      index: "04",
      title: t("sections.scans.title"),
      content: (
        <>
          <BodyP>{t("sections.scans.intro")}</BodyP>
          <DataRow label={t("sections.scans.rows.0.label")} val={t("sections.scans.rows.0.value")} />
          <DataRow label={t("sections.scans.rows.1.label")} val={t("sections.scans.rows.1.value")} />
          <DataRow label={t("sections.scans.rows.2.label")} val={t("sections.scans.rows.2.value")} />
          <DataRow label={t("sections.scans.rows.3.label")} val={t("sections.scans.rows.3.value")} />
          <DataRow label={t("sections.scans.rows.4.label")} val={t("sections.scans.rows.4.value")} />
          <DataRow label={t("sections.scans.rows.5.label")} val={t("sections.scans.rows.5.value")} last />
          <Notice>{t("sections.scans.notice")}</Notice>
        </>
      ),
    },
    {
      id: "intellectual",
      index: "05",
      title: t("sections.intellectual.title"),
      content: (
        <>
          <BodyP>{t("sections.intellectual.p1")}</BodyP>
          <BodyP>{t("sections.intellectual.p2")}</BodyP>
          <BodyP>{t("sections.intellectual.p3")}</BodyP>
          <CheckList
            items={[
              { text: t("sections.intellectual.items.0") },
              { text: t("sections.intellectual.items.1") },
              { text: t("sections.intellectual.items.2") },
              { text: t("sections.intellectual.items.3"), no: true },
            ]}
          />
        </>
      ),
    },
    {
      id: "liability",
      index: "06",
      title: t("sections.liability.title"),
      content: (
        <>
          <BodyP>{t("sections.liability.intro")}</BodyP>
          <CheckList items={Array.from({ length: 5 }, (_, i) => ({ text: t(`sections.liability.items.${i}`) }))} />
          <Notice dark>{t("sections.liability.notice")}</Notice>
        </>
      ),
    },
    {
      id: "termination",
      index: "07",
      title: t("sections.termination.title"),
      content: (
        <>
          <BodyP>{t("sections.termination.intro")}</BodyP>
          <CheckList items={Array.from({ length: 5 }, (_, i) => ({ text: t(`sections.termination.items.${i}`) }))} />
          <BodyP className="mt-4">{t("sections.termination.outro")}</BodyP>
        </>
      ),
    },
    {
      id: "changes",
      index: "08",
      title: t("sections.changes.title"),
      content: (
        <>
          <BodyP>{t("sections.changes.intro")}</BodyP>
          <CheckList items={Array.from({ length: 3 }, (_, i) => ({ text: t(`sections.changes.items.${i}`) }))} />
          <BodyP>{t("sections.changes.outro")}</BodyP>
        </>
      ),
    },
    {
      id: "contact",
      index: "09",
      title: t("sections.contact.title"),
      content: (
        <>
          <BodyP>{t("sections.contact.intro")}</BodyP>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="bg-white dark:bg-[#111113] border border-black/[0.14] dark:border-white/[0.14] rounded p-5">
                <div className="text-[20px] tracking-[0.16em] uppercase text-[#9A9A9A] mb-2.5 font-sans">{t(`sections.contact.cards.${i}.title`)}</div>
                <div className="text-[20px] text-[#00BCA1] mb-1.5 break-all font-medium">{t(`sections.contact.cards.${i}.email`)}</div>
                <div className="text-[20px] text-[#9A9A9A]">{t(`sections.contact.cards.${i}.desc`)}</div>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  const navItems = accordionItems.map((item) => ({ href: item.id, label: item.title }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setOpenId(id);
    setTimeout(() => {
      sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  return (
    <>
      <div
        className="max-w-7xl mx-auto grid gap-10 lg:gap-16"
        style={{
          gridTemplateColumns: "220px 1fr",
          padding: "clamp(40px,6vw,72px) clamp(24px,6vw,80px)",
        }}
      >
        <aside className="hidden md:block sticky top-8 h-fit">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] mb-3.5 font-sans">{t("sectionsLabel")}</div>
          <ul className="list-none border-l border-black/[0.14] dark:border-white/[0.14]">
            {navItems.map((nav) => (
              <li key={nav.href}>
                <button
                  onClick={() => handleNavClick(nav.href)}
                  className={`block w-full text-left px-4 py-2 text-[20px] tracking-[0.02em] border-l-2 -ml-px transition-all duration-200 bg-transparent border-t-0 border-r-0 border-b-0 cursor-pointer ${
                    activeNav === nav.href
                      ? "text-[#1A1A1A] dark:text-[#EDEDED] font-semibold border-l-[#00BCA1]"
                      : "text-[#5C5C5C] dark:text-[#9A9A9A] border-l-transparent hover:text-[#1A1A1A] dark:hover:text-[#EDEDED]"
                  }`}
                >
                  {nav.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex flex-col col-span-full md:col-auto">
          {accordionItems.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                sectionRefs.current[item.id] = el;
              }}
            >
              <AccItem item={item} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? "" : item.id)} />
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-black/[0.14] dark:border-white/[0.14] flex justify-end items-center" style={{ padding: "32px clamp(24px,6vw,80px)" }}>
        <p className="text-[11px] text-[#9A9A9A] tracking-[0.06em] text-right leading-[1.8]">
          {t("footer.version")}
          <br />
          {t("footer.subtitle")}
        </p>
      </footer>
    </>
  );
}
