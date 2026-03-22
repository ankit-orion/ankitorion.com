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
    url: "https://ankitorion.vercel.app",
    siteName: "Ankit Orion",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ankitorion.vercel.app/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Ankit Orion - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Orion | Full-Stack Web Developer",
    description: "Building fast, modern web apps with React, Next.js, Node.js and more.",
    images: ["https://ankitorion.vercel.app/preview-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><filter id='w'><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter></defs><text y='.9em' font-size='90' filter='url(%23w)'>🅰</text></svg>",
  },
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
          <Toaster
            position="bottom-center"
            expand={false}
            closeButton
            toastOptions={{
              style: {
                borderRadius: "14px",
                fontWeight: "600",
                fontSize: "14px",
              },
              classNames: {
                error: "!bg-neutral-900 !text-white !border-neutral-700",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
