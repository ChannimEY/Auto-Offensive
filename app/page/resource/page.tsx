'use client'

import { JSX } from "react"

const resources = [
  {
    id: 1,
    category: 'Getting Started',
    type: 'Guide',
    title: 'Repository Sccanning(SAST)',
    description: 'Learn how to set up and run your first autonomous recon workflow from zero to full scan in under 10 minutes.',

  
  },
  {
    id: 2,
    category: 'Getting Started',
    type: 'Video',
    title: 'Managed CLI & API',
    description: 'A complete video walkthrough of the toolkit dashboard, tool configuration, and scan result analysis.',
   
  },


]

const typeColors: Record<string, string> = {
  Guide:      'bg-blue-50 text-blue-600 border-blue-100',
  Cheatsheet: 'bg-amber-50 text-amber-600 border-amber-100',
  Video:      'bg-red-50 text-red-600 border-red-100',
  Blog:       'bg-purple-50 text-purple-600 border-purple-100',
}

const typeIcons: Record<string, () => JSX.Element> = {
  Guide: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="0.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3.5 3.5H8.5M3.5 6H8.5M3.5 8.5H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Cheatsheet: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 3H10.5M1.5 6H10.5M1.5 9H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Video: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="0.5" y="2.5" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8.5 4.5L11.5 3V9L8.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  Blog: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 1.5H8L10.5 4V10.5H1.5V1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M8 1.5V4H10.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3.5 6.5H8.5M3.5 8.5H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
}

const grouped = resources.reduce<Record<string, typeof resources>>((acc, r) => {
  if (!acc[r.category]) acc[r.category] = []
  acc[r.category].push(r)
  return acc
}, {})

export default function ResourcePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ fontFamily: 'var(--font-google-sans), sans-serif' }}>

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-100 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-3 leading-tight">
            Learn. Reference. Execute.
          </h1>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Guides, cheatsheets, and videos to help you master the Auto-Offensive toolkit and level up your offensive security skills.
          </p>
        </div>
      </div>

      {/* ── Sections by category ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center gap-4 mb-7">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{items.length} resource{items.length > 1 ? 's' : ''}</p>
              </div>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((r) => {
                const TypeIcon = typeIcons[r.type]
                return (
                  <div
                    key={r.id}
                    className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                  >

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">

                      
                      <a
                        href="#"
                        className="text-[#00C896] text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all"
                      >
                        {r.type === 'Video' ? 'Watch' : 'Read'}
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {/* ── Newsletter CTA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#0D1B2A] via-[#0f2940] to-[#0D1B2A] rounded-2xl px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#00C896]/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#0077B6]/10 blur-2xl" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white ">Get new resources in your inbox</h2>
            <p className="text-gray-400 text-sm mt-1">New guides and cheatsheets dropped every week.</p>
          </div>
          <div className="relative z-10 flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-60 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00C896] transition"
            />
            <button className="bg-primary hover:bg-[#00B386] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}