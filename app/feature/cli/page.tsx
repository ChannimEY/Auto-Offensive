"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const cliLines = [
  { text: "$ pentest login", color: "#e2e8f0" },
  { text: "Authenticating with Guardian Cloud... [OK]", color: "#10b981" },
  { text: "", color: "" },
  { text: "$ pentest nmap --target guardian-secure-node.sh", color: "#e2e8f0" },
  { text: "[SYS] Initiating remote scan cluster...", color: "#94a3b8" },
  { text: "[SYS] Dispatching Nmap 7.92 to Edge Node #412", color: "#94a3b8" },
  { text: "[NET] Port 80/tcp OPEN (http)", color: "#10b981" },
  { text: "[NET] Port 443/tcp OPEN (https)", color: "#10b981" },
  { text: "● Success: Scan completed in 1.4s", color: "#10b981" },
];

const featureCards = [
  {
    icon: "🖥",
    title: "Remote Execution",
    highlight: "auto-off scan",
    desc: "Executing auto-off scan triggers high-performance remote API containers. We handle the heavy lifting and resource-intensive processing on our hardened cloud infrastructure, keeping your local machine cool and responsive.",
    img: "laptop",
  },
  {
    icon: "🔐",
    title: "Cloud Sync & Auth",
    desc: "Seamlessly authenticate using browser-based OAuth or secure API keys. Once logged in, every local command and scan history is automatically synced to your secure web dashboard, allowing you to pick up where you left off on any device.",
    img: "lock",
  },
  {
    icon: "⚡",
    title: "Instant Results",
    highlight: "guardian get-report [id]",
    desc: "No more waiting for local report generation. The CLI outputs short, shareable URLs for real-time viewing and direct download commands like guardian get-report [id] to pull raw JSON or PDF data directly to your local workspace.",
    img: "chart",
  },
];

const specs = [
  { label: "Supported OS", value: "Linux, macOS (Apple Silicon/Intel), Windows" },
  { label: "Binary Size", value: "<10.2 MB" },
  { label: "Encryption", value: "TLS 1.3 + AES-256 (End-to-End)" },
  { label: "Auth Method", value: "OAuth2 / PKCE / MFA Support" },
  { label: "Latency", value: "<40ms (Global Edge Network)" },
];

const workflowSteps = [
  { icon: "💻", title: "Local Command", desc: "User triggers tool via local CLI binary." },
  { icon: "⚙️", title: "Backend Execution", desc: "Containerized environment runs heavy logic." },
  { icon: "📡", title: "Real-time Stream", desc: "Live tool output piped back to local terminal." },
  { icon: "📄", title: "Final Result", desc: "Automated report sync & local artifact save." },
];

function AnimatedCLI() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= cliLines.length) clearInterval(t);
    }, 400);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -5 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        background: "#1a1a2e",
        border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(16,185,129,0.1), 0 30px 60px rgba(0,0,0,0.6)",
        fontFamily: "monospace",
        fontSize: 13,
      }}
    >
      <div style={{
        background: "#12122a", padding: "10px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
        <span style={{ marginLeft: 8, color: "#475569", fontSize: 12 }}>bash — autonomous-cli — 80×24</span>
      </div>
      <div style={{ padding: "20px 24px", minHeight: 220 }}>
        {cliLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            style={{ color: line.color, marginBottom: line.text ? 6 : 8, minHeight: line.text ? "auto" : 8 }}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < cliLines.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ display: "inline-block", width: 8, height: 14, background: "#10b981", verticalAlign: "middle" }}
          />
        )}
      </div>
    </motion.div>
  );
}

