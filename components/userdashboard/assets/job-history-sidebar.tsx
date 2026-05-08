"use client";

import { useListScanJobsQuery } from "@/lib/redux/services/userdashboard/scan/jobs-api";
import { AlertCircle, Inbox } from "lucide-react";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "SUCCESS":
      return "text-emerald-600 bg-emerald-600/10";
    case "FAILED":
      return "text-red-600 bg-red-600/10";
    case "IN_PROGRESS":
      return "text-blue-600 bg-blue-600/10";
    case "PENDING":
      return "text-yellow-600 bg-yellow-600/10";
    default:
      return "text-gray-600 bg-gray-600/10";
  }
}

export function JobHistorySidebar({ limit = 10 }: { limit?: number }) {
  const { data, error, isLoading } = useListScanJobsQuery({ limit });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">Recent Scan Jobs</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest scan activity across all assets</p>
        </div>
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">Recent Scan Jobs</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest scan activity across all assets</p>
        </div>
        <div className="p-6 flex items-start gap-3 text-red-600 dark:text-red-400">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm">Failed to load job history</p>
        </div>
      </div>
    );
  }

  const jobs = data?.jobs ?? [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">Recent Scan Jobs</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest scan activity across all assets</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-[15px] font-semibold text-gray-700 dark:text-gray-300">Target</th>
              <th className="px-6 py-3 text-left text-[15px] font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-6 py-3 text-left text-[15px] font-semibold text-gray-700 dark:text-gray-300">Created</th>
              <th className="px-6 py-3 text-left text-[15px] font-semibold text-gray-700 dark:text-gray-300">Findings</th>
              <th className="px-6 py-3 text-left text-[15px] font-semibold text-gray-700 dark:text-gray-300">Job ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
                    <Inbox size={36} className="opacity-50" />
                    <p className="text-sm font-medium">No scan jobs yet</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Run a scan to see job history</p>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const statusColor = getStatusColor(job.status);
                return (
                  <tr
                    key={job.job_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[15px] font-medium text-gray-900 dark:text-white truncate max-w-[160px]" title={job.target_name}>
                        {job.target_name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {job.status.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[15px] text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <span>{timeAgo(job.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[15px] text-gray-600 dark:text-gray-400 font-medium">
                      {job.total_findings}
                    </td>
                    <td className="px-6 py-4 text-[14px] text-gray-400 dark:text-gray-500 font-mono">
                      {job.job_id.slice(0, 8)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {jobs.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
          Showing {jobs.length} of {data?.total_count ?? 0} jobs
        </div>
      )}
    </div>
  );
}
