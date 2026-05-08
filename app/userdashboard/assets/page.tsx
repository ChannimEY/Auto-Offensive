"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Server,
  Monitor,
  Smartphone,
  Router,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  AlertCircle,
  Inbox,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { JobHistorySidebar } from "@/components/userdashboard/assets/job-history-sidebar";
import { useListAssetsQuery } from "@/lib/redux/services/userdashboard/asset/asset-api";

type AssetItem = {
  id: string;
  type: "web" | "server" | "router" | "workstation" | "mobile";
  ip: string;
  hostname: string;
  os: string;
  ports: number;
  services: string[];
  lastScan: string;
};

const typeIcons: Record<string, LucideIcon> = {
  web: Globe,
  server: Server,
  router: Router,
  workstation: Monitor,
  mobile: Smartphone,
};

const ITEMS_PER_PAGE = 5;

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: assetsData = [],
    error,
    isLoading,
    isError,
  } = useListAssetsQuery();

  // Normalize assets to match component expectations
  const assets: AssetItem[] = useMemo(() => {
    return (assetsData || []).map((asset) => ({
      id: asset.id,
      type: asset.type,
      ip: asset.ip,
      hostname: asset.hostname,
      os: asset.os,
      ports: asset.ports,
      services: asset.services,
      lastScan: asset.lastScan.split("T")[0], // format YYYY-MM-DD
    }));
  }, [assetsData]);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        asset.ip.includes(searchTerm) ||
        asset.hostname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || asset.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [assets, searchTerm, filterType]);

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const paginatedAssets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAssets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAssets, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Assets Content */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[36px] font-bold text-gray-900 dark:text-white leading-tight">Assets</h1>
            <p className="text-[18px] text-gray-500 dark:text-gray-400 mt-2">Manage and view your discovered assets</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 text-[16px] font-semibold rounded-xl shrink-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add Asset
          </motion.button>
        </div>

        {/* Error State */}
        {isError && (
          <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">Failed to load assets</h3>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                {error?.toString() || "Unable to fetch asset data. Please try again."}
              </p>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by IP or hostname..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              disabled={isLoading}
              className="w-full pl-14 pr-5 py-4 text-[16px] rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
              disabled={isLoading}
              className="px-5 py-4 text-[16px] rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-48 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="all">All Types</option>
              <option value="web">Web Servers</option>
              <option value="server">Servers</option>
              <option value="router">Routers</option>
              <option value="workstation">Workstations</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[32px] font-bold text-gray-900 dark:text-white leading-none">{isLoading ? "-" : assets.length}</p>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium mt-2">Total Assets</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[32px] font-bold text-blue-500 leading-none">{isLoading ? "-" : assets.filter(a => a.type === "web").length}</p>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium mt-2">Web Servers</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[32px] font-bold text-purple-500 leading-none">{isLoading ? "-" : assets.filter(a => a.type === "server").length}</p>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium mt-2">Servers</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[32px] font-bold text-orange-500 leading-none">{isLoading ? "-" : assets.filter(a => a.type === "router").length}</p>
            <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium mt-2">Network Devices</p>
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && !isError && assets.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <Inbox size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No assets discovered yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Run a scan to discover assets, open ports, and services on your network.
            </p>
          </div>
        )}

        {/* Assets Table */}
        {assets.length > 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">Asset</th>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">IP Address</th>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">OS</th>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">Ports</th>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">Services</th>
                    <th className="px-4 py-3 text-left text-[16px] font-semibold text-gray-700 dark:text-gray-300">Last Scan</th>
                    <th className="px-4 py-3 text-right text-[16px] font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {paginatedAssets.map((asset, index) => {
                    const TypeIcon = typeIcons[asset.type] || Server;
                    return (
                      <motion.tr
                        key={asset.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                              <TypeIcon size={22} className="text-teal-500" />
                            </div>
                            <span className="text-[16px] font-semibold text-gray-900 dark:text-white">{asset.hostname}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[16px] text-gray-600 dark:text-gray-400 font-medium">{asset.ip}</td>
                        <td className="px-4 py-3 text-[16px] text-gray-600 dark:text-gray-400 font-medium">{asset.os}</td>
                        <td className="px-4 py-3 text-[16px] text-gray-600 dark:text-gray-400 font-medium">{asset.ports}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {asset.services.slice(0, 3).map((service) => (
                              <span key={service} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[14px] text-gray-600 dark:text-gray-400 font-medium">
                                {service}
                              </span>
                            ))}
                            {asset.services.length > 3 && (
                              <span className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[14px] text-gray-600 dark:text-gray-400 font-medium">
                                +{asset.services.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[16px] text-gray-500 dark:text-gray-400 font-medium">{asset.lastScan}</td>
                        <td className="px-4 py-3">
                          <div className="relative group">
                            <button className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                              <MoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible z-10">
                              <div className="py-2">
                                <button className="flex items-center gap-3 px-4 py-3 text-[16px] text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left rounded-lg mx-1">
                                  <Eye size={18} />
                                  View
                                </button>
                                <button className="flex items-center gap-3 px-4 py-3 text-[16px] text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left rounded-lg mx-1">
                                  <Edit size={18} />
                                  Edit
                                </button>
                                <button className="flex items-center gap-3 px-4 py-3 text-[16px] text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left rounded-lg mx-1">
                                  <Trash2 size={18} />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredAssets.length)} of {filteredAssets.length} assets
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronsLeft size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-11 h-11 rounded-xl text-[16px] font-semibold transition-colors ${
                        currentPage === page
                          ? "bg-teal-500 text-white shadow-lg"
                          : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronsRight size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar: Job History */}
      <div className="lg:col-span-1">
        <JobHistorySidebar limit={10} />
      </div>
    </div>
  );
}
