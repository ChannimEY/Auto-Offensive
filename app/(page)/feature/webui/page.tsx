"use client";

import { motion, useInView } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";

function TerminalHero() {
  const t = useTranslations("featurePages.webui");
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { text: t("hero.terminal.lines.0"), color: "#e2e8f0", delay: 0 },
    { text: t("hero.terminal.lines.1"), color: "#10b981", delay: 0.4 },
    { text: t("hero.terminal.lines.2"), color: "#10b981", delay: 0.8 },
    { text: t("hero.terminal.lines.3"), color: "#10b981", delay: 1.2 },
    { text: t("hero.terminal.lines.4"), color: "#f59e0b", delay: 1.6 },
  ];

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= terminalLines.length) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, [terminalLines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/20 bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950"
    >
      {/* Window bar */}
      <div className="bg-slate-700 dark:bg-slate-900 px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />
        <span className="ml-2 text-xs text-slate-400 font-mono">{t("hero.terminal.title")}</span>
        <div className="ml-auto text-xs px-2 py-1 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono">
          {t("hero.terminal.status")}
        </div>
      </div>

      <div className="p-6 min-h-40 font-mono text-base">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} style={{ color: line.color }} className="mb-1.5">
            {line.text}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-3.5 bg-emerald-500"
        />
      </div>
    </motion.div>
  );
}

