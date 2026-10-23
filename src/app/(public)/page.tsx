import { PublicHeader } from "@/components/(public)/layout/public-header";
// import { Hero } from "@/components/(public)/landing/hero";
import { ValueProposition } from "@/components/(public)/landing/value-proposition";
import { HowItWorks } from "@/components/(public)/landing/how-it-works";
import { FAQ } from "@/components/(public)/landing/faq";
import { ClosingCTA } from "@/components/(public)/landing/closing-cta";
import { HeroSection } from "./layout/hero-section";
import Hero from "@/components/(public)/landing/hero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#18181D]">
      <PublicHeader />
      <Hero />
      <HeroSection />
      <ValueProposition />
      <HowItWorks />
      <FAQ />
      <ClosingCTA />
    </main>
  );
}
