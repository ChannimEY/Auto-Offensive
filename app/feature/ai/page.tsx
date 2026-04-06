"use client";

import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
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

const edgeFeatures = [
  {
    icon: "⚡",
    title: "Automated Risk Explanation",
    badge: "",
    desc: "Our AI cross-references findings with current threat intelligence to explain why a specific vulnerability matters to *your* business, not just to CVSS score.",
    highlight: `AI Insight: "While this XSS is rated medium, its location on your payment gateway increases the risk of credential harvesting by 400% based on recent APT activity."`,
    dark: false,
  },
  {
    icon: "🛡️",
    title: "Remediation Guidance",
    desc: "Personalized fix recommendations that match your team stack, providing code snippets in the exact language used by your developers.",
    tags: ["Python", "Node.js", "Go", "Java"],
    dark: true,
  },
  {
    icon: "🔄",
    title: "Continuous Updates",
    desc: "Reports evolve as you fix vulnerabilities. Each re-verification removes the remediated issue — information is always current.",
    dark: false,
  },
  {
    icon: "🗺️",
    title: "Compliance Mapping",
    desc: "Automatic mapping to SOC2, HIPAA, and ISO 27001 controls.",
    complianceTags: ["SOC2", "HIPAA"],
    dark: false,
  },
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
    <div style={{ position: "relative", width: size, height: size }}>
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
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
          <AnimatedCounter target={124} inView={inView} />
        </span>
        <span style={{ fontSize: 9, color: "#64748b", textAlign: "center", marginTop: 2 }}>total findings</span>
      </div>
    </div>
  );
}

