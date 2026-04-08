export default function HeroSection() {
  return (
    <section className="relative text-center py-16 overflow-hidden">
      {/* Left hexagon decorations */}
      <div className="absolute left-0 top-10 opacity-20">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="60"
            height="70"
            viewBox="0 0 60 70"
            className="mb-[-10px]"
            style={{ marginLeft: i * 10 }}
          >
            <polygon
              points="30,5 55,18 55,52 30,65 5,52 5,18"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2"
            />
          </svg>
        ))}
      </div>

      {/* Right hexagon decorations */}
      <div className="absolute right-0 top-10 opacity-40">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="60"
            height="70"
            viewBox="0 0 60 70"
            className="mb-[-10px]"
          >
            <polygon
              points="30,5 55,18 55,52 30,65 5,52 5,18"
              fill={i === 2 ? "#0d9488" : "none"}
              stroke="#0d9488"
              strokeWidth="2"
            />
          </svg>
        ))}
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Let&apos;s Build Something Secure
      </h1>
      <p
        className="text-gray-600 max-w-lg mx-auto"
        style={{ fontSize: "20px" }}
      >
        Have questions? Our team is here to help you protect your infrastructure
        with advanced penetration testing.
      </p>
    </section>
  );
}
