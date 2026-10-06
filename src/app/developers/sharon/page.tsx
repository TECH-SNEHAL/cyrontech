import type { Metadata } from "next";
import { Profile } from "./profile";

const SITE_URL = "https://cyrontech.in";
const TITLE = "Sharon Sunaina Mohan · Business & CRM";
const DESCRIPTION =
  "Sharon Sunaina Mohan — client requirements, feasibility studies, and CRM operations for Cyron Tech, and an MSc student in AI for Business Intelligence.";
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
    jobTitle: "Business & CRM",
    description: DESCRIPTION,
    url: `${SITE_URL}/developers/sharon`,
    email: "sharonsunaina7@gmail.com",
    sameAs: [
      "https://linkedin.com/in/sharon7103",
      "https://github.com/Sharonsunaina7",
    ],
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [
      "CRM operations",
      "Zoho CRM",
      "Client requirements gathering",
      "Feasibility studies",
      "Artificial intelligence for business",
      "Data analysis",
    ],
  },
};

export default function SharonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <Profile />
    </>
  );
}
