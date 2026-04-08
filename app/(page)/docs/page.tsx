'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ChevronRight, BookOpen, Code, Terminal, GitBranch, Shield, ArrowLeft, Menu, X } from "lucide-react";

const docSections = [
  {
    category: "Getting Started",
    items: [
      { title: "Introduction", id: "intro", icon: BookOpen },
      { title: "Quick Start", id: "quickstart", icon: Shield },
      { title: "Installation", id: "installation", icon: Terminal },
    ],
  },
  {
    category: "Tools",
    items: [
      { title: "Subfinder", id: "subfinder", icon: Shield },
      { title: "Nmap", id: "nmap", icon: Shield },
      { title: "Nuclei", id: "nuclei", icon: Shield },
      { title: "SQLMap", id: "sqlmap", icon: Shield },
      { title: "Gobuster", id: "gobuster", icon: Shield },
    ],
  },
  {
    category: "API",
    items: [
      { title: "Authentication", id: "api-auth", icon: Code },
      { title: "Endpoints", id: "api-endpoints", icon: Code },
      { title: "Webhooks", id: "api-webhooks", icon: Code },
      { title: "Rate Limits", id: "api-limits", icon: Code },
    ],
  },
  {
    category: "CLI",
    items: [
      { title: "Commands", id: "cli-commands", icon: Terminal },
      { title: "Configuration", id: "cli-config", icon: Terminal },
      { title: "Examples", id: "cli-examples", icon: Terminal },
    ],
  },
  {
    category: "CI/CD",
    items: [
      { title: "GitHub Actions", id: "cicd-github", icon: GitBranch },
      { title: "GitLab CI", id: "cicd-gitlab", icon: GitBranch },
      { title: "Jenkins", id: "cicd-jenkins", icon: GitBranch },
    ],
  },
];

