export default function Features() {
  const items = [
    {
      title: "Automated Clustering",
      desc: "Guardian AI automatically groups discovered assets.",
    },
    {
      title: "Smart Logging",
      desc: "All console output is stored and correlated.",
    },
    {
      title: "Cloud Synced",
      desc: "Resume sessions across any device.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
      {items.map((item) => (
        <div key={item.title} className="bg-white rounded-xl p-6">
          <h3 className="font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-500" style={{ fontSize: "20px" }}>
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
