"use client";

import { useRef } from "react";

export default function TeamShowcase() {
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="bg-[#F7F5F0] pb-20 px-10 overflow-hidden"
      style={{ fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif" }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr_1.6fr] gap-16 items-center">

        {/* ── Left: Text Content ── */}
        <div>
          {/* Label */}
          <p className="text-xs font-semibold tracking-[3px] uppercase text-[#00BCA1] mb-4">
            Our company
          </p>

          {/* Heading */}
          <h2
            className="font-bold leading-[1.18] text-[#01509e] mb-2"
            style={{
              fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
              fontSize: "clamp(28px, 3.5vw, 44px)",
            }}
          >
            In our company,{" "}
            <span className="text-[#00BCA1]">we build</span>{" "}
            what we use
          </h2>

          {/* Accent bar */}
          <div
            className="w-[52px] h-1 rounded-sm my-5"
            style={{ background: "linear-gradient(90deg, #00BCA1, #01509e)" }}
          />

          {/* Paragraphs */}
          <p className="text-[15px] leading-[1.8] text-[#4a4a4a] mb-4.5">
            We launched as a team of passionate professionals — and we've kept
            that mindset ever since. Our experts still drive product development
            today, focusing relentlessly on accuracy, speed, and control.
          </p>

          <p className="text-[15px] leading-[1.8] text-[#4a4a4a] mb-9">
            Every new feature comes from real-world experience. We constantly
            improve our work with updated techniques, smarter processes, and
            validation that reflects how things actually operate — so your team
            can deliver work that's faster, more visible, and built on proof.
          </p>

          {/* CTA Button */}
          <a
            href="about-us"
            className="inline-block px-7 py-3 rounded-lg border-2 border-[#01509e] text-[#01509e] text-sm font-semibold tracking-wide no-underline transition-all duration-200 hover:bg-[#01509e] hover:text-white"
          >
            Read our story →
          </a>
        </div>

        {/* ── Right: Big Image Card ── */}
        <div className="relative">

          {/* Decorative background blob */}
          <div
            className="absolute rounded-3xl z-0"
            style={{
              inset: "-18px",
              background:
                "linear-gradient(135deg, rgba(0,188,161,0.18) 0%, rgba(1,80,158,0.14) 100%)",
            }}
          />

          {/* Image wrapper */}
          <div
            ref={imageRef}
            className="relative z-[1] rounded-[18px] overflow-hidden"
            style={{
              boxShadow:
                "0 20px 60px rgba(1,80,158,0.13), 0 4px 16px rgba(0,0,0,0.06)",
              background: "linear-gradient(145deg, #dbeeff, #e8f6f4)",
            }}
          >
            {/*
              ──────────────────────────────────────────────────────
              REPLACE THIS <div> WITH YOUR <img> TAG:

              <img
                src="/images/your-team-photo.jpg"
                alt="The team at our summer outing"
                className="w-full h-auto block"
              />
              ──────────────────────────────────────────────────────
            */}
            <div
              className="w-full flex flex-col items-center justify-center gap-3"
              style={{ aspectRatio: "16 / 10" }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00BCA1"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-[13px] text-[#00BCA1] font-semibold tracking-wide m-0">
                Replace with your team photo
              </p>
              <p className="text-xs text-[#888] m-0">
                Recommended: 1200 × 750 px
              </p>
            </div>
          </div>

          {/* Caption bar */}
          <div className="relative z-[1] mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00BCA1] inline-block" />
            <p className="text-[13px] text-[#888] m-0 italic">
              The team at our summer outing
            </p>
          </div>

          {/* Floating stat badge — top-left */}
          <div
            className="absolute top-4 -left-5 z-[2] bg-white rounded-xl px-[18px] py-3 flex items-center gap-[10px] border border-[rgba(0,188,161,0.2)]"
            style={{ boxShadow: "0 8px 24px rgba(1,80,158,0.12)" }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #00BCA1, #01509e)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#999] font-medium m-0 mb-[2px]">
                Team size
              </p>
              <p className="text-lg font-bold text-[#01509e] m-0">
                12+ Experts
              </p>
            </div>
          </div>

          {/* Floating year badge — bottom-right */}
          <div
            className="absolute bottom-12 -right-4 z-[2] bg-[#01509e] rounded-xl px-[18px] py-[10px]"
            style={{ boxShadow: "0 8px 24px rgba(1,80,158,0.25)" }}
          >
            <p className="text-[11px] text-white/70 font-medium m-0 mb-[2px]">
              Est.
            </p>
            <p className="text-xl font-bold text-white m-0">2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}