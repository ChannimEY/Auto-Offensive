"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ScanBox() {
  const [scanType, setScanType] = useState("Medium");
  const router = useRouter();

  const scanOptions = ["Basic", "Medium", "Advance"];

  const handleStartScan = () => {
    if (scanType === "Medium") {
      router.push("/live-scan-medium"); // ✅ your route
    } else if (scanType === "Basic") {
      router.push("/live-scan-basic"); // optional
    } else if (scanType === "Advance") {
      router.push("/live-scan-advance"); // optional
    }
  };

  return (
    <div
      className="
        border-2 border-blue-400 
        rounded-2xl p-8 
        bg-gray-100 dark:bg-gray-800 
        text-black dark:text-white 
        shadow-lg transition-colors
      "
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Initiate Autonomous Scan
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          placeholder="Enter Target (Domain, URL, or IP)"
          className="
            flex-1 
            bg-gray-200 dark:bg-gray-700 
            rounded-lg px-4 py-3 
            outline-none 
            text-black dark:text-white
          "
        />

        <button
          onClick={handleStartScan} // ✅ trigger routing
          className="
            bg-gradient-to-r from-blue-500 to-teal-500 
            text-white px-6 py-3 rounded-lg 
            font-semibold hover:opacity-90 transition
          "
        >
          ▶ Start Scan ({scanType})
        </button>
      </div>

      {/* Scan Type Buttons */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {scanOptions.map((type) => {
          const isActive = scanType === type;

          return (
            <button
              key={type}
              onClick={() => setScanType(type)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? "bg-yellow-400 text-black shadow"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600"
                }
              `}
            >
              {type} Scan
            </button>
          );
        })}
      </div>
    </div>
  );
}
