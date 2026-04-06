"use client";

import AboutHero  from "@/components/pages/aboutus/about-hero";   // the hero section (about-us hero)
import OurMission from "@/components/pages/aboutus/our-mission";
import Values     from "@/components/pages/aboutus/value";
import TeamAndFooter from "@/components/pages/aboutus/team-and-footer";


export default function AboutUs() {
  return (
    <>
      <AboutHero />
      <OurMission />
      <Values />
      <TeamAndFooter/>
    </>
  );
}