import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { Services } from "@/components/Services";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { MyStory } from "@/components/MyStory";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Benefits } from "@/components/Benefits";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { GlobalGrid } from "@/components/GridLines";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-gray-100 selection:bg-gray-200 dark:selection:bg-gray-800 relative select-none md:select-auto">
      <GlobalGrid />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Services />
      <FeaturedProjects />
      <MyStory />
      <Testimonials />
      <Pricing />
      <Benefits />
      <Contact />
      <Footer />
    </main>
  );
}
