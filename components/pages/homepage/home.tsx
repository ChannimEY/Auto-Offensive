import HomeHero from "@/components/pages/homepage/home-hero";
import Features from "@/components/pages/homepage/feature";
import AIBanner from "@/components/pages/homepage/ai-banner";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Features />
      <AIBanner />
      <Footer />
    </main>
  );
}