function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Severity card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            background: "#fff", borderRadius: 16, padding: 28,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Severity Distribution</h3>
            <span style={{ fontSize: 11, color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "2px 8px", borderRadius: 10 }}>Real Time Analysis</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <DonutChart inView={inView} />
            <div>
              {severityData.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "#475569" }}>{d.label} ({d.count}%)</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Mean Time to Fix</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>4.2 Days</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Exploitability</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#ef4444" }}>High Risk</div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}
          >
            Live Result Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, marginBottom: 28 }}
          >
            Don$apost just hand over a document. Provide a living portal of security intelligence. Our interactive dashboard transforms portable data into actionable insights through dynamic pie charts and trend analysis.
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
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: "#475569" }}>{item.text}</span>
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
    <section ref={ref} style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 40 }}
        >
          The AI Edge
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Automated Risk Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#f8fafc", borderRadius: 14, padding: 28,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ color: "#f59e0b", fontSize: 18 }}>⚡</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Automated Risk Explanation</h3>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 16 }}>
              Our AI cross-references findings with current threat intelligence to explain why a specific vulnerability matters to *your* business, not just to CVSS score.
            </p>
            <div style={{
              background: "#0f172a", borderRadius: 8, padding: 16,
              borderLeft: "3px solid #10b981",
            }}>
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700, fontFamily: "monospace" }}>AI Insight: </span>
              <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace", lineHeight: 1.6 }}>
                &quot;While this XSS is rated medium, its location on your payment gateway increases the risk of credential harvesting by 400% based on recent APT activity.&quot;
              </span>
            </div>
          </motion.div>

          {/* Remediation Guidance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#0f172a", borderRadius: 14, padding: 28,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Remediation Guidance</h3>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
              Personalized fix recommendations that match your team stack, providing code snippets in the exact language used by your developers.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Python", "Node.js", "Go", "Java"].map(tag => (
                <span key={tag} style={{
                  background: "rgba(255,255,255,0.08)", color: "#e2e8f0",
                  fontSize: 12, padding: "4px 10px", borderRadius: 6, fontFamily: "monospace",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* Continuous Updates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#f8fafc", borderRadius: 14, padding: 28,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>🔄</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Continuous Updates</h3>
            </div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
              Reports evolve as you fix vulnerabilities. Each re-verification removes the remediated issue — information is always current.
            </p>
          </motion.div>

          {/* Compliance Mapping */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#f8fafc", borderRadius: 14, padding: 28,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>🗺️</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Compliance Mapping</h3>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                  Automatic mapping to SOC2, HIPAA, and ISO 27001 controls.
                </p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["SOC2", "HIPAA"].map(tag => (
                  <span key={tag} style={{
                    background: "#0f172a", color: "#fff",
                    fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 600,
                  }}>{tag}</span>
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
  const heroRef = useRef(null);
  const workflowRef = useRef(null);
  const workflowInView = useInView(workflowRef, { once: true });

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section style={{
        padding: "80px 0 60px",
        background: "linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0a1628 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* BG grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative" }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 20, padding: "4px 12px", marginBottom: 24,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Reporting Engine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}
            >
              AI-Assisted{" "}
              <span style={{ color: "#10b981", display: "block" }}>Reporting.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75, marginBottom: 36 }}
            >
              Transform raw vulnerability data into boardroom-ready intelligence. Our AI automates the analysis, narrative, and remediation strategies for every finding.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "#10b981", color: "#fff", border: "none",
                padding: "14px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}
            >
              Generate Sample Report
            </motion.button>
          </div>

          {/* Hero illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: 300, height: 240 }}>
              {/* Report card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  background: "#fff", borderRadius: 12, padding: 20,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, marginBottom: 8, width: "60%" }} />
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, marginBottom: 8, width: "80%" }} />
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, marginBottom: 16, width: "50%" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  {[{ c: "#ef4444", w: 40 }, { c: "#f97316", w: 60 }, { c: "#3b82f6", w: 50 }].map((b, i) => (
                    <div key={i} style={{ height: 40, background: b.c, borderRadius: 4, width: b.w, opacity: 0.8 }} />
                  ))}
                </div>
              </motion.div>
              {/* Pie chart orb */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", bottom: 0, right: 0, width: 80, height: 80,
                  borderRadius: "50%",
                  background: "conic-gradient(#ef4444 0% 31%, #f97316 31% 73%, #3b82f6 73% 100%)",
                  boxShadow: "0 0 30px rgba(16,185,129,0.3)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section ref={workflowRef} style={{ padding: "80px 0", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>The Reporting Workflow</h2>
            <p style={{ fontSize: 14, color: "#64748b" }}>Three steps from raw english to comprehensive documentation.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
                style={{
                  background: "#fff", borderRadius: 14, padding: "28px 24px",
                  border: "1px solid #e2e8f0", transition: "box-shadow 0.3s",
                }}
              >
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "rgba(16,185,129,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, marginBottom: 16,
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 10 }}>
                  {step.num}. {step.title}
                </h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas section */}
      <section style={{ padding: "80px 0", background: "#0f172a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}
            >
              One scan.{" "}
              <span style={{ color: "#10b981", display: "block" }}>Infinite Perspectives.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, marginBottom: 24 }}
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
                style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 14, color: "#94a3b8" }}>{item}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Template preview cards */}
            {[
              { title: "TEMPLATE #01", tag: "EXECUTIVE", bg: "#fff", content: "bg-light" },
              { title: "TEMPLATE #02", tag: "TECHNICAL", bg: "#1e293b", content: "bg-dark" },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  background: card.bg, borderRadius: 12, overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  border: `1px solid ${i === 0 ? "#e2e8f0" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <div style={{
                  padding: "10px 12px", background: i === 0 ? "#f8fafc" : "#0f172a",
                  borderBottom: `1px solid ${i === 0 ? "#e2e8f0" : "rgba(255,255,255,0.06)"}`,
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: i === 0 ? "#64748b" : "#475569", fontFamily: "monospace" }}>{card.title}</span>
                  <span style={{ fontSize: 9, color: i === 0 ? "#10b981" : "#94a3b8", fontWeight: 600 }}>{card.tag}</span>
                </div>
                <div style={{ padding: 12 }}>
                  {[60, 90, 75, 50, 80].map((w, j) => (
                    <div key={j} style={{
                      height: 6, borderRadius: 3, marginBottom: 6,
                      background: i === 0 ? "#e2e8f0" : "rgba(255,255,255,0.1)",
                      width: `${w}%`,
                    }} />
                  ))}
                  {i === 0 && (
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "conic-gradient(#ef4444 0% 30%, #f97316 30% 70%, #3b82f6 70% 100%)",
                      margin: "12px auto 0",
                    }} />
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
      <section style={{ padding: "80px 24px", background: "#0f172a" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 760, margin: "0 auto", textAlign: "center",
            background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #0f766e 100%)",
            borderRadius: 20, padding: "64px 48px", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          <h2 style={{ fontSize: 34, fontWeight: 900, color: "#fff", marginBottom: 12, position: "relative" }}>
            Stop writing reports.{" "}
            <span style={{ display: "block" }}>Start securing apps.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 36, position: "relative" }}>
            Join 500+ security teams who have automated their reporting workflows with Guardian AI.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
            <motion.button
              whileHover={{ scale: 1.04, background: "#fff" }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "#fff", color: "#059669", border: "none",
                padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "background 0.2s",
              }}
            >
              Try It Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "transparent", color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
                padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
              }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
