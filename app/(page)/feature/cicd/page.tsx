"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const pipelineSteps = [
  {
    num: "1",
    icon: "🔗",
    title: "Connect",
    desc: "Native OAuth integration with GitHub, GitLab, and Bitbucket cloud or on-prem.",
    active: false,
  },
  {
    num: "2",
    icon: "☁️",
    title: "Clone & Hash",
    desc: "Ephemeral cloning in sandbox containers. Every file is SHA-256 hashed for integrity tracking.",
    active: false,
  },
  {
    num: "3",
    icon: "🔍",
    title: "SonarScan",
    desc: "Deep SAST analysis powered by SonarQube engines, identifying patterns of OWASP Top 10.",
    active: true,
  },
  {
    num: "4",
    icon: "📡",
    title: "Signal",
    desc: "Instant feedback via Slack, Jira, or inline PR comments with remediation steps.",
    active: false,
  },
];

const githubYaml = `name: Security Scan
on: [push, pull_request]

jobs:
  guardian-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Guardian AI Scan
        uses: guardian/scan.action@v1
        with:
          api_key: \${{ secrets.GUARDIAN_API_KEY }}`;

const gitlabYaml = `guardian-security-scan:
  stage: test
  image: guardian/scanner:latest
  script:
    - guardian scan --full-depth
    - guardian report --format sarif
  artifacts:
    reports:
      sast: guardian-report.json
  only:
    - merge_requests
    - main`;

