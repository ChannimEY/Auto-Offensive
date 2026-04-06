"use client";

export default function AiBanner() {
  return (
    <div className="w-full px-6 pb-8 bg-[#F7F5F0]">
      <div
        className="relative pt-[60px] bg-[#F7F5F0]"
        style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
      >
        {/* ── Card ── */}
        <div className="relative rounded-[28px] bg-[#F7F5F0] overflow-hidden min-h-[300px] px-16 py-[52px] flex items-center justify-center gap-[250px] max-[900px]:flex-col max-[900px]:gap-0 max-[900px]:px-8 max-[900px]:pt-10 max-[900px]:pb-[220px]">

          {/* Blobs */}
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-[460px] h-[420px] -top-[140px] -left-[100px] bg-[#01509e] opacity-95" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-[320px] h-[320px] -top-[80px] right-[60px] bg-[#00d0b2] opacity-50" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-[380px] h-[340px] -bottom-[130px] -right-[40px] bg-[#0194c7] opacity-70" />
          <div className="absolute pointer-events-none rounded-full blur-[80px] w-[280px] h-[220px] top-[20%] left-[42%] bg-[#00d0b2] opacity-20" />

          {/* Content */}
          <div className="relative z-[2] shrink-0 max-w-[460px]">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-black/60 mb-4"
              style={{ fontFamily: "monospace" }}
            >
              <span className="w-[5px] h-[5px] rounded-full bg-black/85" />
              Auto Offensive · AI-Powered Security
            </div>

            {/* Title */}
            <h2
              className="text-[clamp(28px,3vw,42px)] font-extrabold leading-[1.12] tracking-[-0.03em] text-[oklch(0.145_0_0)] mb-[18px]"
              style={{ fontFamily: "var(--font-hackdaddy), var(--font-noto-khmer), sans-serif" }}
            >
              AI amplifies your<br />
              <span className="font-extrabold text-[#00D0B2]">expertise, not replace it</span>
            </h2>

            {/* Description */}
            <p
              className="text-sm leading-[1.78] text-[oklch(0.556_0_0)] font-normal max-w-[420px]"
              style={{ fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif" }}
            >
              Auto Offensive doesn&apos;t replace skilled security professionals.
              Instead, we empower ethical hackers, penetration testers, and
              infosec practitioners with AI-driven workflows that handle the
              tedious work so you can focus on creative hacking, custom
              testing, and security research.
            </p>
          </div>

          {/* Invisible placeholder — reserves image space in flex row */}
          <div
            className="shrink-0 self-stretch pointer-events-none max-[900px]:hidden"
            style={{ width: "min(380px, 32vw)" }}
          />
        </div>

        {/* Real image — outside card, overflows top edge freely */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none flex items-end justify-center max-[900px]:right-1/2 max-[900px]:translate-x-1/2 max-[900px]:w-[200px] max-[900px]:top-auto max-[900px]:bottom-0"
          style={{
            right: "calc(50% - min(190px, 16vw) - 425px)",
            width: "min(560px, 48vw)",
          }}
        >
          <img
            src="./fox.png"
            alt="Auto Offensive mascot"
            className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_48px_rgba(1,20,60,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}