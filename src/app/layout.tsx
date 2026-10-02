import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://cyrontech.in"),
  title: {
    default: "Cyron Tech — Websites, Apps, CRMs & Automation",
    template: "%s | Cyron Tech",
  },
  description:
    "Cyron Tech builds websites, mobile apps, CRMs, and automation designed around how your business actually works.",
  openGraph: {
    type: "website",
    url: "https://cyrontech.in",
    siteName: "Cyron Tech",
    title: "Cyron Tech — Websites, Apps, CRMs & Automation",
    description:
      "Websites, mobile apps, CRMs, and automation designed around how your business actually works.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
