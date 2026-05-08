import { baseApi } from "@/lib/redux/services/base-api";
import type { ProjectScansResponse } from "@/types/scanner";
import type { AssetResult, PortResult, RawAsset, ScanResultsResponse, AggregatedAsset } from "./types";

const SCANNER_PROXY_PATH = "scanner";

type QueryScalar = string | number | boolean | null | undefined;
type QueryValue = QueryScalar | QueryScalar[];

function buildScannerUrl(pathSegments: string[], query?: Record<string, QueryValue>): string {
  const path = pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
  const searchParams = new URLSearchParams();

  if (query) {
    for (const [key, rawValue] of Object.entries(query)) {
      if (rawValue == null) continue;

      if (Array.isArray(rawValue)) {
        const values = rawValue
          .filter((value): value is string | number | boolean => value != null)
          .map((value) => String(value));
        if (values.length === 0) continue;
        for (const value of values) {
          searchParams.append(key, value);
        }
        continue;
      }

      searchParams.set(key, String(rawValue));
    }
  }

  const search = searchParams.toString();
  return search ? `${SCANNER_PROXY_PATH}/${path}?${search}` : `${SCANNER_PROXY_PATH}/${path}`;
}

function inferAssetType(hostname: string, services: string[]): "web" | "server" {
  const webIndicators = ["nginx", "apache", "http", "https", "www", "web"];
  const dbIndicators = ["mysql", "postgres", "mongodb", "redis", "mariadb"];
  const mailIndicators = ["smtp", "pop3", "imap", "mail"];

  const allText = [hostname.toLowerCase(), ...services.map(s => s.toLowerCase())].join(" ");

  if (webIndicators.some(ind => allText.includes(ind))) return "web";
  if (dbIndicators.some(ind => allText.includes(ind))) return "server";
  if (mailIndicators.some(ind => allText.includes(ind))) return "server";
  return "server";
}

function aggregateAssets(
  scansData: Array<{ scan_id: string; target_name: string; created_at: string }>,
  resultsByScan: Record<string, ScanResultsResponse>
): AggregatedAsset[] {
  const assetMap = new Map<string, RawAsset>();

  for (const scan of scansData) {
    const results = resultsByScan[scan.scan_id];
    if (!results) continue;

    const assetResults = results.results.filter((r): r is AssetResult => r.type === "asset");
    const portResults = results.results.filter((r): r is PortResult => r.type === "port");

    for (const asset of assetResults) {
      const value = asset.value;
      // Try to determine if value is an IP or hostname
      const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
      const isIp = ipRegex.test(value);
      const hostname = isIp ? `host-${value}` : value;
      const ip = isIp ? value : "0.0.0.0";

      const portsForHost = portResults.filter(p => p.host === value || p.host === hostname);

      const existing = assetMap.get(value);
      const newServices = [...new Set([...portsForHost.map(p => p.service), ...(existing?.services || [])])];
      const newPorts = Math.max(existing?.ports || 0, portsForHost.length);

      assetMap.set(value, {
        hostname,
        ip,
        os: existing?.os || "Unknown",
        type: existing?.type || inferAssetType(hostname, newServices),
        services: newServices,
        ports: newPorts,
        lastScan: scan.created_at,
        scan_id: scan.scan_id,
      });
    }
  }

  return Array.from(assetMap.values()).map(asset => ({
    id: asset.hostname,
    ...asset,
  }));
}

export const assetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAssets: builder.query<AggregatedAsset[], void>({
      async queryFn(_args, _api, _extraOptions, fetchWithBQ) {
        // Step 1: Fetch recent scans
        const scansResponse = await fetchWithBQ(buildScannerUrl(["scans", "me"], { page: 1, page_size: 10 }));
        if (scansResponse.error || !scansResponse.data) {
          throw scansResponse.error ?? new Error("Failed to fetch scans");
        }

        const scansData = (scansResponse.data as ProjectScansResponse).scans || [];

        if (scansData.length === 0) {
          return { data: [] };
        }

        // Step 2: Fetch results for each scan in parallel
        const resultsPromises = scansData.map(async (scan) => {
          const res = await fetchWithBQ(buildScannerUrl(["scans", scan.scan_id, "results"], { type: "asset" }));
          if (res.error) {
            // Skip failed fetches; treat as no results for this scan
            return { scan_id: scan.scan_id, data: null };
          }
          return { scan_id: scan.scan_id, data: res.data };
        });

        const resultsResponses = await Promise.all(resultsPromises);
        const resultsByScan: Record<string, ScanResultsResponse> = {};
        for (const { scan_id, data } of resultsResponses) {
          if (data) {
            resultsByScan[scan_id] = data as ScanResultsResponse;
          }
        }

        // Step 3: Aggregate
        const aggregated = aggregateAssets(
          scansData.map(s => ({
            scan_id: s.scan_id,
            target_name: s.project_key,
            created_at: s.created_at || new Date().toISOString(),
          })),
          resultsByScan
        );

        return { data: aggregated };
      },
      providesTags: [{ type: "Asset", id: "LIST" }],
    }),
  }),
});

export const { useListAssetsQuery } = assetApi;
