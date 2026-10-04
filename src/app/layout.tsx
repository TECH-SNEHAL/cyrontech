import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const SITE_URL = "https://cyrontech.in";

// Organization + WebSite structured data, present on every page. Scoped to
// what's actually verifiable — no fabricated address/city, so this stays a
// generic Organization rather than a LocalBusiness with invented geo data.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cyron Tech",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Cyron Tech builds websites, mobile apps, CRMs, and automation designed around how your business actually works.",
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
  name: "Cyron Tech",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
