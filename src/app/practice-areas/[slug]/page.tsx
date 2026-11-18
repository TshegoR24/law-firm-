import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Button, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Eyebrow, SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Visual } from "@/components/visuals/Visual";
import { practiceAreas } from "@/data/practice-areas";
import { breadcrumbJsonLd, buildMetadata, jsonLd } from "@/lib/seo";

/**
 * Every valid slug is prerendered by generateStaticParams; unknown slugs 404.
 * Navigation to these routes therefore never waits on dynamic data.
 */
export const instant = false;

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return buildMetadata({ title: area.title, description: area.metaDescription, path: `/practice-areas/${area.slug}` });
}

export default async function PracticeAreaPage(props: PageProps<"/practice-areas/[slug]">) {
  const { slug } = await props.params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const others = practiceAreas.filter((a) => a.slug !== area.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Practice Areas", href: "/practice-areas" },
    { name: area.title, href: `/practice-areas/${area.slug}` },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }} />

      <PageHero eyebrow="Practice area" title={area.title} intro={area.heroIntro} image={area.image} crumbs={crumbs}>
        <Button href={`/consultation?service=${area.consultationValue}`} size="lg">Request a Consultation</Button>
      </PageHero>

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <Reveal>
            <Eyebrow className="mb-7">Overview</Eyebrow>
            <div className="space-y-6">
              <p className="font-serif text-[1.8rem] leading-snug text-navy sm:text-[2.15rem]">{area.lead[0]}</p>
              {area.lead.slice(1).map((p) => (
                <p key={p} className="text-base leading-[1.85] text-grey-dark sm:text-lg">{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside aria-label="At a glance" className="relative bg-navy p-8 text-white sm:p-10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">At a glance</h2>
              <ul className="mt-6 space-y-5">
                {area.glance.map((g) => (
                  <li key={g} className="flex gap-3.5 text-[0.98rem] leading-snug text-white/85">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-9 border-t border-white/15 pt-7">
                <TextLink href={`/consultation?service=${area.consultationValue}`} tone="light">Request a consultation</TextLink>
              </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Services" title={area.servicesHeading} />
          <div className="mt-14">
            <ServiceGrid services={area.services} />
          </div>
          <DemoNotice className="mt-10 max-w-3xl">
            Services are listed for illustration. Where a service is marked “if offered” in the design brief, it has not been confirmed by an actual firm.
          </DemoNotice>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-32">
        <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 opacity-30 lg:block">
          <Visual {...area.cardImage} grain={false} sizes="33vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep to-transparent" />
        </div>
        <Container className="relative">
          <SectionHeading tone="light" eyebrow="Our process" title={area.processHeading} />
          <div className="mt-16">
            <ProcessSteps steps={area.process} />
          </div>
        </Container>
      </section>

      <FaqSection items={area.faqs} />

      <section className="bg-white py-20">
        <Container>
          <Eyebrow className="mb-8">Explore other practice areas</Eyebrow>
          <ul className="grid gap-6 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug} className="group border border-navy/15 p-7 transition-colors duration-300 hover:border-gold hover:bg-ivory">
                <h3 className="text-[1.7rem] font-medium text-navy">{o.title}</h3>
                <p className="mt-2 text-[0.95rem] text-grey-dark">{o.cardSummary}</p>
                <div className="mt-5">
                  <TextLink href={`/practice-areas/${o.slug}`}>Learn more</TextLink>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand service={area.consultationValue} />
    </>
  );
}
