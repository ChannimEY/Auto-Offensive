"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { ExternalLink, GitBranch, CheckCircle, AlertTriangle, Shield } from "lucide-react";

const githubYaml = `name: Security Scan
on: [push, pull_request]

jobs:
  guardian-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Auto-Offensive Scan
        uses: auto-offensive/scan@v1
        with:
          api_key: \${{ secrets.AUTO_OFFENSIVE_API_KEY }}`;

const gitlabYaml = `auto-offensive-scan:
  stage: security
  image: auto-offensive/scanner:latest
  script:
    - ao scan --full-depth
    - ao report --format sarif
  artifacts:
    reports:
      sast: ao-report.json
  only:
    - merge_requests
    - main`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function CICDFeature() {
  const t = useTranslations("featurePages.cicd");
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const bodyFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
    : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";
  const displayFontFamily = isKhmer
    ? "var(--font-noto-khmer), var(--font-hackdaddy), sans-serif"
    : "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif";

  const [activeTab, setActiveTab] = useState<"github" | "gitlab">("github");

  const pipelineSteps = [
    { num: "1", icon: "🔗", title: t("pipeline.steps.0.title"), desc: t("pipeline.steps.0.desc"), active: false },
    { num: "2", icon: "☁️", title: t("pipeline.steps.1.title"), desc: t("pipeline.steps.1.desc"), active: false },
    { num: "3", icon: "🔍", title: t("pipeline.steps.2.title"), desc: t("pipeline.steps.2.desc"), active: true },
    { num: "4", icon: "📡", title: t("pipeline.steps.3.title"), desc: t("pipeline.steps.3.desc"), active: false },
  ];

  const integrationFeatures = [
    { icon: "🛡️", title: t("integration.items.0.title"), desc: t("integration.items.0.desc") },
    { icon: "⚡", title: t("integration.items.1.title"), desc: t("integration.items.1.desc") },
    { icon: "📋", title: t("integration.items.2.title"), desc: t("integration.items.2.desc") },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#09090B] font-sans" style={{ fontFamily: bodyFontFamily }}>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white dark:bg-[#111113] border-b border-black/9 dark:border-white/9">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(rgba(0,188,161,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00BCA1]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase bg-[#00BCA1]/10 text-[#00BCA1] border border-[#00BCA1]/20 rounded-full px-3 py-1.5 mb-6">
                <GitBranch className="w-3.5 h-3.5" />
                {t("hero.badge")}
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1A1A1A] dark:text-[#EDEDED] leading-tight mb-5" style={{ fontFamily: displayFontFamily }}>
                {t("hero.titleLine1")}<br />
                <span className="text-[#00BCA1]">{t("hero.titleLine2")}</span>
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-[#5C5C5C] dark:text-[#9A9A9A] mb-8 max-w-md">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-[#00BCA1] hover:bg-[#00A390] text-white rounded-xl text-base font-bold transition-colors">
                  <GitBranch className="w-4 h-4" />
                  {t("hero.primaryCta")}
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 text-[#1A1A1A] dark:text-[#EDEDED] rounded-xl text-base font-semibold hover:border-[#00BCA1] transition-colors">
                  {t("hero.secondaryCta")} <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div {...fadeUp(0.2)} className="relative">
              <div className="bg-white dark:bg-[#111113] rounded-2xl border border-black/9 dark:border-white/9 p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-[#1A1A1A] dark:text-[#EDEDED]" />
                  <span className="text-base font-semibold text-[#1A1A1A] dark:text-[#EDEDED]">{t("hero.repoName")}</span>
                  <span className="ml-auto text-sm px-2 py-1 rounded-full bg-[#00BCA1]/10 text-[#00BCA1]">{t("hero.active")}</span>
                </div>
                <div className="space-y-3">
                  {[1,2,3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#1A1A1A]">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i === 2 ? 'bg-amber-500/20' : 'bg-[#00BCA1]/10'}`}>
                        {i === 2 ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle className="w-4 h-4 text-[#00BCA1]" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-medium text-[#1A1A1A] dark:text-[#EDEDED]">{t("hero.scanTitle")}</div>
                        <div className="text-sm text-[#9A9A9A]">{i === 2 ? t("hero.vulnerabilityFound") : t("hero.passed")}</div>
                      </div>
                      <span className="text-sm text-[#9A9A9A]">{i === 1 ? t("hero.time1") : i === 2 ? t("hero.time2") : t("hero.time3")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pipeline Steps ── */}
      <section className="py-16 border-t border-black/9 dark:border-white/9">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-3">
              {t("pipeline.title")}
            </h2>
            <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A]">
              {t("pipeline.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 + i * 0.1)}
                whileHover={{ y: -4 }}
                className={`rounded-xl p-5 transition-all ${
                  step.active
                    ? "bg-linear-to-br from-[#3B82F6] to-indigo-600 shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4 ${
                  step.active ? "bg-white/15" : "bg-[#00BCA1]/10"
                }`}>
                  {step.icon}
                </div>
                <h3 className={`text-base font-bold mb-2 ${step.active ? "text-white" : "text-[#1A1A1A] dark:text-[#EDEDED]"}`}>
                  {step.num}. {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${step.active ? "text-white/70" : "text-[#5C5C5C] dark:text-[#9A9A9A]"}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vulnerability Finding ── */}
      <section className="py-16 bg-white dark:bg-[#111113]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Panel */}
            <motion.div {...fadeUp(0)} className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden font-mono text-sm">
              <div className="bg-[#161B22] px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00BCA1]" />
                <span className="ml-2 text-slate-500 text-sm">AUTH_SERVICE.PY</span>
                <span className="ml-auto text-red-500 text-sm font-bold">{t("finding.codeBadge")}</span>
              </div>
              <div className="p-5">
                <div className="text-slate-500 mb-1">def validate_user(user_input, password):</div>
                <div className="text-cyan-400 mb-1 pl-4 ">
                  sql = &quot;SELECT * FROM users WHERE user = &apos;...&apos;&quot; [SQL INJECTION]
                </div>
                <div className="text-slate-300 mb-4 pl-4">cursor.execute(query)</div>
                <div className="text-slate-300 mb-4 pl-4">cursor.execute(query)</div>
                <div className="bg-[#00BCA1]/10 rounded px-3 py-3 border border-[#00BCA1]/20">
                  <div className="text-xs text-[#00BCA1] font-bold tracking-widest mb-2">{t("finding.remediation")}</div>
                  <div className="text-slate-300">query = &quot;SELECT * FROM users WHERE user = %s&quot;</div>
                  <div className="text-slate-300">cursor.execute(query, (user_input,))</div>
                </div>
              </div>
            </motion.div>

            {/* Finding Card */}
            <motion.div {...fadeUp(0.1)} className="bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔴</span>
                <span className="text-sm font-black text-red-500 tracking-widest uppercase">{t("finding.title")}</span>
              </div>
              <p className="text-[#5C5C5C] dark:text-[#9A9A9A] text-base leading-relaxed mb-5">
                {t("finding.desc")}
              </p>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between py-2 border-b border-black/9 dark:border-white/9">
                  <span className="text-base text-[#9A9A9A]">{t("finding.confidence")}</span>
                  <span className="text-base font-semibold text-[#00BCA1]">{t("finding.confidenceValue")}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-black/9 dark:border-white/9">
                  <span className="text-base text-[#9A9A9A]">CWE</span>
                  <span className="text-base font-semibold text-blue-500">CWE-89</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-base text-[#9A9A9A]">{t("finding.fixTime")}</span>
                  <span className="text-base font-semibold text-[#1A1A1A] dark:text-[#EDEDED]">{t("finding.fixTimeValue")}</span>
                </div>
              </div>
              <button className="w-full py-3 bg-[#00BCA1] hover:bg-[#00A390] text-white rounded-lg text-base font-bold transition-colors flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                {t("finding.primaryCta")}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CI/CD Integration ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp(0)} className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-3">
              {t("integration.title")}
            </h2>
            <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A]">
              {t("integration.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* YAML Panel */}
            <motion.div {...fadeUp(0)} className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex border-b border-white/10">
                {(["github", "gitlab"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition ${
                      activeTab === tab
                        ? "bg-[#161B22] text-white border-[#00BCA1]"
                        : "text-slate-500 border-transparent hover:text-slate-300"
                    }`}
                  >
                    {tab === "github" ? t("integration.tabs.github") : t("integration.tabs.gitlab")}
                  </button>
                ))}
              </div>
              <pre className="p-5 m-0 text-sm text-slate-300 leading-relaxed overflow-x-auto font-mono">
                <code>{activeTab === "github" ? githubYaml : gitlabYaml}</code>
              </pre>
            </motion.div>

            {/* Features */}
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">
              {integrationFeatures.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white dark:bg-[#111113] border border-black/9 dark:border-white/9 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#00BCA1]/10 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#5C5C5C] dark:text-[#9A9A9A] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
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
