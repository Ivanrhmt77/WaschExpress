import Hero from "@/components/landing/hero";
import Pricing from "@/components/landing/pricing";
import Services from "@/components/landing/services";
import Tracking from "@/components/landing/tracking";
import Contact from "@/components/landing/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <Tracking />
      <Contact />
    </>
  );
}
