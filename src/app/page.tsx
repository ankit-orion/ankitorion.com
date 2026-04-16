import { TerminalModeProvider } from "@/lib/terminal-mode";
import { TerminalModeSwitch } from "@/components/sections/TerminalModeSwitch";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoTicker } from "@/components/sections/LogoTicker";
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
      givenName: "Ankit",
      familyName: "Mishra",
      alternateName: ["Ankit Orion", "ankit-orion"],
      url: "https://ankitorion.com",
      image: {
        "@type": "ImageObject",
        url: "https://ankitorion.com/portrait.png",
        width: 800,
        height: 1000,
      },
      jobTitle: "Full-Stack Web Developer",
      description:
        "Ankit Mishra is a Full-Stack Web Developer from Patna, Bihar, India. Specializing in React, Next.js, Node.js, Docker, and cloud infrastructure on AWS & Azure. Available for freelance projects.",
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
        "https://ankitorion.com",
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
        "Software Engineering",
      ],
      nationality: {
        "@type": "Country",
        name: "India",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ankitorion.com/#website",
      url: "https://ankitorion.com",
      name: "Ankit Mishra — Portfolio",
      description:
        "Portfolio of Ankit Mishra, Full-Stack Web Developer from Patna, Bihar, India.",
      author: { "@id": "https://ankitorion.com/#person" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://ankitorion.com",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://ankitorion.com/#profilepage",
      url: "https://ankitorion.com",
      name: "Ankit Mishra | Full-Stack Web Developer Portfolio",
      about: { "@id": "https://ankitorion.com/#person" },
      mainEntity: { "@id": "https://ankitorion.com/#person" },
    },
  ],
};

export default function Home() {
  return (
    <TerminalModeProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white dark:bg-[#050505] font-sans text-gray-900 dark:text-gray-100 selection:bg-gray-200 dark:selection:bg-gray-800 relative select-none md:select-auto">
        {/* SEO: primary h1 with name — visually hidden, read by Google and screen readers */}
        <h1 className="sr-only">Ankit Mishra — Full-Stack Web Developer Portfolio</h1>
        <GlobalGrid />
        <Navbar />
        <Hero />
        <LogoTicker />
        <FeaturedProjects />
        <GitHubActivity />
        <MyStory />
        <Benefits />
        <BookSection />
        <Contact />
        <Footer />
      </main>
      {/* Terminal overlay — mounts on top when toggled */}
      <TerminalModeSwitch />
    </TerminalModeProvider>
  );
}
