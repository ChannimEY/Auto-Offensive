export default function ActionBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-green-400">
        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
        <span className="text-[20px]">Live Execution Console</span>
      </div>

      <div className="flex gap-3">
        <button className="bg-gray-300 text-black px-4 py-2 rounded-lg">
          ⏸ Pause
        </button>

        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          🔄 Retry Scan
        </button>

        <button className="border border-gray-400 px-4 py-2 rounded-lg">
          🧹 Clear Terminal
        </button>
      </div>
    </div>
  );
}
