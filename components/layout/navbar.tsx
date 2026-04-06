'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { LucideIcon } from 'lucide-react';
import {
  CodeIcon,
  GlobeIcon,
  LayersIcon,
  UserPlusIcon,
  Users,
  Star,
  FileText,
  Shield,
  RotateCcw,
  Handshake,
  Leaf,
  HelpCircle,
  BarChart,
  PlugIcon,
  SunIcon,
  MoonIcon,
} from 'lucide-react';

type LinkItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  description?: string;
};

// ── Logo — swaps based on theme ────────────────────────────────────────
function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return <div style={{ width: 100, height: 100 }} />;

  // LOGIC: 
  // If theme is 'dark', use the Light-mode image
  // Otherwise, use the Dark-mode image
  const src = theme === 'dark' 
    ? '/Auto_Offensive_Dark-mode.png' 
    : '/Auto_Offensive_Light-mode.png';

  return (
    <Image 
      src={src} 
      alt="Auto-Offensive" 
      width={100} 
      height={100} 
      priority // Added priority to ensure the logo loads quickly
    />
  );
}
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="size-9" />;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="flex items-center justify-center size-9 rounded-3xl border bg-transparent cursor-pointer "
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
    
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg':
          scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {productLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      Interested?{' '}
                      <a href="#" className="text-foreground font-medium hover:underline">
                        Schedule a demo
                      </a>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent">
                  Feature
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-lg grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {companyLinks2.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium">{item.title}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink className="px-4" asChild>
                <a href="#" className="rounded-md p-2">Resource</a>
              </NavigationMenuLink>

              <NavigationMenuLink className="px-4" asChild>
                <a href="#" className="rounded-md p-2">About Us</a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop right — plain buttons, no hover */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <button className="px-4 py-1.5 rounded-md border border-border text-sm font-medium bg-transparent cursor-pointer">
            Sign In
          </button>
          <button className="px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
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

      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <NavigationMenu className="max-w-full">
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-sm">Tools</span>
            {productLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            <span className="text-sm">Feature</span>
            {companyLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            {companyLinks2.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
          </div>
        </NavigationMenu>
        <div className="flex flex-col gap-2">
         <button className="w-full py-2 rounded-md border-primary t
         ext-sm font-medium bg-transparent cursor-pointer transition-colors duration-200 hover:bg-primary hover:text-white">
               Sign In
         </button>
          <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer">
            Get Started
          </button>
        </div>
      </MobileMenu>
    </header>
  );
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
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

function ListItem({
  title,
  description,
  icon: Icon,
  className,
  href,
  ...props
}: React.ComponentProps<typeof NavigationMenuLink> & LinkItem) {
  return (
    <NavigationMenuLink
      className={cn(
        'w-full flex flex-row gap-x-2 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2',
        className,
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

const productLinks: LinkItem[] = [
  { title: 'Website Builder',    href: '#', description: 'Create responsive websites with ease',          icon: GlobeIcon    },
  { title: 'Cloud Platform',     href: '#', description: 'Deploy and scale apps in the cloud',            icon: LayersIcon   },
  { title: 'Team Collaboration', href: '#', description: 'Tools to help your teams work better together', icon: UserPlusIcon },
  { title: 'Analytics',          href: '#', description: 'Track and analyze your website traffic',        icon: BarChart     },
  { title: 'Integrations',       href: '#', description: 'Connect your apps and services',               icon: PlugIcon     },
  { title: 'API',                href: '#', description: 'Build custom integrations with our API',        icon: CodeIcon     },
];

const companyLinks: LinkItem[] = [
  { title: 'About Us',         href: '#', description: 'Learn more about our story and team',        icon: Users     },
  { title: 'Customer Stories', href: '#', description: "See how we've helped our clients succeed",   icon: Star      },
  { title: 'Partnerships',     href: '#', description: 'Collaborate with us for mutual growth',      icon: Handshake },
  { title: 'Partnerships',     href: '#', description: 'Collaborate with us for mutual growth',      icon: Handshake },
];

const companyLinks2: LinkItem[] = [
  { title: 'Terms of Service', href: '#', icon: FileText   },
  { title: 'Privacy Policy',   href: '#', icon: Shield     },
  { title: 'Refund Policy',    href: '#', icon: RotateCcw  },
  { title: 'Blog',             href: '#', icon: Leaf       },
  { title: 'Help Center',      href: '#', icon: HelpCircle },
];

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}