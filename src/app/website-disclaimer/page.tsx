import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Disclaimer",
  description: "Website disclaimer for the Nabane Inc demonstration website: sample content, no legal advice, no attorney-client relationship.",
  path: "/website-disclaimer",
});

export default function WebsiteDisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Website Disclaimer"
      path="/website-disclaimer"
      intro="Important information about the nature and limits of this website."
      sections={[
        { heading: "Demonstration prototype", body: ["This website is a design demonstration prepared by Techsphere Solutions for Nabane Inc (Walter Nabane Incorporated). Firm details are as supplied; articles and page wording are illustrative sample content pending review by the firm."] },
        { heading: "No legal advice", body: ["Nothing on this website constitutes legal advice. Articles and descriptions provide general information only and may not reflect the law as it currently stands. Always seek advice from a qualified attorney about your own circumstances."] },
        { heading: "No attorney-client relationship", body: ["Browsing this website, using the demonstration form or sending a message does not create an attorney-client relationship."] },
        { heading: "Accuracy", body: ["Content is illustrative and pending attorney review. No warranty is given as to its accuracy, completeness or suitability."] },
      ]}
    />
  );
}
