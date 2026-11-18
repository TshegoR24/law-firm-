import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Visual } from "@/components/visuals/Visual";
import type { VisualProps } from "@/lib/images";
import type { Crumb } from "@/lib/seo";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image: VisualProps;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  size?: "default" | "compact";
}

/** Consistent dark editorial header used on every interior page. */
export function PageHero({ eyebrow, title, intro, image, crumbs, children, size = "default" }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep text-white">
      <div className="kenburns absolute inset-0 -z-20">
        <Visual {...image} priority sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/25" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-deep/90 to-transparent" />
      <Container className={size === "compact" ? "pb-16 pt-36 sm:pb-20 sm:pt-44" : "pb-20 pt-40 sm:pb-28 sm:pt-52 lg:pb-32"}>
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <div className="max-w-3xl">
          <Eyebrow tone="light" className="rise rise-1 mb-6">{eyebrow}</Eyebrow>
          <h1 className="rise rise-2 text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.5rem]">{title}</h1>
          {intro && <p className="rise rise-3 mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>}
          {children && <div className="rise rise-4 mt-10 flex flex-wrap gap-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
