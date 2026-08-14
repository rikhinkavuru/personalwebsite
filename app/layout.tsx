import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rikhin Kavuru",
  description: "Computational biology and machine learning researcher.",
  openGraph: {
    title: "Rikhin Kavuru",
    description: "Computational biology and machine learning researcher.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Rikhin Kavuru",
    description: "Computational biology and machine learning researcher.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
