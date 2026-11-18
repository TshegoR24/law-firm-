import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Portrait } from "@/components/visuals/Portrait";
import { attorneys, getAttorney } from "@/data/attorneys";
import { IMG } from "@/lib/images";
import { breadcrumbJsonLd, buildMetadata, jsonLd } from "@/lib/seo";

/**
 * Every valid slug is prerendered by generateStaticParams; unknown slugs 404.
 * Navigation to these routes therefore never waits on dynamic data.
 */
export const instant = false;

export function generateStaticParams() {
  return attorneys.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/attorneys/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const attorney = getAttorney(slug);
  if (!attorney) return {};
  return buildMetadata({
    title: `${attorney.name} — ${attorney.designation}`,
    description: attorney.shortBio,
    path: `/attorneys/${attorney.slug}`,
  });
}

export default async function AttorneyPage(props: PageProps<"/attorneys/[slug]">) {
  const { slug } = await props.params;
  const attorney = getAttorney(slug);
  if (!attorney) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Our Team", href: "/attorneys" },
    { name: attorney.name, href: `/attorneys/${attorney.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(crumbs)) }} />
      <PageHero
        eyebrow={`${attorney.designation} · ${attorney.practiceArea}`}
        title={attorney.name}
        intro={attorney.shortBio}
        image={IMG.attorneysHero}
        crumbs={crumbs}
        size="compact"
      />

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.4fr] lg:gap-24">
          <Reveal className="mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-deep">
              <Portrait name={attorney.name} tone={attorney.tone} />
              <span className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-navy">Photograph to follow</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow className="mb-7">Biography</Eyebrow>
            <div className="space-y-6 text-base leading-[1.85] text-grey-dark sm:text-lg">
              {attorney.fullBio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h2 className="mt-12 text-[2rem] text-navy">Areas of focus</h2>
            <ul className="mt-5 space-y-3.5">
              {attorney.focus.map((f) => (
                <li key={f} className="flex gap-3.5 text-[0.98rem] text-grey-dark">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button
                href={attorney.practiceAreaSlug ? `/consultation?service=${attorney.practiceAreaSlug}` : "/consultation"}
                variant="navy"
              >
                Request a Consultation
              </Button>
              <Button
                href={attorney.practiceAreaSlug ? `/practice-areas/${attorney.practiceAreaSlug}` : "/practice-areas"}
                variant="outline-dark"
                arrow={false}
              >
                {attorney.practiceAreaSlug ? attorney.practiceArea : "Our Practice Areas"}
              </Button>
            </div>
            <DemoNotice className="mt-12">
              Profile in progress: no qualifications or experience are stated here until they are supplied and approved by the firm.
            </DemoNotice>
          </Reveal>
        </Container>
      </section>

      <CtaBand service={attorney.practiceAreaSlug} />
    </>
  );
}
