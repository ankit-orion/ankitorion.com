import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MyStory } from "@/components/sections/MyStory";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { GlobalGrid } from "@/components/ui/GridLines";

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
