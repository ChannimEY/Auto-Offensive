"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Download,
  FileText,
  Monitor,
  Lock,
  Zap,
  Shield,
  Cpu,
  Radio,
  ClipboardCheck,
  Terminal,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

/* ─── Animations (FIXED & CLEAN) ───────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  },
});


/* ─── CLI DATA ───────────────────────────── */
const cliLines = [
  { text: "$ pentest login", type: "cmd" },
  { text: "Authenticating with Guardian Cloud... [OK]", type: "success" },
  { text: "", type: "blank" },
  { text: "$ pentest nmap --target guardian-secure-node.sh", type: "cmd" },
  { text: "[SYS] Initiating remote scan cluster...", type: "muted" },
  { text: "[SYS] Dispatching Nmap 7.92 to Edge Node #412", type: "muted" },
  { text: "[NET] Port 80/tcp   OPEN (http)", type: "success" },
  { text: "[NET] Port 443/tcp  OPEN (https)", type: "success" },
  { text: "● Success: Scan completed in 1.4s", type: "success" },
];

const lineColor: Record<string, string> = {
  cmd: "text-slate-100",
  success: "text-emerald-400",
  muted: "text-slate-500",
  blank: "",
};


/* ─── Feature cards data ─────────────────────────────────────── */
const featureCards = [
  {
    icon: Monitor,
    accent: "emerald",
    title: "Remote Execution",
    highlight: "auto-off scan",
    desc: "Executing auto-off scan triggers high-performance remote API containers. We handle the heavy lifting and resource-intensive processing on our hardened cloud infrastructure, keeping your local machine cool and responsive.",
    visual: "terminal",
  },
  {
    icon: Lock,
    accent: "blue",
    title: "Cloud Sync & Auth",
    highlight: null,
    desc: "Seamlessly authenticate using browser-based OAuth or secure API keys. Once logged in, every local command and scan history is automatically synced to your secure web dashboard, allowing you to pick up where you left off on any device.",
    visual: "lock",
  },
  {
    icon: Zap,
    accent: "violet",
    title: "Instant Results",
    highlight: "guardian get-report [id]",
    desc: "No more waiting for local report generation. The CLI outputs short, shareable URLs for real-time viewing and direct download commands like guardian get-report [id] to pull raw JSON or PDF data directly to your local workspace.",
    visual: "chart",
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
  { icon: Monitor, title: "Local Command", desc: "User triggers tool via local CLI binary." },
  { icon: Cpu, title: "Backend Execution", desc: "Containerized environment runs heavy logic." },
  { icon: Radio, title: "Real-time Stream", desc: "Live tool output piped back to local terminal." },
  { icon: ClipboardCheck, title: "Final Result", desc: "Automated report sync & local artifact save." },
];

/* ─── Animated CLI ───────────────────────────────────────────── */
function AnimatedCLI() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= cliLines.length) clearInterval(t);
    }, 380);
    return () => clearInterval(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("pentest nmap --target guardian-secure-node.sh");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-primary/20"
      style={{ background: "#0d1117" }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5"
        style={{ background: "#161b22" }}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-xs text-slate-500 font-mono">bash — autonomous-cli — 80×24</span>
        <button onClick={handleCopy}
          className="text-slate-500 hover:text-slate-300 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm min-h-55 space-y-1">
        {cliLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`leading-relaxed ${lineColor[line.type]} ${!line.text ? "h-3" : ""}`}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines < cliLines.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-emerald-400 align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Visual accent for feature cards ───────────────────────── */
function CardVisual({ type, accent }: { type: string; accent: string }) {
  const accentMap: Record<string, string> = {
    emerald: "#10b981",
    blue: "#3b82f6",
    violet: "#8b5cf6",
  };
  const color = accentMap[accent] ?? "#10b981";

  const styles = {
    background: `linear-gradient(135deg, #0a0f1a, #0d1a2e)`,
    borderTop: `1px solid rgba(255,255,255,0.05)`,
  };

  const visuals: Record<string, React.ReactNode> = {
    terminal: (
      <div className="font-mono text-xs space-y-1 text-left px-4 py-4">
        <div className="text-slate-500">$ nmap -sV 192.168.1.0/24</div>
        <div style={{ color }}>Host: 192.168.1.12 — OPEN</div>
        <div style={{ color }}>443/tcp https nginx</div>
        <div className="text-slate-600">Scan complete in 0.8s</div>
      </div>
    ),
    lock: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
            <Lock className="w-6 h-6" style={{ color }} />
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
            style={{ background: `${color}20` }}
          />
        </div>
      </div>
    ),
    chart: (
      <div className="flex items-end gap-1.5 px-6 py-4 justify-center">
        {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: "easeOut" }}
            style={{
              height: h / 1.6,
              transformOrigin: "bottom",
              background: i === 6 ? color : `${color}50`,
              borderRadius: "3px 3px 0 0",
            }}
            className="flex-1"
          />
        ))}
      </div>
    ),
  };

  return (
    <div className="h-24" style={styles}>
      {visuals[type]}
    </div>
  );
}

