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
      className="relative flex flex-col rounded-2xl overflow-hidden flex-1 min-w-0 cursor-pointer transition-[border-color] duration-300"
      style={{
        background: "#F7F5F0",
        border: `1.5px solid ${hovered ? card.accentColor + "55" : card.borderColor}`,
        minHeight: "480px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Soft blob backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-400"
        style={{
          background: `${card.blobLeft}, ${card.blobRight}`,
          opacity: hovered ? 1 : 0.75,
        }}
      />

      {/* White glass softening overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
        }}
      />

      {/* Text content */}
      <div className="relative z-[2] px-6 pt-8 pb-4">
        <h3
          className="font-bold leading-tight mb-3 text-2xl tracking-[-0.01em]"
          style={{
            color: card.titleColor,
            fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
          }}
        >
          {card.title}
          <br />
          {card.subtitle}
        </h3>

        <p
          className="text-sm leading-relaxed mb-6 text-slate-500"
          style={{
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
          }}
        >
          {card.description}
        </p>

        <button
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-[background,color] duration-200"
          style={{
            background: "transparent",
            border: `1.5px solid ${card.accentColor}`,
            color: card.accentColor,
            fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
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
      <div className="relative mt-auto mx-auto z-[2] w-[78%]">
        <Image
          src={card.image}
          alt={`${card.title} ${card.subtitle}`}
          className="w-full object-contain object-bottom block"
          style={{ maxHeight: "460px" }}
          draggable={false}
        />
      </div>
    </div>
  );
};

const ThreeCards: React.FC = () => {
  return (
    <section
      className="w-full flex flex-col items-center bg-[#F7F5F0] py-16 px-[120px]"
      style={{
        fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
      }}
    >
      {/* Inner wrapper */}
      <div className="w-full max-w-screen-xl flex flex-col items-start">
        <p
          className="text-sm font-semibold mb-8 tracking-widest uppercase text-slate-400"
          style={{
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
          <div className="w-full rounded-[22px] p-2 flex gap-3 bg-[#F7F5F0]">
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