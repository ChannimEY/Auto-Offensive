export default function Terminal() {
  return (
    <div
      className="bg-black text-green-400 rounded-xl p-4 shadow-lg 
                    h-[250px] md:h-[300px] overflow-y-auto text-sm font-mono"
    >
      <p className="text-gray-400 mb-2">root@guardian:~/recon/target-102</p>

      <p>[INFO] Initializing Autonomous Guardian Engine...</p>
      <p>[SYSTEM] Target identified: 192.168.1.104</p>
      <p>[SUBFINDER] Found: api.target.scope</p>
      <p>[HTTPX] [200 OK] https://api.target.scope</p>
      <p>[NMAP] Port 80 open</p>

      <p className="text-red-500 mt-2">[ALERT] High entropy detected</p>
    </div>
  );
}