function LiveScanSection() {
  const t = useTranslations("featurePages.webui");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [checkedTools, setCheckedTools] = useState([true, true, false]);

  const liveScanLines = [
    { time: "14:20:01", level: "INFO", text: t("live.lines.0"), color: "#94a3b8" },
    { time: "14:20:05", level: "SUBFINDER", text: t("live.lines.1"), color: "#10b981" },
    { time: "", level: "", text: t("live.lines.2"), color: "#10b981" },
    { time: "", level: "", text: t("live.lines.3"), color: "#10b981" },
    { time: "14:20:12", level: "NAABU", text: t("live.lines.4"), color: "#f59e0b" },
    { time: "", level: "", text: t("live.lines.5"), color: "#94a3b8" },
    { time: "", level: "", text: t("live.lines.6"), color: "#94a3b8" },
    { time: "", level: "", text: t("live.lines.7"), color: "#94a3b8" },
    { time: "14:20:45", level: "NUCLEI", text: t("live.lines.8"), color: "#ef4444" },
  ];

  const tools = [
    { name: "Subfinder", icon: "⚡", checked: true },
    { name: "Naabu", icon: "🔍", checked: true },
    { name: "Nuclei", icon: "🛡️", checked: false },
  ];

  return (
    <section ref={ref} className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-8 h-0.5 bg-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold tracking-widest uppercase">
            {t("live.badge")}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-8">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 rounded-lg border border-emerald-500/15 bg-slate-900 dark:bg-slate-950 overflow-hidden font-mono text-sm"
          >
            <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2.5 flex justify-between items-center border-b border-slate-700 dark:border-slate-800">
              <span className="text-slate-400">{t("live.panelTitle")}</span>
              <span className="text-emerald-400 text-xs font-semibold tracking-widest">● {t("live.panelStatus")}</span>
            </div>
            <div className="p-5">
              {liveScanLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
                  className="mb-1"
                  style={{ color: line.color }}
                >
                  {line.time && <span className="text-slate-500">[{line.time}] </span>}
                  {line.level && (
                    <span
                      className={
                        line.level === "SUBFINDER"
                          ? "text-emerald-400"
                          : line.level === "NAABU"
                          ? "text-amber-400"
                          : line.level === "NUCLEI"
                          ? "text-red-400"
                          : "text-slate-400"
                      }
                    >
                      {line.level}:{" "}
                    </span>
                  )}
                  <span>{line.text}</span>
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-0.5 bg-emerald-500"
              />
            </div>
          </motion.div>

          {/* Tool config */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{t("live.configTitle")}</h3>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6">{t("live.configDesc")}</p>
            {tools.map((tool, i) => (
              <div
                key={i}
                onClick={() => {
                  const next = [...checkedTools];
                  next[i] = !next[i];
                  setCheckedTools(next);
                }}
                className={`flex items-center justify-between p-3 rounded-lg mb-2.5 cursor-pointer border transition-all ${
                  checkedTools[i]
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/5"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                }`}
              >
                <span className="text-base font-medium text-slate-900 dark:text-white">
                  {tool.icon} {tool.name}
                </span>
                <div
                  className={`w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${
                    checkedTools[i]
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-slate-300 dark:border-slate-600 bg-transparent"
                  }`}
                >
                  {checkedTools[i] && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base font-semibold transition-colors"
            >
              {t("live.updateCta")}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const t = useTranslations("featurePages.webui");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const steps = [
    { num: "1", title: t("howItWorks.steps.0.title"), desc: t("howItWorks.steps.0.desc") },
    { num: "2", title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.desc") },
    { num: "3", title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.desc") },
  ];

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 5 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8"
          >
            {t("howItWorks.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg bg-slate-900 dark:bg-slate-900 border border-emerald-500/20 p-5"
          >
            <div className="text-amber-500 text-xs font-bold tracking-widest mb-2 font-mono">{t("howItWorks.noteTitle")}</div>
            <p className="text-sm text-slate-400 leading-relaxed font-mono">
              {t("howItWorks.noteBody")}
            </p>
          </motion.div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-8 pt-1">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="flex gap-5 items-start"
            >
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 dark:border-slate-400 text-slate-900 dark:text-slate-400 flex items-center justify-center text-base font-bold shrink-0 ">
                {step.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const t = useTranslations("featurePages.webui");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const benefits = [
    { icon: "⏱", title: t("benefits.items.0.title"), desc: t("benefits.items.0.desc") },
    { icon: "👥", title: t("benefits.items.1.title"), desc: t("benefits.items.1.desc") },
    { icon: "⚙️", title: t("benefits.items.2.title"), desc: t("benefits.items.2.desc") },
  ];

  return (
    <section ref={ref} className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 5 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-black text-slate-900 dark:text-white text-center mb-12"
        >
          {t("benefits.title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -2, borderColor: "#10b981" }}
              className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 transition-colors hover:border-emerald-500/40"
            >
              <div className="text-3xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{b.title}</h3>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WebUIFeature() {
  const t = useTranslations("featurePages.webui");
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";
  const displayFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-hackdaddy), sans-serif"
    : "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif";

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans" style={{ fontFamily: bodyFontFamily }}>
      {/* Hero */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 rounded-full px-3 py-1 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-5"
              style={{ fontFamily: displayFontFamily }}
            >
              {t("hero.titleLine1")}{" "}
              <span className="text-emerald-600 dark:text-emerald-400 block">{t("hero.titleLine2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-sm"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base font-bold transition-colors"
              >
                {t("hero.primaryCta")}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                {t("hero.secondaryCta")}
              </motion.button>
            </motion.div>
          </div>

          <TerminalHero />
        </div>
      </section>

      <LiveScanSection />
      <HowItWorksSection />
      <BenefitsSection />

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center rounded-3xl border border-emerald-500/20 bg-linear-to-br from-blue-900 to-slate-900 dark:from-slate-950 dark:to-slate-900 p-16 lg:p-20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-linear(rgba(16,185,129,0.06)_1px,transparent_1px)] bg-position-[24px_24px] pointer-events-none" />
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-4 relative">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-slate-300 mb-8 relative max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-base font-bold transition-colors"
            >
              {t("cta.primaryCta")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-7 py-3.5 border border-white/20 text-white rounded-lg text-base font-semibold hover:bg-white/5 transition-colors"
            >
              {t("cta.secondaryCta")}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
