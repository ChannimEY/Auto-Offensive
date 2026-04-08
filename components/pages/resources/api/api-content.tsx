"use client";

// ─────────────────────────────────────────────────────────────
//  api-content.tsx
//  The scrollable centre column: overview, auth, rate limits,
//  error codes, and all endpoint cards.
//
//  Design tokens:
//    bg        #F7F5F0  (light)  /  #0C0F16  (dark)
//    primary   #00BCA1
//    dark mode: Tailwind "dark:" prefix
// ─────────────────────────────────────────────────────────────

import { useState } from "react";

const sansFontStyle = {
  fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
} as const;

const monoFontStyle = {
  fontFamily: "var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer), monospace",
} as const;

const bodyTextClass =
  "text-[16px] md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4]";

const headingTextClass =
  "text-[22px] md:text-[24px] lg:text-[26px] text-[#17130E] dark:text-[#EDF2FF]";

// ── Tiny helpers ──────────────────────────────────────────────
function cx(...cls: (string | false | undefined | null)[]) {
  return cls.filter(Boolean).join(" ");
}

// ── Inline code chip ──────────────────────────────────────────
function Chip({ children }: { children: string }) {
  return (
    <code className="font-mono text-[13px] bg-[#00BCA1]/10 text-[#00BCA1] px-1.5 py-px rounded" style={monoFontStyle}>
      {children}
    </code>
  );
}

// ── Method badge ──────────────────────────────────────────────
const METHOD_STYLE: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/40",
  POST: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/40",
  DELETE: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/40",
};

function MethodBadge({ method }: { method: "GET" | "POST" | "DELETE" }) {
  return (
    <span className={cx("font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md shrink-0", METHOD_STYLE[method])}>
      {method}
    </span>
  );
}

// ── Plan badge ────────────────────────────────────────────────
const BADGE_STYLE: Record<string, string> = {
  auth: "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-300 dark:bg-purple-900/20 dark:border-purple-800/40",
  free: "text-[#00BCA1] bg-[#00BCA1]/10 border-[#00BCA1]/25",
  team: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-900/20 dark:border-amber-800/40",
};

function PlanBadge({ type, label }: { type: "auth" | "free" | "team"; label: string }) {
  return (
    <span className={cx("font-mono text-[10px] font-medium px-1.75 py-0.5 rounded border", BADGE_STYLE[type])} style={monoFontStyle}>
      {label}
    </span>
  );
}

// ── Code block with copy ───────────────────────────────────────
function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  // Very lightweight syntax colouring (no external dep)
  const highlighted = code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"([^"\n]+)"(\s*:)/g, '<span style="color:#9CDCFE">"$1"</span><span style="color:rgba(255,255,255,.45)">$2</span>')
    .replace(/:\s*"([^"\n]*)"/g, ': <span style="color:#CE9178">"$1"</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#B5CEA8">$1</span>')
    .replace(/:\s*(true|false|null)\b/g, ': <span style="color:#4EC9B0">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span style="color:rgba(255,255,255,.28)">$1</span>');

  return (
    <div className="rounded-xl overflow-hidden my-3 shadow-lg bg-[#13161E] dark:bg-[#0A0C12]">
      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/30 border-b border-white/5">
        <div className="flex gap-1.25">
          <div className="w-2.25 h-2.25 rounded-full bg-[#FF5F57]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#28CA41]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/25" style={monoFontStyle}>{lang}</span>
        <button
          onClick={copy}
          className="font-mono text-[10px] text-white/30 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none"
          style={monoFontStyle}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* code */}
      <pre className="overflow-x-auto px-5 py-4 m-0">
        <code
          className="font-mono text-[13px] leading-[1.85] text-white/65 whitespace-pre"
          style={monoFontStyle}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}

