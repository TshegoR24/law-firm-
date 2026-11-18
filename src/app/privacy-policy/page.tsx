import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Sample privacy policy template for the Nabane Inc demonstration website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      path="/privacy-policy"
      intro="How personal information would be handled on a live version of this website."
      sections={[
        { heading: "Demonstration website", body: ["This website is a design prototype. The consultation form does not transmit or store any information, and no personal information is collected through it."] },
        { heading: "Information a live website would collect", body: ["A live website for a law firm would typically collect the details a visitor chooses to submit, such as name, contact details and a brief description of their enquiry, in order to respond to that enquiry."] },
        { heading: "Protection of personal information", body: ["The firm’s final policy should describe how personal information is processed, secured and retained in line with the Protection of Personal Information Act, 2013 (POPIA), and explain the rights of data subjects."] },
        { heading: "Contact", body: ["The responsible party’s details and its information officer’s contact details will be inserted here once confirmed by the firm."] },
      ]}
    />
  );
}
