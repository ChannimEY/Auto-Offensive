"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const footerLinks = {
  product: [
    { title: "Tools", href: "#" },
    { title: "Features", href: "#" },
    { title: "Resources", href: "#" },
    { title: "Company", href: "#" },
  ],
  documentation: [
    { title: "Tools Document", href: "#" },
    { title: "CLI Document", href: "#" },
    { title: "API Document", href: "#" },
    { title: "Integration CI/CD", href: "#" },
  ],
  company: [
    { title: "About", href: "#" },
    { title: "Team", href: "#" },
    { title: "Contact", href: "#" },
    { title: "FAQ", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaLinkedin, href: "#" },
  { icon: FaFacebook, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaGithub, href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full border-t bg-zinc-100 text-zinc-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* LOGO + DESC */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png" 
                alt="logo"
                width={60}
                height={60}
              />
              <span className="text-lg font-semibold text-blue-600">
                Auto-Offensive
              </span>
            </Link>

            <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
              Automated penetration testing platform for developers, security engineers, and DevSecOps teams.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-300 hover:bg-zinc-200 transition"
                >
                  <social.icon className="text-sm text-zinc-700" />
                </Link>
              ))}
            </div>

            <p className="text-xs text-zinc-500 italic mt-2">
              “Scan. Detect. Secure.”
            </p>
          </div>

          {/* ORGANIZED */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Organized and Sponsored by
            </h3>

            <Image
              src="/istad_logo.png"
              alt="ISTAD"
              width={120}
              height={50}
            />

            <p className="text-sm text-zinc-600">
              Institute of Science and Technology Advanced Development
            </p>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                {key}
              </h3>

              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-600 hover:text-black transition"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* DIVIDER */}
        <Separator className="my-10 bg-zinc-300" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500 gap-4">
          <p>
            © Copyright 2026, All Rights Reserved by Auto-Offensive <br />
            Built for Security Engineers & Pentesters
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-black transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-black transition">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}