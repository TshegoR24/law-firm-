import { Reveal } from "@/components/ui/Reveal";
import type { PracticeService } from "@/data/practice-areas";

export function ServiceGrid({ services }: { services: PracticeService[] }) {
  return (
    <ul className="grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal as="li" key={service.title} delay={(i % 3) * 0.08} className="group bg-white p-8 transition-colors duration-500 hover:bg-ivory lg:p-10">
          <service.icon className="h-8 w-8 text-gold-deep" strokeWidth={1.25} aria-hidden="true" />
          <h3 className="mt-8 text-[1.55rem] font-medium leading-tight text-navy">{service.title}</h3>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-grey-dark">{service.description}</p>
        </Reveal>
      ))}
    </ul>
  );
}
