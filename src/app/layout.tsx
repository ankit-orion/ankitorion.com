import type { Metadata } from "next";
import { Outfit as OutfitFont, Caveat as CaveatFont } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageLoader } from "@/components/ui/PageLoader";

const outfit = OutfitFont({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const caveat = CaveatFont({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitorion.com"),
  title: {
    default: "Ankit Mishra | Full-Stack Web Developer",
    template: "%s | Ankit Mishra",
  },
  description:
    "Ankit Mishra (Ankit Orion) — Full-Stack Web Developer from Patna, Bihar. Specializing in React, Next.js, Node.js, Docker, and cloud infrastructure on AWS & Azure. Available for freelance.",
  keywords: [
    "Ankit Mishra",
    "Ankit",
    "Ankit Orion",
    "Ankit developer",
    "Ankit Mishra developer",
    "Ankit Mishra full stack developer",
    "Ankit Mishra portfolio",
    "Ankit Mishra web developer",
    "Ankit Mishra software engineer",
    "Ankit Mishra LPU",
    "Ankit Mishra Patna",
    "Ankit Mishra Bihar",
    "Ankit Mishra India",
    "Full-Stack Developer",
    "Software Engineer",
    "Web Developer India",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "DevOps Engineer",
    "Freelance Developer India",
    "Patna Bihar developer",
    "LPU CSE developer",
    "ankitorion",
  ],
  authors: [{ name: "Ankit Mishra", url: "https://ankitorion.com" }],
  creator: "Ankit Mishra",
  publisher: "Ankit Mishra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ankit Mishra | Full-Stack Web Developer",
    description:
      "Ankit Mishra (Ankit Orion) — Full-Stack Web Developer from Patna, Bihar. React, Next.js, Node.js, Docker, AWS & Azure. Available for freelance.",
    url: "https://ankitorion.com",
    siteName: "Ankit Mishra — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ankitorion.com/preview-image.png",
        width: 1200,
        height: 630,
        alt: "Ankit Mishra - Full-Stack Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Mishra | Full-Stack Web Developer",
    description:
      "Full-Stack Developer from Patna, Bihar. React, Next.js, Node.js, Docker, AWS & Azure.",
    images: ["https://ankitorion.com/preview-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
      <head>
        <link rel="preconnect" href="https://code.tidio.co" />
        <link rel="dns-prefetch" href="https://code.tidio.co" />
      </head>
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
          <Analytics />
          <SpeedInsights />
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
        <Script
          src={`https://code.tidio.co/${process.env.NEXT_PUBLIC_TIDIO_KEY}.js`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
