import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Portrait } from "@/components/visuals/Portrait";
import type { Attorney } from "@/data/attorneys";

export function AttorneyCard({ attorney }: { attorney: Attorney }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-premium)] group-hover:scale-[1.04]">
          <Portrait name={attorney.name} tone={attorney.tone} />
        </div>
        <span className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-navy">Photograph to follow</span>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
      </div>
      <div className="flex flex-1 flex-col pt-7">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-gold-deep">{attorney.practiceArea}</p>
        <h3 className="mt-3 text-[2rem] font-medium leading-tight text-navy">{attorney.name}</h3>
        <p className="mt-1 text-sm text-grey-dark">{attorney.designation}</p>
        <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-grey-dark">{attorney.shortBio}</p>
        <Link
          href={`/attorneys/${attorney.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy after:absolute after:inset-0 after:content-[''] hover:text-gold-deep"
        >
          View Profile
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
