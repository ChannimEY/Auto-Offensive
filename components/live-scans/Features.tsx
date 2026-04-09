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
        <div
          key={item.title}
          className="
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            border border-gray-200 dark:border-gray-700
            rounded-xl p-6 shadow-sm
            transition-colors duration-300
          "
        >
          <h3 className="font-semibold text-[20px] mb-2">{item.title}</h3>

          <p className="text-gray-600 dark:text-gray-400 text-[20px]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
