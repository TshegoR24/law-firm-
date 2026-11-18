import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Visual } from "@/components/visuals/Visual";
import { CONSULTATION_HREF } from "@/config/navigation";
import { IMG } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-deep text-white lg:items-center">
      <div className="kenburns absolute inset-x-0 top-0 -z-20 h-[66%] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-full">
        <Visual {...IMG.hero} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep from-45% via-navy-deep/70 via-62% to-navy-deep/0 lg:hidden" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 hidden w-[72%] bg-gradient-to-r from-navy-deep from-35% via-navy-deep/80 via-60% to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-48 bg-gradient-to-t from-navy-deep/80 to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-deep/70 to-transparent" />

      <Container className="pb-28 pt-40 sm:pb-32 lg:pb-24 lg:pt-44">
        <div className="max-w-[56rem]">
          <p className="rise rise-1 mb-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-gold sm:text-[0.72rem] sm:tracking-[0.3em]">
            <span aria-hidden="true" className="h-px w-10 bg-gold/70" />
            <span>Estates</span>
            <span aria-hidden="true" className="text-gold/50">|</span>
            <span>Family Law</span>
            <span aria-hidden="true" className="text-gold/50">|</span>
            <span>RAF &amp; Injury</span>
            <span aria-hidden="true" className="text-gold/50">|</span>
            <span>Labour &amp; Litigation</span>
          </p>

          <h1 className="rise rise-2 text-[2.85rem] font-medium leading-[0.98] tracking-[-0.015em] sm:text-7xl lg:text-[4.6rem] xl:text-[5.1rem]">
            Protecting Your Interests.
            <span className="mt-1 block font-normal italic text-gold-light">Securing Your Future.</span>
          </h1>

          <p className="rise rise-3 mt-8 max-w-xl text-[1.02rem] leading-relaxed text-white/80 sm:text-lg">
            Legal representation and advisory services for deceased estates, family law, Road Accident Fund and personal injury claims, labour matters and litigation. Professional expertise, personal attention and a commitment to protecting what matters.
          </p>

          <div className="rise rise-4 mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={CONSULTATION_HREF} size="lg">Request a Consultation</Button>
            <Button href="/practice-areas" variant="outline-light" size="lg" arrow={false}>Explore Our Services</Button>
          </div>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-navy-deep/40 backdrop-blur-sm lg:block">
        <Container className="flex items-center justify-between py-5 text-[0.7rem] uppercase tracking-[0.26em] text-white/65">
          <span className="flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> Capital Park, Pretoria
          </span>
          <span>Demonstration website concept</span>
        </Container>
      </div>
    </section>
  );
}
