import { Clock, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappUrl } from "@/config/site";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: "Contact Nabane Inc (Walter Nabane Incorporated) in Capital Park, Pretoria for deceased estates, family law, RAF and personal injury claims, labour matters and litigation.",
  path: "/contact",
});

const card = "border border-navy/15 bg-white p-8";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={<>Speak to <span className="italic text-gold-light">Our Team.</span></>}
        intro="Visit us in Capital Park, Pretoria. Reach out by telephone or WhatsApp, or request a consultation."
        image={IMG.contactHero}
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
        size="compact"
      >
        <Button href="/consultation" size="lg">Request a Consultation</Button>
      </PageHero>

      <section className="bg-ivory py-20 sm:py-28">
        <Container>
          <DemoNotice className="mb-12 max-w-3xl">
            Contact details are as supplied for this sample. An email address has not been provided yet and will be added once confirmed.
          </DemoNotice>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Reveal className={card}>
              <Phone className="h-6 w-6 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-navy">Telephone</h2>
              <a href={site.contact.phoneHref} className="mt-3 block text-lg text-grey-dark hover:text-gold-deep">{site.contact.phoneDisplay}</a>
            </Reveal>
            <Reveal delay={0.06} className={card}>
              <MapPin className="h-6 w-6 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-navy">Office</h2>
              <address className="mt-3 text-[1.02rem] not-italic leading-relaxed text-grey-dark">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            </Reveal>
            <Reveal delay={0.12} className={card}>
              <WhatsAppIcon className="h-6 w-6 text-gold-deep" />
              <h2 className="mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-navy">WhatsApp</h2>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-3 block text-lg text-grey-dark hover:text-gold-deep">{site.whatsapp.display}</a>
            </Reveal>
            <Reveal delay={0.18} className={card}>
              <Clock className="h-6 w-6 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-navy">Business hours</h2>
              <dl className="mt-3 space-y-1 text-[0.98rem] text-grey-dark">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt>{h.days}</dt>
                    <dd className="text-navy">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <Eyebrow className="mb-6">Visit our office</Eyebrow>
            <h2 className="text-[2.3rem] font-medium leading-[1.05] text-navy sm:text-5xl">Capital Park, <span className="italic text-gold-deep">Pretoria</span></h2>
            <ul className="mt-10 space-y-8">
              {site.offices.map((o) => (
                <li key={o.city} className="flex gap-5 border-t border-navy/15 pt-7">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.4} aria-hidden="true" />
                  <div>
                    <h3 className="text-[1.7rem] font-medium text-navy">{o.city} office</h3>
                    <p className="text-sm text-grey-dark">{o.region}</p>
                    <p className="mt-2 text-grey-dark">{o.address}</p>
                    <p className="mt-2 text-sm text-grey-dark">{site.accessibility}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="/consultation" variant="navy">Request a Consultation</Button>
            </div>
          </div>

          <figure>
            <div
              role="img"
              aria-label="Map placeholder: an interactive map of the Capital Park, Pretoria office will be added"
              className="relative aspect-[4/3] overflow-hidden border border-navy/15 bg-navy-deep"
            >
              <svg viewBox="0 0 800 600" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
                <rect width="800" height="600" fill="#14263d" />
                <g stroke="#b69a68" strokeOpacity="0.14" strokeWidth="1" fill="none">
                  {Array.from({ length: 14 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 46}H800`} />)}
                  {Array.from({ length: 18 }, (_, i) => <path key={`v${i}`} d={`M${i * 46} 0V600`} />)}
                </g>
                <g stroke="#b69a68" strokeOpacity="0.4" strokeWidth="2" fill="none">
                  <path d="M0 410 C220 380 320 300 440 270 S660 190 800 120" />
                  <path d="M180 600 C230 470 300 380 420 300 S560 130 590 0" strokeOpacity="0.25" />
                  <path d="M0 200 C160 230 300 250 430 280 S650 400 800 430" strokeOpacity="0.22" />
                </g>
                <g>
                  <circle cx="590" cy="150" r="9" fill="#b69a68" />
                  <circle cx="590" cy="150" r="22" fill="none" stroke="#b69a68" strokeOpacity="0.5" />
                  <text x="612" y="144" fill="#fff" fontFamily="Inter, sans-serif" fontSize="15" letterSpacing="3">CAPITAL PARK, PRETORIA</text>
                </g>
              </svg>
              <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-navy">Map placeholder</span>
            </div>
            <figcaption className="mt-4 text-sm text-grey-dark">
              Illustrative schematic only — not to scale. An interactive map will be added before launch.
            </figcaption>
          </figure>
        </Container>
      </section>
    </>
  );
}
