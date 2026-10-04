import { Suspense } from "react";
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
import { WhatsAppButton } from "@/components/whatsapp-button";

// Nothing below waits on data. Each interactive section under the first screen is its own
// Suspense boundary so that React makes the navbar and hero interactive first, then the
// sections one at a time when the browser is free, rather than the whole page in one long
// task. The HTML sent to the browser is the same.
export default function Home() {
  return (
    <main id="top" className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogoStrip />
      <Suspense>
        <Services />
      </Suspense>
      <Suspense>
        <WhyUs />
      </Suspense>
      <Suspense>
        <Process />
      </Suspense>
      <Suspense>
        <Portfolio />
      </Suspense>
      <Suspense>
        <Testimonials />
      </Suspense>
      <Suspense>
        <CTA />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
