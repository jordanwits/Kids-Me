import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Welcome from "@/components/Welcome";
import Programs from "@/components/Programs";
import WhyUs from "@/components/WhyUs";
import Tuition from "@/components/Tuition";
import EnrollCta from "@/components/EnrollCta";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";

/**
 * Home is a set of teasers, not the whole site. Every section below carries a
 * link on to the page that holds the full version — the registration form
 * itself now lives on /enrollment rather than being embedded here, which keeps
 * an 820px third-party iframe off the landing page.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Welcome />
      <Programs />
      <WhyUs />
      <Tuition />
      <EnrollCta />
      <Testimonials />
      <Gallery />
      <CtaBand />
    </>
  );
}
