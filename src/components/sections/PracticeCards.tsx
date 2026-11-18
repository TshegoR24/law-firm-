import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Visual } from "@/components/visuals/Visual";
import { practiceAreas } from "@/data/practice-areas";
import { cx } from "@/lib/format";

export function PracticeCards({ stagger = true }: { stagger?: boolean }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
      {practiceAreas.map((area, i) => (
        <Reveal as="li" key={area.slug} delay={i * 0.12} className={cx(stagger && i % 2 === 1 && "xl:translate-y-12")}>
          <article className="group relative flex h-full flex-col bg-white shadow-[0_30px_60px_-40px_rgba(20,38,61,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-36px_rgba(20,38,61,0.6)]">
            <div className="relative aspect-[4/3.4] overflow-hidden bg-navy-deep">
              <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.06]">
                <Visual {...area.cardImage} sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent" />
              <span className="absolute left-6 top-5 font-serif text-5xl font-light text-white/90" aria-hidden="true">0{i + 1}</span>
            </div>
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.3em] text-gold-deep">{area.label}</h3>
              <p className="mt-4 flex-1 font-serif text-[1.4rem] leading-snug text-navy">{area.cardSummary}</p>
              <Link
                href={`/practice-areas/${area.slug}`}
                className="mt-7 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy after:absolute after:inset-0 after:content-['']"
              >
                <span className="border-b border-gold pb-1 transition-colors group-hover:border-navy">Learn more</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
