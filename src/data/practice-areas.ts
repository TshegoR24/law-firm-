import {
  Baby,
  Briefcase,
  Car,
  ClipboardList,
  FileCheck2,
  FileSignature,
  Gavel,
  Handshake,
  HeartHandshake,
  Landmark,
  Scale,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { IMG, type VisualProps } from "@/lib/images";

export interface PracticeService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PracticeArea {
  slug:
    | "deceased-estates"
    | "family-law"
    | "road-accident-fund-claims"
    | "labour-law-litigation";
  title: string;
  /** Upper-case label used on cards. */
  label: string;
  cardSummary: string;
  metaDescription: string;
  heroIntro: string;
  lead: string[];
  glance: string[];
  servicesHeading: string;
  services: PracticeService[];
  processHeading: string;
  process: ProcessStep[];
  faqs: Faq[];
  image: VisualProps;
  cardImage: VisualProps;
  consultationValue: string;
}

/**
 * Practice areas reflect the services publicly listed for Nabane Inc
 * (Walter Nabane Incorporated): administration of estates, family law,
 * labour matters, RAF claims, personal injury claims and litigation.
 * All descriptive copy is general information, drafted for demonstration
 * and pending review by the firm. It is not legal advice.
 */
export const practiceAreas: PracticeArea[] = [
  {
    slug: "deceased-estates",
    title: "Deceased Estates",
    label: "DECEASED ESTATES",
    cardSummary:
      "Compassionate and professional assistance with the administration of deceased estates and related legal matters.",
    metaDescription:
      "Deceased estate administration in Pretoria: reporting estates to the Master, executor assistance, liquidation and distribution, and guidance for families. Demonstration content.",
    heroIntro:
      "Patient, orderly assistance for families and executors at a difficult time — from reporting the estate to the final distribution.",
    lead: [
      "Losing a loved one is hard enough without the added weight of unfamiliar legal and administrative obligations. Estate administration follows a defined process, and following it carefully helps to protect both the deceased's wishes and the family's interests.",
      "Nabane Inc assists families and executors with the administration of estates, aiming to explain each step clearly, deal with the formalities and keep beneficiaries informed along the way.",
    ],
    glance: [
      "Estate administration and executor support",
      "Dealings with the Master of the High Court",
      "Sensitive, unhurried communication",
    ],
    servicesHeading: "How we can assist",
    services: [
      {
        icon: ClipboardList,
        title: "Estate Administration",
        description:
          "Assistance with administering an estate from start to finish: identifying assets and liabilities, dealing with creditors and preparing the accounts the process requires.",
      },
      {
        icon: Landmark,
        title: "Reporting the Estate",
        description:
          "Help with reporting a deceased estate to the Master of the High Court and assembling the documents the Master generally requires.",
      },
      {
        icon: Scale,
        title: "Executor Assistance",
        description:
          "Support for executors who are unsure of their duties, including appointment, Letters of Executorship and ongoing statutory obligations.",
      },
      {
        icon: Users,
        title: "Estate Distribution",
        description:
          "Preparation of the liquidation and distribution account and distribution of the estate to heirs and beneficiaries in line with the will or the law.",
      },
      {
        icon: ScrollText,
        title: "Wills & Intestate Estates",
        description:
          "Guidance where a will exists and where one does not, so that families understand who may inherit and what is expected of them.",
      },
      {
        icon: Handshake,
        title: "Family Guidance",
        description:
          "Clear, kind explanations for family members who simply need to understand what happens next and what is expected of them.",
      },
    ],
    processHeading: "How estate administration typically proceeds",
    process: [
      {
        title: "First conversation",
        description:
          "We establish whether a will exists, who the likely heirs are and which documents are available.",
      },
      {
        title: "Reporting & appointment",
        description:
          "The estate is reported to the Master and the executor is appointed and issued with the necessary authority.",
      },
      {
        title: "Administration",
        description:
          "Assets are secured and valued, debts are dealt with and the liquidation and distribution account is prepared.",
      },
      {
        title: "Distribution & finalisation",
        description:
          "Once the account has been dealt with, the estate is distributed to beneficiaries and the matter is finalised.",
      },
    ],
    faqs: [
      {
        question: "What should I do first when someone dies?",
        answer:
          "After the immediate practical matters, such as obtaining the death certificate, it is advisable to locate any will and speak to an attorney about reporting the estate. Early guidance helps you meet deadlines and avoid avoidable mistakes.",
      },
      {
        question: "What happens if there is no will?",
        answer:
          "If someone dies without a valid will, the estate is generally distributed according to the rules of intestate succession. The Master of the High Court oversees the process and an executor is appointed. The position can depend on the family circumstances.",
      },
      {
        question: "Do I have to use an attorney to administer an estate?",
        answer:
          "Executors are not always required to use an attorney, but estate administration involves precise legal and administrative steps. Many families prefer professional assistance so that procedures are followed correctly.",
      },
      {
        question: "Who is the executor of an estate?",
        answer:
          "An executor is the person authorised by the Master of the High Court to administer the estate. This may be someone named in the will or, where there is no will, a person the Master appoints. The executor is generally issued with Letters of Executorship or a Letter of Authority.",
      },
    ],
    image: IMG.estates,
    cardImage: IMG.estatesCard,
    consultationValue: "deceased-estates",
  },
  {
    slug: "family-law",
    title: "Family Law",
    label: "FAMILY LAW",
    cardSummary:
      "Respectful, practical guidance on family matters, from divorce and maintenance to the care of children.",
    metaDescription:
      "Family law guidance in Pretoria: divorce, maintenance, care and contact with children, and related family matters. Demonstration content.",
    heroIntro:
      "Sensitive, clear legal guidance when family circumstances change — with attention to the people involved, and particularly to children.",
    lead: [
      "Family disputes are rarely just legal questions. They involve relationships, finances and, often, children. A calm and well-informed approach can make a difficult period easier to manage.",
      "Nabane Inc assists clients with family law matters, aiming to explain their options in plain language and to resolve matters constructively where that is possible.",
    ],
    glance: [
      "Divorce, maintenance and children's matters",
      "Plain-language explanation of your options",
      "Constructive resolution where possible",
    ],
    servicesHeading: "Family law matters",
    services: [
      {
        icon: HeartHandshake,
        title: "Divorce & Separation",
        description:
          "Advice on the process of ending a marriage, including the consequences for property, finances and children, and how the type of marriage may affect the outcome.",
      },
      {
        icon: FileSignature,
        title: "Settlement Agreements",
        description:
          "Assistance with drafting and reviewing settlement agreements, so that the terms agreed between spouses or parents are clear and workable.",
      },
      {
        icon: Scale,
        title: "Maintenance",
        description:
          "Guidance on claiming, varying or defending maintenance for children or, in appropriate circumstances, a spouse.",
      },
      {
        icon: Baby,
        title: "Care & Contact",
        description:
          "Advice on parental rights and responsibilities, including arrangements for the care of and contact with children, with the child's best interests at the centre.",
      },
      {
        icon: Users,
        title: "Family Disputes",
        description:
          "Measured assistance where disagreements arise, with an emphasis on resolution through discussion before matters are escalated.",
      },
      {
        icon: Gavel,
        title: "Court Applications",
        description:
          "Where a matter cannot be resolved by agreement, assistance with the relevant court process and the documents it involves.",
      },
    ],
    processHeading: "How a family matter typically unfolds",
    process: [
      {
        title: "Initial consultation",
        description:
          "We listen to your circumstances and goals and outline the legal considerations that may apply.",
      },
      {
        title: "Advice & options",
        description:
          "The available options are explained in plain language, along with their likely consequences.",
      },
      {
        title: "Negotiation or application",
        description:
          "Where possible we seek an agreed outcome; where that is not possible, we explain and assist with the court process.",
      },
      {
        title: "Resolution & follow-up",
        description:
          "Agreements or orders are recorded clearly, and we remain available for follow-up questions.",
      },
    ],
    faqs: [
      {
        question: "What do I need to start a divorce?",
        answer:
          "Generally you will need details of your marriage, including the type of marital property regime that applies, and information about your finances and any children. An attorney can explain what is required in your circumstances at an initial consultation.",
      },
      {
        question: "How is child maintenance determined?",
        answer:
          "Maintenance is generally based on the child's reasonable needs and the means of both parents. The specific amount depends on the facts, which is why it is useful to gather information about expenses and income before you seek advice.",
      },
      {
        question: "Can a settlement agreement avoid a lengthy court process?",
        answer:
          "Where both parties can agree on the main issues, a settlement agreement can often reduce the time and cost involved. Whether this is realistic depends on the circumstances, and it is something we can discuss at the first consultation.",
      },
      {
        question: "Who decides arrangements for the children?",
        answer:
          "Parents are encouraged to reach agreement on care and contact. Where they cannot, a court may decide, and the child's best interests are the central consideration.",
      },
    ],
    image: IMG.propertyLaw,
    cardImage: IMG.propertyLawCard,
    consultationValue: "family-law",
  },
  {
    slug: "road-accident-fund-claims",
    title: "RAF & Personal Injury Claims",
    label: "RAF & PERSONAL INJURY",
    cardSummary:
      "Assistance for people injured in road accidents and other incidents, from gathering documents to pursuing a claim.",
    metaDescription:
      "Road Accident Fund and personal injury claims in Pretoria: assistance with documents, claim preparation and pursuing compensation. Demonstration content.",
    heroIntro:
      "Considered assistance for people who have been injured, or who have lost a loved one, in a road accident or other incident.",
    lead: [
      "An injury can disrupt health, income and family life all at once. Claims arising from road accidents and other incidents involve strict procedures and time limits, and the paperwork can be demanding while you are recovering.",
      "Nabane Inc assists clients with Road Accident Fund and personal injury claims, aiming to explain the process clearly and to keep the documents and deadlines in order.",
    ],
    glance: [
      "Road Accident Fund claims",
      "Personal injury claims",
      "Help with documents and time limits",
    ],
    servicesHeading: "Claims we can assist with",
    services: [
      {
        icon: Car,
        title: "Road Accident Fund Claims",
        description:
          "Assistance with claims against the Road Accident Fund for people injured, or dependants of people killed, in road accidents, subject to the requirements of the law.",
      },
      {
        icon: Stethoscope,
        title: "Personal Injury Claims",
        description:
          "Guidance on claims for injuries suffered through another party's conduct, including what must be shown and which documents are generally needed.",
      },
      {
        icon: FileCheck2,
        title: "Medical & Supporting Documents",
        description:
          "Help understanding and gathering the medical reports, accident reports and other records that a claim is generally built on.",
      },
      {
        icon: ClipboardList,
        title: "Claim Preparation & Lodgement",
        description:
          "Preparation and lodgement of claim documents, with attention to the prescribed forms and time limits.",
      },
      {
        icon: Users,
        title: "Claims by Dependants",
        description:
          "Guidance for families who may be entitled to claim after the death of a breadwinner or loved one in an accident.",
      },
      {
        icon: Gavel,
        title: "Litigation Where Necessary",
        description:
          "Where a claim cannot be resolved by agreement, assistance with taking the matter to court.",
      },
    ],
    processHeading: "How a claim typically progresses",
    process: [
      {
        title: "Initial consultation",
        description:
          "We discuss what happened, review the documents you have and explain whether and how a claim may be pursued.",
      },
      {
        title: "Gathering evidence",
        description:
          "Accident, medical and financial records are gathered so that the claim can be properly supported.",
      },
      {
        title: "Lodging & negotiating",
        description:
          "The claim is lodged and we engage with the other side, seeking an agreed outcome where that is appropriate.",
      },
      {
        title: "Resolution",
        description:
          "If a claim is not resolved by agreement, we explain the options, including taking the matter to court.",
      },
    ],
    faqs: [
      {
        question: "Is there a time limit for claiming?",
        answer:
          "Yes. Claims of this kind are generally subject to prescription periods and procedural requirements, and these can be strict. It is advisable to seek advice as early as possible after an accident so that nothing is missed.",
      },
      {
        question: "Which documents should I keep?",
        answer:
          "It is helpful to keep the accident report, any case number, medical records, hospital and treatment accounts, and proof of income. Your attorney can tell you what is needed for your particular claim.",
      },
      {
        question: "Can family members claim if someone dies in an accident?",
        answer:
          "In some circumstances, dependants of a person killed in an accident may be entitled to claim, for example for loss of support. Whether a claim is possible depends on the facts and the requirements of the law.",
      },
      {
        question: "Do I need to pay anything upfront?",
        answer:
          "Fee arrangements differ from matter to matter and are something to confirm with the firm directly. This demonstration does not set out any fee terms.",
      },
    ],
    image: IMG.conveyancing,
    cardImage: IMG.conveyancingCard,
    consultationValue: "road-accident-fund-claims",
  },
  {
    slug: "labour-law-litigation",
    title: "Labour Law & Litigation",
    label: "LABOUR LAW & LITIGATION",
    cardSummary:
      "Advice and representation in workplace disputes and in civil litigation where a matter cannot be resolved by agreement.",
    metaDescription:
      "Labour law and litigation services in Pretoria: workplace disputes, CCMA and Labour Court matters, and civil litigation. Demonstration content.",
    heroIntro:
      "Clear advice for employers and employees facing workplace disputes, and steady representation when a matter has to go to court.",
    lead: [
      "Workplace disputes can be stressful for everyone involved, and they are governed by procedures and time limits that are easy to overlook. Early, well-informed advice often makes a real difference to how a matter unfolds.",
      "Nabane Inc advises on labour matters and acts in litigation, aiming to look first at whether a matter can be resolved, and to represent clients firmly when it cannot.",
    ],
    glance: [
      "Labour and employment matters",
      "Civil litigation and court representation",
      "Resolution where possible, representation where needed",
    ],
    servicesHeading: "How we can assist",
    services: [
      {
        icon: Briefcase,
        title: "Labour Advice",
        description:
          "Practical advice on employment relationships, workplace policies and the rights and obligations of employers and employees.",
      },
      {
        icon: ShieldCheck,
        title: "Dismissal & Disciplinary Matters",
        description:
          "Guidance on disciplinary processes and on disputes about alleged unfair dismissal or unfair labour practices.",
      },
      {
        icon: Scale,
        title: "CCMA & Labour Court Matters",
        description:
          "Assistance with referring and pursuing disputes through the CCMA, bargaining councils and, where appropriate, the Labour Court.",
      },
      {
        icon: FileSignature,
        title: "Employment Contracts",
        description:
          "Review and explanation of employment contracts and related documents so that the terms are understood before they are signed.",
      },
      {
        icon: Gavel,
        title: "Civil Litigation",
        description:
          "Assistance with civil disputes, including demands, summonses, defending claims and representation in the relevant courts.",
      },
      {
        icon: Handshake,
        title: "Negotiation & Settlement",
        description:
          "Where it is sensible to do so, negotiating a settlement to avoid the time, cost and uncertainty of a court process.",
      },
    ],
    processHeading: "How a dispute typically unfolds",
    process: [
      {
        title: "Initial consultation",
        description:
          "We listen to what has happened, review the documents and identify the key issues and any applicable deadlines.",
      },
      {
        title: "Advice & strategy",
        description:
          "Your options are explained, including the likely costs, risks and timelines of each route.",
      },
      {
        title: "Referral or correspondence",
        description:
          "We take the appropriate first step, whether that is correspondence, negotiation or the referral of a dispute to the CCMA or a court.",
      },
      {
        title: "Representation & resolution",
        description:
          "We represent you through the process and aim to bring the matter to a clear and lasting resolution.",
      },
    ],
    faqs: [
      {
        question: "How long do I have to challenge a dismissal?",
        answer:
          "Labour disputes are generally subject to short time limits, so it is important to seek advice quickly. The exact period depends on the nature of the dispute and the forum involved.",
      },
      {
        question: "What is the CCMA?",
        answer:
          "The Commission for Conciliation, Mediation and Arbitration is a body that helps to resolve many employment disputes through conciliation and, where necessary, arbitration. Some disputes go to a bargaining council or the Labour Court instead.",
      },
      {
        question: "Do you act for both employers and employees?",
        answer:
          "This demonstration does not state which clients the firm acts for. The firm would confirm the scope of its labour work at the initial consultation.",
      },
      {
        question: "Does every dispute end up in court?",
        answer:
          "No. Many disputes are resolved through correspondence, negotiation or conciliation. Whether that is realistic depends on the facts, and is something we can discuss at the first consultation.",
      },
    ],
    image: IMG.aboutHall,
    cardImage: IMG.about,
    consultationValue: "labour-law-litigation",
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}
