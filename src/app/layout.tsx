import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Siding Contractors Dallas TX | Siding Installation & Repair",
  description:
    "Professional siding contractors in Dallas TX offering siding installation, repair, replacement, vinyl siding, fiber cement siding, and storm damage repair services. Free estimates available.",
  keywords: [
    "Siding Contractors Dallas TX",
    "Siding Installation Dallas TX",
    "Siding Repair Dallas TX",
    "Siding Replacement Dallas TX",
    "Vinyl Siding Dallas TX",
    "Fiber Cement Siding Dallas TX",
    "James Hardie Siding Dallas TX",
    "Storm Damage Siding Repair Dallas TX",
    "Hail Damage Siding Repair Dallas TX",
  ],
  authors: [{ name: "Dallas Siding Experts" }],
  creator: "Dallas Siding Experts",
  publisher: "Dallas Siding Experts",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dallasSidingExperts.com",
    siteName: "Dallas Siding Experts",
    title: "Siding Contractors Dallas TX | Siding Installation & Repair",
    description:
      "Professional siding contractors in Dallas TX offering siding installation, repair, replacement, vinyl siding, fiber cement siding, and storm damage repair services. Free estimates available.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siding Contractors Dallas TX | Siding Installation & Repair",
    description:
      "Professional siding contractors in Dallas TX. Free estimates on siding installation, repair & replacement.",
  },
  alternates: {
    canonical: "https://dallasSidingExperts.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Dallas Siding Experts",
              image: "https://dallasSidingExperts.com/logo.png",
              description:
                "Professional siding contractors in Dallas TX offering siding installation, repair, replacement, vinyl siding, fiber cement siding, and storm damage repair services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dallas",
                addressLocality: "Dallas",
                addressRegion: "TX",
                postalCode: "75201",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 32.7767,
                longitude: -96.797,
              },
              url: "https://dallasSidingExperts.com",
              telephone: "+1-214-555-0199",
              priceRange: "$$",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "07:00",
                  closes: "19:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "17:00",
                },
              ],
              areaServed: "Dallas, TX",
              serviceType: [
                "Siding Installation",
                "Siding Repair",
                "Siding Replacement",
                "Vinyl Siding",
                "Fiber Cement Siding",
                "Storm Damage Repair",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
