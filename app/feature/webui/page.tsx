"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const terminalLines = [
  { text: "$ guardian-ai scan start", color: "#e2e8f0", delay: 0 },
  { text: "[+] Initializing Subfinder...", color: "#10b981", delay: 0.4 },
  { text: "[+] Found 142 subdomains", color: "#10b981", delay: 0.8 },
  { text: "[+] Naabu: Port scanning active", color: "#10b981", delay: 1.2 },
  { text: "[-] CVE-2023-XXXX detected on dev.api...", color: "#f59e0b", delay: 1.6 },
];

const liveScanLines = [
  { time: "14:20:01", level: "INFO", text: "Loading configuration from cloud-vault...", color: "#94a3b8" },
  { time: "14:20:05", level: "SUBFINDER", text: "Enumerating targets for api.guardian.ai", color: "#10b981" },
  { time: "", level: "", text: "- dev.api.guardian.ai [Found]", color: "#10b981" },
  { time: "", level: "", text: "- staging.api.guardian.ai [Found]", color: "#10b981" },
  { time: "14:20:12", level: "NAABU", text: "Starting fast port scan on 12 targets", color: "#f59e0b" },
  { time: "", level: "", text: "- 10.0.4.12:443 [OPEN]", color: "#94a3b8" },
  { time: "", level: "", text: "- 10.0.4.12:80 [OPEN]", color: "#94a3b8" },
  { time: "", level: "", text: "- 10.0.4.15:22 [OPEN]", color: "#94a3b8" },
  { time: "14:20:45", level: "NUCLEI", text: "Template match: CVE-2023-XXXX on dev.api...", color: "#ef4444" },
];

const tools = [
  { name: "Subfinder", icon: "⚡", checked: true },
  { name: "Naabu", icon: "🔍", checked: true },
  { name: "Nuclei", icon: "🛡️", checked: false },
];

const steps = [
  {
    num: "1",
    title: "Target Input & Scope",
    desc: "Paste your root domains, IP ranges, or CIDR blocks. Guardian AI automatically validates ownership through integrated cloud connector APIs.",
  },
  {
    num: "2",
    title: "Tool Chain Selection",
    desc: "Choose from our curated library of top-tier offensive security tools. Enable 'Auto-Mode' to let our AI select the best tools based on the target's technology stack.",
  },
  {
    num: "3",
    title: "Autonomous Execution",
    desc: "The engine starts the sub-process chain. Data flows seamlessly from one tool to the next — Subfinder's output becomes Naabu's input automatically.",
  },
];

const benefits = [
  {
    icon: "⏱",
    title: "90% Faster Setup",
    desc: "Reduce scan configuration time from hours of scripting to seconds of toggling. Deploy complex reconnaissance pipelines instantly.",
  },
  {
    icon: "👥",
    title: "Democratized Security",
    desc: "Enable analysts of all skill levels to run professional-grade tests without deep CLI knowledge, freeing senior staff for high-level strategy.",
  },
  {
    icon: "⚙️",
    title: "Centralized Logic",
    desc: "Standardize your testing methodology across the entire organization. Ensure consistent tool flags and update versions globally with one click.",
  },
];

function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= terminalLines.length) clearInterval(timer);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2942 100%)",
        border: "1px solid rgba(16,185,129,0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(16,185,129,0.15), 0 25px 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Window bar */}
      <div style={{ background: "#1e293b", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>guardian-ai terminal</span>
        <div style={{ marginLeft: "auto", background: "rgba(16,185,129,0.15)", color: "#10b981", fontSize: 10, padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(16,185,129,0.3)" }}>CONNECTED</div>
      </div>
      <div style={{ padding: "20px 24px", minHeight: 160, fontFamily: "monospace", fontSize: 13 }}>
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} style={{ color: line.color, marginBottom: 6 }}>
            {line.text}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ color: "#10b981", display: "inline-block", width: 8, height: 14, background: "#10b981", verticalAlign: "middle" }}
        />
      </div>
    </motion.div>
  );
}

function LiveScanSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [checkedTools, setCheckedTools] = useState([true, true, false]);

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#020817" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}
        >
          <div style={{ width: 32, height: 2, background: "#10b981" }} />
          <span style={{ color: "#10b981", fontSize: 13, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>The Orchestration Engine</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginTop: 32 }}>
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              background: "#0f172a",
              borderRadius: 12,
              border: "1px solid rgba(16,185,129,0.15)",
              overflow: "hidden",
              fontFamily: "monospace",
              fontSize: 12,
            }}
          >
            <div style={{ background: "#1e293b", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b" }}>live_output_stream.sh</span>
              <span style={{ color: "#10b981", fontSize: 11, letterSpacing: "0.08em" }}>● ACTIVE SCAN</span>
            </div>
            <div style={{ padding: "16px 20px" }}>
              {liveScanLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
                  style={{ marginBottom: 5, color: line.color }}
                >
                  {line.time && <span style={{ color: "#475569" }}>[{line.time}] </span>}
                  {line.level && <span style={{ color: line.level === "SUBFINDER" ? "#10b981" : line.level === "NAABU" ? "#f59e0b" : line.level === "NUCLEI" ? "#ef4444" : "#64748b" }}>{line.level}: </span>}
                  <span>{line.text}</span>
                </motion.div>
              ))}
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ display: "inline-block", width: 8, height: 2, background: "#10b981" }} />
            </div>
          </motion.div>

          {/* Tool config */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              background: "#0E172A",
              borderRadius: 12,
              padding: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fffff", marginBottom: 4 }}>Tool Configuration</h3>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Select your automated stack. No syntax flags required.</p>
            {tools.map((tool, i) => (
              <div
                key={i}
                onClick={() => {
                  const next = [...checkedTools];
                  next[i] = !next[i];
                  setCheckedTools(next);
                }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", borderRadius: 8, marginBottom: 10, cursor: "pointer",
                  border: `1px solid ${checkedTools[i] ? "#10b981" : "#e2e8f0"}`,
                  background: checkedTools[i] ? "rgba(16,185,129,0.05)" : "#f8fafc",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: "#1e293b" }}>{tool.icon} {tool.name}</span>
                <div style={{
                  width: 20, height: 20, borderRadius: 4, border: `2px solid ${checkedTools[i] ? "#10b981" : "#cbd5e1"}`,
                  background: checkedTools[i] ? "#10b981" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                }}>
                  {checkedTools[i] && <span style={{ color: "#cbd5e1", fontSize: 12 }}>✓</span>}
                </div>
              </div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "12px", background: "#10b981", color: "#fff",
                border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8,
              }}
            >
              Update Live Scan
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#020817" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "300px 1fr", gap: 60 }}>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", lineHeight: 1.2, marginBottom: 16 }}
          >
            How it Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 32 }}
          >
            The transition from manual terminal inputs to autonomous orchestration is handled by our Guardian Kernel.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ background: "#0f172a", borderRadius: 10, padding: 20, border: "1px solid rgba(16,185,129,0.2)" }}
          >
            <div style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10, fontFamily: "monospace" }}>TECHNICAL NOTE</div>
            <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, fontFamily: "monospace" }}>
              "Our backend translates your UI selections into optimized Go-binary commands, handling concurrency and resource management automatically."
            </p>
          </motion.div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 8 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: "transparent",
                border: "2px solid #1e293b", color: "#1e293b", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: "80px 0", background: "#020817", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: 28, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 48 }}
        >
          Engineered for Enterprise ROI
        </motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, borderColor: "rgba(16,185,129,0.4)" }}
              style={{
                background: "#0f172a", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: 28, transition: "border-color 0.3s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{b.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{b.title}</h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WebUIFeature() {
  return (
    <div style={{ background: "#020817", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0 60px", background: "#020817" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
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
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Auto-Offensive Suite</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 48, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}
            >
              Orchestrate Scans{" "}
              <span style={{ color: "#10b981", display: "block" }}>Without the CLI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}
            >
              Guardian AI bridges the gap between powerful open-source security tools and enterprise-grade usability. Run Subfinder, Naabu, and Nuclei in a seamless, unified workflow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: "flex", gap: 12 }}
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#10b981", color: "#fff", border: "none",
                  padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer",
                }}
              >
                Launch First Scan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                Watch Demo
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
      <section style={{ padding: "80px 24px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 900, margin: "0 auto", textAlign: "center",
            background: "linear-gradient(135deg, #0f2942 0%, #0f172a 50%, #0a1f0a 100%)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: 20, padding: "64px 48px",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(16,185,129,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px", pointerEvents: "none",
          }} />
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", marginBottom: 16, position: "relative" }}>
            Ready to automate your offensive posture?
          </h2>
          <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 36, position: "relative" }}>
            Enterprise-grade reconnaissance pipelines in seconds, not hours.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", position: "relative" }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }} whileTap={{ scale: 0.96 }}
              style={{ background: "#10b981", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Start Your Free Scan
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 28px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
              View Document
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}