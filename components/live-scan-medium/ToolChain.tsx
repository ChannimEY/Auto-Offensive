export default function ToolChain() {
  return (
    <div className="bg-gray-100 text-black rounded-2xl p-10 shadow-2xl">
      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
            🔍
          </div>
          <p className="mt-4 text-[20px] font-semibold">Subfinder</p>
          <span className="text-xs text-gray-500 tracking-wide">DISCOVERY</span>
        </div>

        {/* Line 1 */}
        <div className="flex-1 mx-6 flex items-center">
          <div className="w-full h-[2px] bg-gradient-to-r from-teal-400 to-blue-400 relative">
            <span className="absolute right-0 top-[-6px] text-blue-500">→</span>
          </div>
        </div>

        {/* Step 2 (ACTIVE / HIGHLIGHTED) */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="w-20 h-20 border-2 border-blue-400 rounded-xl flex items-center justify-center font-bold text-blue-600 bg-white">
            HTTP
          </div>
          <p className="mt-4 text-[20px] font-semibold text-blue-600">Httpx</p>
          <span className="text-xs text-gray-500 tracking-wide">PROBING</span>
        </div>

        {/* Line 2 */}
        <div className="flex-1 mx-6 flex items-center">
          <div className="w-full h-[2px] bg-gradient-to-r from-blue-400 to-teal-400 relative">
            <span className="absolute right-0 top-[-6px] text-blue-500">→</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center text-2xl">
            🔬
          </div>
          <p className="mt-4 text-[20px] font-semibold">Nuclei</p>
          <span className="text-xs text-gray-500 tracking-wide">SCANNING</span>
        </div>
      </div>
    </div>
  );
}
