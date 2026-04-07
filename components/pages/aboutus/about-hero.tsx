"use client";

import { useEffect, useRef } from "react";

// --- Reusable gradient background (from AuthComponent) ---
const GradientBackground = () => (
  <>
    <style>{`
      @keyframes float1 {
        0%   { transform: translate(0, 0); }
        50%  { transform: translate(-10px, 10px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes float2 {
        0%   { transform: translate(0, 0); }
        50%  { transform: translate(10px, -10px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes blob-in-1 {
        0%   { opacity: 0; transform: translate(0, 0) scale(0.72); }
        40%  { opacity: 0.8; transform: translate(0, 0) scale(1.06); }
        65%  { opacity: 1; transform: translate(0, 0) scale(0.97); }
        82%  { transform: translate(0, 0) scale(1.02); }
        100% { opacity: 1; transform: translate(0, 0) scale(1); }
      }
      @keyframes blob-in-2 {
        0%   { opacity: 0; transform: translate(0, 0) scale(0.65); }
        45%  { opacity: 0.75; transform: translate(0, 0) scale(1.08); }
        68%  { opacity: 1; transform: translate(0, 0) scale(0.96); }
        84%  { transform: translate(0, 0) scale(1.02); }
        100% { opacity: 1; transform: translate(0, 0) scale(1); }
      }
    `}</style>
    <svg
      width="100%" height="100%"
      viewBox="0 0 800 600" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className="absolute top-0 left-0 w-full h-full"
    >
      <defs>
        <linearGradient id="ao_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "#6d28d9", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#00D0B2", stopOpacity: 0.35 }} />
        </linearGradient>
        <linearGradient id="ao_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   style={{ stopColor: "#00D0B2", stopOpacity: 0.55 }} />
          <stop offset="50%"  style={{ stopColor: "#0ea5e9", stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: "#6d28d9", stopOpacity: 0.35 }} />
        </linearGradient>
        <radialGradient id="ao_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   style={{ stopColor: "#00D0B2", stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: "#0ea5e9", stopOpacity: 0.2 }} />
        </radialGradient>
        <filter id="ao_blur1" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="35" />
        </filter>
        <filter id="ao_blur2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="25" />
        </filter>
        <filter id="ao_blur3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="45" />
        </filter>
      </defs>

      {/* Group 1: entrance (1.1s) then float1 starts at 1.15s */}
      <g
        style={{
          opacity: 0,
          animation: `
            blob-in-1 1.9s cubic-bezier(.34,1.4,.64,1) 0.05s forwards,
            float1 20s ease-in-out 1.95s infinite
          `,
        }}
      >
        <ellipse
          cx="200" cy="500" rx="250" ry="180"
          fill="url(#ao_grad1)"
          filter="url(#ao_blur1)"
          transform="rotate(-30 200 500)"
        />
        <rect
          x="500" y="100" width="300" height="250" rx="80"
          fill="url(#ao_grad2)"
          filter="url(#ao_blur2)"
          transform="rotate(15 650 225)"
        />
      </g>

      {/* Group 2: entrance (1.3s) then float2 starts at 1.5s */}
      <g
        style={{
          opacity: 0,
          animation: `
            blob-in-2 2.1s cubic-bezier(.34,1.4,.64,1) 0.2s forwards,
            float2 25s ease-in-out 2.3s infinite
          `,
        }}
      >
        <circle
          cx="650" cy="450" r="150"
          fill="url(#ao_grad3)"
          filter="url(#ao_blur3)"
          opacity="0.6"
        />
        <ellipse
          cx="50" cy="150" rx="180" ry="120"
          fill="#00D0B2"
          filter="url(#ao_blur2)"
          opacity="0.25"
        />
      </g>
    </svg>
  </>
);

