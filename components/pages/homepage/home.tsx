import HomeHero from "@/components/pages/homepage/home-hero";
import Features from "@/components/pages/homepage/feature";
import AIBanner from "@/components/pages/homepage/ai-banner";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Features />
      <AIBanner />
    </main>
  );
}