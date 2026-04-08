'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

interface SidebarItem {
  label: string;
  href: string;
  isDot?: boolean;
  isActive?: boolean;
}

interface ToolSidebarProps {
  activeSection?: string;
  isDark?: boolean;
  onNavigate?: (href: string) => void;
}

export const ToolSidebar: React.FC<ToolSidebarProps> = ({
  activeSection,
  isDark = false,
  onNavigate,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Tool Reference': true,
  });

  const sections: SidebarSection[] = [
    {
      label: 'Getting Started',
      items: [
        { label: 'Overview', href: '#overview' },
        { label: 'Quick Start', href: '#quick-start' },
      ],
    },
    {
      label: 'Automation Tools',
      items: [
        { label: 'Web UI Tools', href: '#web-ui' },
        { label: 'Scan Modules', href: '#scan-modules' },
        { label: 'Multi-Tool Pipeline', href: '#pipeline' },
        { label: 'CLI', href: '#cli' },
      ],
    },
    {
      label: 'Tool Reference',
      items: [
        { label: 'Tool Overview', href: '#tool-overview' },
        { label: 'Overview', href: '#overview', isDot: true },
        { label: 'subfinder', href: '#subfinder', isDot: true },
        { label: 'httpx', href: '#httpx', isDot: true },
        { label: 'naabu', href: '#naabu', isDot: true },
        { label: 'nuclei', href: '#nuclei', isDot: true },
        { label: 'Versions & Status', href: '#versions', isDot: true },
        { label: 'Rate Limits', href: '#limits', isDot: true },
        { label: 'Output Formats', href: '#output', isDot: true },
        { label: 'Error Reference', href: '#errors', isDot: true },
      ],
    },
    {
      label: 'Reporting',
      items: [
        { label: 'Report Generation', href: '#report-gen' },
        { label: 'Templates', href: '#templates' },
        { label: 'Export Formats', href: '#export' },
      ],
    },
    {
      label: 'API',
      items: [
        { label: 'API Reference', href: '#api-ref' },
        { label: 'Authentication', href: '#auth' },
      ],
    },
  ];

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleItemClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);
    }
  };

  const bgColor = isDark ? 'bg-[#09090B]' : 'bg-[#F7F5F0]';
  const textColor = isDark ? 'text-[#C9CDD4]' : 'text-[#4A4540]';
  const labelColor = isDark ? 'text-[#9CA3AF]' : 'text-[#B5B0A8]';
  const borderColor = isDark ? 'border-white/10' : 'border-[#E2DDD5]';
  const hoverBg = isDark ? 'hover:bg-white/5 hover:text-white' : 'hover:bg-[#EAE6DE]';
  const activeBg = isDark ? 'bg-[rgba(0,188,161,0.12)] text-[#00BCA1]' : 'bg-[#EAE6DE] text-[#00BCA1]';

  return (
    <aside
      className={`${bgColor} w-72 shrink-0 sticky top-22 self-start h-[calc(100vh-5.5rem)] overflow-y-auto border-r ${borderColor} py-5.5 hidden lg:block`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: isDark ? '#334155 transparent' : '#E2DDD5 transparent',
      }}
    >
      {/* Search Bar for Mobile */}
      <div className="px-3 mb-6 md:hidden">
        <button className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor} ${isDark ? 'bg-[#121214]' : 'bg-white'} ${textColor} text-sm`}>
          <Search size={14} />
          <span className={labelColor}>Search...</span>
          <kbd className={`ml-auto text-xs ${isDark ? 'bg-white/5 text-[#A1A1AA]' : 'bg-[#F0EDE6]'} px-1 rounded`}>⌘K</kbd>
        </button>
      </div>

      {sections.map((section, idx) => (
        <div key={idx} className="px-3 mb-4">
          <button
            onClick={() => toggleGroup(section.label)}
            className={`text-xs font-semibold uppercase tracking-widest ${labelColor} px-2 py-2 w-full text-left hover:opacity-75 transition-opacity`}
          >
            {section.label}
          </button>
          {expandedGroups[section.label] && (
            <div className="flex flex-col gap-0.5 mt-2">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => handleItemClick(item.href)}
                  className={`flex items-center gap-2 text-[18px] font-normal px-2 py-1.5 rounded-md transition-colors ${
                    activeSection === item.href ? activeBg : `${textColor} ${hoverBg}`
                  }`}
                  style={{ fontFamily: 'var(--font-google-sans), var(--font-noto-khmer), sans-serif' }}
                >
                  {item.isDot && (
                    <div className="w-1 h-1 rounded-full bg-current opacity-50 shrink-0" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};
