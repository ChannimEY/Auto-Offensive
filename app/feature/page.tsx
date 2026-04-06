"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const modules = [
  {
    id: "MODULE 01",
    title: "Web-Based Pentesting Automation",
    desc: "Orchestrate complex security workflows without touching a terminal. Launch industrial-grade tools like Subfinder for discovery, Nmap for port mapping, and Nuclei for vulnerability scanning through a unified, high-fidelity interface.",
    link: "View Documentation →",
    wide: true,
    bg: "#fff",
    textColor: "#0f172a",
    accent: "#10b981",
    preview: "interface",
  },
  {
    id: "",
    title: "AI-Powered Security Analysis",
    desc: "Our neural engine digests raw scanner output to prioritize critical risks and explain complex vulnerabilities in plain, actionable language.",
    link: "View Documentation",
    wide: false,
    bg: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    textColor: "#fff",
    accent: "#fff",
    preview: "ai",
  },
  {
    id: "",
    title: "Repository Scanning (SAST)",
    desc: "Seamless SonarQube integration for GitHub and GitLab. Find vulnerabilities in your source code at the speed of development, featuring AI-suggested remediation blocks.",
    link: "View Documentation",
    wide: false,
    bg: "#f8fafc",
    textColor: "#0f172a",
    accent: "#10b981",
    preview: "sast",
  },
  {
    id: "",
    title: "Managed CLI & API",
    desc: "A robust, cross-platform binary for remote tool execution. Integrate security testing directly into your Jenkins, GitLab, or GitHub CI/CD pipelines.",
    link: "View Documentation ↗",
    wide: false,
    bg: "#f8fafc",
    textColor: "#0f172a",
    accent: "#0f172a",
    preview: "cli",
  },
];

const workflowSteps = [
  {
    icon: "🔍",
    color: "#10b981",
    title: "Enumerate",
    desc: "Discover subdomains, ports, and services.",
  },
  {
    icon: "🐛",
    color: "#ef4444",
    title: "Identify",
    desc: "Map services to known CVE databases.",
  },
  {
    icon: "🚀",
    color: "#0f172a",
    title: "Execute",
    desc: "Launch payloads via the remote CLI nodes.",
  },
  {
    icon: "📄",
    color: "#10b981",
    title: "Document",
    desc: "Export evidence and mitigation paths.",
  },
];

