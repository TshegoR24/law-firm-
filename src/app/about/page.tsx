import { Compass, HeartHandshake, ShieldCheck, Users } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Eyebrow, SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Visual } from "@/components/visuals/Visual";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About the Firm",
  description: "Learn about Nabane Inc (Walter Nabane Incorporated), a legal and advisory practice in Pretoria: our philosophy, approach and professional standards.",
  path: "/about",
});

const approach = [
  { icon: Users, title: "Listen first", text: "We start by understanding your circumstances, priorities and concerns before recommending a course of action." },
  { icon: Compass, title: "Explain clearly", text: "Legal processes can be unfamiliar. We explain the steps, the timelines and the options in plain language." },
  { icon: ShieldCheck, title: "Act carefully", text: "Documents are reviewed with attention to detail, and risks are identified early, when they are easiest to address." },
  { icon: HeartHandshake, title: "Stay in touch", text: "You receive regular updates and a clear point of contact for every stage of your matter." },
];

const standards = [
  "Work is carried out with the diligence, honesty and confidentiality expected of the profession.",
  "Client funds and documents are handled with care and in accordance with professional rules.",
  "Fees and likely costs are discussed openly, so there are no surprises.",
  "Conflicts of interest are identified and addressed before work begins.",
  "Advice is tailored to your circumstances and always in your best interests.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={<>Established Judgement. <span className="italic text-gold-light">A Personal Approach.</span></>}
        intro="Nabane Inc, also known as Walter Nabane Incorporated, is a legal and advisory practice in Pretoria, directed by Motlatso Walter Nabane."
        image={IMG.aboutHero}
        crumbs={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]}
      />

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <Reveal>
            <Eyebrow className="mb-7">Introduction</Eyebrow>
            <h2 className="text-[2.4rem] font-medium leading-[1.05] text-navy sm:text-5xl">
              Legal guidance built on <span className="italic text-gold-deep">understanding.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-base leading-[1.85] text-grey-dark sm:text-lg">
            <p className="font-serif text-[1.65rem] leading-snug text-navy sm:text-[1.9rem]">
              Legal matters touching a family, a livelihood or a loved one’s estate are among the most significant a person will face. They deserve calm, careful and considered attention.
            </p>
            <p>
              We combine professional legal knowledge with a personal approach, guiding clients through the administration of deceased estates, family law matters, Road Accident Fund and personal injury claims, labour matters and litigation. Our work is shaped by a simple belief: that clients are best served when they understand where they stand.
            </p>
            <p>
              From our office in Capital Park, Pretoria, we support individuals and families with practical advice and dependable follow-through.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-deep py-28 text-white sm:py-40">
        <div className="absolute inset-0 -z-20 opacity-80">
          <Visual {...IMG.aboutHall} sizes="100vw" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/65" />
        <Container className="text-center">
          <Eyebrow tone="light" className="mb-8 justify-center">Our philosophy</Eyebrow>
          <blockquote className="mx-auto max-w-4xl font-serif text-[2rem] font-normal italic leading-[1.2] sm:text-5xl lg:text-[3.4rem]">
            “Good legal work is quiet, thorough and dependable — and it leaves clients feeling informed, not overwhelmed.”
          </blockquote>
          <p className="mt-8 text-[0.72rem] uppercase tracking-[0.26em] text-gold">Guiding principle · Demonstration copy</p>
        </Container>
      </section>

      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Our approach" title={<>How we <span className="italic text-gold-deep">work with you.</span></>} />
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08} className="border-t border-navy/20 pt-8">
                <item.icon className="h-8 w-8 text-gold-deep" strokeWidth={1.25} aria-hidden="true" />
                <h3 className="mt-7 text-[1.6rem] font-medium text-navy">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-dark">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <Container className="grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy-deep lg:sticky lg:top-32">
            <Visual {...IMG.about} variant={1} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div>
            <SectionHeading eyebrow="Professional standards" title={<>The standards we <span className="italic text-gold-deep">hold ourselves to.</span></>} />
            <ul className="mt-10 divide-y divide-navy/15 border-y border-navy/15">
              {standards.map((s, i) => (
                <li key={s} className="flex gap-5 py-5 text-[0.98rem] leading-relaxed text-grey-dark">
                  <span aria-hidden="true" className="font-serif text-2xl leading-none text-gold-deep">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-14">
              <Eyebrow className="mb-5">Service commitment</Eyebrow>
              <p className="text-base leading-[1.85] text-grey-dark sm:text-lg">
                We commit to responding promptly, explaining each stage of your matter and keeping you informed of progress. If something changes, you will hear it from us first.
              </p>
              <div className="mt-9">
                <Button href="/contact" variant="navy">Contact the Firm</Button>
              </div>
            </div>
            <DemoNotice className="mt-12">
              Demonstration copy: the wording on this page is illustrative and pending the firm’s review. No claims of experience, awards or credentials are made.
            </DemoNotice>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
