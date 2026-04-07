"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Values data
───────────────────────────────────────────── */
const VALUES = [
  {
    tag: "Value 01",
    title: "<span class='vdf-t'>Automation</span> First",
    body:  "Click, don't type. Every scan, report, detection — accessible through a clean Web UI. No terminal required, ever.",
    pill:  "Web UI over CLI",
    prog:  "95%",
  },
  {
    tag: "Value 02",
    title: "<span class='vdf-t'>Transparent</span> Intelligence",
    body:  "Every CVSS score, every finding, every generated report — fully explained in plain language. No black boxes.",
    pill:  "Json · PDF · Excel · Docs",
    prog:  "88%",
  },
  {
    tag: "Value 03",
    title: "Built for <span class='vdf-t'>Builders</span>",
    body:  "CI/CD-ready API from day one. Integrate into GitHub, GitLab or Jenkins — shift security left effortlessly.",
    pill:  "CI/CD · API · GitHub",
    prog:  "92%",
  },
  {
    tag: "Value 04",
    title: "<span class='vdf-t'>AI-Powered</span> Accuracy",
    body:  "SonarQube rules + AI MCP agent that learns from real-world patterns — smarter and more accurate with every scan.",
    pill:  "MCP Agent · SonarQube",
    prog:  "97%",
  },
];

