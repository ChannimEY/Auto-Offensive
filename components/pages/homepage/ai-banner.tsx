"use client";

import Image from "next/image";

export default function AiBanner() {
  return (
    <div className="w-full px-6 pb-8 bg-[#F7F5F0] dark:bg-[#09090B] transition-colors duration-300">
      <div
        className="relative pt-12"
        style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
      >
        {/* ── Card ── */}
        {/* Added dark:bg-[#111113] to give the card a slight lift from the pure black background */}
        <div className="relative rounded-3xl bg-[#F7F5F0] dark:bg-[#111113] overflow-hidden min-h-80 px-16 py-12 flex items-center justify-center gap-64 max-[900px]:flex-col max-[900px]:gap-0 max-[900px]:px-8 max-[900px]:pt-10 max-[900px]:pb-56 border border-transparent dark:border-white/5">

          {/* Blobs - Opacity and blur adjusted for Dark Mode depth */}
          <div className="absolute pointer-events-none rounded-full blur-3xl w-md h-96 -top-32 -left-24 bg-[#01509e] opacity-95 dark:opacity-40" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-80 h-80 -top-20 right-14 bg-[#00d0b2] opacity-50 dark:opacity-20" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-96 h-80 -bottom-32 -right-10 bg-[#0194c7] opacity-70 dark:opacity-30" />
          <div className="absolute pointer-events-none rounded-full blur-3xl w-64 h-52 top-[20%] left-[42%] bg-[#00d0b2] opacity-20 dark:opacity-10" />

          {/* Content */}
          <div className="relative z-10 shrink-0 max-w-xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 text-[11px] md:text-xs tracking-widest uppercase text-black/60 dark:text-white/50 mb-4"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/85 dark:bg-[#00d0b2]" />
              Auto Offensive · AI-Powered Security
            </div>

            {/* Title */}
            <h2
              className="text-[2.15rem] md:text-[2.9rem] lg:text-[3.45rem] font-extrabold leading-tight tracking-tighter text-[oklch(0.145_0_0)] dark:text-white mb-5"
              style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
            >
              <span className="block whitespace-nowrap">AI amplifies your</span>
              <span className="block whitespace-nowrap font-extrabold text-primary dark:text-[#00BCA1]">expertise,</span>
              <span className="block whitespace-nowrap font-extrabold text-primary dark:text-[#00BCA1]">not replace it</span>
            </h2>

            {/* Description */}
            <p
              className="text-base md:text-[18px] lg:text-[20px] leading-relaxed text-[oklch(0.556_0_0)] dark:text-white/60 font-normal max-w-lg"
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
            style={{ width: "min(26rem, 34vw)" }}
          />
        </div>

        {/* Real image — outside card */}
        <div
          className="absolute -top-10 bottom-0 z-20 pointer-events-none flex items-end justify-center max-[900px]:right-1/2 max-[900px]:translate-x-1/2 max-[900px]:w-64 max-[900px]:top-auto max-[900px]:bottom-0"
          style={{
            right: "calc(50% - min(14rem, 18vw) - 26rem)",
            width: "min(39rem, 51vw)",
          }}
        >
          <Image
            src="/fox.png"
            alt="Auto Offensive mascot"
            width={960}
            height={960}
            className="w-full h-full object-contain object-bottom drop-shadow-2xl brightness-110 dark:brightness-100"
          />
        </div>
      </div>
    </div>
  );
}
