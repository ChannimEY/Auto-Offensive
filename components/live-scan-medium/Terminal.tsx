export default function Terminal() {
  return (
    <div className="bg-[#020617] rounded-xl p-6 text-sm font-mono text-gray-300 shadow-2xl">
      <p>
        [14:02:11] <span className="text-green-400">INFO</span> Initializing
        Tool Chain Builder v2.4.0...
      </p>
      <p>
        [14:02:12] <span className="text-green-400">INFO</span> Loading
        subfinder configuration... success.
      </p>
      <p>
        [14:02:15] <span className="text-blue-400">EXEC</span> Running
        Subfinder...
      </p>
      <p className="text-green-400">
        [HTTP] 200 OK | https://api.guardian-infra.internal
      </p>
      <p className="text-green-400">
        [HTTP] 200 OK | https://staging-01.guardian-infra.internal
      </p>
      <p>
        [14:04:45] <span className="text-green-400">INFO</span> Probing
        complete.
      </p>
      <p>
        [14:04:46] <span className="text-blue-400">EXEC</span> Initializing
        Nuclei Scan...
      </p>
      <p className="text-yellow-400">WARN Nuclei: 4,281 templates loaded.</p>
    </div>
  );
}
