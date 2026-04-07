"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "Attack Surface Mapping",
  "Vulnerability Scanning",
  "Auto Exploitation",
  "Pentest Reporting",
  "Continuous Monitoring",
  "CI/CD Integration",
];

// ─── CUSTOMIZE IMAGE SIZE, GAPS & IMAGE POSITION PER CARD HERE ──────────────
// imageW / imageH   → exact pixel size of the image
// gapLeft / gapRight → content-block padding (left and right sides)
// imagePadding      → padding around the image inside its cell (e.g. "40px")
// imageOffsetX      → horizontal nudge of the image (e.g. "20px" or "-10px")
// imageOffsetY      → vertical nudge of the image (e.g. "10px" or "-20px")
// imageAlign        → horizontal alignment: "center" | "flex-start" | "flex-end"
// imageValign       → vertical alignment:   "center" | "flex-start" | "flex-end"
// ─────────────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    num: "01",
    tag: "Recon",
    title: ["Attack Surface", "Mapping"],
    hlLine: 1,
    desc: "Powerful, connected scanners for mapping exposed network assets and web apps, including cloud and APIs. Get a global view of open ports, running services, operating systems, and screenshots — plus ML-driven insights from subdomains, outdated technologies, reverse DNS, WAFs, and hidden files.",
    link: "#",
    image: "./home-image/4.png",
    imageAlt: "Attack Surface Mapping",
    reverse: false,
    imageW: "520px",
    imageH: "380px",
    gapLeft: "300px",
    gapRight: "52px",
    // ↓ image position controls
    imagePadding: "0px 250px 0px 0px", 
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
  {
    num: "02",
    tag: "Scanning",
    title: ["Comprehensive", "Vulnerability Scanning"],
    hlLine: 1,
    desc: "Proprietary web app and API scanner with benchmark-proven detection accuracy — outperforming both commercial and open-source tools. Network scanner combines 4 detection engines, ranked #1 in remote detection accuracy across 128 environments against Qualys, Nessus, and OpenVAS.",
    link: "#",
    image: "./home-image/1.png",
    imageAlt: "Vulnerability Scanning",
    reverse: true,
    imageW: "480px",
    imageH: "320px",
    gapLeft: "150px",
    gapRight: "52px",
    imagePadding: "20px 0px 0px 250px", 
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
  {
    num: "03",
    tag: "Exploitation",
    title: ["Vulnerability", "Exploitation"],
    hlLine: 1,
    desc: "Automatic exploitation of new, critical CVEs with Sniper Auto Exploiter for validating risk and extracting evidence. Purpose-built to safely confirm exploitability of SQL injection, XSS, and more — with evidence-rich results including screenshots, network maps, exploit paths, and traffic logs.",
    link: "#",
    image: "./home-image/3.png",
    imageAlt: "Vulnerability Exploitation",
    reverse: false,
    imageW: "500px",
    imageH: "400px",
    gapLeft: "300px",
    gapRight: "52px",
   imagePadding: "0px 250px 0px 0px", 
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
  {
    num: "04",
    tag: "Reporting",
    title: ["Pentest Reporting", "& Data Exports"],
    hlLine: 1,
    desc: "Built-in pentest report generator for creating editable DOCX reports 90% faster. Extensive library of customizable findings with vulnerability descriptions, risk ratings, evidence, and remediation steps. Export as PDF, HTML, CSV, XLSX, or via REST API — with branded templates per client.",
    link: "#",
    image: "./home-image/2.png",
    imageAlt: "Pentest Reporting",
    reverse: true,
    imageW: "460px",
    imageH: "340px",
    gapLeft: "150px",
    gapRight: "52px",
    imagePadding: "20px 0px 0px 250px", 
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
  {
    num: "05",
    tag: "Monitoring",
    title: ["Continuous", "Vulnerability Monitoring"],
    hlLine: 1,
    desc: "Persistent coverage with scheduled scans that automate recurring tests across assets. Real-time alerts for critical issues via email, Slack, or Webhooks. Hands-off monitoring with Pentest Robots that trigger repeatable scan sequences — plus instant REST API access to all scanning capabilities.",
    link: "#",
    image: "./home-image/3.png",
    imageAlt: "Continuous Monitoring",
    reverse: false,
    imageW: "540px",
    imageH: "360px",
    gapLeft: "300px",
    gapRight: "52px",
    imagePadding: "0px 250px 0px 0px", 
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
  {
    num: "06",
    tag: "CI/CD Integration",
    title: ["Security Baked", "Into Every Pipeline"],
    hlLine: 1,
    desc: "Embed offensive security directly into your CI/CD workflow. Auto Offensive triggers scans on every build, blocks deployments on critical findings, and feeds results into your existing DevSecOps toolchain — so vulnerabilities are caught before they ever reach production.",
    link: "#",
    image: "./home-image/6.png",
    imageAlt: "CI/CD Integration",
    reverse: true,
    imageW: "500px",
    imageH: "420px",
    gapLeft: "150px",
    gapRight: "52px",
    imagePadding: "20px 0px 0px 250px",  // top 20px, left 60px
    imageOffsetX: "0px",
    imageOffsetY: "0px",
    imageAlign: "center",
    imageValign: "center",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface CardData {
  num: string;
  tag: string;
  title: string[];
  hlLine: number;
  desc: string;
  link: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
  imageW: string;
  imageH: string;
  gapLeft: string;
  gapRight: string;
  imagePadding: string;
  imageOffsetX: string;
  imageOffsetY: string;
  imageAlign: string;
  imageValign: string;
}

// ─── Dual Spine ───────────────────────────────────────────────────────────────

function DualSpine({
  fillPct,
  clipPath,
}: {
  fillPct: number;
  clipPath: string;
}) {
  const sides = [
    { style: { left: "calc(50% - 34px)" } },
    { style: { left: "calc(50% + 34px)" } },
  ] as const;

  return (
    <>
      {sides.map((s, i) => (
        <div
          key={i}
          className="fixed top-0 h-screen w-px z-90 pointer-events-none"
          style={{ ...s.style, clipPath }}
        >
          <div
            className="absolute inset-0 w-px h-full"
            style={{ background: "rgba(1,80,158,0.12)" }}
          />
          <div
            className="absolute top-0 left-0 w-px"
            style={{
              height:     `${fillPct}%`,
              background: "linear-gradient(180deg, #01509e, #00d0b2)",
              transition: "height 0.08s linear",
            }}
          />
        </div>
      ))}
    </>
  );
}

// ─── Center Logo ──────────────────────────────────────────────────────────────

function CenterLogo({
  visible,
}: {
  visible: boolean;
}) {
  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-200 pointer-events-none"
      style={{
        opacity:    visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <Image
        src="/Auto-Offensive.png"
        alt="Logo"
        className=" object-contain"
        width={52}
        height={52}
      />
    </div>
  );
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function ProgressBar() {
  return (
    <div
      className="fixed top-0 left-0 h-50 z-200 transition-[width] duration-100 linear"
    />
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="overflow-hidden border-y py-4 my-0"
      style={{
        borderColor: "rgba(0,0,0,0.08)",
        background:  "rgba(1,80,158,0.02)",
      }}
    >
      <div
        className="flex w-max"
        style={{ animation: "ticker-scroll 24s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-5 px-8 whitespace-nowrap text-[11px] tracking-[0.15em] uppercase"
            style={{
              fontFamily: "var(--font-hackdaddy), sans-serif",
              color:      "#6b7a90",
            }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: "#01509e" }}
            />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card Row ─────────────────────────────────────────────────────────────────

function CardRow({
  card,
  isLast,
  isVisible,
  cardRef,
}: {
  card: CardData;
  isLast: boolean;
  isVisible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const { reverse, gapLeft, gapRight } = card;

  const contentBlock = (
    <div
      className="relative  flex flex-col justify-center py-15"
      style={{
        paddingLeft:  gapLeft,
        paddingRight: gapRight,
        background:  "#F7F5F0",
        borderRight: !reverse ? "1px solid rgba(0,0,0,0.08)" : undefined,
        borderLeft:  reverse  ? "1px solid rgba(0,0,0,0.08)" : undefined,
      }}
    >
      <div
        style={{
          transform:  isVisible ? "translateX(0)" : reverse ? "translateX(24px)" : "translateX(-24px)",
          opacity:    isVisible ? 1 : 0,
          transition: "transform 0.85s 0.2s cubic-bezier(.16,1,.3,1), opacity 0.85s 0.2s",
        }}
      >
        {/* Number */}
        <p
          className="text-[11px] tracking-[0.2em] uppercase mb-5"
          style={{ fontFamily: "var(--font-hackdaddy), sans-serif", color: "#01509e", opacity: 0.6 }}
        >
          {card.num}
        </p>

        {/* Tag */}
        <span
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 mb-6"
          style={{
            fontFamily:   "var(--font-hackdaddy), sans-serif",
            color:        "#01509e",
            background:   "rgba(1,80,158,0.07)",
            border:       "1px solid rgba(1,80,158,0.18)",
            borderRadius: 1,
          }}
        >
          {card.tag}
        </span>

        {/* Title */}
        <h3
          className="font-bold leading-[1.15] mb-5"
          style={{
            fontFamily:    "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
            fontSize:      "clamp(24px, 2.5vw, 36px)",
            letterSpacing: "-0.02em",
            color:         "#0d1117",
          }}
        >
          {card.title.map((line, i) => (
            <span key={i} className="block">
              {i === card.hlLine ? (
                <span style={{ color: "#00d0b2" }}>{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h3>

        {/* Description */}
        <p
          className="text-[14px] leading-[1.75] max-w-100 mb-9"
          style={{
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
            color:      "#6b7a90",
          }}
        >
          {card.desc}
        </p>

        {/* Link */}
        <a
          href={card.link}
          className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.15em] uppercase no-underline group"
          style={{
            fontFamily: "var(--font-hackdaddy), sans-serif",
            color:      "#01509e",
          }}
        >
          Explore capability
          <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );

  const spineBlock = (
    <div className="relative flex items-center justify-center">
      <div
        className="w-3 h-3 rounded-full"
        style={{
          border:     "2px solid #01509e",
          background: "#F7F5F0",
          opacity:    isVisible ? 1 : 0,
          transform:  isVisible ? "scale(1)" : "scale(0)",
          transition: "opacity 0.4s 0.4s, transform 0.5s 0.4s cubic-bezier(.34,1.56,.64,1)",
        }}
      />
    </div>
  );

  // ─── Image Block ─────────────────────────────────────────────────────────
  // imagePadding  → inset padding around the image within its cell
  // imageAlign    → horizontal alignment of the image (justify-content)
  // imageValign   → vertical alignment of the image (align-items)
  // imageOffsetX  → translate the image horizontally after alignment
  // imageOffsetY  → translate the image vertically after alignment
  const imageBlock = (
    <div
      className="relative overflow-hidden group/img"
      style={{
        borderRight: reverse ? "1px solid rgba(0,0,0,0.08)" : undefined,
        padding:     card.imagePadding,
        display:     "flex",
        justifyContent: card.imageAlign  as React.CSSProperties["justifyContent"],
        alignItems:     card.imageValign as React.CSSProperties["alignItems"],
      }}
    >
      <div
        style={{
          transform:  isVisible
            ? `translateX(${card.imageOffsetX}) translateY(${card.imageOffsetY}) scale(1)`
            : reverse
            ? `translateX(calc(-30px + ${card.imageOffsetX})) translateY(${card.imageOffsetY}) scale(0.97)`
            : `translateX(calc(30px + ${card.imageOffsetX}))  translateY(${card.imageOffsetY}) scale(0.97)`,
          opacity:    isVisible ? 1 : 0,
          transition: "transform 0.9s 0.15s cubic-bezier(.16,1,.3,1), opacity 0.9s 0.15s",
        }}
      >
        <img
          src={card.image}
          alt={card.imageAlt}
          style={{
            width:     card.imageW,
            height:    card.imageH,
            objectFit: "contain",
            display:   "block",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={cardRef}
      id={isLast ? "lastCard" : undefined}
      className="grid min-h-120 border-t"
      style={{
        gridTemplateColumns: "1fr 80px 1fr",
        borderColor:         "rgba(0,0,0,0.08)",
        borderBottom:        isLast ? "1px solid rgba(0,0,0,0.08)" : undefined,
        opacity:             isVisible ? 1 : 0,
        transform:           isVisible ? "translateY(0)" : "translateY(50px)",
        transition:          "opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1)",
      }}
    >
      {reverse ? (
        <>
          {imageBlock}
          {spineBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {contentBlock}
          {spineBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Features() {
  const [,      setScrollPct]      = useState(0);
  const [,     setLogoRotation]   = useState(0);
  const [spineFill,      setSpineFill]      = useState(0);
  const [spineClip,      setSpineClip]      = useState("inset(9999px 0 0 0)");
  const [visibleCards,   setVisibleCards]   = useState<boolean[]>(CARDS.map(() => false));
  const [logoVisible,    setLogoVisible]    = useState(false);

  const firstCardRef      = useRef<HTMLDivElement | null>(null);
  const lastCardRef       = useRef<HTMLDivElement | null>(null);
  const cardRefs          = useRef<(HTMLDivElement | null)[]>([]);
  const featureSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollPct(pct);
      setSpineFill(pct);
      setLogoRotation(window.scrollY * 0.06);

      const vh = window.innerHeight;
      if (firstCardRef.current && lastCardRef.current) {
        const topR = firstCardRef.current.getBoundingClientRect();
        const botR = lastCardRef.current.getBoundingClientRect();
        const clipTop    = Math.max(0, topR.top);
        const clipBottom = Math.max(0, vh - botR.bottom);
        setSpineClip(`inset(${clipTop}px 0 ${clipBottom}px 0)`);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const first = firstCardRef.current;
    const last  = lastCardRef.current;
    if (!first || !last) return;

    const observer = new IntersectionObserver(
      () => {
        if (!first || !last) return;
        const vh      = window.innerHeight;
        const topR    = first.getBoundingClientRect();
        const botR    = last.getBoundingClientRect();
        const centerY = vh / 2;
        setLogoVisible(topR.top <= centerY && botR.bottom >= centerY);
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    observer.observe(featureSectionRef.current!);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = cardRefs.current.indexOf(e.target as HTMLDivElement);
          if (e.isIntersecting && idx !== -1) {
            setVisibleCards((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative overflow-x-hidden"
      style={{ background: "#F7F5F0", color: "#0d1117" }}
    >
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <ProgressBar />
      <DualSpine fillPct={spineFill} clipPath={spineClip} />
      <CenterLogo visible={logoVisible} />

      <section
        ref={featureSectionRef}
        className="relative pt-12 pb-1.5"
        id="features"
      >
        {/* Section Header */}
        <div
          className="flex items-center justify-between py-12 border-b"
          style={{
            paddingLeft:  "52px",
            paddingRight: "52px",
            borderColor:  "rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-2.5"
              style={{
                fontFamily: "var(--font-hackdaddy), sans-serif",
                color:      "#00d0b2",
              }}
            >
              Platform Capabilities
            </p>
            <h2
              className="font-bold leading-[1.1]"
              style={{
                fontFamily:    "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
                fontSize:      "clamp(28px, 4vw, 48px)",
                letterSpacing: "-0.02em",
                color:         "#0d1117",
              }}
            >
              What You Can Do
              <br />
              with Auto Offensive
            </h2>
          </div>
          
        </div>

        {/* Card Rows */}
        {CARDS.map((card, i) => (
          <CardRow
            key={i}
            card={card}
            isLast={i === CARDS.length - 1}
            isVisible={visibleCards[i]}
            cardRef={(el) => {
              cardRefs.current[i] = el;
              if (i === 0) firstCardRef.current = el;
              if (i === CARDS.length - 1) lastCardRef.current = el;
            }}
          />
        ))}
      </section>

      <Ticker />
    </div>
  );
}