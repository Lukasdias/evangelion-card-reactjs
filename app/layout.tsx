import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "MAGI System | Evangelion Card Generator",
  description: "NERV Terminal Interface for generating Evangelion title cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${vt323.variable} antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