export default function Values() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const drumRef      = useRef<HTMLDivElement>(null);
  const drumWrapRef  = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLDivElement>(null);
  const facesBuilt   = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const drum    = drumRef.current;
    const vw      = drumWrapRef.current;
    if (!section || !drum || !vw) return;

    const isMobile = window.innerWidth <= 768;
    const N = VALUES.length;

    /* ── Mobile: flat stacked cards ── */
    if (isMobile) {
      if (facesBuilt.current) return;
      facesBuilt.current = true;
      vw.style.cssText  = "height:auto;overflow:visible;";
      drum.style.cssText = "height:auto;transform:none;display:flex;flex-direction:column;gap:10px;";
      VALUES.forEach((v, i) => {
        const el = document.createElement("div");
        el.className = "vs-drum-face" + (i === 0 ? " is-active" : "");
        el.innerHTML = `
          <div class="vdf-tag">${v.tag}</div>
          <h3 class="vdf-title">${v.title}</h3>
          <p class="vdf-body">${v.body}</p>
          <span class="vdf-pill">${v.pill}</span>
          <div class="vdf-bar"><div class="vdf-bar-fill" style="width:${v.prog}"></div></div>
        `;
        drum.appendChild(el);
      });
      return;
    }

    /* ── Desktop: 3-D drum ── */
    if (facesBuilt.current) return;
    facesBuilt.current = true;

    const FACE_H = 320;
    const radius = Math.round(FACE_H / (2 * Math.tan(Math.PI / N)));

    vw.style.cssText  = `perspective:1200px;perspective-origin:50% 50%;width:100%;height:${FACE_H}px;position:relative;`;
    drum.style.cssText = `position:relative;width:100%;height:${FACE_H}px;transform-style:preserve-3d;will-change:transform;`;

    VALUES.forEach((v, i) => {
      const el = document.createElement("div");
      el.className = "vs-drum-face" + (i === 0 ? " is-active" : "");
      el.id = "vdf" + i;
      el.style.transform = `rotateX(${-(360 / N) * i}deg) translateZ(${radius}px)`;
      el.innerHTML = `
        <div class="vdf-tag">${v.tag}</div>
        <h3 class="vdf-title">${v.title}</h3>
        <p class="vdf-body">${v.body}</p>
        <span class="vdf-pill">${v.pill}</span>
        <div class="vdf-bar"><div class="vdf-bar-fill" style="width:${v.prog}"></div></div>
        <div class="vdf-bg-num">${String(i + 1).padStart(2, "0")}</div>
      `;
      drum.appendChild(el);
    });

    /* lerp animation loop */
    let targetAngle  = 0;
    let currentAngle = 0;
    let activeFace   = 0;
    let rafId        = 0;

    function activate(idx: number) {
      if (idx === activeFace) return;
      document.getElementById("vdf" + activeFace)?.classList.remove("is-active");
      document.getElementById("vdf" + idx)?.classList.add("is-active");
      if (counterRef.current)
        counterRef.current.textContent =
          String(idx + 1).padStart(2, "0") + " / " + String(N).padStart(2, "0");
      activeFace = idx;
    }

    function tick() {
      currentAngle += (targetAngle - currentAngle) * 0.08;
      if (drum) drum.style.transform = `rotateX(${currentAngle}deg)`;
      const norm = ((-currentAngle) % 360 + 360) % 360;
      const fi   = Math.round(norm / (360 / N)) % N;
      activate(fi);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    /* scroll driver */
    function onScroll() {
      if (!section) return;
      const rect  = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      targetAngle = -(p * (N - 0.001) * (360 / N));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes vs-float-1 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-12px, 10px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vs-float-2 {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(10px, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes vs-blob-in-1 {
          0%   { opacity: 0; transform: scale(0.78); }
          45%  { opacity: 0.75; transform: scale(1.06); }
          70%  { opacity: 1; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes vs-blob-in-2 {
          0%   { opacity: 0; transform: scale(0.7); }
          45%  { opacity: 0.7; transform: scale(1.08); }
          70%  { opacity: 1; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
        /* ── Values palette (cream) ── */
        .vs-section {
          --teal:   #00D0B2;
          --bg:     #F7F5F0;
          --text:   #0a1f1a;
          --muted:  #4a6e65;
          --dim:    #8aada6;
          --border: rgba(0,208,178,.14);
          --font-body:  var(--font-google-sans), var(--font-noto-khmer), sans-serif;
          --font-title: var(--font-hackdaddy), var(--font-noto-khmer), monospace;
        }
        .dark .vs-section {
          --bg:     #060c0a;
          --text:   #f0faf7;
          --muted:  #4d8c7e;
          --dim:    #3d7068;
          --border: rgba(0,208,178,.12);
        }

        /* ── Outer (scroll height) ── */
        .vs-outer {
          height: 200vh;
          position: relative;
        }

        /* ── Sticky ── */
        .vs-drum-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background: var(--bg);
          transition: background .4s;
        }
        .vs-drum-sticky::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            ellipse 62% 52% at 50% 46%,
            color-mix(in srgb, #00D0B2 6%, transparent) 0%,
            transparent 72%
          );
          z-index: 0;
        }
        .vs-shell {
          width: 100%;
          max-width: 80rem;
          height: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .vs-blobs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .vs-blob {
          position: absolute;
          filter: blur(70px);
          border-radius: 9999px;
          will-change: transform, opacity;
        }
        .vs-blob-1 {
          width: 420px;
          height: 300px;
          left: -100px;
          bottom: 4%;
          background: linear-gradient(135deg, rgba(1,80,158,0.16), rgba(0,208,178,0.12));
          opacity: 0;
          animation:
            vs-blob-in-1 1.9s cubic-bezier(.34,1.4,.64,1) .05s forwards,
            vs-float-1 20s ease-in-out 1.95s infinite;
        }
        .vs-blob-2 {
          width: 360px;
          height: 260px;
          right: -60px;
          top: 10%;
          background: linear-gradient(135deg, rgba(0,208,178,0.11), rgba(1,80,158,0.18));
          opacity: 0;
          animation:
            vs-blob-in-2 2.1s cubic-bezier(.34,1.4,.64,1) .15s forwards,
            vs-float-2 24s ease-in-out 2.2s infinite;
        }
        .vs-blob-3 {
          width: 260px;
          height: 220px;
          right: 18%;
          bottom: 8%;
          background: radial-gradient(circle, rgba(1,80,158,0.14) 0%, rgba(0,208,178,0.08) 100%);
          opacity: .65;
          animation: vs-float-1 22s ease-in-out .4s infinite;
        }
        .dark .vs-blob-1 {
          background: linear-gradient(135deg, rgba(1,80,158,0.22), rgba(0,208,178,0.12));
        }
        .dark .vs-blob-2 {
          background: linear-gradient(135deg, rgba(0,208,178,0.1), rgba(1,80,158,0.24));
        }
        .dark .vs-blob-3 {
          background: radial-gradient(circle, rgba(1,80,158,0.18) 0%, rgba(0,208,178,0.08) 100%);
        }

        /* ── Split grid ── */
        .vs-grid {
          display: grid;
          grid-template-columns: 38% 62%;
          height: 100vh;
          align-items: stretch;
        }

        /* ── Left panel ── */
        .vs-left {
          display: flex;
          align-items: center;
          padding: 0 8% 0 6%;
          border-right: 1px solid var(--border);
          position: relative;
          z-index: 2;
        }
        .vs-left-inner { max-width: 380px; }

        .vs-eyebrow {
          font-size: .62rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(0,208,178,.6);
          margin-bottom: 1.4rem;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
        }
        .vs-eyebrow::before {
          content: '';
          width: 22px; height: 1.5px;
          background: #00D0B2;
          border-radius: 2px;
          opacity: .5;
          display: inline-block;
        }
        .vs-title {
          font-size: clamp(2rem, 3vw, 2.8rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.03em;
          color: var(--text);
          margin-bottom: 1rem;
          font-family: var(--font-title);
        }
        .vs-title-ac { color: var(--teal); }
        .vs-sub {
          color: var(--muted);
          line-height: 1.78;
          font-weight: 400;
          margin-bottom: 2rem;
          font-family: var(--font-body);
        }
        .vs-counter {
          font-size: .68rem;
          font-weight: 700;
          letter-spacing: .12em;
          color: rgba(0,208,178,.45);
          text-transform: uppercase;
          padding: 8px 14px;
          border: 1px solid rgba(0,208,178,.14);
          border-radius: 100px;
          display: inline-block;
          font-family: var(--font-body);
        }

        /* ── Right panel ── */
        .vs-right {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 100vh;
        }
        .vs-bg-label {
          position: absolute;
          font-size: clamp(5rem, 11vw, 10rem);
          font-weight: 700;
          letter-spacing: -.06em;
          color: rgba(10,31,26,.03);
          text-transform: uppercase;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
          top: 50%; left: 0;
          transform: translateY(-50%);
          line-height: 1;
          font-family: var(--font-title);
        }
        .dark .vs-bg-label { color: rgba(255,255,255,.025); }
        .vs-h-line {
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: var(--border);
          top: 50%;
        }

        /* ── Drum faces ── */
        .vs-drum-face {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 40px 10%;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .vdf-tag {
          font-size: .62rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #00D0B2;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
        }
        .vdf-tag::before {
          content: '';
          width: 16px; height: 1.5px;
          background: #00D0B2;
          border-radius: 2px;
          display: inline-block;
        }
        .vdf-title {
          font-size: clamp(1.8rem, 3.2vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -.03em;
          color: var(--text);
          margin-bottom: .9rem;
          line-height: 1.1;
          font-family: var(--font-title);
        }
        .vdf-t { color: #00D0B2; }
        .vdf-body {
          color: var(--muted);
          line-height: 1.82;
          max-width: 420px;
          font-family: var(--font-body);
        }
        .vs-copy {
          font-size: 16px;
        }
        @media (min-width: 768px) {
          .vs-copy {
            font-size: 18px;
          }
        }
        @media (min-width: 1024px) {
          .vs-copy {
            font-size: 20px;
          }
        }
        .vdf-pill {
          display: inline-block;
          margin-top: 1rem;
          font-size: .62rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #00D0B2;
          background: rgba(0,208,178,.09);
          border-radius: 100px;
          padding: 3px 10px;
          font-family: var(--font-body);
        }
        .vdf-bar {
          margin-top: 1rem;
          height: 2px;
          background: rgba(0,208,178,.1);
          border-radius: 2px;
          overflow: hidden;
          width: 180px;
        }
        .vdf-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00D0B2, #00f0c4);
          border-radius: 2px;
        }
        .vdf-bg-num {
          position: absolute;
          right: 4%; top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8rem, 15vw, 13rem);
          font-weight: 700;
          letter-spacing: -.06em;
          color: rgba(10,31,26,.03);
          line-height: 1;
          user-select: none;
          pointer-events: none;
          transition: color .6s ease;
          font-family: var(--font-title);
        }
        .dark .vdf-bg-num { color: rgba(255,255,255,.03); }
        .vs-drum-face.is-active .vdf-bg-num { color: rgba(0,208,178,.07); }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .vs-outer { height: auto !important; }
          .vs-drum-sticky { position: relative !important; height: auto !important; overflow: visible; }
          .vs-grid { display: flex; flex-direction: column; height: auto; padding: 40px 5%; gap: 28px; }
          .vs-left { padding: 0; border-right: none; border-bottom: 1px solid var(--border); padding-bottom: 24px; }
          .vs-left-inner { max-width: 100%; }
          .vs-title { font-size: clamp(1.8rem, 6vw, 2.4rem); }
          .vs-counter { display: none; }
          .vs-right { min-height: auto; overflow: visible; }
          .vs-bg-label, .vs-h-line { display: none; }
          .vs-drum-face {
            position: relative !important;
            transform: none !important;
            backface-visibility: visible !important;
            -webkit-backface-visibility: visible !important;
            height: auto !important;
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 22px 18px;
            opacity: 1 !important;
            background: rgba(0,208,178,.02);
          }
          .vs-drum-face.is-active {
            border-color: rgba(0,208,178,.3);
            background: rgba(0,208,178,.04);
          }
          .vdf-bg-num { display: none; }
          .vdf-title { font-size: clamp(1.3rem, 4.5vw, 1.7rem); }
          .vdf-body { max-width: 100%; }
          .vs-blob-1 {
            width: 240px;
            height: 180px;
            left: -80px;
            bottom: auto;
            top: 6%;
          }
          .vs-blob-2 {
            width: 220px;
            height: 160px;
            right: -70px;
            top: 24%;
          }
          .vs-blob-3 {
            width: 180px;
            height: 150px;
            right: -30px;
            bottom: 10%;
          }
        }
      `}</style>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,208,178,.15),transparent)" }} />

      <div ref={sectionRef} className="vs-outer vs-section">
        <div className="vs-drum-sticky">
          <div className="vs-blobs" aria-hidden="true">
            <div className="vs-blob vs-blob-1" />
            <div className="vs-blob vs-blob-2" />
            <div className="vs-blob vs-blob-3" />
          </div>
          <div className="vs-shell">
            <div className="vs-grid">

              {/* ── Left ── */}
              <div className="vs-left">
                <div className="vs-left-inner">
                  <div className="vs-eyebrow">Core Values</div>
                  <h2 className="vs-title">
                    Built on <span className="vs-title-ac">principles</span><br />
                    that matter
                  </h2>
                  <p className="vs-sub vs-copy">
                    Every feature we ship maps back to one of these four beliefs about what
                    great security tooling should be.
                  </p>
                  <div className="vs-counter" ref={counterRef}>01 / 04</div>
                </div>
              </div>

              {/* ── Right ── */}
              <div className="vs-right">
                <div className="vs-bg-label">VALUES</div>
                <div className="vs-h-line" />
                <div ref={drumWrapRef} style={{ width: "100%", position: "relative" }}>
                  <div ref={drumRef} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,rgba(0,208,178,.15),transparent)" }} />
    </>
  );
}
