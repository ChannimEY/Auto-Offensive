"use client";

import Hero from "@/components/live-scans/Hero";
import ProgressBar from "@/components/live-scans/ProgressBar";
import LeftPanel from "@/components/live-scans/LeftPanel";
import Terminal from "@/components/live-scans/Terminal";
import Features from "@/components/live-scans/Features";
import Sidebar from "@/components/live-scans/Sidebar";

export default function OrchestrationPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Content Wrapper */}
        <div className="p-6 md:p-8 lg:p-10 space-y-6">
          {/* Hero Section */}
          <Hero />

          {/* Progress Bar */}
          <ProgressBar />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Panel */}
            <div className="space-y-6">
              <LeftPanel />
            </div>

            {/* Terminal Section */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                <Terminal />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <Features />
        </div>
      </main>
    </div>
  );
}
