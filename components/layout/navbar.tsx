import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { LanguageSwitcher } from "../shared/language-switcher";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, BugPlay, ShieldCheck, Terminal, Webhook } from "lucide-react";


const securityTools = [
  { title: "Subfinder", description: "Enumerates subdomains efficiently.", icon: Webhook },
  { title: "Nmap", description: "Network scanner with OS/service detection.", icon: Terminal },
  { title: "Nuclei", description: "Scans for vulnerabilities & misconfigurations.", icon: Bot },
  { title: "WPScan", description: "Security scanner for WordPress sites.", icon: BugPlay },
  { title: "URL Fuzzer", description: "Directory & content discovery tool.", icon: Terminal },
  { title: "Kiterunner", description: "API endpoint discovery scanner.", icon: ShieldCheck },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur font-sans">
      <div className="container flex h-20 items-center justify-between px-6 max-w-[1400px] mx-auto">
        
        {/* Logo - Modern styled */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 p-1">
             {/* Replace with your Auto-Offensive Logo */}
             <span className="text-primary font-bold text-2xl">A<span className="text-secondary-start">O</span></span>
          </div>
          <span className="font-heading text-xl uppercase tracking-tighter text-foreground hidden md:block">
            Auto-Offensive
          </span>
        </Link>

        {/* --- Central Navigation (Using advanced Shadcn Menu) --- */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            
            {/* 1. Tools Dropdown  */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium">
                Tools
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 gap-4 p-6 md:w-[600px] lg:w-[650px] font-sans">
                  {securityTools.map((tool) => (
                    <ListItem key={tool.title} title={tool.title} href="#" icon={tool.icon}>
                      {tool.description}
                    </ListItem>
                  ))}
                  <Link href="#" className="col-span-2 group flex items-center justify-center gap-2 p-4 mt-2 rounded-xl border border-dashed border-border bg-card hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                      <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">View All 15+ Advanced Scan Modules</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 2. Features Dropdown (Inspired by Image 3) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium">
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-6 md:w-[350px] font-sans">
                   <ListItem title="Integration CI/CD" href="#" className="border-l-2 border-amber-400 pl-4 hover:border-amber-500">
                     Automate security scans in your pipeline.
                   </ListItem>
                   <ListItem title="AI Enhance & Accelerate" href="#" className="border-l-2 border-emerald-400 pl-4 hover:border-emerald-500">
                     AI-powered pentesting speedup.
                   </ListItem>
                   <ListItem title="CLI Interface" href="#" className="border-l-2 border-sky-400 pl-4 hover:border-sky-500">
                     Run tools directly from your terminal.
                   </ListItem>
                   <ListItem title="Web Automation Tools" href="#" className="border-l-2 border-red-400 pl-4 hover:border-red-500">
                     Click-to-run scanners from Web UI.
                   </ListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 3. Resources  */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 font-medium">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-6 grid gap-1 md:w-[300px] font-sans">
                   <LinkListItem href="#">CLI Documents</LinkListItem>
                   <LinkListItem href="#">API Documents</LinkListItem>
                   <LinkListItem href="#">Tools documents</LinkListItem>
                   <LinkListItem href="#">Integration Documents</LinkListItem>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
          {/* 4. Company  */}
        

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
             <LanguageSwitcher />
             <ModeToggle />
          </div>

          <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-primary font-semibold hover:bg-primary/5 hidden sm:inline-flex">
                Login
              </Button>
              <Button className="font-bold bg-primary text-zinc-950 hover:bg-primary/90 rounded-full px-6 transition-transform hover:scale-105">
                Get Started
              </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group flex gap-4 select-none rounded-2xl p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-border",
            className
          )}
          {...props}
        > {/* កែត្រង់នេះ៖ ប្តូរពី ( មកជា > */}
          <div className="flex-shrink-0 w-11 h-11 bg-card rounded-xl border border-border flex items-center justify-center group-hover:bg-primary/5 transition-colors">
              {Icon && <Icon className="h-6 w-6 text-primary" />}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1 font-normal">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Simple Link សម្រាប់ Features/Resources Dropdown
const LinkListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "flex select-none items-center justify-between rounded-lg px-4 py-3 leading-none no-underline outline-none transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent hover:border-border",
          className
        )}
        {...props}
      > {/* កែត្រង់នេះ៖ ប្តូរពី ( មកជា > */}
        <span className="text-sm font-medium text-foreground">{children}</span>
        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    </NavigationMenuLink>
  );
});
LinkListItem.displayName = "LinkListItem";