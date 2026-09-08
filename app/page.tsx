import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Welcome from "@/components/Welcome";
import Programs from "@/components/Programs";
import WhyUs from "@/components/WhyUs";
import Tuition from "@/components/Tuition";
import Enroll from "@/components/Enroll";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Welcome />
        <Programs />
        <WhyUs />
        <Tuition />
        <Enroll />
        <Testimonials />
        <Gallery />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