function FeatureCard({ card, index, inView }: { card: typeof featureCards[0]; index: number; inView: boolean }) {
  const imgMap: Record<string, string> = {
    laptop: "💻",
    lock: "🔒",
    chart: "📊",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, borderColor: "rgba(16,185,129,0.4)" }}
      style={{
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      <div style={{ padding: "24px 24px 16px" }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>{card.icon}</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{card.title}</h3>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
          {card.highlight
            ? card.desc.split(card.highlight).map((part, i) => (
                <span key={i}>
                  {part}
                  {i === 0 && (
                    <span style={{
                      background: "rgba(16,185,129,0.15)", color: "#10b981",
                      padding: "1px 6px", borderRadius: 4, fontFamily: "monospace", fontSize: 12,
                    }}>{card.highlight}</span>
                  )}
                </span>
              ))
            : card.desc}
        </p>
      </div>
      <div style={{
        height: 100, background: "linear-gradient(135deg, #0f2942, #1a1a2e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40,
      }}>
        {imgMap[card.img]}
      </div>
    </motion.div>
  );
}

export default function CLIFeature() {
  const featRef = useRef(null);
  const specsRef = useRef(null);
  const workflowRef = useRef(null);
  const featInView = useInView(featRef, { once: true });
  const specsInView = useInView(specsRef, { once: true });
  const workflowInView = useInView(workflowRef, { once: true });

  return (
    <div style={{ background: "#020817", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>
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
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Feature 3: Remote CLI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 46, fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}
            >
              Command Without{" "}
              <span style={{ color: "#10b981" }}>Limits</span>:{" "}
              <span style={{ display: "block", fontSize: 40 }}>Managed Security CLI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.75, marginBottom: 36 }}
            >
              Run 20+ professional security tools from your local terminal with zero installation. All processing happens on our secure cloud infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#10b981", color: "#fff", border: "none",
                  padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <span style={{ fontSize: 16 }}>↓</span> Install the CLI
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
                View Documentation
              </motion.button>
            </motion.div>
          </div>

          <AnimatedCLI />
        </div>
      </section>

      {/* Feature Cards */}
      <section ref={featRef} style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {featureCards.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} inView={featInView} />
          ))}
        </div>
      </section>

      {/* Specs */}
      <section ref={specsRef} style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 28, fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 12 }}
          >
            Engineering Precision
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={specsInView ? { width: 60 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: 3, background: "#10b981", margin: "0 auto 48px" }}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            {/* Specs table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={specsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#64748b" }}>{spec.label}</span>
                  <span style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "monospace" }}>{spec.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Hardened Binary Specs card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                background: "#f8fafc", borderRadius: 12, padding: 28,
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>🛡️</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Hardened Binary Specs</h3>
              </div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
                Our CLI is written in Rust for memory safety and zero-cost abstractions. The execution bridge uses a proprietary gRPC protocol to ensure real-time streaming of tool outputs without the overhead of traditional SSH or VPN connections. Every session is ephemeral and audit-logged.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                {["Rust", "gRPC"].map(t => (
                  <span key={t} style={{ background: "#0f172a", color: "#10b981", fontSize: 12, padding: "4px 10px", borderRadius: 6, fontFamily: "monospace" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 24px" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 780, margin: "0 auto", textAlign: "center",
            background: "linear-gradient(135deg, #0f1f0f, #0f172a)",
            border: "1px solid rgba(16,185,129,0.2)", borderRadius: 20, padding: "56px 48px",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>
            Ready to upgrade your workflow?
          </h2>
          <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 32 }}>
            Experience the power of the Guardian Security Suite without leaving your terminal. Lightweight, secure, and ready for production.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "#10b981", color: "#fff", border: "none",
                padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                cursor: "pointer", fontFamily: "monospace",
              }}
            >
              curl -sL https://guardian.sh | sh 🔗
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
              View Document
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Execution Workflow */}
      <section ref={workflowRef} style={{ padding: "60px 0 80px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 16, fontWeight: 800, color: "#fff", textAlign: "center", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 48 }}
          >
            Execution Workflow
          </motion.h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
            {/* Connector line */}
            <div style={{
              position: "absolute", top: 24, left: "12.5%", right: "12.5%", height: 2,
              background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
            }} />

            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                style={{ textAlign: "center", padding: "0 16px" }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: "#0f172a", border: "2px solid rgba(16,185,129,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, margin: "0 auto 16px",
                }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}