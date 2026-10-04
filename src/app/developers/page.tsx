import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import Portfolio from "./portfolio";

const mono = DM_Mono({
  weight: ["300", "400", "500"],
  variable: "--font-pf-mono",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-pf-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Vijay Snehal · Software Engineer" },
  description:
    "Vijay Snehal — software engineer building Flutter, Supabase and web products for businesses.",
  alternates: { canonical: "/developers" },
};

export default function DevelopersPage() {
  return (
    <div className={`${mono.variable} ${sans.variable}`}>
      <Portfolio />
    </div>
  );
}
