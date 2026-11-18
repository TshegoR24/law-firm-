import { Suspense } from "react";
import { CalendarCheck, FileText, MessageCircle, ShieldAlert } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { IMG } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a Consultation",
  description: "Request a consultation with Nabane Inc about deceased estates, family law, RAF and personal injury claims, or labour matters. This is a demonstration form; no enquiry is sent.",
  path: "/consultation",
});

const steps = [
  { icon: FileText, title: "Tell us about your matter", text: "Share a brief outline so we can direct your enquiry appropriately." },
  { icon: MessageCircle, title: "We get in touch", text: "We respond using the contact method you prefer." },
  { icon: CalendarCheck, title: "Arrange your consultation", text: "We agree a convenient time to discuss your requirements." },
];

function FormFallback() {
  return <div className="h-[44rem] animate-pulse bg-white/70" aria-hidden="true" />;
}

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Request a consultation"
        title={<>Let’s Discuss <span className="italic text-gold-light">Your Matter.</span></>}
        intro="Complete the short form below and tell us how we can help."
        image={IMG.consultationHero}
        crumbs={[{ name: "Home", href: "/" }, { name: "Request a Consultation", href: "/consultation" }]}
        size="compact"
      />
      <section className="bg-ivory py-16 sm:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <Suspense fallback={<FormFallback />}>
            <ConsultationForm />
          </Suspense>

          <aside aria-label="What to expect" className="space-y-10 lg:sticky lg:top-32">
            <div>
              <h2 className="text-[2rem] text-navy">What happens next</h2>
              <ol className="mt-7 space-y-7">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-deep/50 text-gold-deep">
                      <s.icon className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-[0.98rem] font-semibold tracking-normal text-navy">{i + 1}. {s.title}</h3>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-grey-dark">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex gap-4 border border-navy/15 bg-white p-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-[0.9rem] leading-relaxed text-grey-dark">
                <strong className="font-semibold text-navy">Please note:</strong> submitting an enquiry does not establish an attorney-client relationship. This website is a demonstration prototype and does not transmit enquiries.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
