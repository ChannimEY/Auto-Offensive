'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────
type ToolItem = {
  title: string;
  href: string;
  icon: string; 
};

type FeatureItem = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

type ResourceItem = {
  title: string;
  description?: string;
  href: string;
  icon: string;
};

// ── Data ─────────────────────────────────────────────────────────────────────
const toolLinks: ToolItem[] = [
  { title: 'Subfinder',    href: '#', icon: '/icons/subfinder.png'    },
  { title: 'Naabu',        href: '#', icon: '/icons/naabu.png'        },
  { title: 'Nmap',         href: '#', icon: '/icons/nmap.png'         },
  { title: 'Nuclei',       href: '#', icon: '/icons/nuclei.png'       },
  { title: 'URL Fuzzer',   href: '#', icon: '/icons/urlfuzzer.png'    },
  { title: 'WPScan',       href: '#', icon: '/icons/wpscan.png'       },
  { title: 'SQLi',         href: '#', icon: '/icons/sqli.png'         },
  { title: 'XSS Strike',   href: '#', icon: '/icons/xssstrike.png'    },
  { title: 'Kiterunner',   href: '#', icon: '/icons/kiterunner.png'   },
  { title: 'Httpx',        href: '#', icon: '/icons/httpx.png'        },
  { title: 'Katana',       href: '#', icon: '/icons/katana.png'       },
  { title: 'Katana',       href: '#', icon: '/icons/katana.png'       },
  { title: 'Amass',        href: '#', icon: '/icons/amass.png'        },
  { title: 'Assetfinder',  href: '#', icon: '/icons/assetfinder.png'  },
];

const featureLinks: FeatureItem[] = [
  { title: 'Integration CI/CD', description: 'Seamlessly connect with your development pipelines',   href: '/feature/cicd', icon: '/icons/feature-cicd.png'       },
  { title: 'Ai Pentest',        description: 'Accelerate testing with intelligent automation',        href: '/feature/ai', icon: '/icons/feature-aipentest.png'  },
  { title: 'CLI Access',        description: 'Execute tools remotely via terminal',                   href: '/feature/cli', icon: '/icons/feature-cli.png'        },
  { title: 'Automation Tools',  description: 'Run tools instantly from the web UI',                   href: '/feature/webui', icon: '/icons/feature-automation.png' },
];

const resourceDocLinks: ResourceItem[] = [
  { title: 'CLI Documents',   description: 'Guides for using tools via command line',      href: '#', icon: '/icons/res-cli.png'   },
  { title: 'API Documents',   description: 'Accelerate testing with intelligent automation', href: '#', icon: '/icons/res-api.png'   },
  { title: 'Tools Documents', description: 'Instructions for using security tools',        href: '#', icon: '/icons/res-tools.png' },
  { title: 'CI/CD Documents', description: 'Setup guides for pipeline integration',        href: '#', icon: '/icons/res-cicd.png'  },
];

const resourceMiscLinks: ResourceItem[] = [
  { title: 'About Us',    href: '/about-us', icon: '/icons/about_us_icon.png'   },
  { title: 'Contact Us',  href: '/contact-us',          icon: '/icons/contact_us_icon.png' },
  { title: 'FAQ',         href: '#',          icon: '/icons/faq_icon.png'     },
];

// ── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: 100, height: 40 }} />;
  const src = theme === 'dark'
    ? '/Auto_Offensive_Dark-mode.png'
    : '/Auto_Offensive_Light-mode.png';
  return (
    <Link href="/" className="cursor-pointer shrink-0">
      <Image src={src} alt="Auto-Offensive" width={100} height={40} priority />
    </Link>
  );
}

// ── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-14 h-7" />;
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={cn(
        'relative inline-flex items-center w-14 h-7 rounded-full border-2 transition-colors duration-300 cursor-pointer shrink-0',
        isDark
          ? 'bg-gray-700 border-gray-600'
          : 'bg-gray-200 border-gray-300',
      )}
    >
      {/* Sun icon — left */}
      <span className="absolute left-1 flex items-center justify-center w-5 h-5">
        <SunIcon className={cn('size-3.5 transition-opacity', isDark ? 'opacity-40' : 'opacity-100 text-amber-500')} />
      </span>
      {/* Moon icon — right */}
      <span className="absolute right-1 flex items-center justify-center w-5 h-5">
        <MoonIcon className={cn('size-3.5 transition-opacity', isDark ? 'opacity-100 text-blue-300' : 'opacity-40')} />
      </span>
      {/* Thumb */}
      <span
        className={cn(
          'absolute top-0.5 w-5 h-5 rounded-full shadow transition-transform duration-300',
          isDark ? 'translate-x-7 bg-blue-400' : 'translate-x-0.5 bg-amber-400',
        )}
      />
    </button>
  );
}

// ── Language Toggle ───────────────────────────────────────────────────────────
type Lang = 'EN' | 'KH';

function LanguageToggle() {
  const [lang, setLang] = React.useState<Lang>('EN');
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: Lang; label: string; flagSrc: string }[] = [
    { value: 'EN', label: 'English',  flagSrc: '/flags/en.png' },
    { value: 'KH', label: 'ខ្មែរ',     flagSrc: '/flags/kh.png' },
  ];

  const current = options.find(o => o.value === lang)!;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5   bg-transparent text-sm font-medium cursor-pointer hover:bg-primary/10 transition-colors"
      >
        {/* Flag image */}
        <Image
          src={current.flagSrc}
          alt={current.value}
          width={20}
          height={14}
          className=" object-cover"
        />
        <span>{current.value}</span>
        <ChevronDownIcon className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-36   bg-popover shadow-lg z-50 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setLang(opt.value); setOpen(false); }}
              className={cn(
                'w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-primary/10 transition-colors cursor-pointer',
                lang === opt.value && 'bg-pr font-semibold',
              )}
            >
              <Image
                src={opt.flagSrc}
                alt={opt.value}
                width={20}
                height={14}
                className=" object-cover"
              />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tool List Item (image icon, 2-col grid) ───────────────────────────────────
