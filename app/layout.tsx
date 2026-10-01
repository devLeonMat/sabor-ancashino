import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/lib/site-config";
import { media } from "@/data/media";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Cocina ancashina hecha como en casa`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Sabores de nuestra tierra`,
    description: siteConfig.description,
    images: [{ url: media.heroDish.src, alt: media.heroDish.alt }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#120d0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-svh">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