function ModulePreview({ type, dark }: { type: string; dark?: boolean }) {
  const base = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
  const line = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";

  if (type === "interface") {
    return (
      <div style={{
        background: dark ? "rgba(255,255,255,0.06)" : "#f1f5f9",
        borderRadius: 10, padding: "14px 16px",
        border: `1px solid ${line}`,
        display: "flex", alignItems: "center", justifyContent: "center", minHeight: 80,
      }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ height: 6, width: 80, background: line, borderRadius: 3 }} />
            <div style={{ height: 6, width: 60, background: "#10b981", borderRadius: 3, opacity: 0.6 }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[40, 60, 50, 70, 45].map((w, i) => (
              <div key={i} style={{ height: 28, flex: 1, background: base, borderRadius: 4 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function PlatformCapabilities() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const reportRef = useRef(null);
  const workflowRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });
  const reportInView = useInView(reportRef, { once: true });
  const workflowInView = useInView(workflowRef, { once: true });

  return (
    <div style={{ background: "#020817", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ padding: "100px 0 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px", pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontSize: 72, fontWeight: 900, color: "#fff", lineHeight: 1.0, marginBottom: 24 }}
          >
            Platform<br />Capabilities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}
          >
            Explore our suite of autonomous security tools and AI-driven analysis engines designed to protect your entire digital footprint.
          </motion.p>
        </div>
      </section>

      {/* ── Module Grid ── */}
      <section ref={gridRef} style={{ padding: "0 0 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

          {/* Row 1: Wide + narrow */}
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* MODULE 01 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.15)" }}
              style={{
                background: "#fff", borderRadius: 20, padding: "36px 32px",
                border: "1px solid #e2e8f0", transition: "box-shadow 0.3s, transform 0.3s",
              }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                borderRadius: 6, padding: "3px 10px", marginBottom: 20,
              }}>
                <span style={{ fontSize: 14 }}>🖥️</span>
                <span style={{ fontSize: 10, color: "#10b981", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Module 01</span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 14 }}>
                Web-Based Pentesting Automation
              </h2>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
                Orchestrate complex security workflows without touching a terminal. Launch industrial-grade tools like Subfinder for discovery, Nmap for port mapping, and Nuclei for vulnerability scanning through a unified, high-fidelity interface.
              </p>
              <a href="#" style={{ fontSize: 14, color: "#10b981", fontWeight: 600, textDecoration: "none" }}>
                View Documentation →
              </a>

              {/* Interface preview */}
              <div style={{
                background: "#f1f5f9", borderRadius: 10, padding: "14px 16px",
                border: "1px solid #e2e8f0", marginTop: 24,
              }}>
                <div style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Interface Banner</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ flex: 1, height: 32, background: "#e2e8f0", borderRadius: 6 }} />
                  ))}
                </div>
                <div style={{ textAlign: "right", marginTop: 10 }}>
                  <div style={{ display: "inline-block", height: 24, width: 80, background: "#10b981", borderRadius: 5, opacity: 0.3 }} />
                </div>
              </div>
            </motion.div>

            {/* AI-Powered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(99,102,241,0.25)" }}
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                borderRadius: 20, padding: "36px 32px",
                position: "relative", overflow: "hidden",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }} />
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 20, position: "relative",
              }}>
                🧠
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 14, position: "relative" }}>
                AI-Powered Security Analysis
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 28, position: "relative" }}>
                Our neural engine digests raw scanner output to prioritize critical risks and explain complex vulnerabilities in plain, actionable language.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.25)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,255,255,0.15)", color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8,
                  padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", position: "relative", transition: "background 0.2s",
                }}
              >
                View Documentation
              </motion.button>
            </motion.div>
          </div>

          {/* Row 2: SAST + CLI */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              {
                icon: "⬛",
                title: "Repository Scanning (SAST)",
                desc: "Seamless SonarQube integration for GitHub and GitLab. Find vulnerabilities in your source code at the speed of development, featuring AI-suggested remediation blocks.",
                link: "View Documentation",
                linkColor: "#10b981",
              },
              {
                icon: "🖥",
                title: "Managed CLI & API",
                desc: "A robust, cross-platform binary for remote tool execution. Integrate security testing directly into your Jenkins, GitLab, or GitHub CI/CD pipelines.",
                link: "View Documentation ↗",
                linkColor: "#0f172a",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
                style={{
                  background: "#f8fafc", borderRadius: 20, padding: "32px 28px",
                  border: "1px solid #e2e8f0", transition: "box-shadow 0.3s, transform 0.3s",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "#0f172a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, marginBottom: 20,
                }}>
                  {card.icon}
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>
                  {card.title}
                </h2>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, marginBottom: 24 }}>
                  {card.desc}
                </p>
                <a href="#" style={{ fontSize: 14, color: card.linkColor, fontWeight: 600, textDecoration: "none" }}>
                  {card.link}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-Assisted Reporting ── */}
      <section ref={reportRef} style={{ padding: "20px 0 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={reportInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              background: "#fff", borderRadius: 20, padding: "48px 48px",
              border: "1px solid #e2e8f0", overflow: "hidden",
              display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center",
            }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={reportInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 20, padding: "4px 12px", marginBottom: 20,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Advanced Reporting</span>
              </motion.div>

              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", marginBottom: 16 }}>
                AI-Assisted Reporting
              </h2>
              <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.8, marginBottom: 28, maxWidth: 460 }}>
                Generate professional, multi-tier reports with a single click. From high-level Executive summaries to granular Developer fix-lists, our AI tailors the narrative for every stakeholder.
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
                {["Executive Overview", "Technical Deep-dive", "Developer Patch Notes"].map((tag) => (
                  <span key={tag} style={{
                    background: "#f1f5f9", color: "#475569", fontSize: 12,
                    padding: "6px 14px", borderRadius: 20, border: "1px solid #e2e8f0", fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(16,185,129,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#10b981", color: "#fff", border: "none",
                  padding: "13px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                View Documentation 📄
              </motion.button>
            </div>

            {/* Report illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={reportInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ position: "relative", flexShrink: 0 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 180, height: 220, background: "#fff",
                  borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  border: "1px solid #e2e8f0", padding: 20, position: "relative",
                }}
              >
                {/* Clipboard top */}
                <div style={{
                  width: 48, height: 12, background: "#f59e0b",
                  borderRadius: "4px 4px 0 0", margin: "-20px auto 12px",
                  boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
                }} />
                <div style={{ textAlign: "center", fontWeight: 800, fontSize: 13, color: "#0f172a", marginBottom: 12 }}>REPORT</div>
                {/* Chart bars */}
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", justifyContent: "center", marginBottom: 12 }}>
                  {[30, 50, 40, 60, 45].map((h, i) => (
                    <div key={i} style={{
                      width: 14, height: h,
                      background: ["#ef4444", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"][i],
                      borderRadius: "2px 2px 0 0",
                    }} />
                  ))}
                </div>
                {/* Lines */}
                {[80, 60, 70, 50].map((w, i) => (
                  <div key={i} style={{ height: 5, background: "#f1f5f9", borderRadius: 3, marginBottom: 6, width: `${w}%` }} />
                ))}
              </motion.div>

              {/* AI spark badge */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  position: "absolute", bottom: -8, right: -8,
                  width: 40, height: 40, borderRadius: "50%",
                  background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, boxShadow: "0 0 20px rgba(16,185,129,0.5)",
                }}
              >
                ✨
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Integrated Attack Workflow ── */}
      <section ref={workflowRef} style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#10b981", marginBottom: 12 }}>
              Integrated Attack Workflow
            </h2>
            <p style={{ fontSize: 15, color: "#64748b" }}>
              Seamless transition from identification to exploitation.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative" }}>
            {/* Connector */}
            <div style={{
              position: "absolute", top: 28, left: "12%", right: "12%", height: 1,
              background: "linear-gradient(90deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1), rgba(16,185,129,0.3))",
              zIndex: 0,
            }} />

            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
                style={{
                  background: "#fff", borderRadius: 16, padding: "28px 20px",
                  textAlign: "center", border: "1px solid #e2e8f0",
                  position: "relative", zIndex: 1,
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 12, margin: "0 auto 16px",
                  background: step.color === "#0f172a" ? "#0f172a" : `rgba(${step.color === "#10b981" ? "16,185,129" : "239,68,68"},0.1)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, border: `1px solid ${step.color === "#0f172a" ? "rgba(255,255,255,0.08)" : `rgba(${step.color === "#10b981" ? "16,185,129" : "239,68,68"},0.2)`}`,
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}