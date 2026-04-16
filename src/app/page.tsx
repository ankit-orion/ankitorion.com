import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { GitHubActivity } from "@/components/sections/GitHubActivity";
import { MyStory } from "@/components/sections/MyStory";
import { BookSection } from "@/components/sections/BookSection";
import { Benefits } from "@/components/sections/Benefits";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { GlobalGrid } from "@/components/ui/GridLines";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ankitorion.com/#person",
      name: "Ankit Mishra",
      alternateName: "Ankit Orion",
      url: "https://ankitorion.com",
      image: "https://ankitorion.com/portrait.png",
      jobTitle: "Full-Stack Web Developer",
      description:
        "Full-Stack Web Developer from Patna, Bihar. Specializing in React, Next.js, Node.js, Docker, and cloud infrastructure on AWS & Azure.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Lovely Professional University",
        alternateName: "LPU",
      },
      sameAs: [
        "https://github.com/ankit-orion",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "PostgreSQL",
        "MongoDB",
        "Full-Stack Web Development",
        "DevOps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ankitorion.com/#website",
      url: "https://ankitorion.com",
      name: "Ankit Mishra — Portfolio",
      description: "Portfolio of Ankit Mishra, Full-Stack Web Developer from Patna, Bihar.",
      author: { "@id": "https://ankitorion.com/#person" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <main className="min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-gray-100 selection:bg-gray-200 dark:selection:bg-gray-800 relative select-none md:select-auto">
      <GlobalGrid />
      <Navbar />
      <Hero />
      <LogoTicker />
      <Services />
      <FeaturedProjects />
      <GitHubActivity />
      <MyStory />
      <Benefits />
      <BookSection />
      <Contact />
      <Footer />
    </main>
    </>
  );
}