// ── Callout note ───────────────────────────────────────────────
type NoteType = "info" | "tip" | "warn" | "brand";
const NOTE_STYLE: Record<NoteType, { wrap: string; label: string }> = {
  info:  { wrap: "bg-blue-50 border-blue-400 dark:bg-blue-900/10 dark:border-blue-500",   label: "text-blue-700 dark:text-blue-400" },
  tip:   { wrap: "bg-emerald-50 border-emerald-500 dark:bg-emerald-900/10 dark:border-emerald-500", label: "text-emerald-700 dark:text-emerald-400" },
  warn:  { wrap: "bg-amber-50 border-amber-500 dark:bg-amber-900/10 dark:border-amber-400",  label: "text-amber-700 dark:text-amber-400" },
  brand: { wrap: "bg-[#00BCA1]/[0.06] border-[#00BCA1]",                                   label: "text-[#00BCA1]" },
};

function Note({ type, icon, title, children }: { type: NoteType; icon: string; title: string; children: React.ReactNode }) {
  const s = NOTE_STYLE[type];
  return (
    <div className={cx("rounded-xl px-4 py-3 my-4 border-l-4", s.wrap)}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[14px]">{icon}</span>
        <span className={cx("font-mono text-[10px] font-semibold uppercase tracking-[0.14em]", s.label)} style={monoFontStyle}>{title}</span>
      </div>
      <div className={cx(bodyTextClass, "leading-[1.72]")} style={sansFontStyle}>{children}</div>
    </div>
  );
}

// ── Parameter table ────────────────────────────────────────────
interface Param {
  name: string;
  type: string;
  required: boolean;
  desc: React.ReactNode;
}

