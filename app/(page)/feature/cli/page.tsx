"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Download, FileText, Monitor, Lock, Zap, Shield, Cpu, Radio, ClipboardCheck, Terminal, Copy, Check, Terminal as TerminalIcon } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const lineColor: Record<string, string> = {
  cmd: "text-slate-100",
  success: "text-[#00BCA1]",
  muted: "text-slate-500",
  warning: "text-amber-400",
  blank: "",
};

interface FeatureCardItem {
  icon: typeof Monitor;
  accent: string;
  title: string;
  desc: string;
}

function AnimatedCLI() {
  const t = useTranslations("featurePages.cli");
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  const cliLines = [
    { text: t("terminal.lines.0"), type: "cmd" },
    { text: t("terminal.lines.1"), type: "muted" },
    { text: t("terminal.lines.2"), type: "muted" },
    { text: t("terminal.lines.3"), type: "success" },
    { text: t("terminal.lines.4"), type: "success" },
    { text: t("terminal.lines.5"), type: "warning" },
    { text: t("terminal.lines.6"), type: "success" },
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= cliLines.length) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, [cliLines.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(t("terminal.copyValue"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="rounded-2xl overflow-hidden shadow-2xl border border-[#00BCA1]/20 bg-[#0D1117]"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-[#00BCA1]/80" />
        </div>
        <span className="text-xs text-slate-500 font-mono">auto-offensive-cli</span>
        <button onClick={handleCopy} className="text-slate-500 hover:text-slate-300 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-[#00BCA1]" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="p-5 font-mono text-base min-h-50 space-y-1">
        {cliLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className={`leading-relaxed ${lineColor[line.type]} ${!line.text ? "h-3" : ""}`}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < cliLines.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-[#00BCA1] align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}

function FeatureCard({ card, index }: { card: FeatureCardItem; index: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      {...fadeUp(0.1 + index * 0.1)}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 rounded-2xl p-6 hover:shadow-lg hover:border-[#00BCA1]/40 transition-all"
    >
      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4`}
        style={{ backgroundColor: `${card.accent}15`, borderColor: `${card.accent}30`, color: card.accent }}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-3">{card.title}</h3>
      <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">{card.desc}</p>
    </motion.div>
  );
}

export default function CLIFeature() {
  const t = useTranslations("featurePages.cli");

  const featureCards = [
    {
      icon: Monitor,
      accent: "#00BCA1",
      title: t("cards.0.title"),
      highlight: "auto-off scan",
      desc: t("cards.0.desc"),
    },
    {
      icon: Lock,
      accent: "#3B82F6",
      title: t("cards.1.title"),
      desc: t("cards.1.desc"),
    },
    {
      icon: Zap,
      accent: "#8B5CF6",
      title: t("cards.2.title"),
      highlight: "ao get-report",
      desc: t("cards.2.desc"),
    },
  ];

  const specs = [
    { label: t("specs.items.0.label"), value: t("specs.items.0.value") },
    { label: t("specs.items.1.label"), value: t("specs.items.1.value") },
    { label: t("specs.items.2.label"), value: t("specs.items.2.value") },
    { label: t("specs.items.3.label"), value: t("specs.items.3.value") },
    { label: t("specs.items.4.label"), value: t("specs.items.4.value") },
  ];

  const workflowSteps = [
    { icon: TerminalIcon, title: t("workflow.steps.0.title"), desc: t("workflow.steps.0.desc") },
    { icon: Cpu, title: t("workflow.steps.1.title"), desc: t("workflow.steps.1.desc") },
    { icon: Radio, title: t("workflow.steps.2.title"), desc: t("workflow.steps.2.desc") },
    { icon: ClipboardCheck, title: t("workflow.steps.3.title"), desc: t("workflow.steps.3.desc") },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#09090B] font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white dark:bg-[#111113] border-b border-black/9 dark:border-white/9">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(0,188,161,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00BCA1]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase bg-[#00BCA1]/10 text-[#00BCA1] border border-[#00BCA1]/20 rounded-full px-3 py-1.5 mb-6">
                <Terminal className="w-3.5 h-3.5" />
                {t("hero.badge")}
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1A1A1A] dark:text-[#EDEDED] leading-tight mb-5">
                {t("hero.titleLine1")}<br />
                <span className="text-[#00BCA1]">{t("hero.titleLine2")}</span>
              </h1>

              <p className="text-[#5C5C5C] dark:text-[#9A9A9A] text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#00BCA1] hover:bg-[#00A390] text-white rounded-xl text-base font-bold transition-colors">
                  <Download className="w-4 h-4" />
                  {t("hero.primaryCta")}
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 text-[#1A1A1A] dark:text-[#EDEDED] rounded-xl text-base font-semibold hover:border-[#00BCA1] transition-colors">
                  <FileText className="w-4 h-4" />
                  {t("hero.secondaryCta")}
                </button>
              </div>
            </motion.div>

            <AnimatedCLI />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 bg-white dark:bg-[#111113] border-y border-black/9 dark:border-white/9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-3">
              {t("specs.title")}
            </h2>
            <div className="w-14 h-0.5 bg-[#00BCA1] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div {...fadeUp(0)} className="bg-[#F7F5F0] dark:bg-[#1A1A1A] rounded-2xl border border-black/9 dark:border-white/9 overflow-hidden">
              {specs.map((spec, i) => (
                <div key={i} className={`flex justify-between px-5 py-4 ${i < specs.length - 1 ? "border-b border-black/9 dark:border-white/9" : ""}`}>
                  <span className="text-xs text-[#9A9A9A] uppercase tracking-widest">{spec.label}</span>
                  <span className="text-base text-[#1A1A1A] dark:text-[#EDEDED] font-mono">{spec.value}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00BCA1]/10 border border-[#00BCA1]/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00BCA1]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDEDED]">{t("specs.binaryTitle")}</h3>
              </div>
              <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed mb-4">
                {t("specs.binaryDesc")}
              </p>
              <div className="flex gap-2">
                {["Rust", "gRPC", "mTLS"].map((tag) => (
                  <code key={tag} className="text-xs px-2.5 py-1 rounded-lg font-mono bg-[#F7F5F0] dark:bg-[#1A1A1A] text-[#00BCA1] border border-black/9 dark:border-white/9">
                    {tag}
                  </code>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-3">
              {t("workflow.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp(0.1 + i * 0.1)}
                  className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 border-[#00BCA1]/25 bg-[#00BCA1]/10">
                    <Icon className="w-5 h-5 text-[#00BCA1]" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="relative rounded-2xl px-6 py-12 overflow-hidden" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0f2940 100%)" }}>
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#00BCA1]/10 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#0077B6]/10 blur-3xl" />
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-[#9A9A9A] mb-8 max-w-md mx-auto">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="bg-[#00BCA1] hover:bg-[#00A390] text-white px-6 py-3 rounded-xl text-base font-bold transition-colors">
                  {t("cta.primaryCta")}
                </button>
                <button className="border border-white/20 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-white/5 transition-colors">
                  {t("cta.secondaryCta")}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
