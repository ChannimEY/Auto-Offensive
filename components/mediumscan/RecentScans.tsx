export default function RecentScans() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Recent Scans</h2>
        <span className="bg-blue-500 text-xs px-2 py-1 rounded">LOCKED</span>
      </div>

      <div className="bg-gray-200 text-black rounded-xl p-10 text-center">
        <p className="text-lg font-semibold mb-2">No scans detected</p>
        <p className="text-sm text-gray-600">
          Start your first scan by entering a target above.
        </p>
      </div>
    </div>
  );
}
