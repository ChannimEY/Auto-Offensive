"use client";

import Image from "next/image";

export default function AiBanner() {
  return (
    <div className="w-full px-6 pb-8 bg-[#F7F5F0]">
      <div
        className="relative pt-12 bg-[#F7F5F0]"
        style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
      >
        {/* ── Card ── */}
        <div className="relative rounded-3xl bg-[#F7F5F0] overflow-hidden min-h-80 px-16 py-12 flex items-center justify-center gap-64 max-[900px]:flex-col max-[900px]:gap-0 max-[900px]:px-8 max-[900px]:pt-10 max-[900px]:pb-56">

          {/* Blobs - Using standard units where possible (w-112 is ~448px) */}
          <div className="absolute pointer-events-none rounded-full blur-3xl w-112 h-96 -top-32 -left-24 bg-[#01509e] opacity-95" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-80 h-80 -top-20 right-14 bg-[#00d0b2] opacity-50" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-96 h-80 -bottom-32 -right-10 bg-[#0194c7] opacity-70" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-64 h-52 top-[20%] left-[42%] bg-[#00d0b2] opacity-20" />

          {/* Content */}
          <div className="relative z-10 shrink-0 max-w-md">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-black/60 mb-4"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/85" />
              Auto Offensive · AI-Powered Security
            </div>

            {/* Title */}
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter text-[oklch(0.145_0_0)] mb-5"
              style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
            >
              AI amplifies your<br />
              <span className="font-extrabold text-primary">expertise, not replace it</span>
            </h2>

            {/* Description */}
            <p
              className="text-sm leading-relaxed text-[oklch(0.556_0_0)] font-normal max-w-sm"
              style={{ fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif" }}
            >
              Auto Offensive doesn&apos;t replace skilled security professionals.
              Instead, we empower ethical hackers, penetration testers, and
              infosec practitioners with AI-driven workflows that handle the
              tedious work so you can focus on creative hacking, custom
              testing, and security research.
            </p>
          </div>

          {/* Invisible placeholder */}
          <div
            className="shrink-0 self-stretch pointer-events-none max-[900px]:hidden"
            style={{ width: "min(24rem, 32vw)" }}
          />
        </div>

        {/* Real image — outside card */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-end justify-center max-[900px]:right-1/2 max-[900px]:translate-x-1/2 max-[900px]:w-48 max-[900px]:top-auto max-[900px]:bottom-0"
          style={{
            right: "calc(50% - min(12rem, 16vw) - 26rem)",
            width: "min(35rem, 48vw)",
          }}
        >
          <Image
            src="/fox.png"
            alt="Auto Offensive mascot"
            width={560}
            height={560}
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}