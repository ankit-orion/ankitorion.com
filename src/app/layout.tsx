import type { Metadata } from "next";
import { Outfit as OutfitFont } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const outfit = OutfitFont({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ankit | Full-Stack Web Developer - Patna, Bihar",
  description: "Full-Stack Web Developer from Patna, Bihar. B.Tech CSE from LPU. Passionate about philosophy, cricket, and the cosmos.",
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