const docContent: Record<string, React.ReactNode> = {
  intro: (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">Introduction</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Welcome to Auto-Offensive documentation. This guide will help you understand how to use our platform effectively.
      </p>
      <div className="bg-[#00BCA1]/10 border border-[#00BCA1]/20 rounded-xl p-6">
        <h2 className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDEDED] mb-2">What is Auto-Offensive?</h2>
        <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A]">
          Auto-Offensive is a next-generation penetration testing platform that provides automated security workflows, vulnerability scanning, and comprehensive reporting tools.
        </p>
      </div>
    </>
  ),
  quickstart: (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">Quick Start</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Get up and running in 5 minutes with this quick start guide.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Step 1: Sign Up</h2>
      <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A] mb-4">
        Create an account at auto-offensive.com and verify your email address.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Step 2: Run Your First Scan</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        $ auto-off scan --target example.com
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Step 3: View Results</h2>
      <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A]">
        Results are available in your dashboard with detailed vulnerability reports.
      </p>
    </>
  ),
  installation: (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">Installation</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Install the Auto-Offensive CLI on your system.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">macOS</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        $ brew install auto-offensive/brew/auto-off
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Linux</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        $ curl -sL https://get.auto-offensive.com | bash
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Windows</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        $ winget install AutoOffensive.AutoOffensive
      </div>
    </>
  ),
  subfinder: (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">Subfinder</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Passive subdomain discovery tool that finds subdomains using multiple sources.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Usage</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        $ auto-off subfinder -d example.com
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Options</h2>
      <ul className="space-y-3 text-base text-[#5C5C5C] dark:text-[#9A9A9A]">
        <li><code className="bg-[#F7F5F0] dark:bg-[#1A1A1A] px-2 py-1 rounded">-d</code> — Target domain</li>
        <li><code className="bg-[#F7F5F0] dark:bg-[#1A1A1A] px-2 py-1 rounded">-o</code> — Output file</li>
        <li><code className="bg-[#F7F5F0] dark:bg-[#1A1A1A] px-2 py-1 rounded">-silent</code> — Silent mode</li>
      </ul>
    </>
  ),
  "api-auth": (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">API Authentication</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Learn how to authenticate with the Auto-Offensive API.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Generate API Key</h2>
      <p className="text-base text-[#5C5C5C] dark:text-[#9A9A9A] mb-4">
        Go to Settings → API Keys and generate a new key. Keep it secure!
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Authentication Header</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        Authorization: Bearer YOUR_API_KEY
      </div>
    </>
  ),
  "cli-commands": (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">CLI Commands</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Complete list of available CLI commands.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Scan Commands</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        <div className="mb-2">$ auto-off scan --target [domain]</div>
        <div className="mb-2">$ auto-off quick-scan [domain]</div>
        <div>$ auto-off deep-scan [domain]</div>
      </div>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Report Commands</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4">
        <div className="mb-2">$ auto-off report list</div>
        <div className="mb-2">$ auto-off report view [id]</div>
        <div>$ auto-off report export [id] --format pdf</div>
      </div>
    </>
  ),
  "cicd-github": (
    <>
      <h1 className="text-3xl font-black text-[#1A1A1A] dark:text-[#EDEDED] mb-4">GitHub Actions</h1>
      <p className="text-lg text-[#5C5C5C] dark:text-[#9A9A9A] mb-6">
        Integrate Auto-Offensive into your GitHub workflows.
      </p>
      <h2 className="text-xl font-bold text-[#1A1A1A] dark:text-[#EDEDED] mt-8 mb-4">Example Workflow</h2>
      <div className="bg-[#0D1117] rounded-lg p-4 font-mono text-sm text-slate-300 mb-4 overflow-x-auto">
        <pre>{`name: Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Auto-Offensive Scan
        uses: auto-offensive/scan@v1
        with:
          api_key: \${{ secrets.AO_API_KEY }}
          target: \${{ github.repository }}`}</pre>
      </div>
    </>
  ),
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeDoc = docContent[activeSection] || docContent.intro;

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#09090B]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#111113] border-b border-black/9 dark:border-white/9">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-[#F7F5F0] dark:hover:bg-[#1A1A1A] rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#5C5C5C] dark:text-[#9A9A9A]" />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#00BCA1]" />
                <span className="text-lg font-bold text-[#1A1A1A] dark:text-[#EDEDED]">Docs</span>
              </Link>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F5F0] dark:bg-[#1A1A1A] border border-black/9 dark:border-white/9 rounded-lg text-sm text-[#1A1A1A] dark:text-[#EDEDED] placeholder-[#9A9A9A] focus:outline-none focus:border-[#00BCA1]"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#F7F5F0] dark:hover:bg-[#1A1A1A] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto flex">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white dark:bg-[#111113] border-r border-black/9 dark:border-white/9
          overflow-y-auto transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="p-4 space-y-6">
            {docSections.map((section, idx) => (
              <motion.div key={section.category} {...fadeUp(idx * 0.1)}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#9A9A9A] mb-3">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            setActiveSection(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeSection === item.id
                              ? "bg-[#00BCA1]/10 text-[#00BCA1]"
                              : "text-[#5C5C5C] dark:text-[#9A9A9A] hover:bg-[#F7F5F0] dark:hover:bg-[#1A1A1A]"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="text-sm font-medium">{item.title}</span>
                          {activeSection === item.id && (
                            <ChevronRight className="w-4 h-4 ml-auto" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div key={activeSection} {...fadeUp(0)}>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {activeDoc}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-black/9 dark:border-white/9">
              <button className="flex items-center gap-2 text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-[#00BCA1] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Previous</span>
              </button>
              <button className="flex items-center gap-2 text-[#00BCA1] hover:text-[#00A390] transition-colors">
                <span className="text-sm font-medium">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - On This Page */}
        <aside className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-20 p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9A9A9A] mb-4">
              On This Page
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-[#00BCA1] hover:underline">Overview</a>
              </li>
              <li>
                <a href="#" className="text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-[#1A1A1A] dark:hover:text-[#EDEDED]">Requirements</a>
              </li>
              <li>
                <a href="#" className="text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-[#1A1A1A] dark:hover:text-[#EDEDED]">Installation</a>
              </li>
              <li>
                <a href="#" className="text-[#5C5C5C] dark:text-[#9A9A9A] hover:text-[#1A1A1A] dark:hover:text-[#EDEDED]">Configuration</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}