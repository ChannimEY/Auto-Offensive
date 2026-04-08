"use client";

import { useRef } from "react";

export default function TeamShowcase() {
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="bg-[#F7F5F0] dark:bg-[#09090B] pb-20 pt-10 px-6 md:px-10 overflow-hidden transition-colors duration-300"
      style={{ fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif" }}
    >
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1.6fr] gap-12 lg:gap-20 items-center">

        {/* ── Left: Text Content ── */}
        <div className="relative z-10">
          {/* Label */}
          <p className="text-xs font-bold tracking-[3px] uppercase text-[#00BCA1] mb-6">
            Our company
          </p>

          {/* Heading - Realigned to 3 Lines to match image */}
          <h3
            className="font-bold leading-[1.1] text-[#01509e] dark:text-white mb-2 uppercase"
            style={{
              fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif",
              fontSize: "clamp(32px, 4.5vw, 56px)", // Slightly larger to match the 3-line impact
            }}
          >
            <span className="block whitespace-nowrap">In our company,</span>
            <span className="block whitespace-nowrap text-[#00BCA1]">we build</span>
            <span className="block whitespace-nowrap">what we use</span>
          </h3>

          {/* Accent bar */}
          <div
            className="w-24 h-1.5 rounded-full my-8"
            style={{ background: "linear-gradient(90deg, #00BCA1, #01509e)" }}
          />

          {/* Paragraphs - Responsive sizes: 16px -> 18px -> 20px */}
          <div className="space-y-6 text-base md:text-[18px] lg:text-[20px] leading-relaxed text-[#4a4a4a] dark:text-gray-400 mb-10">
            <p>
              We launched as a team of passionate professionals — and we&rsquo;ve kept
              that mindset ever since. Our experts still drive product development
              today, focusing relentlessly on accuracy, speed, and control.
            </p>

            <p>
              Every new feature comes from real-world experience. We constantly
              improve our work with updated techniques, smarter processes, and
              validation that reflects how things actually operate.
            </p>
          </div>

          {/* CTA Button */}
          <a
            href="about-us"
            className="inline-block px-8 py-3.5 rounded-xl border-2 border-[#01509e] dark:border-[#00BCA1] text-[#01509e] dark:text-[#00BCA1] text-base font-bold tracking-wide transition-all duration-300 hover:bg-[#01509e] dark:hover:bg-[#00BCA1] hover:text-white dark:hover:text-[#09090B]"
          >
            Read our story →
          </a>
        </div>

        {/* ── Right: Image Card (Remains the same) ── */}
        <div className="relative group">
          <div
            className="absolute rounded-[2.5rem] z-0"
            style={{
              inset: "-20px",
              background: "linear-gradient(135deg, rgba(0,188,161,0.2) 0%, rgba(1,80,158,0.15) 100%)",
            }}
          />

          <div
            ref={imageRef}
            className="relative z-10 rounded-[24px] overflow-hidden border border-white/10"
            style={{
              boxShadow: "0 30px 70px rgba(1,80,158,0.15)",
              background: "linear-gradient(145deg, #f0f9ff, #e6fcf9)",
            }}
          >
            <div
              className="w-full flex flex-col items-center justify-center gap-4 dark:bg-[#121214]"
              style={{ aspectRatio: "16 / 10" }}
            >
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#00BCA1" strokeWidth="1.2">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-sm text-[#00BCA1] font-bold">Team Photo Placeholder</p>
            </div>
          </div>

          {/* Floating Badge - Team Size */}
          <div className="absolute -top-6 -left-4 z-20 bg-white dark:bg-[#1c1c1e] rounded-2xl px-5 py-3 flex items-center gap-3 border border-gray-100 dark:border-white/5 shadow-xl">
             <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br from-[#00BCA1] to-[#01509e]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
             </div>
             <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase m-0">Team size</p>
                <p className="text-lg font-black text-[#01509e] dark:text-white m-0">12+ Experts</p>
             </div>
          </div>

          {/* Floating Badge - Year */}
          <div className="absolute bottom-10 -right-4 z-20 bg-[#01509e] dark:bg-[#00BCA1] rounded-2xl px-6 py-3 shadow-xl">
            <p className="text-[10px] text-white/70 dark:text-black/70 font-bold uppercase m-0">Est.</p>
            <p className="text-xl font-black text-white dark:text-[#09090B] m-0">2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}