export default function AboutHero() {
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const hl0Ref      = useRef<HTMLSpanElement>(null);
  const hl1Ref      = useRef<HTMLSpanElement>(null);
  const hl2Ref      = useRef<HTMLSpanElement>(null);
  const hsubRef     = useRef<HTMLParagraphElement>(null);
  const hbtnsRef    = useRef<HTMLDivElement>(null);
  const hstatsRef   = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      eyebrowRef.current?.classList.add("in");
      [hl0Ref, hl1Ref, hl2Ref].forEach((ref, n) =>
        setTimeout(() => ref.current?.classList.add("in"), 180 + n * 110)
      );
      setTimeout(() => hsubRef.current?.classList.add("in"),  520);
      setTimeout(() => hbtnsRef.current?.classList.add("in"), 660);
      setTimeout(() => {
        hstatsRef.current?.classList.add("in");
        const countUp = (el: HTMLSpanElement | null, target: number) => {
          if (!el) return;
          const duration = 1100;
          let start: number | null = null;
          const frame = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            el.textContent = String(Math.floor(p * p * (3 - 2 * p) * target));
            if (p < 1) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        };
        countUp(counter1Ref.current, 5);
        countUp(counter2Ref.current, 3);
      }, 860);
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .ao-eyebrow { opacity: 0; transform: translateY(10px); }
        .ao-eyebrow.in { opacity: 1; transform: translateY(0); transition: opacity .55s, transform .55s cubic-bezier(.16,1,.3,1); }
        .ao-hli { transform: translateY(112%); }
        .ao-hli.in { transform: translateY(0); transition: transform .7s cubic-bezier(.16,1,.3,1); }
        .ao-sub { opacity: 0; transform: translateY(8px); }
        .ao-sub.in { opacity: 1; transform: translateY(0); transition: opacity .65s .5s, transform .65s .5s cubic-bezier(.16,1,.3,1); }
        .ao-btns { opacity: 0; }
        .ao-btns.in { opacity: 1; transition: opacity .55s .68s; }
        .ao-stats { opacity: 0; }
        .ao-stats.in { opacity: 1; transition: opacity .55s .88s; }
        .ao-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse 65% 55% at 50% 42%,
            color-mix(in srgb, #00D0B2 7%, transparent) 0%,
            transparent 68%
          );
          z-index: 1;
        }
        .ao-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, color-mix(in srgb, #00D0B2 20%, transparent), transparent);
          z-index: 1;
        }
        @keyframes ao-bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(5px); }
        }
        .ao-scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          animation: ao-bob 2.5s ease-in-out infinite;
        }
      `}</style>

      <section
        className="
          ao-hero
          relative min-h-screen overflow-hidden
          flex flex-col items-center justify-center text-center
          px-[6%] py-25
          bg-white dark:bg-[oklch(0.145_0_0)]
          text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)]
          font-[var(--font-google-sans),var(--font-noto-khmer),sans-serif]
          transition-[background] duration-400
        "
      >
        {/* ── Gradient background blobs ── */}
        <div className="absolute inset-0 z-0">
          <GradientBackground />
        </div>

        {/* All content sits above the background */}
        <div className="relative z-10 flex flex-col items-center">

          {/* ── Eyebrow ── */}
          <div
            ref={eyebrowRef}
            className="ao-eyebrow inline-flex items-center gap-2.5 text-[0.66rem] font-semibold tracking-[0.18em] uppercase text-primary mb-[1.8rem]"
          >
            <span className="w-5.5 h-[1.5px] bg-primary rounded-sm opacity-55" />
            Auto Offensive
            <span className="w-5.5 h-[1.5px] bg-primary rounded-sm opacity-55" />
          </div>

          {/* ── Title ── */}
          <h1 className="font-[var(--font-hackdaddy),var(--font-noto-khmer),monospace] text-[clamp(2.8rem,5.8vw,5rem)] leading-[1.1] tracking-[-0.04em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-[1.6rem] max-w-225">
            <span className="block overflow-hidden"><span ref={hl0Ref} className="ao-hli block">Meet Our</span></span>
            <span className="block overflow-hidden"><span ref={hl1Ref} className="ao-hli block"><span className="text-primary">Next-Gen</span></span></span>
            <span className="block overflow-hidden"><span ref={hl2Ref} className="ao-hli block"><span className="text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)] font-light">Security Platform</span></span></span>
          </h1>

          {/* ── Subtitle ── */}
          <p ref={hsubRef} className="ao-sub text-[0.98rem] text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)] leading-[1.8] max-w-125 mx-auto mb-[2.6rem]">
            Auto-Offensive is a PaaS that automates web, network and code security scanning — powered by AI, with zero CLI setup required.
          </p>

          {/* ── Buttons ── */}
          <div ref={hbtnsRef} className="ao-btns flex items-center justify-center gap-2.5 flex-wrap mb-[3.8rem]">
            <button className="bg-primary text-white border-none px-6.5 py-3 rounded-[8px] text-[0.88rem] font-bold cursor-pointer font-[inherit] hover:bg-[#006C52] transition-colors duration-200">Our Story</button>
            <button className="bg-transparent text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] border border-[color-mix(in_srgb,#00D0B2_18%,transparent)] px-5.5 py-3 rounded-[8px] text-[0.88rem] font-medium cursor-pointer font-[inherit] hover:border-primary transition-[border-color] duration-200">Meet the Team</button>
          </div>

          {/* ── Stats ── */}
          <div ref={hstatsRef} className="ao-stats flex items-stretch justify-center border border-[color-mix(in_srgb,#00D0B2_15%,transparent)] rounded-[14px] overflow-hidden">
            <div className="px-8.5 py-5.5. text-center border-r border-[color-mix(in_srgb,#00D0B2_15%,transparent)]">
              <div className="text-[1.6rem] font-bold tracking-[-0.04em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] leading-none mb-[0.3rem]"><span ref={counter1Ref}>0</span><span className="text-primary">+</span></div>
              <div className="text-[0.64rem] font-medium tracking-[0.08em] uppercase text-[oklch(0.708_0_0)] dark:text-[oklch(0.556_0_0)]">Report Formats</div>
            </div>
            <div className="px-8.5 py-5.5 text-center border-r border-[color-mix(in_srgb,#00D0B2_15%,transparent)]">
              <div className="text-[1.6rem] font-bold tracking-[-0.04em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] leading-none mb-[0.3rem]"><span ref={counter2Ref}>0</span><span className="text-primary">x</span></div>
              <div className="text-[0.64rem] font-medium tracking-[0.08em] uppercase text-[oklch(0.708_0_0)] dark:text-[oklch(0.556_0_0)]">Faster Scanning</div>
            </div>
            <div className="px-8.5 py-5.5 text-center border-r border-[color-mix(in_srgb,#00D0B2_15%,transparent)]">
              <div className="text-[1.6rem] font-bold tracking-[-0.04em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] leading-none mb-[0.3rem]">CI/<span className="text-primary">CD</span></div>
              <div className="text-[0.64rem] font-medium tracking-[0.08em] uppercase text-[oklch(0.708_0_0)] dark:text-[oklch(0.556_0_0)]">API Ready</div>
            </div>
            <div className="px-8.5 py-5.5 text-center">
              <div className="text-[1.6rem] font-bold tracking-[-0.04em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] leading-none mb-[0.3rem]"><span className="text-primary">AI</span></div>
              <div className="text-[0.64rem] font-medium tracking-[0.08em] uppercase text-[oklch(0.708_0_0)] dark:text-[oklch(0.556_0_0)]">MCP + SonarQube</div>
            </div>
          </div>

        </div>{/* end z-10 wrapper */}

        {/* ── Scroll indicator ── */}
        <div className="ao-scroll flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[0.58rem] font-semibold tracking-[0.16em] uppercase text-[oklch(0.708_0_0)] dark:text-[oklch(0.556_0_0)]">Scroll</span>
          <div className="w-px h-7" style={{ background: "linear-gradient(to bottom, color-mix(in srgb, #00D0B2 40%, transparent), transparent)" }} />
        </div>

      </section>
    </>
  );
}