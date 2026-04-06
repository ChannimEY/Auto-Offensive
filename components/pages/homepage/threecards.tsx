"use client";

import React, { useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import img1 from "@/public/home-image/code1.png";
import img2 from "@/public/home-image/code2.png";
import img3 from "@/public/home-image/code3.png";

interface CardData {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData;
  accentColor: string;
  blobLeft: string;
  blobRight: string;
  borderColor: string;
  titleColor: string;
}

// ── CUSTOMIZE CARDS HERE ─────────────────────────────────────────────────────
const CARD_WIDTH = "100%";
const CARD_MIN_HEIGHT = "480px";
const IMAGE_MAX_HEIGHT = "460px";
const IMAGE_WIDTH = "78%";
const CARD_BG = "#F7F5F0";
const SECTION_BG = "#F7F5F0";
const SECTION_PADDING_X = "120px"; // left and right padding
// ─────────────────────────────────────────────────────────────────────────────

const cards: CardData[] = [
  {
    title: "Security",
    subtitle: "consultants",
    description: "Work faster, prove more, grow your practice.",
    image: img1,
    accentColor: "#01509e",
    blobLeft: "radial-gradient(ellipse at 20% 80%, rgba(0,208,178,0.28) 0%, transparent 65%)",
    blobRight: "radial-gradient(ellipse at 85% 15%, rgba(1,80,158,0.22) 0%, transparent 60%)",
    borderColor: "rgba(1,80,158,0.18)",
    titleColor: "#01509e",
  },
  {
    title: "Internal security",
    subtitle: "teams",
    description: "Maintain visibility, reduce risk, earn trust.",
    image: img2,
    accentColor: "#00D0B2",
    blobLeft: "radial-gradient(ellipse at 15% 75%, rgba(0,208,178,0.32) 0%, transparent 65%)",
    blobRight: "radial-gradient(ellipse at 90% 10%, rgba(0,208,178,0.18) 0%, transparent 60%)",
    borderColor: "rgba(0,208,178,0.3)",
    titleColor: "#00a896",
  },
  {
    title: "Managed Security",
    subtitle: "Providers (MSPs)",
    description: "Deliver more value with less overhead.",
    image: img3,
    accentColor: "#01509e",
    blobLeft: "radial-gradient(ellipse at 20% 80%, rgba(1,80,158,0.2) 0%, transparent 65%)",
    blobRight: "radial-gradient(ellipse at 85% 15%, rgba(0,208,178,0.25) 0%, transparent 60%)",
    borderColor: "rgba(1,80,158,0.18)",
    titleColor: "#01509e",
  },
];

const Card: React.FC<{ card: CardData }> = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#F7F5F0",
        border: `1.5px solid ${hovered ? card.accentColor + "55" : card.borderColor}`,
        width: CARD_WIDTH,
        minHeight: CARD_MIN_HEIGHT,
        transition: "border-color 0.3s ease",
        cursor: "pointer",
        flex: "1 1 0",
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft blob backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `${card.blobLeft}, ${card.blobRight}`,
          opacity: hovered ? 1 : 0.75,
          transition: "opacity 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* White glass softening overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
          zIndex: 1,
        }}
      />

      {/* Text content */}
      <div className="relative px-6 pt-8 pb-4" style={{ zIndex: 2 }}>
        <h3
          className="font-bold leading-tight mb-3"
          style={{
            color: card.titleColor,
            fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
            fontSize: "1.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          {card.title}
          <br />
          {card.subtitle}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{
            color: "#64748b",
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
          }}
        >
          {card.description}
        </p>

        <button
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full"
          style={{
            background: "transparent",
            border: `1.5px solid ${card.accentColor}`,
            color: card.accentColor,
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
            transition: "background 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = card.accentColor;
            btn.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "transparent";
            btn.style.color = card.accentColor;
          }}
        >
          See more
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1L11 6L6 11M11 6H1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Character image */}
      <div
        className="relative mt-auto mx-auto"
        style={{ width: IMAGE_WIDTH, zIndex: 2 }}
      >
        <Image
          src={card.image}
          alt={`${card.title} ${card.subtitle}`}
          className="w-full object-contain object-bottom"
          style={{ display: "block", maxHeight: IMAGE_MAX_HEIGHT }}
          draggable={false}
        />
      </div>
    </div>
  );
};

const ThreeCards: React.FC = () => {
  return (
    <section
      className="w-full flex flex-col items-center"
      style={{
        background: SECTION_BG,
        minHeight: "100vh",
        paddingTop: "64px",
        paddingBottom: "64px",
        paddingLeft: SECTION_PADDING_X,
        paddingRight: SECTION_PADDING_X,
        fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
      }}
    >
      {/* Inner wrapper — aligns heading left, keeps content centered */}
      <div className="w-full max-w-screen-xl flex flex-col items-start">
        <p
          className="text-sm font-semibold mb-8 tracking-widest uppercase"
          style={{
            color: "#94a3b8",
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
          }}
        >
          Auto Offensive is for
        </p>

        {/* Outer gradient border frame */}
        <div
          className="w-full rounded-3xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,208,178,0.4) 0%, rgba(1,80,158,0.25) 50%, rgba(0,208,178,0.35) 100%)",
          }}
        >
          <div
            className="w-full rounded-[22px] p-2 flex gap-3"
            style={{ background: SECTION_BG }}
          >
            {cards.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeCards;