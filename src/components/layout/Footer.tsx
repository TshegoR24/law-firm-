import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { legalNav, primaryNav } from "@/config/navigation";
import { site, whatsappUrl } from "@/config/site";
import { practiceAreas } from "@/data/practice-areas";

const heading = "mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold";
const link = "text-[0.95rem] text-white/70 transition-colors duration-300 hover:text-gold";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.25fr] lg:gap-12 lg:py-24">
        <div>
          <Logo tone="light" />
          <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
            A legal and advisory practice in Pretoria, assisting clients with deceased estates, family law, RAF and personal injury claims, labour matters and litigation.
          </p>
          <p className="mt-6 flex items-start gap-3 text-sm text-white/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
            <span>
              {site.address.oneLine}
            </span>
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className={heading}>Navigate</h2>
          <ul className="space-y-3.5">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/consultation" className={link}>Request a Consultation</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Practice areas">
          <h2 className={heading}>Practice Areas</h2>
          <ul className="space-y-3.5">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link href={`/practice-areas/${area.slug}`} className={link}>{area.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Contact</h2>
          <ul className="space-y-4 text-[0.95rem] text-white/70">
            <li>
              <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-gold">
                <Phone className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" /> {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold" /> WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">{h.days}: {h.time}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-5 py-8 text-[0.8rem] text-white/50 lg:flex-row lg:items-center lg:justify-between">
          <p>© {site.copyrightYear} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">{item.label}</Link>
              </li>
            ))}
          </ul>
          <p className="max-w-xl lg:text-right">
            Demonstration website prototype designed and developed by {site.builder}. Articles are illustrative sample content pending attorney review.
          </p>
        </Container>
      </div>
    </footer>
  );
}
