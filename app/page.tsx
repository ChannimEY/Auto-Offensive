import type { Metadata } from "next";
import Home from "@/components/pages/homepage/home";

export const metadata: Metadata = {
  title: "Auto-Offensive | Next-Gen PaaS for Hackers",
  description: "Automated Security Workflows and Pentesting Platform",
  keywords: [
    "auto offensive",
    "pentesting platform",
    "security automation",
    "cybersecurity tools",
    "ethical hacking",
  ],
  openGraph: {
    title: "Auto-Offensive | Next-Gen PaaS for Hackers",
    description: "Automated Security Workflows and Pentesting Platform",
    url: "https://yourdomain.com",
    siteName: "Auto-Offensive",
    images: [
      {
        url: "/public/Auto-Offensive.png",
        width: 1200,
        height: 630,
        alt: "Auto-Offensive Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auto-Offensive",
    description: "Automated Security Workflows Platform",
    images: ["https://yourdomain.com/og-image.png"],
  },
};

export default function RootPage() {
  return <Home />;
}
