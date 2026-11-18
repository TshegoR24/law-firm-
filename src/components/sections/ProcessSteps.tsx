import { Reveal } from "@/components/ui/Reveal";
import type { ProcessStep } from "@/data/practice-areas";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 0.1} className="relative border-t border-white/20 pt-8">
          <span aria-hidden="true" className="absolute -top-px left-0 h-px w-14 bg-gold" />
          <span className="font-serif text-6xl font-light leading-none text-gold/90">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 text-[1.5rem] font-medium leading-tight text-white">{step.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
