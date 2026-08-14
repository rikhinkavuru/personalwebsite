import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { profile } from "@/lib/content";
import { colors, siteDescription, siteName, siteUrl } from "@/lib/site";
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
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  keywords: [
    "Rikhin Kavuru",
    "machine learning",
    "computational biology",
    "bioinformatics",
    "research",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: profile.firstName,
    lastName: profile.lastName,
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: colors.bg,
  colorScheme: "light",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: "Machine Learning Engineer",
  description: siteDescription,
  worksFor: [
    { "@type": "Organization", name: "Convexia" },
    { "@type": "Organization", name: "Broad Institute of MIT and Harvard" },
  ],
  alumniOf: { "@type": "EducationalOrganization", name: "Homestead High School" },
  knowsAbout: [
    "Machine learning",
    "Computational biology",
    "Bioinformatics",
    "Drug discovery",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Static object built at module scope, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
