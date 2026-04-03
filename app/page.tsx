
export default function Home() {
  return (

    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans antialiased transition-colors duration-300">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-24 px-8 sm:items-start">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          
          <h1 className="font-hackdaddy text-4xl md:text-6xl uppercase tracking-tighter leading-none">
          
            <span className="text-primary">Next Gen Platform</span> <br />
         
            <span className="text-foreground">As A Service For Hackers</span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground font-sans dark:text-zinc-400">
            Auto-Offensive is built for actual security testing, not just detection. 
            We provide the coverage, consolidation, and automation cybersecurity teams 
            need to optimize vulnerability assessment workflows.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
        
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-secondary-start via-secondary-mid to-secondary-end px-8 text-sm font-bold text-white shadow-lg shadow-secondary-mid/20 transition-transform hover:scale-105 active:scale-95"
            href="#"
          >
            Get Started
          </a>
          
          {/* Secondary Button (Adaptive Border/Bg) */}
          <a
            className="flex h-12 items-center justify-center rounded-lg border border-border bg-card px-8 text-sm font-medium text-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>

        {/* Trust Section */}
        <div className="mt-20 w-full border-t border-border pt-10">
          <p className="text-center sm:text-left text-xs font-medium uppercase tracking-widest text-zinc-500 mb-6">
            Trusted by security teams at
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-8 opacity-50 grayscale dark:invert">
             <span className="text-xl font-bold text-foreground">Meta</span>
             <span className="text-xl font-bold text-foreground">NETFLIX</span>
             <span className="text-xl font-bold text-foreground">PayPal</span>
          </div>
        </div>

      </main>
    </div>
  );
}