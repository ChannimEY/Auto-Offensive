"use client";
import Image from "next/image";

export default function AiBanner() {
  return (
    <div className="w-full px-6 pb-8 bg-[#F7F5F0] dark:bg-black">
      <div
        className="relative pt-15 bg-[#F7F5F0]  dark:bg-black"
        style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
      >
        {/* ── Card ── */}
        <div className="relative rounded-[28px] bg-[#F7F5F0] dark:bg-black overflow-hidden min-h-75 px-16 py-13 flex items-center justify-center max-[900px]:flex-col max-[900px]:px-8 max-[900px]:pt-10 max-[900px]:pb-55">

          {/* Blobs */}
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-120 h-110 -top-35 -left-25 bg-[#01509e] opacity-95" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-80 h-80 -top-20 right-15 bg-primary opacity-50" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-95 h-85 -bottom-8  -right-2.5 bg-[#0194c7] opacity-70" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-70 h-55 top-20 left-1/2 bg-primary opacity-20" />

          {/* Content */}
          <div className="relative z-10 shrink-0 max-w-115">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/60 mb-4"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/85 dark:text-white" />
              Auto Offensive · AI-Powered Security
            </div>

            <h2 className="text-3xl lg:text-4xl dark:text-white font-extrabold leading-tight tracking-tight text-black mb-4.5">
              AI amplifies your<br />
              <span className="font-extrabold text-primary">expertise, not replace it</span>
            </h2>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-white font-normal max-w-110">
              Auto Offensive doesn&apos;t replace skilled security professionals.
              Instead, we empower ethical hackers, penetration testers, and
              infosec practitioners with AI-driven workflows that handle the
              tedious work so you can focus on creative hacking, custom
              testing, and security research.
            </p>
          </div>

          {/* Invisible placeholder */}
          <div className="shrink-0 self-stretch pointer-events-none max-[900px]:hidden w-95" />

          {/* Mobile image */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden justify-center max-[900px]:flex">
            <div className="w-72 max-[767px]:w-60">
              <Image
                src="/fox.png"
                alt="Auto Offensive mascot"
                width={960}
                height={960}
                className="w-full h-auto object-contain object-bottom drop-shadow-2xl brightness-110"
              />
            </div>
          </div>
        </div>

        {/* Desktop image */}
        <div className="absolute top-0 bottom-0 z-10 pointer-events-none flex items-end justify-center max-[900px]:right-1/2 max-[900px]:translate-x-1/2 max-[900px]:w-50 max-[900px]:top-auto max-[900px]:bottom-0"
          style={{
            right: "calc(50% - min(190px, 16vw) - 425px)",
            width: "min(560px, 48vw)",
          }}
        >
          <img
            src="./fox.png"
            alt="Auto Offensive mascot"
            className="w-full h-full object-contain object-bottom"
            style={{ filter: "drop-shadow(0 20px 48px rgba(1, 20, 60, 0.5))" }}
          />
        </div>
      </div>
    </div>
  );
}
