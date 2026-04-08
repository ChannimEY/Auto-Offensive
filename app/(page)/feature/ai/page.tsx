"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const workflowSteps = [
  {
    num: "1",
    icon: "📥",
    title: "Findings Aggregation",
    desc: "Guardian AI pulls data from active scans, manual pentest entries, and automated exports into a unified tagging environment.",
  },
  {
    num: "2",
    icon: "🧠",
    title: "AI Synthesis",
    desc: "Our AI LLMs analyze the best context and correlate vulnerabilities to generate contextual risk milestones and human-readable narratives.",
  },
  {
    num: "3",
    icon: "📄",
    title: "Multi-Persona Output",
    desc: "Instant generation of distinct versions tailored for Executives, Security Engineers, and Application Developers.",
  },
];

const severityData = [
  { label: "Critical", count: 38, color: "#ef4444", pct: 31 },
  { label: "High", count: 52, color: "#f97316", pct: 42 },
  { label: "Medium", count: 34, color: "#3b82f6", pct: 27 },
];

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}</span>;
}

function DonutChart({ inView }: { inView: boolean }) {
  const size = 120;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = severityData.map((d, i) => {
    const prev = severityData.slice(0, i).reduce((a, b) => a + b.pct, 0);
    return { ...d, offset: circumference - (d.pct / 100) * circumference, rotation: (prev / 100) * 360 };
  });

  return (
    <div className="relative w-30 h-30">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        {segments.map((seg, i) => (
          <motion.circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: seg.offset } : {}}
            transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "center", transform: `rotate(${seg.rotation}deg)` }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-white dark:text-slate-900 leading-none">
          <AnimatedCounter target={124} inView={inView} />
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-0.5">total findings</span>
      </div>
    </div>
  );
}

