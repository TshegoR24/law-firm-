import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Visual } from "@/components/visuals/Visual";
import { CONSULTATION_HREF } from "@/config/navigation";
import { IMG } from "@/lib/images";

interface Props {
  title?: React.ReactNode;
  text?: string;
  /** Pre-selects a service on the consultation form. */
  service?: string;
}

export function CtaBand({
  title = "Your Legal Matters Deserve Dedicated Professional Attention.",
  text = "Speak to our team about how we can assist with your legal requirements.",
  service,
}: Props) {
  const href = service ? `${CONSULTATION_HREF}?service=${service}` : CONSULTATION_HREF;
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-white sm:py-32 lg:py-40">
      <div className="absolute inset-0 -z-20 opacity-70">
        <Visual {...IMG.cta} sizes="100vw" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep/90" />
      <Container className="text-center">
        <Eyebrow tone="light" className="mb-8 justify-center">Begin the conversation</Eyebrow>
        <h2 className="mx-auto max-w-4xl text-[2.2rem] font-medium leading-[1.08] sm:text-5xl lg:text-[3.8rem]">{title}</h2>
        <p className="mx-auto mt-7 max-w-xl text-base text-white/75 sm:text-lg">{text}</p>
        <div className="mt-11">
          <Button href={href} size="lg">Request a Consultation</Button>
        </div>
      </Container>
    </section>
  );
}