/* ─── Feature Card ───────────────────────────────────────────── */
function FeatureCard({
  card,
  index,
  inView,
}: {
  card: typeof featureCards[0];
  index: number;
  inView: boolean;
}) {
  const Icon = card.icon;
  const accentClass: Record<string, string> = {
    emerald: "text-emerald-400 bg-primary/10 border-primary/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  };
  const accentHex: Record<string, string> = {
    emerald: "#10b981",
    blue: "#3b82f6",
    violet: "#8b5cf6",
  };

  const renderDesc = () => {
    if (!card.highlight) return <p className="text-sm text-slate-400 dark:text-slate-400 leading-relaxed">{card.desc}</p>;
    const parts = card.desc.split(card.highlight);
    return (
      <p className="text-sm text-slate-400 leading-relaxed">
        {parts[0]}
        <code className="px-1.5 py-0.5 rounded text-xs mx-0.5 font-mono"
          style={{ background: `${accentHex[card.accent]}18`, color: accentHex[card.accent] }}>
          {card.highlight}
        </code>
        {parts[1]}
      </p>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, borderColor: `${accentHex[card.accent]}50` }}
      className="rounded-2xl overflow-hidden border border-white/8 dark:border-slate-800
        bg-slate-900 dark:bg-slate-900 transition-all duration-300
        hover:shadow-xl"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="p-6">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${accentClass[card.accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white mb-3">{card.title}</h3>
        {renderDesc()}
      </div>
      <CardVisual type={card.visual} accent={card.accent} />
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function CLIFeature() {
 
  const featRef = useRef(null);
  const specsRef = useRef(null);
  const workflowRef = useRef(null);
  const ctaRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });
  const specsInView = useInView(specsRef, { once: true, margin: "-80px" });
  const workflowInView = useInView(workflowRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
  
      <div className="min-h-screen bg-[#030712] dark:bg-[#030712] font-sans text-white transition-colors duration-300">



        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24">
          {/* Grid texture */}
          <div className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
          {/* Glow */}
          <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 rounded-full
            bg-primary/5 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

<div>
  <motion.div {...fadeUp(0)} className="mb-5">
    <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase
      bg-primary/10 text-emerald-400 border border-primary/20 rounded-full px-3 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Feature 3: Remote CLI
    </span>
  </motion.div>

  <motion.h1
    {...fadeUp(0.1)}
    className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-5"
  >
    Command Without{" "}
    <span className="text-emerald-400">Limits</span>:{" "}
    <span className="block text-3xl sm:text-4xl lg:text-5xl mt-1 text-slate-300">
      Managed Security CLI
    </span>
  </motion.h1>

  <motion.p
    {...fadeUp(0.2)}
    className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-md"
  >
    Run 20+ professional security tools from your local terminal with zero installation.
    All processing happens on our secure cloud infrastructure.
  </motion.p>

  <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
    <motion.button
      whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(16,185,129,0.35)" }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold
        bg-primary hover:bg-emerald-400 text-white transition-colors shadow-lg shadow-primary/20"
    >
      <Download className="w-4 h-4" /> Install the CLI
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold
        border border-white/15 text-slate-300 hover:bg-white/5 transition-colors"
    >
      <FileText className="w-4 h-4" /> View Documentation
    </motion.button>
  </motion.div>
</div>

              {/* Right — CLI */}
              <AnimatedCLI />
            </div>
          </div>
        </section>

        {/* ── Feature Cards ── */}
        <section ref={featRef} className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((card, i) => (
              <FeatureCard key={i} card={card} index={i} inView={featInView} />
            ))}
          </div>
        </section>

        {/* ── Engineering Precision ── */}
        <section ref={specsRef} className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Engineering Precision</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={specsInView ? { width: 56 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-0.5 bg-primary mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Specs table */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={specsInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4
                    ${i < specs.length - 1 ? "border-b border-white/5" : ""}
                    hover:bg-white/2 transition-colors`}>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">{spec.label}</span>
                  <span className="text-sm text-slate-200 font-mono">{spec.value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Hardened Binary Specs card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl p-7 bg-slate-50 dark:bg-slate-900
                border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20
                  flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Hardened Binary Specs</h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                Our CLI is written in Rust for memory safety and zero-cost abstractions. The execution bridge uses a
                proprietary gRPC protocol to ensure real-time streaming of tool outputs without the overhead of
                traditional SSH or VPN connections. Every session is ephemeral and audit-logged.
              </p>
              <div className="flex gap-2">
                {["Rust", "gRPC", "mTLS"].map((tag) => (
                  <code key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg font-mono
                      bg-slate-900 dark:bg-slate-800 text-emerald-400 border border-slate-700">
                    {tag}
                  </code>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaRef} className="px-4 sm:px-6 lg:px-8 pb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden text-center px-6 py-14 sm:px-12 sm:py-16
              border border-primary/15"
            style={{ background: "linear-gradient(135deg, #071a12, #0a0f1f)" }}>
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-32 rounded-full bg-primary/8 blur-3xl" />
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 }}>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Ready to upgrade your workflow?
                </h2>
                <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                  Experience the power of the Guardian Security Suite without leaving your terminal.
                  Lightweight, secure, and ready for production.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(16,185,129,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-mono font-bold
                    bg-primary hover:bg-emerald-400 text-white transition-colors w-full sm:w-auto justify-center">
                  <Terminal className="w-4 h-4" />
                  curl -sL https://guardian.sh | sh
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
                    border border-white/15 text-slate-300 hover:bg-white/5 transition-colors
                    w-full sm:w-auto justify-center">
                  View Document <ExternalLink className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── Execution Workflow ── */}
        <section ref={workflowRef}
          className="px-4 sm:px-6 lg:px-8 pb-24 max-w-7xl mx-auto
            border-t border-white/5 pt-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-black text-white text-center tracking-[0.25em] uppercase mb-14">
            Execution Workflow
          </motion.h2>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px
              bg-linear-to-r from-transparent via-primary/25 to-transparent z-0" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {workflowSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={workflowInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.13 }}
                    className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4
                      border-2 border-primary/25 bg-slate-900/80">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
  
  );
}


