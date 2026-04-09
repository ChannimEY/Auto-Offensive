import HomeHero from "@/components/pages/homepage/home-hero";
import Features from "@/components/pages/homepage/feature";
import AIBanner from "@/components/pages/homepage/ai-banner";
import ThreeCards, {  } from "@/components/pages/homepage/threecards";
import TeamShowcase from "./teamshowcase";
import HomeVideo from "./home-video";


export default function Home() {
  return (
    <main>
      <HomeHero />
      <Features />
      <HomeVideo />
      <AIBanner />
       <TeamShowcase />
      <ThreeCards />
      
    </main>
  );
}