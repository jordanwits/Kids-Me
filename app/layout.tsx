import type { Metadata, Viewport } from "next";
import { Fredoka, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

/* Rockford Sans (brand sheet) has no web licence, so the type system stands in
   with the closest free relatives: Fredoka carries the logo's rounded geometric
   letterforms, Outfit matches the "PRESCHOOL" wordmark for UI + body. */
const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reddingpreschools.com"),
  title: "Kids & Me Preschool | Preschool & Daycare in Redding, CA",
  description:
    "Licensed preschool and daycare in Redding, California since 1978. Ages 2–6, full and half day, nutritious meals, a shady playground and a two-story indoor playhouse. Tour any weekday, no appointment needed.",
  openGraph: {
    title: "Kids & Me Preschool | Redding, CA",
    description:
      "Come see the happiest kids in Redding. Licensed preschool & daycare for ages 2–6, serving Redding families since 1978.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/kids-me-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#FDF7F0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Preschool",
    name: site.name,
    telephone: site.phone.label,
    email: site.email.label,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
    },
    openingHours: "Mo-Fr 07:00-17:30",
    foundingDate: String(site.established),
  };

  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${outfit.variable} ${caveat.variable}`}
    >
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
