import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import Portfolio from "./portfolio";

const mono = DM_Mono({
  // the two weights the page uses: each weight is a separate file
  weight: ["400", "500"],
  variable: "--font-pf-mono",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-pf-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://cyrontech.in";
const TITLE = "Vijay Snehal · Software Engineer";
const DESCRIPTION =
  "Vijay Snehal — software engineer building Flutter, Supabase and web products for businesses.";
// The site's share image (src/app/opengraph-image.tsx). A page that sets its own openGraph
// block does not inherit it, so it is named here.
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Cyron Tech — Software Development Agency",
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/developers" },
  // Without these the page would be shared with the home page's title and address.
  openGraph: {
    type: "profile",
    url: "/developers",
    siteName: "Cyron Tech",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    firstName: "Vijay",
    lastName: "Snehal",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

// Tells search engines this page is about a person, and who: only what the page itself states.
const PROFILE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/developers#profile`,
  url: `${SITE_URL}/developers`,
  name: TITLE,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/developers#vijay-snehal`,
    name: "Vijay Snehal",
    givenName: "Vijay",
    familyName: "Snehal",
    jobTitle: "Software Engineer",
    description: DESCRIPTION,
    url: `${SITE_URL}/developers`,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [
      "Flutter",
      "Dart",
      "Supabase",
      "PostgreSQL",
      "React",
      "Next.js",
      "TypeScript",
      "Mobile app development",
      "Web development",
    ],
  },
};

export default function DevelopersPage() {
  return (
    <div className={`${mono.variable} ${sans.variable}`}>
      <script
        type="application/ld+json"
        // well-formed JSON with no user input; `<` is escaped as in the root layout
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <Portfolio />
    </div>
  );
}
