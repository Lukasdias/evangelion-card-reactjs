import type { Metadata, Viewport } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Evangelion Title Card Generator | MAGI System",
  description:
    "Create authentic Neon Genesis Evangelion episode title cards with customizable text, fonts, and effects. Free online tool with MAGI System terminal interface.",
  keywords: [
    "Evangelion",
    "Neon Genesis Evangelion",
    "title card",
    "episode card",
    "generator",
    "MAGI System",
    "NERV",
    "anime",
    "meme generator",
  ],
  authors: [{ name: "MAGI System" }],
  creator: "MAGI System",
  publisher: "NERV",
  metadataBase: new URL("https://evangelion-card-generator.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Evangelion Title Card Generator | MAGI System",
    description:
      "Create authentic Neon Genesis Evangelion episode title cards. Customize text, fonts, and effects with our MAGI System terminal interface.",
    url: "/",
    siteName: "MAGI System - Evangelion Card Generator",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evangelion Title Card Generator - MAGI System Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evangelion Title Card Generator | MAGI System",
    description:
      "Create authentic Neon Genesis Evangelion episode title cards. Customize text, fonts, and effects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MAGI System" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${vt323.variable} font-mono antialiased min-h-screen bg-magi-bg`}>
        {children}
      </body>
    </html>
  );
}
