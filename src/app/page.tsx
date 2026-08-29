import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { LogoStrip } from "@/components/sections/logo-strip";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main id="top" className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Services />
      <WhyUs />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