export default function CICDFeature() {
  const pipelineRef = useRef(null);
  const vulnRef = useRef(null);
  const cicdRef = useRef(null);
  const secretRef = useRef(null);
  const devExpRef = useRef(null);

  const pipelineInView = useInView(pipelineRef, { once: true });
  const vulnInView = useInView(vulnRef, { once: true });
  const cicdInView = useInView(cicdRef, { once: true });
  const secretInView = useInView(secretRef, { once: true });
  const devExpInView = useInView(devExpRef, { once: true });

  const [activeTab, setActiveTab] = useState<"github" | "gitlab">("github");

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* ── Hero ── */}
      <section className="relative py-20 overflow-hidden">
        {/* bg grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.04)_1px,transparent_1px)] bg-size:[28px_28px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-60 items-center relative">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-6"
            >
              <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">
                ↔ SAST Module
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-black leading-tight mb-5"
            >
              Repository<br />
              <span className="text-emerald-500">Scanning.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm text-slate-400 leading-relaxed mb-9 max-w-sm"
            >
              Guardian AI integrates directly into your SDLC, providing deep-code analysis and instant vulnerability identification before your code even reaches production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="inline-flex items-center gap-2.5 bg-slate-900 border border-white/8 rounded px-4.5 py-2.5">
                <span className="text-sm">📦</span>
                <code className="text-sm text-emerald-500 font-mono">
                  npm install @guardian/sast
                </code>
              </div>
            </motion.div>
          </div>

          {/* Isometric illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-linear-to-b from-blue-900/30 to-slate-900 rounded-2xl h-72 flex items-center justify-center relative overflow-hidden border border-emerald-500/15 shadow-[0_0_60px_rgba(16,185,129,0.1)]"
          >
            {/* Stacked blocks visual */}
            <div className="relative">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="mx-auto mb-1 rounded shadow-lg"
                  style={{
                    width: 120 - i * 10,
                    height: 16,
                    background: `rgba(16,185,129,${0.6 - i * 0.12})`,
                    boxShadow: `0 2px 8px rgba(16,185,129,${0.4 - i * 0.08})`,
                  }}
                />
              ))}
              <div className="flex gap-3 mt-5 justify-center">
                {["🐙", "🦊", "🪣"].map((icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -1.5, 0] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    className="w-10 h-10 rounded border border-white/10 bg-white/8 flex items-center justify-center text-xl"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Analysis Pipeline ── */}
      <section ref={pipelineRef} className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-8 h-0.5 bg-emerald-500" />
              <span className="text-xs text-slate-500 tracking-wider uppercase">
                The Analysis Pipeline
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 7.5 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -1 }}
                className={`rounded-xl p-6 relative overflow-hidden transition-all ${
                  step.active
                    ? "bg-linear-to-br from-blue-500 to-indigo-500 shadow-[0_8px_32px_rgba(99,102,241,0.3)]"
                    : "bg-slate-900 border border-white/6"
                }`}
              >
                {step.active && (
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size:[16px_16px]" />
                )}
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center text-base mb-3.5 relative ${
                    step.active
                      ? "bg-white/15"
                      : "bg-emerald-500/10"
                  }`}
                >
                  {step.icon}
                </div>
                <h3
                  className={`text-sm font-bold mb-2 relative ${
                    step.active ? "text-white" : "text-slate-200"
                  }`}
                >
                  {step.num}. {step.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed relative ${
                    step.active ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SQL Injection Finding ── */}
      <section ref={vulnRef} className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-6">
          {/* Code panel */}
          <motion.div
            initial={{ opacity: 0, x: -7.5 }}
            animate={vulnInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-slate-900 rounded-xl border border-white/6 overflow-hidden font-mono text-xs"
          >
            {/* Title bar */}
            <div className="bg-slate-800 px-4 py-2.5 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-500 text-xs">
                  AUTH_SERVICE.PY — VULNERABLE
                </span>
              </div>
              <span className="text-red-500 text-xs font-bold">LINE 143/356</span>
            </div>

            <div className="p-5">
              <div className="text-slate-500 mb-1">
                def validate_user(username, password):
              </div>
              <div className="text-slate-500 mb-1 pl-4">
                # Establish database connection
              </div>
              <div className="text-slate-300 mb-1 pl-4">
                <span className="text-cyan-400">sql</span> ={" "}
                <span className="bg-red-500/10 text-red-500 px-1 rounded text-xs">
                  f&quot;SELECT * FROM users WHERE user =
                </span>
              </div>
              <div className="text-slate-300 mb-1 pl-8 flex justify-between items-center">
                <span>cursor.execute(query)</span>
                <span className="bg-red-500 text-white text-xs px-1.5 rounded font-bold">
                  SQL INJECTION
                </span>
              </div>
              <div className="text-slate-500 mb-4 pl-8">
                result = cursor.fetchone()
              </div>

              {/* Remediation snippet */}
              <div className="bg-slate-950 rounded px-3.5 py-3.5 border border-emerald-500/15">
                <div className="text-xs text-emerald-500 font-bold tracking-widest mb-2.5">
                  REMEDIATION SNIPPET
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-600"># Use parameterized queries to prevent injection</span>
                </div>
                <div className="text-cyan-400">
                  query ={" "}
                  <span className="text-emerald-500">
                    &quot;SELECT * FROM users WHERE user = %s&quot;
                  </span>
                </div>
                <div className="text-slate-300">
                  cursor.execute(query, (username,))
                </div>
              </div>
            </div>
          </motion.div>

          {/* Critical flaw card */}
          <motion.div
            initial={{ opacity: 0, x: 7.5 }}
            animate={vulnInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white rounded-xl p-6 border border-slate-200 mb-4">
              <div className="flex items-center gap-1.5 mb-3">
                <span>🔴</span>
                <span className="text-xs font-black text-red-500 tracking-widest uppercase">
                  Critical Flaw
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                SQL Injection Vulnerability: The application is concatenating untrusted user input directly into a SQL query string. An attacker could bypass authentication by providing a malicious payload like{" "}
                <code className="bg-red-50 text-red-500 px-1.5 rounded text-xs">
                  &apos; OR     &apos;1    &apos;=    &apos;1
                </code>
                .
              </p>

              {[
                {
                  label: "Confidence Score",
                  value: "98% (High)",
                  color: "text-emerald-500",
                },
                { label: "CVE Reference", value: "CWE-89", color: "text-blue-500" },
                {
                  label: "Estimated Fix Time",
                  value: "5 Minutes",
                  color: "text-slate-900",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2.5 border-b border-slate-100"
                >
                  <span className="text-sm text-slate-500">{row.label}</span>
                  <span className={`text-sm font-semibold ${row.color}`}>
                    {row.value}
                  </span>
                </div>
              ))}

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(16,185,129,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-5 py-3 bg-emerald-500 text-white rounded font-bold text-sm hover:bg-emerald-600 transition"
              >
                🔧 Create Fix Pull Request
              </motion.button>
            </div>

            {/* Pre-Active Detection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={vulnInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="bg-linear-to-br from-blue-900/40 to-blue-950/40 rounded-lg p-5 border border-blue-500/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-blue-300 font-semibold">
                  Pre-Active Detection
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                This vulnerability was caught before reaching staging. Guardian AI blocked the PR automatically.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CI/CD Integration ── */}
      <section
        ref={cicdRef}
        className="py-16 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={cicdInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <h2 className="text-2xl font-black text-white mb-2">
              CI/CD Integration Guide
            </h2>
            <p className="text-sm text-slate-500 max-w-xs">
              Deploy Guardian AI into your existing workflow in seconds. Copy these pre-written YAML snippets to start blocking insecure commits today.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 mt-8">
            {/* YAML panel */}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={cicdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900 rounded-xl border border-white/6 overflow-hidden"
            >
              {/* Tab bar */}
              <div className="flex border-b border-white/6">
                {(["github", "gitlab"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition ${
                      activeTab === tab
                        ? "bg-slate-800 text-white border-emerald-500"
                        : "text-slate-500 border-transparent hover:text-slate-300"
                    }`}
                  >
                    {tab === "github" ? "GitHub Actions" : "GitLab CI"}
                  </button>
                ))}
              </div>
              <pre className="p-6 m-0 text-xs text-slate-300 leading-relaxed overflow-x-auto font-mono">
                <code>{activeTab === "github" ? githubYaml : gitlabYaml}</code>
              </pre>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, x: 5 }}
              animate={cicdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-5 pt-2"
            >
              {[
                {
                  icon: "⬅️",
                  title: "Shift Left Security",
                  desc: "Prevent vulnerabilities from reaching the main branch with automated PR checks.",
                },
                {
                  icon: "🤖",
                  title: "Native CI Tooling",
                  desc: "Prefer a custom script? Our CLI supports exit codes for automated build failures.",
                },
                {
                  icon: "📋",
                  title: "Full Audit Trail",
                  desc: "Every scan result is logged with detailed history for compliance reporting.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 2.5 }}
                  animate={cicdInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="flex gap-3.5 items-start"
                >
                  <div className="w-9 h-9 rounded border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center text-base shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Secret Exposure ── */}
      <section ref={secretRef} className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-6">
          {/* Config code panel */}
          <motion.div
            initial={{ opacity: 0, x: -7.5 }}
            animate={secretInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-slate-900 rounded-xl border border-white/6 overflow-hidden font-mono text-xs"
          >
            <div className="bg-slate-800 px-4 py-2.5 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 text-slate-500 text-xs">
                  CONFIG/SETTINGS.YAML — LEAKED SECRET
                </span>
              </div>
              <span className="text-amber-500 text-xs font-semibold">LINE 81</span>
            </div>

            <div className="p-5">
              <div className="text-slate-500 mb-1">production:</div>
              <div className="text-slate-300 mb-1 pl-4">
                database_url:{" "}
                <span className="text-cyan-400">
                  &quot;postgres://db-internal:5432&quot;
                </span>
              </div>
              <div className="text-slate-300 mb-1 pl-4 flex justify-between items-center">
                <span>
                  aws_secret_key:{" "}
                  <span className="bg-red-500/15 text-red-500 px-1 rounded text-xs">
                    AKIAIOSFODNN7EXAMPLE...
                  </span>
                </span>
                <span className="bg-red-500 text-white text-xs px-1.5 rounded font-bold">
                  ⚠ HARDCODED SECRET
                </span>
              </div>
              <div className="text-slate-500 pl-4 mb-4">
                ms_endpoint:{" "}
                <span className="text-cyan-400">
                  &quot;https://api.guardian.ai&quot;
                </span>
              </div>

              <div className="bg-slate-950 rounded px-3.5 py-3.5 border border-red-500/15">
                <div className="text-xs text-amber-500 font-bold tracking-widest mb-2.5">
                  RECOMMENDED ACTION
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This AWS Access Key was detected in plain text. We recommend revoking the key immediately and moving it to a secure Secret Manager (e.g., AWS Secrets Manager or Vault).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secret Exposure card */}
          <motion.div
            initial={{ opacity: 0, x: 7.5 }}
            animate={secretInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-1.5 mb-3">
                <span>🔴</span>
                <span className="text-xs font-black text-red-500 tracking-widest uppercase">
                  Secret Exposure
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">
                <strong>Leaked Credentials:</strong> Guardian AI identified an active AWS Access Key embedded in your configuration. This poses a critical risk of unauthorized infrastructure access.
              </p>

              {[
                {
                  label: "Detection Type",
                  value: "Entropy & Pattern Match",
                  color: "text-emerald-500",
                },
                {
                  label: "Secret Validity",
                  value: "Verified Active",
                  color: "text-emerald-500",
                },
                {
                  label: "Exposure Range",
                  value: "Public & Private Repos",
                  color: "text-red-500",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex justify-between py-2.5 border-b border-slate-100"
                >
                  <span className="text-sm text-slate-500">{row.label}</span>
                  <span className={`text-sm font-semibold ${row.color}`}>
                    {row.value}
                  </span>
                </div>
              ))}

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-5 py-3 bg-red-500 text-white rounded font-bold text-sm hover:bg-red-600 transition"
              >
                🔄 Revoke & Rotate Secret
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Developer Experience ── */}
      <section ref={devExpRef} className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-5">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 7.5 }}
            animate={devExpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-slate-100 rounded-2xl p-9 border border-slate-200"
          >
            <h2 className="text-2xl font-black text-slate-950 mb-3">
              Developer Experience First.
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8">
              Security shouldn&apos;t be a bottleneck. Guardian AI provides clear, actionable feedback directly in your developers &apos; preferred environment.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={devExpInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-black text-emerald-500"
                >
                  99.8%
                </motion.div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  Scan Uptime
                </div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={devExpInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-black text-slate-950"
                >
                  &lt; 3s
                </motion.div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                  PR Feedback Loop
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cloud Native */}
          <motion.div
            initial={{ opacity: 0, y: 7.5 }}
            animate={devExpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl p-9 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size:[20px_20px]" />
            <motion.div
              animate={{ y: [0, -1.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-lg bg-white/15 flex items-center justify-center text-2xl mb-5 relative"
            >
              ☁️
            </motion.div>
            <h3 className="text-xl font-black text-white mb-3 relative">
              Cloud Native
            </h3>
            <p className="text-sm text-white/75 leading-relaxed relative">
              Support for GitHub, GitLab, Bitbucket, and self-hosted instances. Zero infrastructure maintenance required.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}