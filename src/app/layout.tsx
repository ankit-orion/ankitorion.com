import type { Metadata } from "next";
import { Outfit as OutfitFont } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const outfit = OutfitFont({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ankit Orion | Product Designer - High Conversion Websites",
  description: "Senior Product Designer specializing in Web & Mobile Apps for FinTech, E-Commerce, and SaaS. Currently based in India.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased text-foreground bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
