import { stats } from "@/app/vulnerabilities/data/vulnerabilities";

export default function StatsRow() {
  return (
    <div className="grid grid-cols-5 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#161b22] border border-gray-700 rounded-2xl p-5"
        >
          {/* Label */}
          <p className="mb-3">
            <span
              className={`text-xs font-bold tracking-widest ${s.color}`}
              style={{ fontSize: "11px" }}
            >
              {s.label}
            </span>
          </p>

          {/* Value + dot indicator */}
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-white">{s.value}</span>
            {s.dot && (
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block mb-1" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
