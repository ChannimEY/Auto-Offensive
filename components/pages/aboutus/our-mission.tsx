"use client";

import { Fragment, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Slide data
───────────────────────────────────────────── */
const SLIDES = [
  {
    num: "01",
    tag: "Who We Are",
    title: (
      <>
        Security testing<br />
        for <span className="text-primary">every engineer</span>.
      </>
    ),
    body: "Auto-Offensive is a PaaS that automates web, network & code security scanning — powered by AI via MCP Protocol, with zero CLI setup required.",
    visual: "shield",
  },
  {
    num: "02",
    tag: "The Problem",
    title: (
      <>
        Pen-testing was into
        <span className="text-primary"> inaccessible</span>.
      </>
    ),
    body: "Traditional tools demand years of CLI expertise, locking out developers and students. We built a platform that removes every barrier — click Web UI, not command line.",
    visual: "terminal",
  },
  {
    num: "03",
    tag: "Who We Serve",
    title: (
      <>
        Built for <span className="text-primary">real users</span>,
        not just experts.
      </>
    ),
    body: "Software Engineers, Penetration Testers, Security Researchers, Students & Learners — Auto-Offensive gives every audience the same enterprise-grade scanning power.",
    visual: "stats",
  },
  {
    num: "04",
    tag: "Our Vision",
    title: (
      <>
        Shift security left into<span className="text-primary">  every pipeline. </span>
      </>
    ),
    body: "Auto-Offensive integrates into GitHub & GitLab repos and your CI/CD pipeline via API — scanning code quality & vulnerabilities on every push, automatically.",
    visual: "pipeline",
    quote: '"Enterprise-grade offensive security in the hands of every engineer — not just red teams."',
  },
];

/* ─────────────────────────────────────────────
   Path pointer between slides
───────────────────────────────────────────── */
function SlidePathPointer({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="ms-path-pointer w-[30vw] shrink-0 h-full flex flex-col items-center justify-center gap-2.5 pointer-events-none relative"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between w-full px-0.5">
        <span
          className="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-[rgba(0,208,178,.35)]"
          style={{ fontFamily: "var(--font-title, monospace)" }}
        >
          {from}
        </span>
        <span
          className="text-[0.55rem] font-bold tracking-[0.18em] uppercase text-[rgba(0,208,178,.6)]"
          style={{ fontFamily: "var(--font-title, monospace)" }}
        >
          {to}
        </span>
      </div>

      <svg
        className="w-full overflow-visible"
        style={{ height: "48px" }}
        viewBox="0 0 320 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Static dashed path */}
        <path
          d="M 0 24 Q 80 4 160 24 Q 240 44 320 24"
          stroke="rgba(0,208,178,0.22)"
          strokeWidth="1"
          strokeDasharray="5 5"
          fill="none"
        />
        {/* Glowing animated path overlay */}
        <path
          d="M 0 24 Q 80 4 160 24 Q 240 44 320 24"
          stroke="rgba(0,208,178,0.55)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="30 290"
          strokeDashoffset="0"
          className="ms-pp-animated-dash"
        />
        {/* Arrowhead at end */}
        <path
          d="M 310 18 L 320 24 L 310 30"
          stroke="rgba(0,208,178,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Animated traveling dot */}
        <circle r="3" fill="#00D0B2" opacity="0.9">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 0 24 Q 80 4 160 24 Q 240 44 320 24"
            calcMode="spline"
            keySplines="0.4 0 0.6 1"
            keyTimes="0;1"
          />
        </circle>
        {/* Soft glow dot */}
        <circle r="7" fill="#00D0B2" opacity="0.15">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 0 24 Q 80 4 160 24 Q 240 44 320 24"
            calcMode="spline"
            keySplines="0.4 0 0.6 1"
            keyTimes="0;1"
          />
        </circle>
      </svg>

      <div
        className="flex items-center gap-2 text-[0.5rem] font-bold tracking-[0.22em] uppercase text-[rgba(0,208,178,.3)]"
        style={{ fontFamily: "var(--font-body, sans-serif)" }}
      >
        <span className="ms-pp-step-icon text-[0.65rem] text-[rgba(0,208,178,.25)]">⬡</span>
        NEXT
        <span className="ms-pp-step-icon ms-pp-step-icon--last text-[0.65rem] text-[rgba(0,208,178,.25)]">⬡</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Visual sub-components
───────────────────────────────────────────── */
function ShieldVisual() {
  return (
    <div className="relative w-40 h-45 flex items-center justify-center">
      <svg
        viewBox="0 0 120 140"
        fill="none"
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}
      >
        <path
          d="M60 4L8 26v42c0 36 24 68 52 78 28-10 52-42 52-78V26L60 4z"
          stroke="rgba(0,208,178,.15)"
          strokeWidth="1.5"
        />
        <path
          d="M60 14L16 33v35c0 30 20 57 44 66 24-9 44-36 44-66V33L60 14z"
          stroke="rgba(0,208,178,.3)"
          strokeWidth="1"
        />
        <path
          d="M60 24L24 40v28c0 24 16 46 36 54 20-8 36-30 36-54V40L60 24z"
          fill="rgba(0,208,178,.05)"
          stroke="#00D0B2"
          strokeWidth="1.5"
        />
        <path
          d="M42 68l12 12 24-24"
          stroke="#00D0B2"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="ms-vis-pulse" />
      <div className="ms-vis-pulse" style={{ animationDelay: ".6s" }} />
    </div>
  );
}

function TerminalVisual() {
  return (
    <div className="w-[320px] bg-[rgba(10,31,26,.06)] border border-[rgba(0,208,178,.14)] rounded-[10px] overflow-hidden dark:bg-[rgba(0,0,0,.5)]">
      <div className="px-3.5 py-2 bg-[rgba(0,208,178,.04)] border-b border-[rgba(0,208,178,.14)] flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="inline-block w-2 h-2 rounded-full bg-[#febc2e] mx-1" />
        <span className="inline-block w-2 h-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="p-3.5 flex flex-col gap-1.25">
        {[
          { prompt: "$", content: "ao scan --target app.example.com", type: "cmd" },
          { prompt: " ", content: "↳ Running AI-powered CVSS checks...", type: "out" },
          { prompt: " ", content: "✓ 3 critical · 7 high · 12 medium", type: "ok" },
          { prompt: " ", content: "↳ Generating PDF report via SonarQube...", type: "out" },
          { prompt: " ", content: "✓ Report saved: scan_report.pdf", type: "ok" },
        ].map((line, idx) => (
          <div
            key={idx}
            className="text-[0.72rem] flex gap-2 leading-normal"
            style={{ fontFamily: "var(--font-hackdaddy, monospace)" }}
          >
            <span className="text-[rgba(0,208,178,.5)] shrink-0">{line.prompt}</span>
            <span
              className={
                line.type === "ok"
                  ? "text-primary"
                  : line.type === "out"
                  ? "italic"
                  : ""
              }
              style={line.type === "out" ? { color: "var(--dim)" } : line.type === "cmd" ? { color: "var(--text)" } : {}}
            >
              {line.content}
            </span>
          </div>
        ))}
        <div
          className="text-[0.72rem] flex gap-2 leading-normal"
          style={{ fontFamily: "var(--font-hackdaddy, monospace)" }}
        >
          <span className="text-[rgba(0,208,178,.5)] shrink-0">$</span>
          <span className="ms-vt-cursor" />
        </div>
      </div>
    </div>
  );
}

function StatsVisual({ active }: { active: boolean }) {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const c1 = useRef<HTMLSpanElement>(null);
  const c2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active) return;
    setTimeout(() => { if (b1.current) b1.current.style.width = "85%"; }, 300);
    setTimeout(() => { if (b2.current) b2.current.style.width = "72%"; }, 400);
    setTimeout(() => { if (b3.current) b3.current.style.width = "95%"; }, 500);

    const animateCounter = (el: HTMLSpanElement, target: number) => {
      const dur = 1200;
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        el.textContent = String(Math.floor(p * p * (3 - 2 * p) * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (c1.current) animateCounter(c1.current, 5);
    if (c2.current) animateCounter(c2.current, 3);
  }, [active]);

  const statItems = [
    {
      countRef: c1,
      barRef: b1,
      suffix: "+",
      label: "Report formats (HTML · PDF · Excel · Docs)",
    },
    {
      countRef: c2,
      barRef: b2,
      suffix: "x",
      label: "Faster than manual pen-testing",
    },
    {
      countRef: null,
      barRef: b3,
      static: "AI",
      label: "MCP Protocol + SonarQube Rules",
    },
  ];

  return (
    <div className="ms-vis-stats w-full max-w-75 flex flex-col gap-4.5">
      {statItems.map((item, idx) => (
        <div key={idx}>
          <div
            className="text-[1.8rem] font-bold tracking-[-0.04em] leading-none mb-1"
            style={{ color: "var(--text)", fontFamily: "var(--font-title, monospace)" }}
          >
            {item.static ? (
              item.static
            ) : (
              <>
                <span ref={item.countRef}>0</span>
                <em className="text-primary not-italic">{item.suffix}</em>
              </>
            )}
          </div>
          <div
            className="text-[0.65rem] font-medium tracking-[0.08em] uppercase mb-2"
            style={{ color: "var(--dim)", fontFamily: "var(--font-body, sans-serif)" }}
          >
            {item.label}
          </div>
          <div className="h-0.5 bg-[rgba(0,208,178,.12)] rounded-xs overflow-hidden">
            <div
              ref={item.barRef}
              className="ms-vs-fill h-full bg-linear-to-r from-primary to-[#00f5c8] rounded-xs w-0"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const PIPELINE_STEPS = ["Push Code", "Auto Scan", "AI Detect", "Report", "Fix"];

function PipelineVisual() {
  return (
    <div className="ms-vis-pipeline flex flex-col items-center w-47.5">
      {PIPELINE_STEPS.map((s, i) => (
        <div key={s} className="w-full flex flex-col items-center">
          <div
            className={`ms-vp-step flex items-center gap-2.5 px-3.5 py-2 w-full border rounded-[10px] text-[0.78rem] font-semibold transition-all duration-[400ms]${i < 3 ? " active" : ""}`}
            style={{ fontFamily: "var(--font-body, sans-serif)" }}
          >
            <div className="ms-vp-icon text-base">⬡</div>
            <span>{s}</span>
          </div>
          {i < PIPELINE_STEPS.length - 1 && (
            <div className="ms-vp-line w-px h-3.5 mx-auto" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function OurMission() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const dotsRef     = useRef<(HTMLButtonElement | null)[]>([]);
  const slideRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const activeIdx = useRef(0);
  const isMobile  = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth <= 768;

    const outer    = outerRef.current;
    const track    = trackRef.current;
    const progress = progressRef.current;

    if (!outer || !track) return;

    const safeOuter: HTMLDivElement = outer;
    const safeTrack: HTMLDivElement = track;
    const N = SLIDES.length;

    function setSlide(idx: number) {
      if (idx === activeIdx.current && activeIdx.current !== 0) return;
      activeIdx.current = idx;
      slideRefs.current.forEach((s, i) => s?.classList.toggle("active", i === idx));
      dotsRef.current.forEach((d, i) => d?.classList.toggle("active", i === idx));
      if (counterRef.current)
        counterRef.current.textContent =
          String(idx + 1).padStart(2, "0") + " — " + String(N).padStart(2, "0");
    }

    function onScroll() {
      if (isMobile.current) return;
      const rect  = safeOuter.getBoundingClientRect();
      const total = safeOuter.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p   = Math.max(0, Math.min(1, -rect.top / total));
      const raw = p * (N - 0.001);
      const idx = Math.min(N - 1, Math.floor(raw));
      const frac = raw - idx;
      safeTrack.style.transform = `translateX(${-(idx * window.innerWidth + frac * window.innerWidth)}px)`;
      if (progress) progress.style.width = p * 100 + "%";
      setSlide(idx);
    }

    setSlide(0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        /* ── Mission section CSS custom properties ── */
        .ms-section {
          --teal:      #00D0B2;
          --bg:        #F7F5F0;
          --text:      #0a1f1a;
          --muted:     #4a6e65;
          --dim:       #8aada6;
          --border:    rgba(0,208,178,.14);
          --font-body:  var(--font-google-sans), var(--font-noto-khmer), sans-serif;
          --font-title: var(--font-hackdaddy), var(--font-noto-khmer), monospace;
        }
        .dark .ms-section {
          --bg:     #060c0a;
          --text:   #f0faf7;
          --muted:  #4d8c7e;
          --dim:    #3d7068;
          --border: rgba(0,208,178,.12);
        }
        .ms-sticky { background: var(--bg); }

        /* ── Decorative grid background ── */
        .ms-bg-grid {
          background-image:
            linear-gradient(rgba(0,208,178,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,208,178,.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }

        /* ── Dotted vertical line ── */
        .ms-slide-dot-line {
          width: 1px;
          flex-shrink: 0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,208,178,.35) 0px, rgba(0,208,178,.35) 4px,
            transparent 4px, transparent 10px
          );
          border-radius: 2px;
        }
        .ms-slide.active .ms-slide-dot-line {
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,208,178,.7) 0px, rgba(0,208,178,.7) 4px,
            transparent 4px, transparent 10px
          );
        }

        /* ── Slide number active state ── */
        .ms-slide-num { color: rgba(10,31,26,.08); }
        .dark .ms-slide-num { color: rgba(255,255,255,.08); }
        .ms-slide.active .ms-slide-num { color: rgba(0,208,178,.2); }

        /* ── Slide tag pseudo-element line ── */
        .ms-slide-tag::before {
          content: '';
          width: 20px;
          height: 1px;
          background: #00D0B2;
          opacity: .5;
        }

        /* ── Blockquote gradient bar ── */
        .ms-bq-bar {
          background: linear-gradient(180deg, #00D0B2, transparent);
        }

        /* ── Shield pulse animation ── */
        @keyframes ms-pulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: .6; }
          100% { transform: translate(-50%,-50%) scale(1.8); opacity: 0;  }
        }
        .ms-vis-pulse {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80px; height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(0,208,178,.3);
          animation: ms-pulse 2.5s ease-out infinite;
        }

        /* ── Blinking cursor ── */
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .ms-vt-cursor {
          display: inline-block;
          width: 7px; height: .9em;
          background: #00D0B2;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }

        /* ── Stats bar width transition ── */
        .ms-vs-fill {
          transition: width 1.2s cubic-bezier(.4,0,.2,1) .3s;
        }

        /* ── Progress dot active ── */
        .ms-pd { background: rgba(0,208,178,.2); }
        .ms-pd.active { background: #00D0B2; transform: scale(1.4); }

        /* ── Pipeline step states ── */
        .ms-vp-step {
          border-color: rgba(0,208,178,.14);
          background: rgba(0,208,178,.03);
          color: var(--dim);
        }
        .ms-vp-step.active {
          border-color: rgba(0,208,178,.35);
          background: rgba(0,208,178,.08);
          color: var(--text);
        }
        .ms-vp-icon { color: rgba(0,208,178,.3); }
        .ms-vp-step.active .ms-vp-icon { color: #00D0B2; }
        .ms-vp-line { background: rgba(0,208,178,.14); }

        /* ── Animated path dash ── */
        @keyframes ms-dash-travel {
          0%   { stroke-dashoffset:  320; }
          100% { stroke-dashoffset: -320; }
        }
        .ms-pp-animated-dash {
          animation: ms-dash-travel 2.8s linear infinite;
        }

        /* ── Step icon pulse ── */
        @keyframes ms-pp-icon-pulse {
          0%   { opacity: .2; transform: scale(.9); }
          100% { opacity: .7; transform: scale(1.1); }
        }
        .ms-pp-step-icon {
          animation: ms-pp-icon-pulse 2s ease-in-out infinite alternate;
        }
        .ms-pp-step-icon--last { animation-delay: .4s; }

        /* ── Mobile overrides ── */
        @media (max-width: 768px) {
          .ms-outer  { height: auto !important; }
          .ms-sticky { position: relative !important; height: auto !important; overflow: visible; }
          .ms-bg-grid, .ms-bg-glow { display: none; }
          .ms-top-strip  { position: relative; padding: 18px 5% 12px; }
          .ms-track-wrap { position: relative; padding: 0; overflow: visible; display: block; height: auto; }
          .ms-track      { display: flex; flex-direction: column; width: 100% !important; height: auto; transform: none !important; }
          .ms-slide      { width: 100% !important; height: auto; min-height: auto; padding: 32px 5% 40px; border-bottom: 1px solid var(--border); }
          .ms-slide-inner { grid-template-columns: 1fr !important; gap: 20px; max-width: 100%; }
          .ms-slide-num-col { flex-direction: row; align-items: center; }
          .ms-slide-dot-line {
            width: 100%; height: 1px; min-height: unset;
            background: repeating-linear-gradient(
              to right,
              rgba(0,208,178,.4) 0px, rgba(0,208,178,.4) 4px,
              transparent 4px, transparent 10px
            );
          }
          .ms-slide-num   { font-size: 3rem; }
          .ms-slide-visual { justify-content: flex-start; }
          .ms-vis-shield  { width: 100px; height: 120px; }
          .ms-vis-terminal { width: 100%; max-width: 100%; }
          .ms-vis-stats   { max-width: 100%; }
          .ms-vs-num      { font-size: 1.4rem; }
          .ms-vis-pipeline { width: 100%; flex-direction: row; flex-wrap: wrap; gap: 8px; }
          .ms-vp-step     { width: calc(50% - 4px); padding: 7px 10px; font-size: .72rem; }
          .ms-vp-line     { display: none; }
          .ms-progress-wrap { position: relative; }
          .ms-path-pointer { display: none; }
        }
        @media (max-width: 480px) {
          .ms-vp-step { width: 100%; }
        }
      `}</style>

      <div ref={outerRef} className="ms-outer ms-section relative h-[400vh]">
        <div className="ms-sticky sticky top-0 h-screen overflow-hidden transition-[background] duration-400">

          {/* Decorative backgrounds */}
          <div className="ms-bg-grid absolute inset-0 pointer-events-none" />
          <div className="ms-bg-glow absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,208,178,.04)_0%,transparent_70%)]" />

          {/* Top strip */}
          <div
            className="ms-top-strip absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-[4%] py-3.5 border-b border-[rgba(0,208,178,.14)]"
            style={{ fontFamily: "var(--font-body, sans-serif)" }}
          >
            <span className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[rgba(0,208,178,.5)]">
              {'// Our Mission'}
            </span>
            <span className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[rgba(0,208,178,.5)]">
              <span ref={counterRef}>01 — 04</span>
            </span>
          </div>

          {/* Track wrapper */}
          <div className="ms-track-wrap absolute inset-0 flex items-center pt-11 pb-11 overflow-hidden">
            <div
              ref={trackRef}
              className="ms-track flex items-center w-[400%] h-full will-change-transform"
            >
              {SLIDES.map((slide, i) => (
                /* ✅ FIX: Fragment with key instead of bare <> */
                <Fragment key={i}>

                  {/* ── Slide ── */}
                  <div
                    className={`ms-slide w-[103vw] h-full shrink-0 flex items-center justify-center px-[4%] relative${i === 0 ? " active" : ""}`}
                    ref={(el) => { slideRefs.current[i] = el; }}
                  >
                    <div
                      className="ms-slide-inner grid items-center gap-9 w-full max-w-300"
                      style={{ gridTemplateColumns: "auto 1fr 1fr" }}
                    >

                      {/* Dotted line + number */}
                      <div
                        className="ms-slide-num-col flex flex-row items-stretch overflow-visible"
                        style={{ gap: "125px" }}
                      >
                        <div className="ms-slide-dot-line" />
                        <div
                          className="ms-slide-num text-[clamp(4rem,8vw,7rem)] font-bold tracking-[-0.06em] leading-none select-none transition-colors duration-500 whitespace-nowrap"
                          style={{ fontFamily: "var(--font-title, monospace)" }}
                        >
                          {slide.num}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="ms-slide-content">
                        <div
                          className="ms-slide-tag text-[0.62rem] font-semibold tracking-[0.14em] uppercase text-[rgba(0,208,178,.6)] mb-4 flex items-center gap-2.5"
                          style={{ fontFamily: "var(--font-body, sans-serif)" }}
                        >
                          {slide.tag}
                        </div>
                        <h2
                          className="ms-slide-title text-[clamp(1.8rem,3vw,3rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-4"
                          style={{ color: "var(--text)", fontFamily: "var(--font-title, monospace)" }}
                        >
                          {slide.title}
                        </h2>
                        <p
                          className="ms-slide-body text-[0.88rem] leading-[1.75] max-w-100"
                          style={{ color: "var(--muted)", fontFamily: "var(--font-body, sans-serif)" }}
                        >
                          {slide.body}
                        </p>
                        {slide.quote && (
                          <blockquote
                            className="ms-bq mt-[1.4rem] pl-[1.2rem] relative text-[0.82rem] italic leading-[1.75] max-w-90"
                            style={{ color: "var(--dim)", fontFamily: "var(--font-body, sans-serif)" }}
                          >
                            <span className="ms-bq-bar absolute left-0 top-0 bottom-0 w-0.5 rounded-xs" />
                            {slide.quote}
                          </blockquote>
                        )}
                      </div>

                      {/* Visual */}
                      <div className="ms-slide-visual flex items-center justify-center h-full">
                        {slide.visual === "shield"   && <ShieldVisual />}
                        {slide.visual === "terminal" && <TerminalVisual />}
                        {slide.visual === "stats"    && <StatsVisual active={i === 2} />}
                        {slide.visual === "pipeline" && <PipelineVisual />}
                      </div>

                    </div>
                  </div>

                  {/* ── Path pointer in gap after each slide (except last) ── */}
                  {i < SLIDES.length - 1 && (
                    <SlidePathPointer
                      from={SLIDES[i].num}
                      to={SLIDES[i + 1].num}
                    />
                  )}

                </Fragment>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="ms-progress-wrap absolute bottom-0 left-0 right-0 z-10 px-[4%] py-3 flex items-center gap-5 border-t border-[rgba(0,208,178,.14)]">
            <div className="ms-progress-track flex-1 h-px rounded-[1px] overflow-hidden bg-[rgba(0,208,178,.1)]">
              <div
                ref={progressRef}
                className="ms-progress-fill h-full bg-primary w-0 rounded-[1px]"
              />
            </div>
            <div className="ms-progress-dots flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`ms-pd w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 border-0 p-0${i === 0 ? " active" : ""}`}
                  ref={(el) => { dotsRef.current[i] = el; }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}