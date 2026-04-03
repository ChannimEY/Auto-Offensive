import type { Metadata } from "next";
import { Noto_Sans_Khmer, Geist } from "next/font/google"; 
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Font english (Google Sans)
const googleSans = localFont({
  src: "./fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
  variable: "--font-google-sans",
  display: "swap",
});

// Font Hacker (Hackdaddy)
const hackdaddy = localFont({
  src: "./fonts/Hackdaddy.otf",
  variable: "--font-hackdaddy",
  display: "swap",
});

// Font khmer (Noto Sans Khmer)
const notoKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-noto-khmer",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Auto-Offensive | Next-Gen PaaS for Hackers",
  description: "Automated Security Workflows and Pentesting Platform",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning    className={cn("h-full", "antialiased", googleSans.variable, hackdaddy.variable, notoKhmer.variable, "font-sans", geist.variable)}
>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
        </ThemeProvider>
      </body>
    </html>
  )
}