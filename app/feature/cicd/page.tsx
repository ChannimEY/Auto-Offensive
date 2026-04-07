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
    <div style={{ background: "#020817", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#fff" }}>

      {/* ── Hero ── */}
      <section style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
        {/* bg grid */}
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
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>↔ SAST Module</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}
            >
              Repository<br />
              <span style={{ color: "#10b981" }}>Scanning.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.8, marginBottom: 36, maxWidth: 420 }}
            >
              Guardian AI integrates directly into your SDLC, providing deep-code analysis and instant vulnerability identification before your code even reaches production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "10px 18px",
              }}>
                <span style={{ fontSize: 13, color: "#94a3b8" }}>📦</span>
                <code style={{ fontSize: 13, color: "#10b981", fontFamily: "monospace" }}>npm install @guardian/sast</code>
              </div>
            </motion.div>
          </div>

          {/* Isometric illustration placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              background: "linear-gradient(135deg, #0f2942 0%, #1e3a5f 50%, #0f172a 100%)",
              borderRadius: 20, height: 280,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              border: "1px solid rgba(16,185,129,0.15)",
              boxShadow: "0 0 60px rgba(16,185,129,0.1)",
            }}
          >
            {/* Stacked blocks visual */}
            <div style={{ position: "relative" }}>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    width: 120 - i * 10, height: 16,
                    background: `rgba(16,185,129,${0.6 - i * 0.12})`,
                    borderRadius: 4, margin: "0 auto 4px",
                    boxShadow: `0 2px 8px rgba(16,185,129,${0.4 - i * 0.08})`,
                  }}
                />
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center" }}>
                {["🐙", "🦊", "🪣"].map((icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                    style={{
                      width: 40, height: 40, borderRadius: 8,
                      background: "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
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
      <section ref={pipelineRef} style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 32, height: 2, background: "#10b981" }} />
              <span style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>The Analysis Pipeline</span>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {pipelineSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                style={{
                  background: step.active
                    ? "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)"
                    : "#0f172a",
                  borderRadius: 14, padding: "24px 20px",
                  border: step.active ? "none" : "1px solid rgba(255,255,255,0.06)",
                  position: "relative", overflow: "hidden",
                  boxShadow: step.active ? "0 8px 32px rgba(99,102,241,0.3)" : "none",
                }}
              >
                {step.active && (
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }} />
                )}
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: step.active ? "rgba(255,255,255,0.15)" : "rgba(16,185,129,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, marginBottom: 14, position: "relative",
                }}>
                  {step.icon}
                </div>
                <h3 style={{
                  fontSize: 14, fontWeight: 700,
                  color: step.active ? "#fff" : "#e2e8f0",
                  marginBottom: 8, position: "relative",
                }}>
                  {step.num}. {step.title}
                </h3>
                <p style={{
                  fontSize: 12, lineHeight: 1.65,
                  color: step.active ? "rgba(255,255,255,0.7)" : "#64748b",
                  position: "relative",
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SQL Injection Finding ── */}
      <section ref={vulnRef} style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Code panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={vulnInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              background: "#0d1117", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
              fontFamily: "monospace", fontSize: 12,
            }}
          >
            {/* Title bar */}
            <div style={{
              background: "#161b22", padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ marginLeft: 8, color: "#64748b", fontSize: 11 }}>AUTH_SERVICE.PY — VULNERABLE</span>
              </div>
              <span style={{ color: "#ef4444", fontSize: 10, fontWeight: 600 }}>LINE 143/356</span>
            </div>

            <div style={{ padding: "16px 20px" }}>
              <div style={{ color: "#64748b", marginBottom: 4 }}>def validate_user(username, password):</div>
              <div style={{ color: "#64748b", marginBottom: 4, paddingLeft: 16 }}># Establish database connection</div>
              <div style={{ color: "#94a3b8", marginBottom: 4, paddingLeft: 16 }}>
                <span style={{ color: "#7dd3fc" }}>sql</span> = <span style={{ color: "#ef4444", background: "rgba(239,68,68,0.1)", padding: "1px 4px", borderRadius: 3 }}>f"SELECT * FROM users WHERE user = </span>
              </div>
              <div style={{ color: "#94a3b8", marginBottom: 4, paddingLeft: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>cursor.execute(query)</span>
                <span style={{ background: "#ef4444", color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>SQL INJECTION</span>
              </div>
              <div style={{ color: "#64748b", marginBottom: 16, paddingLeft: 32 }}>result = cursor.fetchone()</div>

              {/* Remediation snippet */}
              <div style={{ background: "#0f172a", borderRadius: 8, padding: 14, border: "1px solid rgba(16,185,129,0.15)" }}>
                <div style={{ fontSize: 10, color: "#10b981", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>REMEDIATION SNIPPET</div>
                <div style={{ color: "#94a3b8" }}><span style={{ color: "#64748b" }}># Use parameterized queries to prevent injection</span></div>
                <div style={{ color: "#7dd3fc" }}>query = <span style={{ color: "#10b981" }}>"SELECT * FROM users WHERE user = %s"</span></div>
                <div style={{ color: "#94a3b8" }}>cursor.execute(query, (username,))</div>
              </div>
            </div>
          </motion.div>

          {/* Critical flaw card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={vulnInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{
              background: "#fff", borderRadius: 14, padding: "24px",
              border: "1px solid #e2e8f0", marginBottom: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ color: "#ef4444" }}>🔴</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>Critical Flaw</span>
              </div>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>
                SQL Injection Vulnerability: The application is concatenating untrusted user input directly into a SQL query string. An attacker could bypass authentication by providing a malicious payload like{" "}
                <code style={{ background: "#fef2f2", color: "#ef4444", padding: "1px 5px", borderRadius: 3, fontSize: 12 }}>' OR '1'='1</code>.
              </p>

              {[
                { label: "Confidence Score", value: "98% (High)", color: "#10b981" },
                { label: "CVE Reference", value: "CWE-89", color: "#3b82f6" },
                { label: "Estimated Fix Time", value: "5 Minutes", color: "#0f172a" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid #f1f5f9",
                }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</span>
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", marginTop: 20, padding: "12px",
                  background: "#10b981", color: "#fff", border: "none",
                  borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}
              >
                🔧 Create Fix Pull Request
              </motion.button>
            </div>

            {/* Pre-Active Detection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={vulnInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              style={{
                background: "linear-gradient(135deg, #1e3a5f, #0f2942)",
                borderRadius: 12, padding: "18px 20px",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
                <span style={{ fontSize: 13, color: "#93c5fd", fontWeight: 600 }}>Pre-Active Detection</span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", marginTop: 8, lineHeight: 1.6 }}>
                This vulnerability was caught before reaching staging. Guardian AI blocked the PR automatically.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CI/CD Integration ── */}
      <section ref={cicdRef} style={{ padding: "60px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cicdInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 8 }}
          >
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 8 }}>CI/CD Integration Guide</h2>
            <p style={{ fontSize: 14, color: "#64748b", maxWidth: 460 }}>
              Deploy Guardian AI into your existing workflow in seconds. Copy these pre-written YAML snippets to start blocking insecure commits today.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }}>
            {/* YAML panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={cicdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                background: "#0d1117", borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
              }}
            >
              {/* Tab bar */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                {(["github", "gitlab"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "10px 20px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
                      background: activeTab === tab ? "#161b22" : "transparent",
                      color: activeTab === tab ? "#fff" : "#64748b",
                      borderBottom: activeTab === tab ? "2px solid #10b981" : "2px solid transparent",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {tab === "github" ? "GitHub Actions" : "GitLab CI"}
                  </button>
                ))}
              </div>
              <pre style={{ padding: "20px 24px", margin: 0, fontSize: 12, color: "#94a3b8", lineHeight: 1.7, overflowX: "auto", fontFamily: "monospace" }}>
                <code>{activeTab === "github" ? githubYaml : gitlabYaml}</code>
              </pre>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={cicdInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 8 }}
            >
              {[
                { icon: "⬅️", title: "Shift Left Security", desc: "Prevent vulnerabilities from reaching the main branch with automated PR checks." },
                { icon: "🤖", title: "Native CI Tooling", desc: "Prefer a custom script? Our CLI supports exit codes for automated build failures." },
                { icon: "📋", title: "Full Audit Trail", desc: "Every scan result is logged with detailed history for compliance reporting." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={cicdInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: "rgba(16,185,129,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0,
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Secret Exposure ── */}
      <section ref={secretRef} style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Config code panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={secretInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              background: "#0d1117", borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden",
              fontFamily: "monospace", fontSize: 12,
            }}
          >
            <div style={{
              background: "#161b22", padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
                <span style={{ marginLeft: 8, color: "#64748b", fontSize: 11 }}>CONFIG/SETTINGS.YAML — LEAKED SECRET</span>
              </div>
              <span style={{ color: "#f59e0b", fontSize: 10, fontWeight: 600 }}>LINE 81</span>
            </div>

            <div style={{ padding: "16px 20px" }}>
              <div style={{ color: "#64748b", marginBottom: 4 }}>production:</div>
              <div style={{ color: "#94a3b8", marginBottom: 4, paddingLeft: 16 }}>
                database_url: <span style={{ color: "#7dd3fc" }}>"postgres://db-internal:5432"</span>
              </div>
              <div style={{ color: "#94a3b8", marginBottom: 4, paddingLeft: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>aws_secret_key: <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", padding: "1px 4px", borderRadius: 3 }}>AKIAIOSFODNN7EXAMPLE...</span></span>
                <span style={{ background: "#ef4444", color: "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>⚠ HARDCODED SECRET</span>
              </div>
              <div style={{ color: "#64748b", paddingLeft: 16, marginBottom: 16 }}>
                ms_endpoint: <span style={{ color: "#7dd3fc" }}>"https://api.guardian.ai"</span>
              </div>

              <div style={{ background: "#0f172a", borderRadius: 8, padding: 14, border: "1px solid rgba(239,68,68,0.15)" }}>
                <div style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10 }}>RECOMMENDED ACTION</div>
                <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.65 }}>
                  This AWS Access Key was detected in plain text. We recommend revoking the key immediately and moving it to a secure Secret Manager (e.g., AWS Secrets Manager or Vault).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Secret Exposure card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={secretInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div style={{
              background: "#fff", borderRadius: 14, padding: "24px",
              border: "1px solid #e2e8f0",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span>🔴</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#ef4444", letterSpacing: "0.08em", textTransform: "uppercase" }}>Secret Exposure</span>
              </div>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>
                <strong>Leaked Credentials:</strong> Guardian AI identified an active AWS Access Key embedded in your configuration. This poses a critical risk of unauthorized infrastructure access.
              </p>

              {[
                { label: "Detection Type", value: "Entropy & Pattern Match", color: "#10b981" },
                { label: "Secret Validity", value: "Verified Active", color: "#10b981" },
                { label: "Exposure Range", value: "Public & Private Repos", color: "#ef4444" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid #f1f5f9",
                }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</span>
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(239,68,68,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%", marginTop: 20, padding: "12px",
                  background: "#ef4444", color: "#fff", border: "none",
                  borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}
              >
                🔄 Revoke & Rotate Secret
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Developer Experience ── */}
      <section ref={devExpRef} style={{ padding: "60px 0 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={devExpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              background: "#f8fafc", borderRadius: 16, padding: "36px 32px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
              Developer Experience First.
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 32 }}>
              Security shouldn't be a bottleneck. Guardian AI provides clear, actionable feedback directly in your developers' preferred environment.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={devExpInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 }}
                  style={{ fontSize: 36, fontWeight: 900, color: "#10b981" }}
                >
                  99.8%
                </motion.div>
                <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>Scan Uptime</div>
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={devExpInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                  style={{ fontSize: 36, fontWeight: 900, color: "#0f172a" }}
                >
                  &lt; 3s
                </motion.div>
                <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>PR Feedback Loop</div>
              </div>
            </div>
          </motion.div>

          {/* Cloud Native */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={devExpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderRadius: 16, padding: "36px 32px",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }} />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 52, height: 52, borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 20, position: "relative",
              }}
            >
              ☁️
            </motion.div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12, position: "relative" }}>Cloud Native</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, position: "relative" }}>
              Support for GitHub, GitLab, Bitbucket, and self-hosted instances. Zero infrastructure maintenance required.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}