function ToolItem({ title, href, icon }: ToolItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex items-center gap-2.5 rounded-md px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <div className="shrink-0 w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src={icon}
            alt={title}
            width={74}
            height={74}
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </span>
      </a>
    </NavigationMenuLink>
  );
}

// ── Feature List Item (image icon + description) ──────────────────────────────
function FeatureItem({ title, description, href, icon }: FeatureItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex items-start gap-3 rounded-md p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <div className="shrink-0 w-10 h-10  bg-background flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src={icon}
            alt={title}
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {title} <span className="text-muted-foreground font-normal">:</span>
          </p>
          <p className="text-xs text-muted-foreground leading-snug">{description}</p>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

// ── Resource Doc Item ─────────────────────────────────────────────────────────
function ResourceDocItem({ title, description, href, icon }: ResourceItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex items-start gap-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <div className="shrink-0 w-9 h-9 rounded-md border border-border bg-background flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {title} <span className="text-muted-foreground font-normal">:</span>
          </p>
          {description && (
            <p className="text-xs text-muted-foreground leading-snug">{description}</p>
          )}
        </div>
      </a>
    </NavigationMenuLink>
  );
}

// ── Resource Misc Item ────────────────────────────────────────────────────────
function ResourceMiscItem({ title, href, icon }: ResourceItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex items-center gap-2.5 rounded-md px-2 py-2  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
      >
        <div className="shrink-0 w-8 h-8 rounded-md border border-border bg-background flex items-center justify-center overflow-hidden shadow-sm">
          <Image
            src={icon}
            alt={title}
            width={22}
            height={22}
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </a>
    </NavigationMenuLink>
  );
}

// ── Scroll hook ───────────────────────────────────────────────────────────────
function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  React.useEffect(() => { onScroll(); }, [onScroll]);
  return scrolled;
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
type MobileMenuProps = React.ComponentProps<'div'> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;
  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 [@supports(backdrop-filter:blur(0))]:bg-background/60',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out',
          'size-full p-4',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-background/95 [@supports(backdrop-filter:blur(0))]:bg-background/60': scrolled,
      })}
    >
      <nav className="mx-auto z-50 flex h-14 w-full max-w-7xl items-center justify-between px-4">

        {/* Left: Logo  */}
        <div >
          <Logo />
        </div>

                {/* Center:  Nav */}
        <div >
       
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>

              {/* ── Tools ── */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=active]:bg-transparent data-[state=open]:bg-transparent text-primary font-semibold">
                <Link href="/page/tools">  Tools</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <div className="w-120 rounded-xl border border-border bg-popover shadow-xl p-3">
                    <ul className="grid grid-cols-2 gap-0.5">
                      {toolLinks.map((item, i) => (
                        <li key={i}>
                          <ToolItem {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ── Features ── */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=active]:bg-transparent data-[state=open]:bg-transparent">
                <Link href="/feature">  Features</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <div className="w-120 rounded-xl border border-border bg-popover shadow-xl p-3">
                    <ul className="grid grid-cols-2 gap-1">
                      {featureLinks.map((item, i) => (
                        <li key={i}>
                          <FeatureItem {...item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ── Resources ── */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=active]:bg-transparent data-[state=open]:bg-transparent">
                  <Link href="/page/resource">  Resources</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background">
                  <div className="w-120 rounded-xl border border-border bg-popover shadow-xl p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Left: doc links */}
                      <ul className="space-y-0.5 border-r border-border pr-2">
                        {resourceDocLinks.map((item, i) => (
                          <li key={i}>
                            <ResourceDocItem {...item} />
                          </li>
                        ))}
                      </ul>
                      {/* Right: misc links */}
                      <ul className="space-y-0.5 pl-2">
                        {resourceMiscLinks.map((item, i) => (
                          <li key={i}>
                            <ResourceMiscItem {...item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
        

        {/* Right: Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">

          {/* Language toggle */}
          <LanguageToggle />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Login / Register */}
          <button className="px-4 py-1.5 rounded-md text-sm font-semibold text-primary  bg-transparent cursor-pointer hover:bg-primary/10 transition-colors">
            Login / Register
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex items-center justify-center size-9 rounded-md border border-border bg-transparent cursor-pointer"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tools</p>
          <div className="grid grid-cols-2 gap-0.5">
            {toolLinks.map((link, i) => (
              <ToolItem key={i} {...link} />
            ))}
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Features</p>
          <div className="grid grid-cols-1 gap-1">
            {featureLinks.map((link, i) => (
              <FeatureItem key={i} {...link} />
            ))}
          </div>

          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">Resources</p>
          <div className="grid grid-cols-1 gap-0.5">
            {resourceDocLinks.map((link, i) => (
              <ResourceDocItem key={i} {...link} />
            ))}
            {resourceMiscLinks.map((link, i) => (
              <ResourceMiscItem key={i} {...link} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <button className="w-full py-2 rounded-md border border-primary text-primary text-sm font-semibold bg-transparent cursor-pointer hover:bg-primary/10 transition-colors">
            Login / Register
          </button>
        </div>
      </MobileMenu>
    </header>
  );
}