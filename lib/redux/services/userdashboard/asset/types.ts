export type RawAsset = {
  hostname: string;
  ip: string;
  os: string;
  type: "web" | "server" | "router" | "workstation" | "mobile";
  services: string[];
  ports: number;
  lastScan: string;
  scan_id: string;
};

export type AggregatedAsset = RawAsset & {
  id: string;
};

export type AssetResult = {
  type: "asset";
  value: string;
  tool: string;
};

export type PortResult = {
  type: "port";
  value: string;
  host: string;
  service: string;
};

export type ScanResultsResponse = {
  scan_id: string;
  total: number;
  results: (AssetResult | PortResult)[];
};
