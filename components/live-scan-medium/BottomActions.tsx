export default function BottomActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* AI Assist */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-6">
        <h3 className="text-[20px] font-semibold">✨ AI Assist</h3>
        <p className="text-sm text-blue-100">
          Analyze findings with Guardian Brain
        </p>
      </div>

      {/* Generate Report */}
      <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-xl p-6">
        <h3 className="text-[20px] font-semibold">📄 Generate Report</h3>
        <p className="text-sm text-green-100">
          Export technical PDF and JSON logs
        </p>
      </div>
    </div>
  );
}
