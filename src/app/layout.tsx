import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { LenisScroll } from "@/components/lenis-scroll";

const SITE_URL = "https://cyrontech.in";

// Organization + WebSite structured data, present on every page. Scoped to
// what's actually verifiable — no fabricated address/city, so this stays a
// generic Organization rather than a LocalBusiness with invented geo data.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cyron Tech",
  // the other ways the name is written, so a search for any of them finds the site
  alternateName: ["Cyrontech", "CyronTech"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  description:
    "Cyron Tech builds websites, mobile apps, CRMs, and automation designed around how your business actually works.",
  // what the company builds, as listed in the Services section
  knowsAbout: [
    "Website development",
    "Mobile app development",
    "Android and iOS apps",
    "CRM development",
    "Business automation",
    "Desktop applications",
    "Custom software development",
  ],
  email: "contact@cyrontech.in",
  sameAs: [
    "https://www.linkedin.com/in/sharon7103",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@cyrontech.in",
      telephone: "+91-94919-90628",
      areaServed: "IN",
      availableLanguage: ["English"],
    },
  ],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  // Google takes the site name it shows above a result from `name` and `alternateName` here
  name: "Cyron Tech",
  alternateName: ["Cyrontech", "CyronTech", "cyrontech.in"],
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  // Only a few small labels far down the home page use it, and /developers does not use it
  // at all, so it is fetched when it is needed, not ahead of the first screen.
  preload: false,
});

const TITLE = "Cyron Tech — Software Development Agency";
const DESCRIPTION =
  "Cyron Tech builds websites, mobile apps, CRMs, and automation designed around how your business actually works.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Cyron Tech",
  },
  description: DESCRIPTION,
  keywords: [
    "Cyron Tech",
    "website development",
    "mobile app development",
    "CRM development",
    "business automation",
    "custom software development India",
  ],
  authors: [{ name: "Cyron Tech", url: SITE_URL }],
  creator: "Cyron Tech",
  publisher: "Cyron Tech",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cyron Tech",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // JSON.stringify output is well-formed JSON with no user input, but
          // the `<` escape is cheap insurance against it ever being misread
          // as the start of a closing tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_JSON_LD).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Transitions are switched off during a theme change by the toggle itself (see
            ThemeToggle). The provider's own option for that also runs as every page opens. */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LenisScroll />
          {children}
          <SmoothCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
