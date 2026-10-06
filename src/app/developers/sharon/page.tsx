import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import SharonProfile from "./profile";

const mono = DM_Mono({
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
const TITLE = "Sharon Sunaina Mohan · Project & Client Management";
const DESCRIPTION =
  "Sharon Sunaina Mohan — project management, client relationship management and business operations for Cyron Tech, and an MSc student in AI for Business Intelligence.";
const SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Cyron Tech — Software Development Agency",
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/developers/sharon" },
  openGraph: {
    type: "profile",
    url: "/developers/sharon",
    siteName: "Cyron Tech",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    firstName: "Sharon",
    lastName: "Sunaina Mohan",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [SHARE_IMAGE],
  },
};

// Only what's stated on the page itself — no DOB, address, phone, visa status or similar.
const PROFILE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/developers/sharon#profile`,
  url: `${SITE_URL}/developers/sharon`,
  name: TITLE,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/developers/sharon#sharon-sunaina-mohan`,
    name: "Sharon Sunaina Mohan",
    givenName: "Sharon",
    familyName: "Sunaina Mohan",
    jobTitle: "Project Manager & Client Relationship Management",
    description: DESCRIPTION,
    url: `${SITE_URL}/developers/sharon`,
    image: `${SITE_URL}/team/sharon-sunaina-blue-blazer.png`,
    email: "sharonsunaina7@gmail.com",
    sameAs: [
      "https://linkedin.com/in/sharon7103",
      "https://github.com/Sharonsunaina7",
    ],
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [
      "Project management",
      "Client relationship management",
      "Zoho CRM",
      "Requirements gathering",
      "Feasibility studies",
      "Artificial intelligence for business",
      "Data analysis",
    ],
  },
};

export default function SharonPage() {
  return (
    <div className={`${mono.variable} ${sans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <SharonProfile />
    </div>
  );
}
