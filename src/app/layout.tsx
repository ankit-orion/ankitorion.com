import type { Metadata } from "next";
import { Outfit as OutfitFont, Caveat as CaveatFont } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageLoader } from "@/components/ui/PageLoader";

const outfit = OutfitFont({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const caveat = CaveatFont({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Ankit Orion | Full-Stack Web Developer",
  description:
    "Full-Stack Web Developer from Patna, Bihar. Building fast, modern web apps with React, Next.js, Node.js and more.",
  openGraph: {
    title: "Ankit Orion | Full-Stack Web Developer",
    description: "Building fast, modern web apps with React, Next.js, Node.js and more.",
    url: "https://ankitorion.dev",
    siteName: "Ankit Orion",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Orion | Full-Stack Web Developer",
    description: "Building fast, modern web apps with React, Next.js, Node.js and more.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${caveat.variable} font-sans antialiased text-foreground bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <ScrollProgress />
          {children}
          <BackToTop />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