function ParamTable({ params, label = "Body Parameters" }: { params: Param[]; label?: string }) {
  return (
    <div className="my-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C4BEB6] dark:text-[#2E3848] mb-2" style={monoFontStyle}>{label}</p>
      <div className="overflow-x-auto rounded-xl border border-[#E4DFD5] dark:border-white/8 shadow-sm">
        <table className="w-full border-collapse bg-white dark:bg-[#131820] text-left">
          <thead className="bg-[#F0EDE7] dark:bg-[#161C2A]">
            <tr>
              {["Parameter", "Type", "Required", "Description"].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9C9488] dark:text-[#4A5870] px-4 py-3 border-b border-[#E4DFD5] dark:border-white/[0.07] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {params.map((p, i) => (
              <tr
                key={p.name}
                className={i < params.length - 1 ? "border-b border-[#F0EDE7] dark:border-white/5" : ""}
              >
                <td className="px-4 py-3 font-mono text-[13px] text-[#00BCA1] font-semibold whitespace-nowrap">{p.name}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-[#9C9488] dark:text-[#4A5870] whitespace-nowrap">{p.type}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {p.required ? (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/40">
                      required
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#F0EDE7] text-[#9C9488] border border-[#E4DFD5] dark:bg-white/4 dark:text-[#4A5870] dark:border-white/[0.07]">
                      optional
                    </span>
                  )}
                </td>
                <td className={cx("px-4 py-3 leading-[1.72]", bodyTextClass)} style={sansFontStyle}>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Endpoint card ──────────────────────────────────────────────
interface EndpointProps {
  id: string;
  method: "GET" | "POST" | "DELETE";
  path: React.ReactNode;
  badges?: React.ReactNode;
  desc: React.ReactNode;
  bodyParams?: Param[];
  queryParams?: Param[];
  code?: { lang: string; body: string };
  notes?: React.ReactNode;
}

function Endpoint({ id, method, path, badges, desc, bodyParams, queryParams, code, notes }: EndpointProps) {
  return (
    <div
      id={id}
      className="rounded-xl border border-[#E4DFD5] dark:border-white/8 overflow-hidden mb-5 shadow-sm bg-white dark:bg-[#131820] scroll-mt-20"
    >
      {/* header row */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-4 md:px-5 border-b border-[#E4DFD5] dark:border-white/[0.07] bg-[#F7F5F0] dark:bg-[#161C2A]">
        <MethodBadge method={method} />
        <code className="font-mono text-[13px] md:text-[14px] font-semibold text-[#17130E] dark:text-[#EDF2FF] flex-1 min-w-0 break-all" style={monoFontStyle}>
          {path}
        </code>
        <div className="flex flex-wrap gap-2">{badges}</div>
      </div>

      {/* description */}
      <div className={cx("px-4 py-4 md:px-5 border-b border-[#E4DFD5] dark:border-white/[0.07] leading-[1.72]", bodyTextClass)} style={sansFontStyle}>
        {desc}
      </div>

      {/* body */}
      <div className="px-4 py-4 md:px-5">
        {bodyParams  && <ParamTable params={bodyParams}  label="Body Parameters"  />}
        {queryParams && <ParamTable params={queryParams} label="Query Parameters" />}
        {code        && <CodeBlock lang={code.lang} code={code.body} />}
        {notes}
      </div>
    </div>
  );
}

// ── Section heading ────────────────────────────────────────────
function H2({ id, title, tag }: { id: string; title: string; tag?: string }) {
  return (
    <div id={id} className="flex items-center gap-3 pt-14 mb-3 scroll-mt-20">
      <h2
        className={cx("font-extrabold tracking-tight", headingTextClass)}
        style={{ ...sansFontStyle, letterSpacing: "-0.03em" }}
      >
        {title}
      </h2>
      {tag && (
        <span className="font-mono text-[10px] text-[#9C9488] dark:text-[#4A5870] bg-[#EEEAE2] dark:bg-white/[0.07] px-2 py-0.75 rounded" style={monoFontStyle}>
          {tag}
        </span>
      )}
    </div>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={cx("leading-[1.82] mb-3", bodyTextClass)}
      style={sansFontStyle}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-[#E4DFD5] dark:bg-white/[0.07] my-10" />;
}

// ── Path helper ───────────────────────────────────────────────
function P({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
function Param({ children }: { children: string }) {
  return <span className="text-amber-500 dark:text-amber-400">{children}</span>;
}

// ══════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════════════════
export default function ApiContent() {
  return (
    <article className="w-full min-w-0 max-w-200 px-5 pt-10 pb-24 sm:px-6 md:px-8 lg:px-10 xl:px-14 xl:pt-12 xl:pb-32" style={sansFontStyle}>

      {/* ─── PAGE HEADER ──────────────────────────────────── */}
      <div id="overview" className="pb-10 mb-12 border-b border-[#E4DFD5] dark:border-white/[0.07] scroll-mt-20">
        <div className="flex items-center gap-2 mb-5 font-mono text-[11px] tracking-wider text-[#C4BEB6] dark:text-[#2E3848]">
          <a href="#" className="text-[#00BCA1] hover:underline">Docs</a>
          <span>›</span>
          <span>API Reference</span>
        </div>

        <div className="inline-flex items-center gap-2 mb-4 font-mono text-[10px] tracking-[0.18em] uppercase text-[#00BCA1] bg-[#00BCA1]/10 border border-[#00BCA1]/25 px-3 py-1 rounded-full">
          <span className="w-1.25 h-1.25 rounded-full bg-[#00BCA1] animate-pulse" />
          API Reference · v1.0
        </div>

        <h1
          className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] leading-[.93] text-[#17130E] dark:text-[#EDF2FF] mb-4"
          style={sansFontStyle}
        >
          API <span className="text-[#00BCA1]">Reference</span>
        </h1>

        <p className={cx("leading-[1.82] max-w-140", bodyTextClass)} style={sansFontStyle}>
          The Auto Offensive REST API lets you programmatically manage projects, trigger scan
          jobs, retrieve results, and generate reports. Integrate security scanning into your
          CI/CD pipeline or internal tooling.
        </p>

        <div className="flex flex-wrap gap-5 mt-5 pt-5 border-t border-[#E4DFD5] dark:border-white/[0.07]">
          {[
            { icon: "🕒", text: "Updated March 2025" },
            { icon: "⟨⟩", text: "REST · JSON" },
            { icon: "👥", text: "Team Plan Required" },
          ].map((m) => (
            <div key={m.text} className="flex items-center gap-2 font-mono text-[11px] text-[#9C9488] dark:text-[#4A5870]">
              <span>{m.icon}</span>
              {m.text}
            </div>
          ))}
        </div>
      </div>

      {/* ─── OVERVIEW BODY ────────────────────────────────── */}
      <H2 id="overview-detail" title="Overview" tag="REST API" />
      <Para>
        All API requests are made to the base URL below. The API returns JSON for all responses.
        Authentication is required for every request using an API key passed in the request header.
      </Para>

      <CodeBlock
        lang="Base URL"
        code={`Base URL   https://api.autooffensive.com/v1

// All responses are returned as JSON.
// All requests must include the Authorization header.`}
      />

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 mb-2">
        {[
          { icon: "🔑", title: "API Key Auth",  desc: "Every request requires your API key in the Authorization header." },
          { icon: "📦", title: "JSON Only",     desc: "All request bodies must be application/json. All responses return JSON." },
          { icon: "🏢", title: "Team Plan",     desc: "API access is available on Team plan only. Free and Pro plans cannot use the API." },
        ].map((c) => (
          <div
            key={c.title}
            className="bg-white dark:bg-[#131820] border border-[#E4DFD5] dark:border-white/8 rounded-xl p-4 shadow-sm hover:border-[#00BCA1]/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
          >
            <div className="mb-2 text-[18px] md:text-[20px]">{c.icon}</div>
            <div
              className="mb-1 text-[18px] md:text-[20px] font-semibold text-[#17130E] dark:text-[#EDF2FF]"
              style={sansFontStyle}
            >
              {c.title}
            </div>
            <div className={cx("leading-[1.72]", bodyTextClass)} style={sansFontStyle}>{c.desc}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ─── AUTHENTICATION ───────────────────────────────── */}
      <H2 id="auth" title="Authentication" />
      <Para>
        Auto Offensive uses API key authentication. Generate your key from{" "}
        <strong>Settings → API Keys</strong>. Pass the key in every request using the{" "}
        <Chip>Authorization</Chip> header.
      </Para>

      <CodeBlock
        lang="Request Header"
        code={`Authorization: Bearer ao_live_xxxxxxxxxxxxxxxxxxxx
Content-Type: application/json`}
      />

      <Note type="warn" icon="⚠️" title="Keep your key secret">
        Never expose your API key in client-side code or public repositories. If compromised,
        rotate it immediately from <strong>Settings → API Keys</strong>. Keys do not expire but
        can be revoked at any time.
      </Note>

      <Divider />

      {/* ─── RATE LIMITS ──────────────────────────────────── */}
      <H2 id="ratelimit" title="Rate Limits" />
      <Para>
        API rate limits apply per API key per day. Scan jobs also count against your plan&apos;s
        daily scan quota. If you exceed the limit, requests return{" "}
        <Chip>429 Too Many Requests</Chip>.
      </Para>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {[
          { plan: "Guest",      num: "—",  label: "No API access",  color: "text-[#9C9488]" },
          { plan: "Free / Pro", num: "—",  label: "No API access",  color: "text-[#9C9488]" },
          { plan: "Team",       num: "1K", label: "requests / day", color: "text-[#00BCA1]" },
          { plan: "Enterprise", num: "∞",  label: "custom limit",   color: "text-purple-500 dark:text-purple-400" },
        ].map((r) => (
          <div
            key={r.plan}
            className="bg-white dark:bg-[#131820] border border-[#E4DFD5] dark:border-white/8 rounded-xl p-4 text-center shadow-sm"
          >
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#9C9488] dark:text-[#4A5870] mb-2">{r.plan}</div>
            <div
              className={`font-extrabold text-[28px] leading-none mb-1 ${r.color}`}
              style={{ ...sansFontStyle, letterSpacing: "-0.04em" }}
            >
              {r.num}
            </div>
            <div className="font-mono text-[10px] text-[#C4BEB6] dark:text-[#2E3848]">{r.label}</div>
          </div>
        ))}
      </div>

      <Note type="brand" icon="💡" title="Rate limit headers">
        Every response includes <Chip>X-RateLimit-Limit</Chip>,{" "}
        <Chip>X-RateLimit-Remaining</Chip>, and <Chip>X-RateLimit-Reset</Chip> headers so you
        can track usage programmatically.
      </Note>

      <Divider />

      {/* ─── ERROR CODES ──────────────────────────────────── */}
      <H2 id="errors" title="Error Codes" />
      <Para>
        All errors return a JSON body with a <Chip>code</Chip> and <Chip>message</Chip> field
        describing what went wrong.
      </Para>

      <div className="overflow-x-auto rounded-xl border border-[#E4DFD5] dark:border-white/8 shadow-sm my-4">
        <table className="w-full border-collapse bg-white dark:bg-[#131820] text-left">
          <thead className="bg-[#F0EDE7] dark:bg-[#161C2A]">
            <tr>
              {["HTTP Status", "Code", "Meaning"].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9C9488] dark:text-[#4A5870] px-4 py-3 border-b border-[#E4DFD5] dark:border-white/[0.07] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { s: "200", sc: "text-emerald-600 dark:text-emerald-400", code: "success",      m: "Request completed successfully" },
              { s: "201", sc: "text-emerald-600 dark:text-emerald-400", code: "created",      m: "Resource created (project, scan, report)" },
              { s: "400", sc: "text-amber-600 dark:text-amber-400",     code: "bad_request",  m: "Missing or invalid request parameters" },
              { s: "401", sc: "text-red-600 dark:text-red-400",         code: "unauthorized", m: "Missing or invalid API key" },
              { s: "403", sc: "text-red-600 dark:text-red-400",         code: "forbidden",    m: "Plan does not allow this action" },
              { s: "404", sc: "text-red-600 dark:text-red-400",         code: "not_found",    m: "Project, scan, or report does not exist" },
              { s: "429", sc: "text-amber-600 dark:text-amber-400",     code: "rate_limited", m: "Daily request or scan limit reached" },
              { s: "500", sc: "text-red-600 dark:text-red-400",         code: "server_error", m: "Internal server error — try again later" },
            ].map((r, i, arr) => (
              <tr key={r.code} className={i < arr.length - 1 ? "border-b border-[#F0EDE7] dark:border-white/5" : ""}>
                <td className={`px-4 py-3 font-mono text-[13px] font-semibold ${r.sc}`}>{r.s}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-[#00BCA1]">{r.code}</td>
                <td className={cx("px-4 py-3", bodyTextClass)} style={sansFontStyle}>{r.m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        lang="Error Response Example"
        code={`{
  "code": "rate_limited",
  "message": "Daily scan limit reached. Resets at 00:00 UTC.",
  "status": 429
}`}
      />

      <Divider />

      {/* ════════════════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════════════════ */}
      <H2 id="projects" title="Projects" tag="Endpoints" />
      <Para>
        Projects are the top-level container for all scan jobs, results, and reports. All scan
        activity must belong to a project.
      </Para>

      {/* List projects */}
      <Endpoint
        id="proj-list"
        method="GET"
        path="/projects"
        badges={<><PlanBadge type="auth" label="Auth Required" /><PlanBadge type="free" label="All Plans" /></>}
        desc="Returns a list of all projects in your workspace, ordered by creation date (newest first)."
        code={{
          lang: "Response",
          body: `{
  "projects": [
    {
      "id": "proj_01HX...",
      "name": "ACME Corp — Q2 Assessment",
      "created_at": "2025-03-10T08:30:00Z",
      "scan_count": 14
    }
  ]
}`,
        }}
      />

      {/* Create project */}
      <Endpoint
        id="proj-create"
        method="POST"
        path="/projects"
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Creates a new project in your workspace."
        bodyParams={[
          { name: "name",        type: "string", required: true,  desc: 'Name of the project (e.g. "ACME Corp Q2 Pentest")' },
          { name: "description", type: "string", required: false, desc: "Short description of the engagement scope" },
        ]}
        code={{
          lang: "Request · Response",
          body: `// Request body
{
  "name": "ACME Corp — Q2 Assessment",
  "description": "Full-scope web and network pentest"
}

// Response 201
{
  "id": "proj_01HX...",
  "name": "ACME Corp — Q2 Assessment",
  "created_at": "2025-03-10T08:30:00Z"
}`,
        }}
      />

      {/* Get project */}
      <Endpoint
        id="proj-get"
        method="GET"
        path={<P><span>/projects/</span><Param>{"{project_id}"}</Param></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Returns details of a single project including scan count and last activity timestamp."
        code={{
          lang: "Response",
          body: `{
  "id": "proj_01HX...",
  "name": "ACME Corp — Q2 Assessment",
  "description": "Full-scope web and network pentest",
  "scan_count": 14,
  "created_at": "2025-03-10T08:30:00Z",
  "last_scan_at": "2025-03-14T11:20:00Z"
}`,
        }}
      />

      {/* Delete project */}
      <Endpoint
        id="proj-delete"
        method="DELETE"
        path={<P><span>/projects/</span><Param>{"{project_id}"}</Param></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Permanently deletes a project and all associated scan jobs, results, and reports. This action cannot be undone."
        notes={
          <Note type="warn" icon="⚠️" title="Irreversible">
            Deleting a project also deletes all scan results and generated reports inside it.
            There is no recovery.
          </Note>
        }
        code={{
          lang: "Response 200",
          body: `{ "deleted": true, "id": "proj_01HX..." }`,
        }}
      />

      <Divider />

      {/* ════════════════════════════════════════════════════
          SCAN JOBS
      ════════════════════════════════════════════════════ */}
      <H2 id="scans" title="Scan Jobs" tag="Endpoints" />
      <Para>
        Scan jobs represent a single scan execution against a target using one or more modules.
        All scan jobs belong to a project.
      </Para>

      {/* Create scan */}
      <Endpoint
        id="scan-create"
        method="POST"
        path={<P><span>/projects/</span><Param>{"{project_id}"}</Param><span>/scans</span></P>}
        badges={<><PlanBadge type="auth" label="Auth Required" /><PlanBadge type="team" label="Team Plan" /></>}
        desc={<>Creates and immediately starts a new scan job. The job transitions to <Chip>running</Chip> status on creation.</>}
        bodyParams={[
          { name: "target",   type: "string",  required: true,  desc: "Domain, URL, or IP address to scan" },
          { name: "modules",  type: "array",   required: true,  desc: <>One or more module names: <Chip>subfinder</Chip> <Chip>nmap</Chip> <Chip>nuclei</Chip> <Chip>httpx</Chip> <Chip>sqli</Chip> and more</> },
          { name: "config",   type: "object",  required: false, desc: "Per-module configuration options (port range, wordlist, threads, etc.)" },
          { name: "pipeline", type: "boolean", required: false, desc: <>If <Chip>true</Chip>, runs modules sequentially, passing output to the next module</> },
        ]}
        code={{
          lang: "Request · Response",
          body: `// Request body
{
  "target": "example.com",
  "modules": ["subfinder", "httpx", "nuclei"],
  "pipeline": true,
  "config": {
    "nuclei": { "severity": "critical,high" }
  }
}

// Response 201
{
  "scan_id": "scan_02KY...",
  "status": "running",
  "target": "example.com",
  "modules": ["subfinder", "httpx", "nuclei"],
  "created_at": "2025-03-14T09:00:00Z"
}`,
        }}
      />

      {/* List scans */}
      <Endpoint
        id="scan-list"
        method="GET"
        path={<P><span>/projects/</span><Param>{"{project_id}"}</Param><span>/scans</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Returns all scan jobs within a project, ordered by creation date. Supports filtering by status."
        queryParams={[
          { name: "status", type: "string",  required: false, desc: <>Filter by status: <Chip>running</Chip> <Chip>completed</Chip> <Chip>failed</Chip> <Chip>cancelled</Chip></> },
          { name: "limit",  type: "integer", required: false, desc: "Number of results to return (default: 20, max: 100)" },
        ]}
      />

      {/* Get scan status */}
      <Endpoint
        id="scan-get"
        method="GET"
        path={<P><span>/scans/</span><Param>{"{scan_id}"}</Param></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Returns the current status and metadata of a single scan job. Poll this endpoint to track progress of a running scan."
        code={{
          lang: "Response",
          body: `{
  "scan_id": "scan_02KY...",
  "status": "completed",
  "target": "example.com",
  "modules": ["subfinder", "httpx", "nuclei"],
  "finding_count": 22,
  "started_at": "2025-03-14T09:00:00Z",
  "completed_at": "2025-03-14T09:04:12Z"
}`,
        }}
        notes={
          <Note type="brand" icon="⏱️" title="Polling tip">
            Poll <Chip>{"/scans/{id}"}</Chip> every 5 seconds while status is{" "}
            <Chip>running</Chip>. When status changes to <Chip>completed</Chip> or{" "}
            <Chip>failed</Chip>, stop polling and fetch results.
          </Note>
        }
      />

      {/* Stop scan */}
      <Endpoint
        id="scan-stop"
        method="POST"
        path={<P><span>/scans/</span><Param>{"{scan_id}"}</Param><span>/stop</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Cancels a running scan job. Partial results collected up to the stop point are saved and accessible. Returns an error if the scan is already completed or failed."
        code={{
          lang: "Response 200",
          body: `{ "scan_id": "scan_02KY...", "status": "cancelled" }`,
        }}
      />

      {/* Retry scan */}
      <Endpoint
        id="scan-retry"
        method="POST"
        path={<P><span>/scans/</span><Param>{"{scan_id}"}</Param><span>/retry</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc={<>Re-runs a failed or cancelled scan job using the same target, modules, and configuration. A new <Chip>scan_id</Chip> is returned for the new job.</>}
        code={{
          lang: "Response 201",
          body: `{
  "scan_id": "scan_03LZ...",
  "status": "running",
  "retried_from": "scan_02KY..."
}`,
        }}
      />

      <Divider />

      {/* ════════════════════════════════════════════════════
          RESULTS
      ════════════════════════════════════════════════════ */}
      <H2 id="results" title="Results" tag="Endpoints" />
      <Para>
        Retrieve structured findings from a completed scan job. Results are linked to the scan
        and stored indefinitely.
      </Para>

      <Endpoint
        id="results-get"
        method="GET"
        path={<P><span>/scans/</span><Param>{"{scan_id}"}</Param><span>/results</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Returns all structured findings from a completed scan job — discovered assets, open ports, vulnerabilities, and identified issues."
        queryParams={[
          { name: "type",     type: "string", required: false, desc: <>Filter by finding type: <Chip>asset</Chip> <Chip>port</Chip> <Chip>vulnerability</Chip> <Chip>endpoint</Chip></> },
          { name: "severity", type: "string", required: false, desc: <>Filter vulnerabilities by severity: <Chip>critical</Chip> <Chip>high</Chip> <Chip>medium</Chip> <Chip>low</Chip></> },
        ]}
        code={{
          lang: "Response",
          body: `{
  "scan_id": "scan_02KY...",
  "total": 22,
  "results": [
    {
      "type": "vulnerability",
      "title": "SQL Injection — /api/users?id=",
      "severity": "critical",
      "cvss": 9.8,
      "tool": "nuclei",
      "evidence": "Error-based SQLi confirmed via time-delay"
    },
    {
      "type": "asset",
      "value": "api.example.com",
      "tool": "subfinder"
    }
  ]
}`,
        }}
      />

      <Divider />

      {/* ════════════════════════════════════════════════════
          REPORTS
      ════════════════════════════════════════════════════ */}
      <H2 id="reports" title="Reports" tag="Endpoints" />
      <Para>
        Generate, list, and download security reports from completed scan jobs. Reports can be
        exported in PDF, DOCX, Excel, or JSON.
      </Para>

      {/* Generate report */}
      <Endpoint
        id="report-gen"
        method="POST"
        path={<P><span>/scans/</span><Param>{"{scan_id}"}</Param><span>/reports</span></P>}
        badges={<><PlanBadge type="auth" label="Auth Required" /><PlanBadge type="team" label="Team Plan" /></>}
        desc="Generates a security report from a completed scan. AI writes the executive summary and remediation guidance automatically."
        bodyParams={[
          { name: "template",     type: "string", required: true,  desc: <><Chip>executive</Chip> <Chip>technical</Chip> <Chip>developer</Chip> <Chip>compliance</Chip></> },
          { name: "format",       type: "string", required: true,  desc: <><Chip>pdf</Chip> <Chip>docx</Chip> <Chip>excel</Chip> <Chip>json</Chip></> },
          { name: "company_name", type: "string", required: false, desc: "Company name shown on the report cover page" },
          { name: "compliance",   type: "string", required: false, desc: <><Chip>pci_dss</Chip> <Chip>iso_27001</Chip> <Chip>soc2</Chip> <Chip>nist</Chip></> },
        ]}
        code={{
          lang: "Request · Response",
          body: `// Request body
{
  "template": "technical",
  "format": "pdf",
  "company_name": "ACME Corp",
  "compliance": "pci_dss"
}

// Response 201
{
  "report_id": "rpt_04MN...",
  "status": "generating",
  "format": "pdf",
  "template": "technical"
}`,
        }}
        notes={
          <Note type="brand" icon="🧠" title="AI Report Writing">
            Report generation is asynchronous. Poll <Chip>{"/reports/{report_id}"}</Chip> until
            status is <Chip>ready</Chip>, then call the download endpoint. AI writing typically
            takes 10–30 seconds.
          </Note>
        }
      />

      {/* List reports */}
      <Endpoint
        id="report-list"
        method="GET"
        path={<P><span>/projects/</span><Param>{"{project_id}"}</Param><span>/reports</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc="Returns all generated reports linked to a project. Includes report status, template type, format, and generation timestamp."
        code={{
          lang: "Response",
          body: `{
  "reports": [
    {
      "report_id": "rpt_04MN...",
      "scan_id": "scan_02KY...",
      "template": "technical",
      "format": "pdf",
      "status": "ready",
      "created_at": "2025-03-14T09:10:00Z"
    }
  ]
}`,
        }}
      />

      {/* Download report */}
      <Endpoint
        id="report-download"
        method="GET"
        path={<P><span>/reports/</span><Param>{"{report_id}"}</Param><span>/download</span></P>}
        badges={<PlanBadge type="auth" label="Auth Required" />}
        desc={<>Returns a short-lived signed download URL for the generated report file. The URL expires after 15 minutes. Only available when report status is <Chip>ready</Chip>.</>}
        code={{
          lang: "Response",
          body: `{
  "report_id": "rpt_04MN...",
  "download_url": "https://cdn.autooffensive.com/reports/rpt_04MN...pdf?token=...",
  "expires_at": "2025-03-14T09:25:00Z",
  "format": "pdf"
}`,
        }}
      />

    </article>
  );
}
