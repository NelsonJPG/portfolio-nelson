import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const site = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(site ? `https://${site}` : "http://localhost:3000"),
  title: "Nelson Gonzalez · Fullstack Developer",
  description:
    "Frontend-first fullstack developer. 8 years shipping production web apps with React, Next.js, TypeScript and Node.js.",
  openGraph: {
    title: "Nelson Gonzalez · Fullstack Developer",
    description: "React, Next.js, TypeScript and Node.js. Open to remote work.",
    images: ["/avatar_hero.jpg"],
  },
};

export const viewport: Viewport = { themeColor: "#1e1f23", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
