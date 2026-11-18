import { CtaBand } from "@/components/sections/CtaBand";
import { AttorneyCard } from "@/components/sections/AttorneyCard";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Reveal } from "@/components/ui/Reveal";
import { attorneys } from "@/data/attorneys";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team",
  description: "Meet the team at Nabane Inc (Walter Nabane Incorporated), a legal and advisory practice in Capital Park, Pretoria.",
  path: "/attorneys",
});

export default function AttorneysPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={<>Meet the People <span className="italic text-gold-light">Behind the Practice.</span></>}
        intro="Guidance delivered with patience, clarity and a genuine interest in your outcome."
        image={IMG.attorneysHero}
        crumbs={[{ name: "Home", href: "/" }, { name: "Our Team", href: "/attorneys" }]}
      />
      <section className="bg-ivory py-24 sm:py-32">
        <Container>
          <DemoNotice className="max-w-3xl">
            Profile in progress: only details supplied by the firm are shown. Biographies, qualifications and photography will be added once confirmed.
          </DemoNotice>
          <ul className="mt-14 max-w-sm space-y-14">
            {attorneys.map((attorney, i) => (
              <Reveal as="li" key={attorney.slug} delay={i * 0.1}>
                <AttorneyCard attorney={attorney} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
