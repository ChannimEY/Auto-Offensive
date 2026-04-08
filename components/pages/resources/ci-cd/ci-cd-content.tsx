"use client";

import { useRef, useState } from "react";

const sansFontStyle = {
  fontFamily: "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
} as const;

const monoFontStyle = {
  fontFamily: "var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer), monospace",
} as const;

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-[16px] md:text-[18px] lg:text-[20px] bg-[#F0EDE6] dark:bg-white/5 text-[#00BCA1] px-1.5 py-px rounded border border-[#E2DDD5] dark:border-white/10"
      style={monoFontStyle}
    >
      {children}
    </code>
  );
}

function Tag({
  children,
  variant = "brand",
}: {
  children: React.ReactNode;
  variant?: "brand" | "info" | "success" | "warn";
}) {
  const styles: Record<string, string> = {
    brand: "text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border-[rgba(0,188,161,0.2)]",
    info: "text-[#1D57C8] bg-[rgba(29,87,200,0.06)] border-[rgba(29,87,200,0.2)]",
    success: "text-[#1A7A4A] bg-[rgba(26,122,74,0.06)] border-[rgba(26,122,74,0.2)]",
    warn: "text-[#B86800] bg-[rgba(184,104,0,0.06)] border-[rgba(184,104,0,0.2)]",
  };

  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] font-medium px-1.5 py-px rounded border whitespace-nowrap tracking-[0.02em] ${styles[variant]}`}
      style={monoFontStyle}
    >
      {children}
    </span>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.82] mb-3"
      style={sansFontStyle}
    >
      {children}
    </p>
  );
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    info: "border-l-[#1D57C8] bg-[rgba(29,87,200,0.03)]",
    tip: "border-l-[#1A7A4A] bg-[rgba(26,122,74,0.03)]",
    warn: "border-l-[#B86800] bg-[rgba(184,104,0,0.03)]",
  };

  const titleColors: Record<string, string> = {
    info: "text-[#1D57C8]",
    tip: "text-[#1A7A4A]",
    warn: "text-[#B86800]",
  };

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-lg border border-[#E2DDD5] dark:border-white/10 border-l-[3px] my-4 dark:bg-white/3 ${styles[type]}`}
    >
      <div className="flex-1">
        <div className={`text-[11px] font-bold tracking-[0.07em] uppercase mb-1 ${titleColors[type]}`}>
          {title}
        </div>
        <div
          className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
          style={sansFontStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    if (!codeRef.current) return;

    navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden my-4 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.14),0_1px_4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-[#16181F]">
        <div className="flex gap-1.25">
          <div className="w-2.25 h-2.25 rounded-full bg-[#FF5F57]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#28CA41]" />
        </div>
        <span className="font-mono text-[11px] text-white/25 tracking-[0.05em]" style={monoFontStyle}>
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] text-white/30 bg-transparent border-none cursor-pointer hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded transition-all duration-150"
          style={monoFontStyle}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="bg-[#16181F] px-5 py-4.5 overflow-x-auto">
        <code
          ref={codeRef}
          className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.92] text-white/55 whitespace-pre"
          style={monoFontStyle}
        >
          {children}
        </code>
      </div>
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
      <table className="w-max min-w-full border-collapse text-left">
        <thead className="bg-[#F0EDE6] dark:bg-white/5">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10 whitespace-nowrap"
                style={monoFontStyle}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className={rowIndex < rows.length - 1 ? "border-b border-[#E2DDD5] dark:border-white/10" : ""}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="px-4 py-3 text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72] align-top whitespace-nowrap"
                  style={sansFontStyle}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const capabilityCards = [
  {
    title: "Scan Triggering",
    desc: "Start security scans from your pipeline using authenticated API requests and structured JSON payloads.",
    variant: "info" as const,
  },
  {
    title: "Job Tracking",
    desc: "Poll scan lifecycle states from pending through completed, failed, or cancelled without leaving the pipeline.",
    variant: "warn" as const,
  },
  {
    title: "Results & Reports",
    desc: "Collect findings, download reports, and feed the final output into quality gates or release checks.",
    variant: "success" as const,
  },
];

