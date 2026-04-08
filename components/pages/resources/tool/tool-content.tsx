'use client';

import React, { useState } from 'react';
import {
  Wrench,
  AlertCircle,
  Info,
  AlertTriangle,
  Zap,
  Shield,
  CheckCircle,
  Copy,
} from 'lucide-react';

interface ToolContentProps {
  isDark?: boolean;
}

export const ToolContent: React.FC<ToolContentProps> = ({ isDark = false }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoFontStyle = {
    fontFamily: 'var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer), monospace',
  } as const;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1600);
  };

  const textColor = isDark ? 'text-white' : 'text-[#1A1714]';
  const secondaryText = isDark ? 'text-[#C9CDD4]' : 'text-[#4A4540]';
  const mutedText = isDark ? 'text-[#A1A1AA]' : 'text-[#88837B]';
  const bgColor = isDark ? 'bg-[#09090B]' : 'bg-[#F7F5F0]';
  const cardBg = isDark ? 'bg-[#121214]' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-[#E2DDD5]';
  const hoverBg = isDark ? 'hover:bg-white/5' : 'hover:bg-[#EAE6DE]';
  const accentColor = '#00BCA1';
  const codeBg = isDark ? 'bg-[#16181F]' : 'bg-[#F0EDE6]';

  return (
    <main
      className={`${bgColor} flex-1 min-w-0 px-8 md:px-10 xl:px-12 pt-12 pb-32`}
    >
      {/* Page Header */}
      <div className="mb-12">
        <div className={`flex items-center gap-2 ${bodyTextClass} mb-4 ${mutedText}`}>
          <a href="#" className="hover:opacity-75">Docs</a>
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <a href="#" className="hover:opacity-75">Tool Reference</a>
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span>Tool Overview</span>
        </div>

        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 ${
            isDark
              ? 'bg-[rgba(0,188,161,0.12)] text-[#00BCA1]'
              : 'bg-[rgba(0,188,161,0.07)] text-[#00BCA1] border border-[rgba(0,188,161,0.2)]'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00BCA1] animate-pulse" />
          Tool Reference · v2.0
        </div>

        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor} leading-tight`}>
          Tool Reference
        </h1>
        <p className={`${bodyTextClass} ${secondaryText} max-w-2xl leading-relaxed mb-8`}>
          A complete reference for all scanning tools available on the platform — parameters, output
          formats, usage examples, and behavioural notes. All tools run remotely; no local installation
          required.
        </p>

        {/* Meta Pills */}
        <div className={`flex flex-wrap gap-4 pb-8 border-b ${borderColor}`}>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium ${
              isDark
                ? 'bg-[#121214] text-[#C9CDD4] border border-white/10'
                : 'bg-white border border-[#E2DDD5] text-[#4A4540]'
            }`}
          >
            <Wrench size={14} />
            4 tools available
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium ${
              isDark
                ? 'bg-[#121214] text-[#C9CDD4] border border-white/10'
                : 'bg-white border border-[#E2DDD5] text-[#4A4540]'
            }`}
          >
            <Shield size={14} />
            Managed & sandboxed
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium ${
              isDark
                ? 'bg-[#121214] text-[#C9CDD4] border border-white/10'
                : 'bg-white border border-[#E2DDD5] text-[#4A4540]'
            }`}
          >
            <CheckCircle size={14} />
            JSON · TXT · JSONL output
          </div>
        </div>
      </div>

      {/* ─── Tool Overview Section ─── */}
      <section id="overview" className="mb-16 scroll-mt-20">
        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${textColor}`}>
          Tool Overview <span className={`${monoTextClass} px-2 py-1 rounded ${codeBg} ${mutedText}`} style={monoFontStyle}>4 tools</span>
        </h2>
        <p className={`${bodyTextClass} ${secondaryText} max-w-2xl mb-8 leading-relaxed`}>
          The platform exposes a curated set of industry-standard open-source security tools, each wrapped
          in a controlled execution environment. Every tool is kept up-to-date, sandboxed, and accessible
          through a unified interface — either via the Web UI, CLI, or API.
        </p>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: '🔍',
              name: 'subfinder',
              fullname: 'Subdomain Enumeration',
              desc: 'Discovers subdomains using passive DNS sources, certificate transparency logs, and brute-force dictionary methods.',
              tags: ['Recon', 'Passive', 'DNS'],
              version: 'v2.6.3',
              status: 'Live',
            },
            {
              icon: '🌐',
              name: 'httpx',
              fullname: 'HTTP Probing & Fingerprinting',
              desc: 'Probes HTTP/HTTPS endpoints to gather status codes, titles, server headers, TLS details, and technology fingerprints.',
              tags: ['Web', 'Probing', 'TLS'],
              version: 'v1.6.5',
              status: 'Live',
            },
            {
              icon: '📡',
              name: 'naabu',
              fullname: 'Port Scanner',
              desc: 'Fast TCP/UDP port scanner with SYN, CONNECT, and UDP scan modes. Supports CIDR ranges and service banner grabbing.',
              tags: ['Network', 'TCP', 'UDP'],
              version: 'v2.3.1',
              status: 'Live',
            },
            {
              icon: '⚡',
              name: 'nuclei',
              fullname: 'Vulnerability Scanner',
              desc: 'Template-driven scanner for detecting CVEs, misconfigurations, exposed panels, and custom security checks across web targets.',
              tags: ['Web', 'Templates', 'CVE'],
              version: 'v3.2.7',
              status: 'Live',
            },
          ].map((tool, idx) => (
            <div
              key={idx}
              className={`border ${borderColor} rounded-xl p-6 transition-all ${
                isDark
                  ? 'bg-[#121214] hover:bg-white/5 hover:border-[#00BCA1]'
                  : 'bg-white hover:bg-[#EAE6DE] hover:border-[#00BCA1]'
              }`}
            >
              <div className="text-3xl mb-2">{tool.icon}</div>
              <div className={`${monoTextClass} font-bold ${textColor} mb-1`} style={monoFontStyle}>{tool.name}</div>
              <div className={`${bodyTextClass} ${mutedText} mb-3`}>{tool.fullname}</div>
              <p className={`${bodyTextClass} ${secondaryText} mb-4 leading-relaxed`}>{tool.desc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      isDark ? 'bg-white/5 text-[#A1A1AA]' : 'bg-[#F0EDE6] text-[#88837B]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={`flex items-center justify-between pt-3 border-t ${borderColor}`}>
                <span className={`${monoTextClass} ${mutedText}`} style={monoFontStyle}>{tool.version}</span>
                <span className="text-xs font-medium text-[#00BCA1] bg-[rgba(0,188,161,0.1)] px-2 py-1 rounded">
                  {tool.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div
          className={`flex gap-4 p-4 rounded-lg border-l-4 border-[#00BCA1] ${
            isDark ? 'bg-white/5' : 'bg-[rgba(0,188,161,0.07)]'
          }`}
        >
          <div className="text-xl shrink-0">🔒</div>
          <div>
            <div className={`font-semibold text-xs uppercase tracking-wide text-[#00BCA1] mb-2`}>
              All tools run remotely
            </div>
            <p className={`${bodyTextClass} ${secondaryText}`}>
              You never install or update any of these tools locally. The platform manages all tool versions,
              dependency environments, and execution sandboxes. Your only interface is the CLI command or API
              call.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Tool Sections ─── */}
      {['subfinder', 'httpx', 'naabu', 'nuclei'].map((toolName, toolIdx) => (
        <ToolSection key={toolIdx} toolName={toolName} isDark={isDark} onCopy={copyToClipboard} copiedCode={copiedCode} />
      ))}

      {/* ─── Versions ─── */}
      <section id="versions" className="mb-16 scroll-mt-20">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Versions & Status</h2>
        <p className={`${bodyTextClass} ${secondaryText} mb-8`}>
          The platform manages all tool versions centrally. You always execute the current stable release — no
          manual upgrades required. Status changes are announced in the changelog.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { name: 'subfinder', version: 'v2.6.3' },
            { name: 'httpx', version: 'v1.6.5' },
            { name: 'naabu', version: 'v2.3.1' },
            { name: 'nuclei', version: 'v3.2.7' },
          ].map((v, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${borderColor} ${
                isDark ? 'bg-[#121214]' : 'bg-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-[#00BCA1] animate-pulse" />
              <div>
                <div className={`${monoTextClass} font-bold ${textColor}`} style={monoFontStyle}>{v.name}</div>
                <div className={`${bodyTextClass} ${mutedText}`}>{v.version} · stable</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Rate Limits ─── */}
      <section id="limits" className="mb-16 scroll-mt-20">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Rate Limits & Quotas</h2>
        <p className={`${bodyTextClass} ${secondaryText} mb-8`}>
          All tool executions are subject to per-account rate limits and daily quotas, enforced by the
          backend. Limits vary by plan tier. Exceeding a limit results in a <code className={`${codeBg} px-2 py-1 rounded ${monoTextClass}`} style={monoFontStyle}>429 Too Many Requests</code> error and the job will not be queued.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Daily scans', value: '100', sub: 'Free plan' },
            { label: 'Concurrent jobs', value: '3', sub: 'Free plan' },
            { label: 'Max targets / job', value: '500', sub: 'All plans' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`border ${borderColor} rounded-lg p-4 ${isDark ? 'bg-[#121214]' : 'bg-white'}`}
            >
              <div className={`text-xs uppercase tracking-wide font-semibold ${mutedText} mb-2`}>
                {item.label}
              </div>
              <div className={`text-3xl font-bold ${textColor} mb-1`}>{item.value}</div>
              <div className={`${bodyTextClass} ${mutedText} mb-3`}>{item.sub}</div>
              <div className={`h-1 rounded bg-[#00BCA1] w-1/2`} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Output Formats ─── */}
      <section id="output" className="mb-16 scroll-mt-20">
        <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Output Formats</h2>
        <p className={`${bodyTextClass} ${secondaryText} mb-8`}>
          All tools support multiple output formats. The default is plain text streamed to your terminal. Use
          format flags to control the structure of stored results and downloaded files.
        </p>

        <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
          {[
            { icon: '📄', title: 'Plain text (default)', desc: 'One result per line, streamed to stdout and saved as .txt. Human-readable, easy to pipe into other tools or grep.' },
            { icon: '🗂️', title: 'JSON / JSONL', desc: 'Structured output with one JSON object per line (JSONL). Includes all metadata fields per result — use -json or -oJ flags depending on the tool.' },
            { icon: '🌐', title: 'Web UI structured view', desc: 'All results are automatically parsed and stored in the platform\'s structured data model, regardless of raw output format. View, filter, and sort results from the dashboard.' },
            { icon: '📋', title: 'Report export', desc: 'Results from any tool can be included in generated reports — PDF, DOCX, Excel, and JSON formats available via the Reporting module.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex gap-4 p-4 border-b ${borderColor} last:border-b-0 ${hoverBg} transition-colors`}
            >
              <div className="text-2xl shrink-0">{item.icon}</div>
              <div className="flex-1">
                <div className={`font-semibold ${textColor} mb-1`}>{item.title}</div>
                <p className={`${bodyTextClass} ${secondaryText}`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Error Reference ─── */}
      <ErrorReference isDark={isDark} textColor={textColor} secondaryText={secondaryText} mutedText={mutedText} borderColor={borderColor} cardBg={cardBg} codeBg={codeBg} />

      {/* Navigation */}
      <div className={`mt-16 pt-8 border-t ${borderColor} flex justify-between gap-4`}>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${borderColor} flex-1 max-w-xs cursor-pointer ${hoverBg} transition-all`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <div>
            <div className={`${bodyTextClass} ${mutedText}`}>Previous</div>
            <div className={`font-semibold ${textColor}`}>CLI</div>
          </div>
        </div>
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${borderColor} flex-1 max-w-xs cursor-pointer ${hoverBg} transition-all ml-auto`}
        >
          <div className="text-right">
            <div className={`${bodyTextClass} ${mutedText}`}>Next</div>
            <div className={`font-semibold ${textColor}`}>Report Generation</div>
          </div>
          <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </main>
  );
};

interface ToolSectionProps {
  toolName: string;
  isDark: boolean;
  onCopy: (text: string, id: string) => void;
  copiedCode: string | null;
}

const ToolSection: React.FC<ToolSectionProps> = ({ toolName, isDark, onCopy, copiedCode }) => {
  const textColor = isDark ? 'text-white' : 'text-[#1A1714]';
  const secondaryText = isDark ? 'text-[#C9CDD4]' : 'text-[#4A4540]';
  const mutedText = isDark ? 'text-[#A1A1AA]' : 'text-[#88837B]';
  const borderColor = isDark ? 'border-white/10' : 'border-[#E2DDD5]';
  const cardBg = isDark ? 'bg-[#121214]' : 'bg-white';
  const codeBg = isDark ? 'bg-white/5' : 'bg-[#F0EDE6]';
  const accentColor = '#00BCA1';
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoFontStyle = {
    fontFamily: 'var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer), monospace',
  } as const;

  const toolData: Record<string, any> = {
    subfinder: {
      badge: 'recon',
      desc: 'Passive subdomain enumeration tool that queries public sources including DNS resolvers, certificate transparency logs, and third-party APIs to discover subdomains without directly interacting with the target.',
      params: [
        { flag: '-d', type: 'string', req: true, desc: 'Target domain to enumerate subdomains for' },
        { flag: '-dL', type: 'file', req: true, desc: 'File containing a list of domains' },
        { flag: '-o', type: 'string', req: false, desc: 'Output filename' },
        { flag: '-oJ', type: 'bool', req: false, desc: 'Output results in JSON format' },
        { flag: '-silent', type: 'bool', req: false, desc: 'Suppress banner and info messages' },
        { flag: '-t', type: 'int', req: false, desc: 'Number of concurrent goroutines' },
        { flag: '-timeout', type: 'int', req: false, desc: 'Seconds before timing out' },
        { flag: '-all', type: 'bool', req: false, desc: 'Use all available passive sources' },
      ],
      examples: [
        '# Basic single-domain enumeration\npentest subfinder -d example.com',
        '# Enumerate from a domain list, output as JSON\npentest subfinder -dL domains.txt -oJ',
        '# Use all sources, silent mode\npentest subfinder -d example.com -all -silent',
        '# Custom concurrency and timeout\npentest subfinder -d example.com -t 20 -timeout 60',
      ],
    },
    httpx: {
      badge: 'web',
      desc: 'Fast HTTP toolkit for probing a list of URLs or hosts. Returns status codes, response titles, server headers, TLS certificate metadata, redirect chains, content length, and web technology fingerprints.',
      params: [
        { flag: '-u', type: 'string', req: true, desc: 'Single target URL or host to probe' },
        { flag: '-l', type: 'file', req: true, desc: 'File containing list of URLs' },
        { flag: '-sc', type: 'bool', req: false, desc: 'Display HTTP status codes' },
        { flag: '-title', type: 'bool', req: false, desc: 'Extract and display HTML page title' },
        { flag: '-tech-detect', type: 'bool', req: false, desc: 'Detect web technologies' },
        { flag: '-tls-probe', type: 'bool', req: false, desc: 'Probe TLS configuration' },
        { flag: '-follow-redirects', type: 'bool', req: false, desc: 'Follow HTTP redirects' },
        { flag: '-mc', type: 'int[]', req: false, desc: 'Match only specific status codes' },
        { flag: '-threads', type: 'int', req: false, desc: 'Number of concurrent threads' },
        { flag: '-json', type: 'bool', req: false, desc: 'Output structured JSON' },
      ],
      examples: [
        '# Probe a domain list\npentest httpx -l domains.txt -sc -title',
        '# Single target with tech detection\npentest httpx -u https://example.com -tech-detect -tls-probe',
        '# Filter to 200 and 403 responses\npentest httpx -l subdomains.txt -mc 200,403 -json',
        '# Follow redirects with higher threads\npentest httpx -l domains.txt -follow-redirects -threads 100',
      ],
    },
    naabu: {
      badge: 'network',
      desc: 'High-speed port scanner designed for reconnaissance workflows. Supports SYN, CONNECT, and UDP scan types across single hosts, IP ranges, and CIDR blocks.',
      params: [
        { flag: '-host', type: 'string', req: true, desc: 'Target host, IP address, or CIDR range' },
        { flag: '-list', type: 'file', req: true, desc: 'File containing hosts or IPs' },
        { flag: '-p', type: 'string', req: false, desc: 'Ports to scan' },
        { flag: '-top-ports', type: 'int', req: false, desc: 'Scan top N common ports' },
        { flag: '-scan-type', type: 'enum', req: false, desc: 'Scan method (s, c, u)' },
        { flag: '-rate', type: 'int', req: false, desc: 'Packets per second rate limit' },
        { flag: '-timeout', type: 'int', req: false, desc: 'Milliseconds to wait per port' },
        { flag: '-exclude-ports', type: 'string', req: false, desc: 'Ports to exclude' },
        { flag: '-json', type: 'bool', req: false, desc: 'Output results in JSON format' },
      ],
      examples: [
        '# Scan specific ports\npentest naabu -host example.com -p 80,443,8080,8443',
        '# Scan top 1000 ports\npentest naabu -host 10.0.0.0/24 -top-ports 1000',
        '# Full port range with JSON\npentest naabu -list hosts.txt -p 1-65535 -json',
        '# Custom rate and excluded ports\npentest naabu -host example.com -rate 2000 -exclude-ports 22,23',
      ],
    },
    nuclei: {
      badge: 'web · vulns',
      desc: 'Template-based vulnerability scanner used to detect known CVEs, security misconfigurations, exposed admin panels, default credentials, and custom-defined security checks.',
      params: [
        { flag: '-u', type: 'string', req: true, desc: 'Single target URL to scan' },
        { flag: '-l', type: 'file', req: true, desc: 'File with one URL per line' },
        { flag: '-t', type: 'string', req: false, desc: 'Template category or path' },
        { flag: '-tags', type: 'string', req: false, desc: 'Filter templates by tag' },
        { flag: '-severity', type: 'enum', req: false, desc: 'Run only specified severity templates' },
        { flag: '-exclude-tags', type: 'string', req: false, desc: 'Exclude specified tags' },
        { flag: '-rate-limit', type: 'int', req: false, desc: 'Maximum requests per second' },
        { flag: '-timeout', type: 'int', req: false, desc: 'Seconds before timeout' },
        { flag: '-json', type: 'bool', req: false, desc: 'Emit JSONL output' },
      ],
      examples: [
        '# Scan with CVE templates only\npentest nuclei -u https://example.com -t cves',
        '# Run critical and high severity\npentest nuclei -l targets.txt -severity critical,high -json',
        '# Filter by technology tag\npentest nuclei -u https://example.com -tags wordpress,apache',
        '# Check for exposures and defaults\npentest nuclei -l targets.txt -t exposures,default-logins -rate-limit 100',
      ],
    },
  };

  const data = toolData[toolName];

  return (
    <section id={toolName} className="mb-16 scroll-mt-20">
      <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${textColor}`}>
        {toolName} <span className={`${monoTextClass} px-2 py-1 rounded ${codeBg} ${mutedText}`} style={monoFontStyle}>{data.badge}</span>
      </h2>
      <p className={`${bodyTextClass} ${secondaryText} mb-8 leading-relaxed`}>{data.desc}</p>

      {/* Parameters Table */}
      <div className={`border ${borderColor} rounded-lg overflow-hidden mb-8`}>
        <div className={`${isDark ? 'bg-white/5' : 'bg-[#F0EDE6]'} px-6 py-3 border-b ${borderColor}`}>
          <div className="font-bold text-sm tracking-widest uppercase text-[#00BCA1]">
            ⚙️ Supported Parameters
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className={`w-full ${bodyTextClass}`}>
            <thead className={`${isDark ? 'bg-white/5' : 'bg-[#F0EDE6]'}`}>
              <tr>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Flag
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Type
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Required
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {data.params.map((param: any, idx: number) => (
                <tr
                  key={idx}
                  className={`border-t ${borderColor} ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-[#EAE6DE]'
                  } transition-colors`}
                >
                  <td className={`px-4 py-3 ${monoTextClass} ${textColor}`} style={monoFontStyle}>{param.flag}</td>
                  <td className={`px-4 py-3 ${monoTextClass} ${mutedText}`} style={monoFontStyle}>{param.type}</td>
                  <td className={`px-4 py-3 ${monoTextClass} ${param.req ? 'text-red-500' : mutedText}`} style={monoFontStyle}>
                    {param.req ? 'required' : 'optional'}
                  </td>
                  <td className={`px-4 py-3 ${bodyTextClass} ${secondaryText}`}>{param.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Examples */}
      <h3 className={`text-[1.2rem] md:text-[1.35rem] font-bold mb-4 ${textColor}`}>Usage examples</h3>

      <div className={`border ${borderColor} rounded-lg overflow-hidden mb-8 bg-[#16181F]`}>
        <div className={`flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#16181F]`}>
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`${monoTextClass} text-white/25 ml-2`} style={monoFontStyle}>{toolName} — examples</span>
          </div>
          <button
            onClick={() => onCopy(data.examples.join('\n\n'), toolName)}
            className={`${monoTextClass} text-white/30 hover:text-white/75 transition-colors flex items-center gap-2`}
            style={monoFontStyle}
          >
            {copiedCode === toolName ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className={`${monoTextClass} text-white/55 leading-relaxed`} style={monoFontStyle}>
            {data.examples.map((ex: string, idx: number) => (
              <div key={idx} className="mb-4">
                {ex}
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Callouts */}
      {toolName === 'subfinder' && (
        <div
          className={`flex gap-4 p-4 rounded-lg border-l-4 border-yellow-500 mb-8 ${
            isDark ? 'bg-white/5' : 'bg-[rgba(184,104,0,0.03)]'
          }`}
        >
          <div className="text-xl shrink-0">⚠️</div>
          <div>
            <div className={`font-semibold text-xs uppercase tracking-wide text-yellow-600 mb-2`}>
              Passive sources only
            </div>
            <p className={`${bodyTextClass} ${secondaryText}`}>
              subfinder uses <strong>passive sources only</strong> by default. It does not send DNS queries
              directly to the target's authoritative nameservers.
            </p>
          </div>
        </div>
      )}

      {toolName === 'naabu' && (
        <div
          className={`flex gap-4 p-4 rounded-lg border-l-4 border-red-500 mb-8 ${
            isDark ? 'bg-white/5' : 'bg-[rgba(196,40,40,0.03)]'
          }`}
        >
          <div className="text-xl shrink-0">🚨</div>
          <div>
            <div className={`font-semibold text-xs uppercase tracking-wide text-red-600 mb-2`}>
              CIDR range limits
            </div>
            <p className={`${bodyTextClass} ${secondaryText}`}>
              CIDR ranges larger than <strong>/16</strong> (65,536 hosts) are not permitted.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

const ErrorReference: React.FC<{
  isDark: boolean;
  textColor: string;
  secondaryText: string;
  mutedText: string;
  borderColor: string;
  cardBg: string;
  codeBg: string;
}> = ({ isDark, textColor, secondaryText, mutedText, borderColor, cardBg, codeBg }) => {
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoFontStyle = {
    fontFamily: 'var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer), monospace',
  } as const;
  return (
    <section id="errors" className="mb-16 scroll-mt-20">
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Error Reference</h2>
      <p className={`${bodyTextClass} ${secondaryText} mb-8`}>
        The CLI surfaces structured error codes for all failure modes. Backend errors include a machine-readable
        code and a human-readable message.
      </p>

      <div className={`border ${borderColor} rounded-lg overflow-hidden mb-8`}>
        <div className="overflow-x-auto">
          <table className={`w-full ${bodyTextClass}`}>
            <thead className={`${isDark ? 'bg-white/5' : 'bg-[#F0EDE6]'}`}>
              <tr>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Code
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  HTTP
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Meaning
                </th>
                <th className={`px-4 py-2 text-left font-bold text-xs uppercase tracking-wider ${mutedText}`}>
                  Resolution
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  code: 'ERR_INVALID_PARAM',
                  http: '400',
                  meaning: 'A required flag is missing or invalid format',
                  resolution: 'Check flag syntax',
                },
                {
                  code: 'ERR_UNSUPPORTED_FLAG',
                  http: '400',
                  meaning: 'Flag not in allowed parameter schema',
                  resolution: 'Remove unsupported flags',
                },
                {
                  code: 'ERR_AUTH_FAILED',
                  http: '401',
                  meaning: 'API token is missing or invalid',
                  resolution: 'Run pentest login',
                },
                {
                  code: 'ERR_QUOTA_EXCEEDED',
                  http: '429',
                  meaning: 'Daily quota or job limit exceeded',
                  resolution: 'Wait for reset or upgrade',
                },
                {
                  code: 'ERR_TARGET_LIMIT',
                  http: '422',
                  meaning: 'Input exceeds max targets per job',
                  resolution: 'Split target list',
                },
              ].map((err, idx) => (
                <tr
                  key={idx}
                  className={`border-t ${borderColor} ${
                    isDark ? 'hover:bg-white/5' : 'hover:bg-[#EAE6DE]'
                  } transition-colors`}
                >
                  <td className={`px-4 py-3 ${monoTextClass} ${textColor}`} style={monoFontStyle}>{err.code}</td>
                  <td className={`px-4 py-3 ${monoTextClass} ${mutedText}`} style={monoFontStyle}>{err.http}</td>
                  <td className={`px-4 py-3 ${bodyTextClass} ${secondaryText}`}>{err.meaning}</td>
                  <td className={`px-4 py-3 ${bodyTextClass} ${secondaryText}`}>{err.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
