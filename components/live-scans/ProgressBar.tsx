export default function ProgressBar() {
  return (
    <div className="mb-10">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span className="text-green-400">CLONING</span>
        <span>SCANNING</span>
        <span>EXPLOITATION</span>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="w-1/3 h-full bg-green-400"></div>
      </div>
    </div>
  );
}
