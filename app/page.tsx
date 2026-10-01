import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { HeroSection } from "@/sections/hero/HeroSection";
import { OriginSection } from "@/sections/origin/OriginSection";
import { MenuSection } from "@/sections/menu/MenuSection";
import { ReservationSection } from "@/sections/reservation/ReservationSection";
import { VisitSection } from "@/sections/visit/VisitSection";
import { siteConfig } from "@/lib/site-config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  servesCuisine: ["Peruana", "Ancashina"],
  telephone: siteConfig.phoneDisplay,
  address: { "@type": "PostalAddress", streetAddress: siteConfig.address.line, addressLocality: siteConfig.address.city },
  acceptsReservations: true,
  url: siteConfig.url,
};

export default function Home() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <HeroSection />
        <OriginSection />
        <MenuSection />
        <ReservationSection />
        <VisitSection />
      </main>
      <Footer />
      <MobileActionBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
