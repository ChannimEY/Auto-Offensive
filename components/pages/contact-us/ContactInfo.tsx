const contactItems = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1" />
      </svg>
    ),
    label: "Email",
    primary: "auto.offensive@edu.com",
    secondary: "Response within 2 hours",
    isLink: true,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    label: "Live Chat",
    primary: "support.auto-offensive.io",
    secondary: "Mon-Fri, 9 AM – 6 PM EST",
    isLink: true,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Office",
    lines: [
      "Nº 40, Street : 273",
      "SongKat, Khan Toul Kork",
      "Phnom Penh, Cambodia",
    ],
    isLink: false,
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Support Portal",
    primary: "support.auto-offensive.io",
    secondary: "24/7 Assistance Available",
    isLink: true,
  },
];

const socialLinks = [
  { icon: "f", label: "Facebook" },
  { icon: "✈", label: "Telegram" },
  { icon: "⌥", label: "GitHub" },
  { icon: "in", label: "LinkedIn" },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      {contactItems.map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-lg bg-[#f0fdf9] flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <p
              className="text-gray-500 font-medium"
              style={{ fontSize: "20px" }}
            >
              {item.label}
            </p>
            {item.lines ? (
              item.lines.map((line) => (
                <p
                  key={line}
                  className="text-gray-700"
                  style={{ fontSize: "20px" }}
                >
                  {line}
                </p>
              ))
            ) : (
              <>
                <p
                  className={
                    item.isLink
                      ? "text-[#0d9488] font-semibold"
                      : "text-gray-700"
                  }
                  style={{ fontSize: "20px" }}
                >
                  {item.primary}
                </p>
                <p className="text-gray-400" style={{ fontSize: "20px" }}>
                  {item.secondary}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Social Links */}
      <div className="mt-2">
        <p className="text-gray-600 mb-3" style={{ fontSize: "20px" }}>
          Follow us :
        </p>
        <div className="flex gap-3">
          {socialLinks.map((s) => (
            <button
              key={s.label}
              aria-label={s.label}
              className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform font-bold text-gray-600"
              style={{ fontSize: "20px" }}
            >
              {s.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