const workflowSteps = [
  { num: "01", title: "Authenticate", desc: "Load the API key from your CI/CD secret manager." },
  { num: "02", title: "Trigger Scan", desc: "Create a scan job with the target or repository payload." },
  { num: "03", title: "Poll Status", desc: "Wait until the backend returns a terminal state." },
  { num: "04", title: "Fetch Results", desc: "Retrieve findings and compare them with your policy threshold." },
  { num: "05", title: "Pass or Fail", desc: "Decide whether the pipeline should continue, warn, or block." },
];

export default function CICDContent() {
  return (
    <article
      className="w-full min-w-0 px-12 xl:px-14 pt-12 pb-32 max-[960px]:px-8 max-[640px]:px-5"
      style={sansFontStyle}
    >
      <div className="mb-10">
        <div className="flex items-center gap-1.5 text-base md:text-[18px] lg:text-[20px] text-[#88837B] dark:text-[#A1A1AA] mb-4.5">
          <a href="#" className="hover:text-[#1A1714] dark:hover:text-white transition-colors duration-150">
            Docs
          </a>
          <span>/</span>
          <a href="#" className="hover:text-[#1A1714] dark:hover:text-white transition-colors duration-150">
            Resources
          </a>
          <span>/</span>
          <span>Integration CI/CD</span>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-0.75 rounded-full mb-3.5">
          <span className="w-1.25 h-1.25 rounded-full bg-[#00BCA1] animate-pulse" />
          Integration Guide · v1.0
        </div>

        <h1
          className="text-[clamp(2.25rem,4vw,3.4rem)] font-bold tracking-[-0.04em] text-[#1A1714] dark:text-white mb-4"
          style={sansFontStyle}
        >
          CI/CD Integration
        </h1>

        <Para>
          Integrate Auto Offensive into your deployment pipelines to trigger scans, monitor jobs,
          fetch findings, and download reports programmatically. The page follows the same pattern as
          the other docs pages so your team can move between CLI, tools, API, and CI/CD references
          without relearning the layout.
        </Para>
      </div>

      <section id="overview" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Overview
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          CI/CD integration is built around a simple flow: authenticate, create a scan job, poll for
          completion, retrieve the results, and decide whether the pipeline should continue. This is
          especially useful for gated environments where releases depend on security outcomes.
        </Para>

        <div className="flex flex-col gap-4 my-4">
          {capabilityCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#121214] p-5 hover:bg-[#F0EDE6] dark:hover:bg-white/5 transition-colors duration-150"
            >
              <div className="mb-3">
                <Tag variant={card.variant}>{card.title}</Tag>
              </div>
              <div
                className="text-base md:text-[18px] lg:text-[20px] font-semibold text-[#1A1714] dark:text-white mb-1"
                style={sansFontStyle}
              >
                {card.title}
              </div>
              <div
                className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
                style={sansFontStyle}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          CI/CD Workflow
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          The normal integration pattern is a five-step cycle that works with GitHub Actions,
          GitLab CI, Jenkins, Bitbucket Pipelines, or any custom runner that can call HTTPS APIs.
        </Para>

        <div className="flex flex-col gap-4 my-4">
          {workflowSteps.map((step) => (
            <div
              key={step.num}
              className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#121214] p-5"
            >
              <div className="font-mono text-[11px] text-[#00BCA1] mb-2" style={monoFontStyle}>
                {step.num}
              </div>
              <div
                className="text-base md:text-[18px] lg:text-[20px] font-semibold text-[#1A1714] dark:text-white mb-2"
                style={sansFontStyle}
              >
                {step.title}
              </div>
              <div
                className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]"
                style={sansFontStyle}
              >
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="auth" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Authentication
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Every request should send an API key or token in the authorization header. Keep credentials
          in your CI/CD platform&apos;s secret manager rather than checking them into repositories or
          workflow files.
        </Para>

        <Callout type="info" title="Security Note">
          Use environment secrets, rotate keys when team access changes, and scope credentials to the
          smallest workspace or environment that still lets the pipeline do its job.
        </Callout>

        <CodeBlock title="HTTP Header">{`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}</CodeBlock>
      </section>

      <section id="endpoints" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          API Endpoints
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Table
          headers={["Method", "Path", "Description"]}
          rows={[
            [<Tag key="post-1" variant="success">POST</Tag>, <InlineCode key="path-1">/api/v1/scans</InlineCode>, "Create a new scan job from the pipeline."],
            [<Tag key="get-1" variant="info">GET</Tag>, <InlineCode key="path-2">/api/v1/jobs/{`{job_id}`}</InlineCode>, "Check scan progress and status."],
            [<Tag key="get-2" variant="info">GET</Tag>, <InlineCode key="path-3">/api/v1/jobs/{`{job_id}`}/results</InlineCode>, "Fetch normalized findings."],
            [<Tag key="get-3" variant="info">GET</Tag>, <InlineCode key="path-4">/api/v1/jobs/{`{job_id}`}/report</InlineCode>, "Download the generated report."],
          ]}
        />
      </section>

      <section id="trigger" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Triggering a Scan
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Create a scan with <InlineCode>POST /api/v1/scans</InlineCode>. A successful request returns
          a <InlineCode>job_id</InlineCode> that the pipeline can store and reuse in later steps.
        </Para>

        <Table
          headers={["Field", "Type", "Required", "Description"]}
          rows={[
            [<InlineCode key="field-1">target</InlineCode>, "string", "Depends", "Domain, URL, or host for web scanning."],
            [<InlineCode key="field-2">repository</InlineCode>, "string", "Depends", "Repository URL for repository analysis."],
            [<InlineCode key="field-3">scan_type</InlineCode>, "string", "Yes", "Set to web or repository."],
            [<InlineCode key="field-4">modules</InlineCode>, "array", "No", "Select the modules to run for the scan."],
            [<InlineCode key="field-5">severity_threshold</InlineCode>, "string", "No", "Control when the pipeline should fail."],
          ]}
        />

        <CodeBlock title="cURL">{`curl -X POST https://api.platform.io/api/v1/scans \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "scan_type": "web",
    "target": "https://example.com",
    "modules": ["xss", "sqli", "headers"],
    "severity_threshold": "medium"
  }'`}</CodeBlock>
      </section>

      <section id="status" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Job Status
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Poll <InlineCode>GET /api/v1/jobs/{`{job_id}`}</InlineCode> until the scan reaches a terminal
          state. A pipeline can keep polling while the status is pending or running, then stop on
          completed, failed, or cancelled.
        </Para>

        <Table
          headers={["Status", "Meaning"]}
          rows={[
            [<Tag key="pending" variant="warn">pending</Tag>, "Queued and waiting for execution."],
            [<Tag key="running" variant="info">running</Tag>, "Currently scanning."],
            [<Tag key="completed" variant="success">completed</Tag>, "Finished and ready for result retrieval."],
            [<Tag key="failed" variant="warn">failed</Tag>, "Stopped because of an execution error."],
            [<Tag key="cancelled" variant="warn">cancelled</Tag>, "Manually or programmatically cancelled."],
          ]}
        />

        <CodeBlock title="JSON Response">{`{
  "job_id": "job_8f3a21cd",
  "status": "completed",
  "started_at": "2026-04-09T10:32:15Z",
  "completed_at": "2026-04-09T10:38:42Z",
  "findings_count": {
    "critical": 1,
    "high": 3,
    "medium": 7,
    "low": 12
  }
}`}</CodeBlock>
      </section>

      <section id="results" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Result Retrieval
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Once the job returns <Tag variant="success">completed</Tag>, retrieve findings from{" "}
          <InlineCode>GET /api/v1/jobs/{`{job_id}`}/results</InlineCode>. This response is ideal for
          quality gates, dashboards, and downstream automation.
        </Para>

        <Callout type="tip" title="Pagination">
          Use query parameters like <InlineCode>?page=1&amp;limit=50</InlineCode> when the job returns a
          large finding set.
        </Callout>

        <CodeBlock title="JSON Response">{`{
  "job_id": "job_8f3a21cd",
  "total": 23,
  "findings": [
    {
      "id": "f_001",
      "severity": "critical",
      "category": "SQL Injection",
      "endpoint": "/api/v1/login",
      "description": "Unsanitized input in login parameter",
      "cvss_score": 9.8
    }
  ]
}`}</CodeBlock>
      </section>

      <section id="report" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Report Download
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Download reports with <InlineCode>GET /api/v1/jobs/{`{job_id}`}/report</InlineCode>. You can
          request machine-readable JSON or human-readable PDF output depending on what the pipeline
          needs next.
        </Para>

        <Table
          headers={["Parameter", "Values", "Default"]}
          rows={[
            [<InlineCode key="format">format</InlineCode>, <><InlineCode>pdf</InlineCode> · <InlineCode>json</InlineCode></>, <InlineCode key="default-pdf">pdf</InlineCode>],
            [<InlineCode key="evidence">include_evidence</InlineCode>, <><InlineCode>true</InlineCode> · <InlineCode>false</InlineCode></>, <InlineCode key="default-false">false</InlineCode>],
          ]}
        />

        <CodeBlock title="cURL">{`curl -X GET \\
  "https://api.platform.io/api/v1/jobs/job_8f3a21cd/report?format=pdf" \\
  -H "Authorization: Bearer $API_KEY" \\
  --output scan-report.pdf`}</CodeBlock>
      </section>

      <section id="pipeline" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Pipeline Example
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          The pipeline below triggers a repository scan, polls until completion, and fails the build
          if critical findings are present.
        </Para>

        <CodeBlock title="GitHub Actions">{`name: Security Scan
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Scan
        id: trigger
        run: |
          RESPONSE=$(curl -s -X POST \\
            "$SCAN_API_URL/api/v1/scans" \\
            -H "Authorization: Bearer \${{ secrets.SCAN_API_KEY }}" \\
            -H "Content-Type: application/json" \\
            -d '{"scan_type":"repository","repository":"\${{ github.repository }}","branch":"\${{ github.ref_name }}","severity_threshold":"high"}')
          echo "job_id=$(echo $RESPONSE | jq -r .job_id)" >> $GITHUB_OUTPUT

      - name: Poll Until Complete
        run: |
          while true; do
            STATUS=$(curl -s "$SCAN_API_URL/api/v1/jobs/\${{ steps.trigger.outputs.job_id }}" \\
              -H "Authorization: Bearer \${{ secrets.SCAN_API_KEY }}" | jq -r '.status')
            [ "$STATUS" = "completed" ] && break
            [ "$STATUS" = "failed" ] && exit 1
            sleep 15
          done

      - name: Evaluate Findings
        run: |
          RESULTS=$(curl -s "$SCAN_API_URL/api/v1/jobs/\${{ steps.trigger.outputs.job_id }}/results" \\
            -H "Authorization: Bearer \${{ secrets.SCAN_API_KEY }}")
          CRITICAL=$(echo $RESULTS | jq '.findings_count.critical')
          if [ "$CRITICAL" -gt 0 ]; then
            echo "::error::$CRITICAL critical findings detected."
            exit 1
          fi`}</CodeBlock>
      </section>

      <section id="thresholds" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Severity Thresholds
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Use <InlineCode>severity_threshold</InlineCode> to control when the build should fail. This
          gives teams a practical way to tune security gates by environment.
        </Para>

        <Table
          headers={["Threshold", "Pipeline Behaviour"]}
          rows={[
            [<InlineCode key="critical">critical</InlineCode>, "Fail only when critical issues are found."],
            [<InlineCode key="high">high</InlineCode>, "Fail on high or critical findings."],
            [<InlineCode key="medium">medium</InlineCode>, "Fail on medium, high, or critical findings."],
            [<InlineCode key="low">low</InlineCode>, "Fail on any finding."],
            ["none set", "Always pass and use the results for reporting only."],
          ]}
        />

        <Callout type="warn" title="Recommendation">
          Use <InlineCode>high</InlineCode> for production deployment gates and{" "}
          <InlineCode>medium</InlineCode> for pre-production environments when you want a better
          balance between velocity and security.
        </Callout>
      </section>

      <section id="access" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          Access Scoping
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          Requests are always scoped to the authenticated workspace. Pipelines cannot read scans,
          jobs, or reports from other workspaces, and invalid cross-workspace references should return{" "}
          <InlineCode>403 Forbidden</InlineCode>.
        </Para>

        <div className="space-y-3">
          {[
            "Each API key is tied to a single workspace.",
            "Multiple keys can exist per workspace with different permission levels.",
            "Revoking one key does not invalidate the others.",
            "Usage logs can be reviewed from the workspace audit trail.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#00BCA1] shrink-0" />
              <div
                className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
                style={sansFontStyle}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
