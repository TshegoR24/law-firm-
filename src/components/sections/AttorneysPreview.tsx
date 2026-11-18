import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { attorneys } from "@/data/attorneys";
import { AttorneyCard } from "./AttorneyCard";

export function AttorneysPreview() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Our team"
              title={<>Meet the People <span className="italic text-gold-deep">Behind the Practice.</span></>}
              intro="Walter Nabane Incorporated is directed by Motlatso Walter Nabane from the firm’s office in Capital Park, Pretoria. Further team profiles will be added as they are confirmed."
            />
            <div className="mt-9">
              <TextLink href="/attorneys">View the team</TextLink>
            </div>
          </div>
          <ul className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            {attorneys.map((attorney, i) => (
              <Reveal as="li" key={attorney.slug} delay={i * 0.1}>
                <AttorneyCard attorney={attorney} />
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