function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Severity card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-7 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Severity Distribution</h3>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full font-semibold">
              Real Time Analysis
            </span>
          </div>

          <div className="flex items-center gap-8">
            <DonutChart inView={inView} />
            <div>
              {severityData.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  className="flex items-center gap-2 mb-2.5"
                >
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {d.label} ({d.count}%)
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
            <div>
              <div className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Mean Time to Fix</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">4.2 Days</div>
            </div>
            <div>
              <div className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-1">Exploitability</div>
              <div className="text-lg font-black text-red-500">High Risk</div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4"
          >
            Live Result Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm lg:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-7"
          >
            Don&apos;t just hand over a document. Provide a living portal of security intelligence. Our interactive dashboard transforms portable data into actionable insights through dynamic pie charts and trend analysis.
          </motion.p>
          {[
            { icon: "📊", text: "Interactive severity breakdowns" },
            { icon: "🔗", text: "Secure, shareable live links" },
            { icon: "📜", text: "Historical remediation tracking" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-2.5 mb-3"
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm lg:text-base text-slate-600 dark:text-slate-300">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIEdgeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-10 lg:mb-16"
        >
          The AI Edge
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Automated Risk Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -1 }}
            className="bg-slate-50 dark:bg-slate-900 rounded-xl p-7 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚡</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Automated Risk Explanation</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Our AI cross-references findings with current threat intelligence to explain why a specific vulnerability matters to *your* business, not just to CVSS score.
            </p>
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 border-l-4 border-emerald-500">
              <span className="text-xs font-bold text-emerald-500 font-mono">AI Insight: </span>
              <span className="text-xs text-slate-400 font-mono leading-relaxed">
                &quot;While this XSS is rated medium, its location on your payment gateway increases the risk of credential harvesting by 400% based on recent APT activity.&quot;
              </span>
            </div>
          </motion.div>

          {/* Remediation Guidance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -1 }}
            className="bg-slate-900 dark:bg-slate-950 rounded-xl p-7 border border-slate-800 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-base font-bold text-white mb-3">Remediation Guidance</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Personalized fix recommendations that match your team stack, providing code snippets in the exact language used by your developers.
            </p>
            <div className="flex gap-2 flex-wrap">
              {["Python", "Node.js", "Go", "Java"].map(tag => (
                <span
                  key={tag}
                  className="text-xs text-slate-300 px-2.5 py-1 rounded-md font-mono border border-slate-700 bg-slate-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Continuous Updates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -1 }}
            className="bg-slate-50 dark:bg-slate-900 rounded-xl p-7 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🔄</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Continuous Updates</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Reports evolve as you fix vulnerabilities. Each re-verification removes the remediated issue — information is always current.
            </p>
          </motion.div>

          {/* Compliance Mapping */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -1 }}
            className="bg-slate-50 dark:bg-slate-900 rounded-xl p-7 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🗺️</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Compliance Mapping</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Automatic mapping to SOC2, HIPAA, and ISO 27001 controls.
                </p>
              </div>
              <div className="flex gap-1.5">
                {["SOC2", "HIPAA"].map(tag => (
                  <span
                    key={tag}
                    className="text-xs text-white dark:text-slate-300 px-2 py-1 rounded bg-slate-900 dark:bg-slate-700 font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function AIFeature() {
  const workflowRef = useRef(null);
  const workflowInView = useInView(workflowRef, { once: true });

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans">
      {/* Hero */}
      <section className="relative py-16 lg:py-20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
        {/* BG grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(16,185,129,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">Reporting Engine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-black text-white leading-tight mb-5"
            >
              AI-Assisted{" "}
              <span className="text-emerald-500 block">Reporting.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-sm lg:text-base text-slate-400 leading-relaxed mb-9"
            >
              Transform raw vulnerability data into boardroom-ready intelligence. Our AI automates the analysis, narrative, and remediation strategies for every finding.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Generate Sample Report
            </motion.button>
          </div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-56">
              {/* Report card */}
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white rounded-xl p-5 shadow-2xl"
              >
                <div className="h-2 bg-slate-200 rounded w-3/5 mb-2" />
                <div className="h-2 bg-slate-200 rounded w-4/5 mb-2" />
                <div className="h-2 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="flex gap-2">
                  {[{ c: "#ef4444", w: 40 }, { c: "#f97316", w: 60 }, { c: "#3b82f6", w: 50 }].map((b, i) => (
                    <div key={i} className="rounded" style={{ height: 40, background: b.c, width: b.w, opacity: 0.8 }} />
                  ))}
                </div>
              </motion.div>
              {/* Pie chart orb */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 right-0 w-20 h-20 rounded-full shadow-emerald-500/30 shadow-2xl"
                style={{
                  background: "conic-gradient(#ef4444 0% 31%, #f97316 31% 73%, #3b82f6 73% 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section ref={workflowRef} className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">The Reporting Workflow</h2>
            <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400">Three steps from raw english to comprehensive documentation.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-7 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-lg mb-4">
                  {step.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {step.num}. {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas section */}
      <section className="py-20 lg:py-32 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-7xl font-black text-white leading-tight mb-5"
            >
              One scan.{" "}
              <span className="text-emerald-500 block">Infinite Perspectives.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm lg:text-base text-slate-400 leading-relaxed mb-6"
            >
              Don&apos;t waste time translating technical output. Our AI delivers the technical details, the right tone, and detail level for every stakeholder.
            </motion.p>
            {["Executive Summary made clear", "Developer-focused fix details", "Compliance-ready documentation"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2.5 mb-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm lg:text-base text-slate-400">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "TEMPLATE #01", tag: "EXECUTIVE", bg: "bg-white", textColor: "text-slate-900", border: "border-slate-200" },
              { title: "TEMPLATE #02", tag: "TECHNICAL", bg: "bg-slate-800", textColor: "text-white", border: "border-slate-700" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className={`${card.bg} border ${card.border} rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow`}
              >
                <div className={`px-3 py-2.5 ${i === 0 ? "bg-slate-50" : "bg-slate-900"} ${card.border} border-b flex justify-between items-center`}>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">{card.title}</span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{card.tag}</span>
                </div>
                <div className="p-3">
                  {[60, 90, 75, 50, 80].map((w, j) => (
                    <div
                      key={j}
                      className={`h-1.5 rounded mb-1.5 ${i === 0 ? "bg-slate-200" : "bg-slate-700"}`}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                  {i === 0 && (
                    <div
                      className="w-10 h-10 rounded-full mx-auto mt-3"
                      style={{
                        background: "conic-gradient(#ef4444 0% 30%, #f97316 30% 70%, #3b82f6 70% 100%)",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DashboardSection />
      <AIEdgeSection />

      {/* CTA */}
      <section className="py-20 lg:py-32 px-6 bg-slate-900 dark:bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto relative overflow-hidden bg-linear-to-br from-emerald-500 to-emerald-700 dark:from-emerald-600 dark:to-emerald-800 rounded-2xl p-12 lg:p-16 text-center"
        >
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3 relative">
            Stop writing reports.{" "}
            <span className="block">Start securing apps.</span>
          </h2>
          <p className="text-sm lg:text-base text-white/80 mb-9 relative">
            Join 500+ security teams who have automated their reporting workflows with Guardian AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-white text-emerald-600 hover:bg-slate-50 px-8 py-3 rounded-lg font-bold text-sm transition-colors"
            >
              Try It Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="border-2 border-white text-white hover:bg-white/10 px-7 py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
