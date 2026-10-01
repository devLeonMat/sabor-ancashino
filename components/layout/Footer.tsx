import { siteConfig } from "@/lib/site-config";
import { navigation } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-ink px-5 pt-16 pb-28 sm:px-8 md:pb-12 lg:px-[6vw]">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-[-0.04em] text-cream">
            Sabor <span className="italic text-maiz">Ancashino</span>
          </p>
          <p className="mt-4 max-w-sm text-sm text-cream-2">{siteConfig.tagline}. Desde Carhuaz, Áncash.</p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-2">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-cream">
              {item.label}
            </a>
          ))}
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            Instagram
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            Facebook
          </a>
        </nav>
      </div>
      <p className="mt-12 text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.name}. Fotografías provisionales.
      </p>
    </footer>
  );
}
