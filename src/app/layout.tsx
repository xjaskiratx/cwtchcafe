import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cwtchcafe.com"),
  title: "Cwtch Cafe | Artisanal Coffee & Cozy Vibes",
  description: "Experience the heart of the community at Cwtch Cafe. We serve artisanal roasts and handmade pastries in a warm, welcoming atmosphere.",
  openGraph: {
    title: "Cwtch Cafe | Artisanal Coffee & Cozy Vibes",
    description: "Experience the heart of the community at Cwtch Cafe. We serve artisanal roasts and handmade pastries in a warm, welcoming atmosphere.",
    url: "https://cwtchcafe.com",
    siteName: "Cwtch Cafe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cwtch Cafe | Artisanal Coffee & Cozy Vibes",
    description: "Experience the heart of the community at Cwtch Cafe. We serve artisanal roasts and handmade pastries in a warm, welcoming atmosphere.",
  },
};

import BackgroundManager from "./components/BackgroundManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmMono.variable} ${ebGaramond.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black overflow-x-hidden" suppressHydrationWarning>
        <BackgroundManager />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
