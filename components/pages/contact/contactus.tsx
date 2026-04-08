"use client";

import { useRef, useState } from "react";

/* ─── Info items ─────────────────────────────────── */
const INFO_ITEMS = [
  {
    title: "Email",
    desc: "hello@penshield.io",
    href: "mailto:hello@penshield.io",
    meta: "Response within 2 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={1.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 4-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 4" />
      </svg>
    ),
  },
  {
    title: "Live Chat",
    desc: "Start a conversation",
    href: "#",
    meta: "Mon-Fri, 9 AM – 6 PM EST",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={1.5}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Office",
    descRaw: (
      <>
        123 Security Street
        <br />
        San Francisco, CA 94105
      </>
    ),
    meta: "HQ Location",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={1.5}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Support Portal",
    desc: "support.penshield.io",
    href: "#",
    meta: "24/7 Assistance Available",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.57 10.57 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.771 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-4.467-.838-8.343-3.554-11.761a.056.056 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.191-.964 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.191-.964 2.156-2.157 2.156z" />
      </svg>
    ),
  },
];

/* ─── Component ─────────────────────────────────── */
export default function ContactUs() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setDisabled(true);
    setTimeout(() => {
      setSubmitted(false);
      setDisabled(false);
      formRef.current?.reset();
    }, 4000);
  }

  return (
    <>
      <style>{`
        /* ── Slide-up animation ── */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-slow {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(-30px,-30px); }
        }
        @keyframes float-slow-reverse {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(30px,30px); }
        }

        .contact-header-label {
          opacity: 0;
          animation: slideUp 0.7s 0.15s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .contact-title {
          opacity: 0;
          animation: slideUp 0.7s 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .contact-desc {
          opacity: 0;
          animation: slideUp 0.7s 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .description-text {
          font-size: 16px;
        }
        @media (min-width: 768px) {
          .description-text {
            font-size: 18px;
          }
        }
        @media (min-width: 1024px) {
          .description-text {
            font-size: 20px;
          }
        }
        .contact-grid-anim {
          opacity: 0;
          animation: fadeInUp 0.8s 0.5s ease forwards;
        }
        .status-msg {
          animation: slideDownFade 0.3s ease forwards;
        }

        /* ── Gradient blobs ── */
        .grad-blob-1 {
          animation: float-slow 20s ease-in-out infinite;
        }
        .grad-blob-2 {
          animation: float-slow-reverse 25s ease-in-out infinite;
        }

        /* ── Form input focus ring ── */
        .contact-input:focus {
          outline: none;
          border-color: #00BCA1;
          
        }

        /* ── Submit button shimmer ── */
        .btn-submit-shimmer {
          position: relative;
   
        }
        .btn-submit-shimmer:hover {
 
        }

        /* ── Info card hover ── */
        .info-card {
          transition: border-color 0.35s cubic-bezier(0.4,0,0.2,1),
                      
        }
        .info-card:hover {
          border-color: rgba(0,188,161,0.35);
          
        }
        .dark .info-card:hover {
          
        }
        .info-icon-wrap {
          transition: background 0.3s;
        }

        /* ── Social link hover ── */
        .social-btn {
          transition: background 0.25s, border-color 0.25s,
                    //   box-shadow 0.25s;
        }
        .social-btn:hover {
        //   box-shadow: 0 4px 12px rgba(0,188,161,0.18);
        }

        /* ── Form wrapper hover ── */
        .form-card {
          transition: border-color 0.35s cubic-bezier(0.4,0,0.2,1),
                     
        }
        .form-card:hover {
          border-color: rgba(0,188,161,0.25);
        //   box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .dark .form-card:hover {
        //   box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        }

        /* ── Info link hover ── */
        .info-link {
          transition: color 0.2s;
          display: inline-block;
        }
        .info-link:hover {
          color: #009f88;
        }

        /* ── Textarea resize ── */
        .contact-textarea {
          resize: vertical;
          min-height: 160px;
        }
      `}</style>

      <section
        className="
          relative min-h-screen overflow-hidden
          bg-[#F7F5F0] dark:bg-[#09090B]
          text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)]
          font-[var(--font-google-sans),var(--font-noto-khmer),sans-serif]
          transition-[background] duration-500
          pt-[140px] pb-[100px] px-[6%]
        "
      >
        {/* ── Gradient blobs ── */}
        <div
          className="grad-blob-1 pointer-events-none fixed top-0 right-0 z-0 opacity-40"
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,188,161,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />
        <div
          className="grad-blob-2 pointer-events-none fixed bottom-0 left-0 z-0 opacity-40"
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,188,161,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />

        {/* ── Container ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* ── Header ── */}
          <div className="text-center mb-20">
            <div className="contact-header-label inline-block text-[0.75rem] font-bold tracking-[0.06em] uppercase text-[#00BCA1] mb-4 px-4 py-2 bg-[rgba(0,188,161,0.10)] dark:bg-[rgba(0,188,161,0.12)] rounded-lg">
              Contact Us
            </div>

            <h1 className="contact-title text-[clamp(2rem,6vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-5">
              Let's Build Something Secure
            </h1>

            <p className="contact-desc description-text hero-description text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)] max-w-[620px] mx-auto leading-[1.8] font-normal">
              Have questions? Our team is here to help you protect your infrastructure with advanced penetration testing.
            </p>
          </div>

          {/* ── Main Grid ── */}
          <div className="contact-grid-anim grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12">

            {/* ── Form Card ── */}
            <div className="form-card bg-[#F0EDE7] dark:bg-[#0f1714] border border-[#E5E1D8] dark:border-[#1a2622] rounded-2xl p-8 lg:p-12 ">
              {/* Success message */}
              {submitted && (
                <div className="status-msg description-text mb-6 p-4 rounded-xl font-semibold bg-[rgba(0,188,161,0.10)] text-[#00BCA1] border border-[rgba(0,188,161,0.20)]">
                  ✓ Message sent successfully! We'll be in touch soon.
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit}>
                {/* Row: First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col">
                    <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      required
                      className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      required
                      className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col mb-8">
                  <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    required
                    className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                  />
                </div>

                {/* Row: Company / Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex flex-col">
                    <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col mb-8">
                  <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="contact-input description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col mb-8">
                  <label className="description-text font-semibold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-3 tracking-[0.01em]">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="contact-input contact-textarea description-text bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl px-[14px] py-3 text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] font-normal leading-relaxed placeholder:text-[oklch(0.556_0_0)] dark:placeholder:text-[oklch(0.4_0_0)] transition-all duration-200 font-[inherit]"
                  />
                </div>

                {/* Checkbox */}
                <div className="description-text flex items-start gap-3 p-5 bg-[rgba(0,188,161,0.06)] dark:bg-[rgba(0,188,161,0.06)] border border-[rgba(0,188,161,0.14)] dark:border-[rgba(0,188,161,0.12)] rounded-xl my-8 text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)] leading-relaxed">
                  <input
                    type="checkbox"
                    id="agree"
                    required
                    className="w-[18px] h-[18px] min-w-[18px] mt-[3px] cursor-pointer accent-[#00BCA1]"
                  />
                  <label htmlFor="agree" className="cursor-pointer">
                    I agree to the{" "}
                    <a href="#" className="text-[#00BCA1] font-semibold no-underline hover:underline">
                      privacy policy
                    </a>{" "}
                    and terms. PenShield may contact me regarding my inquiry.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={disabled}
                  className="btn-submit-shimmer description-text w-full mt-6 bg-[#00BCA1] hover:bg-[#009f88] disabled:opacity-60 disabled:cursor-not-allowed text-white border-none py-[13px] px-7 rounded-xl font-bold font-[inherit] cursor-pointer  tracking-[0.01em] transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* ── Info Column ── */}
            <div className="flex flex-col gap-5">
              {INFO_ITEMS.map((item) => (
                <div key={item.title} className="info-card bg-[#F0EDE7] dark:bg-[#0f1714] border border-[#E5E1D8] dark:border-[#1a2622] rounded-2xl p-7 flex gap-5 cursor-pointer">
                  {/* Icon */}
                  <div className="info-icon-wrap w-[52px] h-[52px] min-w-[52px] bg-[rgba(0,188,161,0.08)] dark:bg-[rgba(0,188,161,0.10)] border border-[rgba(0,188,161,0.14)] dark:border-[rgba(0,188,161,0.12)] rounded-xl flex items-center justify-center text-[#00BCA1]">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-[1rem] font-bold text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)] mb-1 tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    {item.descRaw ? (
                      <p className="description-text text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)] mb-1 font-normal">
                        {item.descRaw}
                      </p>
                    ) : (
                      <p className="description-text mb-1 font-normal">
                        {item.href ? (
                          <a href={item.href} className="info-link text-[#00BCA1] font-semibold no-underline">
                            {item.desc}
                          </a>
                        ) : (
                          <span className="text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)]">{item.desc}</span>
                        )}
                      </p>
                    )}
                    <p className="description-text text-[oklch(0.556_0_0)] dark:text-[oklch(0.4_0_0)] mt-2 font-normal">
                      {item.meta}
                    </p>
                  </div>
                </div>
              ))}

              {/* ── Social Links ── */}
              <div className="border-t border-[#E5E1D8] dark:border-[#1a2622] pt-6 mt-2">
                <p className="description-text text-[oklch(0.556_0_0)] dark:text-[oklch(0.4_0_0)] mb-4 font-medium">
                  Follow us
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.label}
                      className="social-btn flex items-center justify-center w-12 h-12 bg-[#F7F5F0] dark:bg-[#0a1411] border border-[#D9D5CC] dark:border-[#1a2622] rounded-xl text-[#00BCA1] no-underline hover:bg-[rgba(0,188,161,0.08)] hover:border-[rgba(0,188,161,0.25)]"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>{/* end grid */}
        </div>{/* end container */}
      </section>
    </>
  );
}
