import { IMG, type VisualProps } from "@/lib/images";

/**
 * ILLUSTRATIVE SAMPLE ARTICLES — demonstration content pending attorney
 * review. They are general information only and not legal advice.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type ArticleCategory =
  | "Deceased Estates"
  | "Family Law"
  | "RAF & Personal Injury"
  | "Labour & Litigation";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  date: string; // ISO yyyy-mm-dd
  readMinutes: number;
  excerpt: string;
  image: VisualProps;
  body: ArticleBlock[];
}

/** Article without its body — safe to pass to client components. */
export type ArticleSummary = Omit<Article, "body">;

export const articleCategories: ArticleCategory[] = [
  "Deceased Estates",
  "Family Law",
  "RAF & Personal Injury",
  "Labour & Litigation",
];

export const articles: Article[] = [
  {
    slug: "what-happens-when-someone-dies-without-a-will",
    title: "What Happens When Someone Dies Without a Will?",
    category: "Deceased Estates",
    date: "2026-11-06",
    readMinutes: 4,
    excerpt:
      "Dying without a valid will, known as dying intestate, means the law decides who inherits. We outline what families can expect.",
    image: IMG.articleIntestate,
    body: [
      {
        type: "p",
        text: "When a person dies without a valid will, they are said to have died intestate. In that case, the deceased's wishes cannot guide the distribution of the estate. Instead, the law sets out who inherits.",
      },
      { type: "h2", text: "Who inherits?" },
      {
        type: "p",
        text: "The rules of intestate succession depend on the family circumstances, such as whether the deceased left a surviving spouse, children or other relatives. The correct outcome in a particular case should be confirmed with an attorney, because the details matter.",
      },
      { type: "h2", text: "The role of the Master of the High Court" },
      {
        type: "p",
        text: "The Master of the High Court supervises the administration of deceased estates. In an intestate estate, the Master appoints an executor, who is responsible for collecting the assets, paying debts and distributing what remains to those entitled to inherit.",
      },
      { type: "h2", text: "Why a will still matters" },
      {
        type: "ul",
        items: [
          "It lets you choose who inherits and in what proportions.",
          "It lets you nominate a trusted executor.",
          "It can reduce uncertainty and disagreement among family members.",
          "It can make the administration of your estate simpler.",
        ],
      },
      {
        type: "p",
        text: "If you are dealing with an estate where there is no will, early legal guidance helps ensure that the correct steps are followed in the correct order.",
      },
    ],
  },
  {
    slug: "road-accident-fund-claims-a-plain-language-overview",
    title: "Road Accident Fund Claims: A Plain-Language Overview",
    category: "RAF & Personal Injury",
    date: "2026-10-27",
    readMinutes: 5,
    excerpt:
      "Injured in a road accident? We explain, in general terms, how Road Accident Fund claims work and why acting early matters.",
    image: IMG.articleTransfer,
    body: [
      {
        type: "p",
        text: "The Road Accident Fund (RAF) exists to provide compensation to people who are injured, or to the dependants of people who are killed, in road accidents caused by the negligent or wrongful driving of another person. A claim is generally made against the Fund rather than against the driver personally, but the rules that apply are technical and the outcome of any claim depends on its own facts.",
      },
      { type: "h2", text: "Who may be able to claim?" },
      {
        type: "p",
        text: "Drivers, passengers and pedestrians may in some circumstances be entitled to claim, and dependants of someone who died in an accident may also have a claim. Whether a particular person qualifies depends on how the accident happened and who was at fault, which is why individual advice is important.",
      },
      { type: "h2", text: "What can a claim cover?" },
      {
        type: "p",
        text: "Depending on the circumstances and the legislation in force, a claim may address different kinds of loss. These can include:",
      },
      {
        type: "ul",
        items: [
          "Reasonable future medical and related expenses.",
          "Loss of income or earning capacity resulting from the injuries.",
          "Loss of support for dependants where a breadwinner has died.",
          "General damages for serious injury, which are subject to specific requirements and limits.",
        ],
      },
      { type: "h2", text: "Documents and evidence" },
      {
        type: "p",
        text: "Claims are generally supported by documentation. It is sensible to keep or request the following as early as possible:",
      },
      {
        type: "ul",
        items: [
          "The police accident report and any case number.",
          "Hospital and medical records, including treatment notes and accounts.",
          "Proof of identity and, where relevant, proof of income.",
          "Details of any witnesses and photographs of the scene or injuries.",
        ],
      },
      { type: "h2", text: "Time limits" },
      {
        type: "p",
        text: "Road accident claims are subject to time limits. A claim generally prescribes three years from the date of the accident, and there may be separate deadlines and formalities that apply to lodging and pursuing it. Because these rules can change and may apply differently to different claimants, it is wise to seek legal advice soon after an accident rather than waiting.",
      },
      { type: "h2", text: "Taking the first step" },
      {
        type: "p",
        text: "An initial consultation can help you understand whether you may have a claim, which documents are still needed and what the realistic next steps are. This article is general information only and is not legal advice.",
      },
    ],
  },
  {
    slug: "unfair-dismissal-the-basics-every-employee-and-employer-should-know",
    title: "Unfair Dismissal: The Basics Every Employee and Employer Should Know",
    category: "Labour & Litigation",
    date: "2026-10-14",
    readMinutes: 5,
    excerpt:
      "A dismissal must generally be both substantively and procedurally fair. Here is a general overview of what that means and where disputes go.",
    image: IMG.articleConveyancer,
    body: [
      {
        type: "p",
        text: "South African labour law generally protects employees from unfair dismissal. At the same time, employers are entitled to dismiss for fair reasons, provided they follow a fair process. Whether a particular dismissal was fair always depends on its facts, so the points below are general guidance only.",
      },
      { type: "h2", text: "Two questions: reason and process" },
      {
        type: "p",
        text: "A dismissal is generally tested on two grounds. Substantive fairness asks whether there was a fair reason for the dismissal, such as misconduct, incapacity or the employer's operational requirements. Procedural fairness asks whether the employer followed a fair procedure before dismissing the employee.",
      },
      { type: "h2", text: "Common reasons for dismissal" },
      {
        type: "ul",
        items: [
          "Misconduct, where an employee is alleged to have broken a workplace rule.",
          "Incapacity, which can relate to poor work performance or ill health.",
          "Operational requirements, commonly referred to as retrenchment.",
        ],
      },
      { type: "h2", text: "What a fair process may involve" },
      {
        type: "p",
        text: "The steps depend on the reason for the dismissal and on the employer's own policies, but a fair process will generally include the following:",
      },
      {
        type: "ul",
        items: [
          "Telling the employee what is alleged or what concerns the employer has.",
          "Giving the employee a reasonable opportunity to respond, often with assistance from a representative.",
          "Considering the response before reaching a decision.",
          "Communicating the outcome and informing the employee of any right to challenge it.",
        ],
      },
      { type: "h2", text: "Where disputes are taken" },
      {
        type: "p",
        text: "An employee who believes a dismissal was unfair may generally refer the dispute to the Commission for Conciliation, Mediation and Arbitration (CCMA) or the relevant bargaining council. Strict time limits apply to these referrals, and they are generally short, so it is important to seek advice promptly after a dismissal. Depending on the nature of the dispute, other forums such as the Labour Court may also be involved.",
      },
      { type: "h2", text: "For employers" },
      {
        type: "p",
        text: "Clear workplace rules, consistent application and good records make it easier to show that a dismissal was fair. Taking advice before acting, rather than after a dispute has arisen, can help avoid avoidable risk.",
      },
      {
        type: "p",
        text: "This article is general information only and is not legal advice.",
      },
    ],
  },
  {
    slug: "reporting-a-deceased-estate-and-the-role-of-the-executor",
    title: "Reporting a Deceased Estate and the Role of the Executor",
    category: "Deceased Estates",
    date: "2026-09-30",
    readMinutes: 5,
    excerpt:
      "After a death, the estate must generally be reported to the Master of the High Court. We outline the first steps and what an executor does.",
    image: IMG.articleExecutor,
    body: [
      {
        type: "p",
        text: "Losing a loved one is difficult, and the administrative steps that follow can feel overwhelming. In general terms, a deceased estate must be reported to the Master of the High Court, and an executor is appointed to administer it. The detail depends on the size of the estate and on whether there is a will.",
      },
      { type: "h2", text: "Gathering the first documents" },
      {
        type: "p",
        text: "The following documents are usually needed at the outset, although requirements may vary:",
      },
      {
        type: "ul",
        items: [
          "The death certificate and the deceased's identity document.",
          "The original will and any amendments, if one exists.",
          "Details of the deceased's assets, such as property, bank accounts, policies and investments.",
          "Details of debts, including bonds, loans and accounts.",
          "Information about the surviving spouse and the heirs.",
        ],
      },
      { type: "h2", text: "Reporting the estate" },
      {
        type: "p",
        text: "The estate is generally reported to the Master's office that has jurisdiction over it, using the prescribed forms. The Master then considers the documents and, where appropriate, issues the authority that allows the executor to act. In some smaller estates a different, simplified procedure may apply.",
      },
      { type: "h2", text: "What an executor does" },
      {
        type: "ul",
        items: [
          "Identifies, secures and collects the assets of the estate.",
          "Settles debts and expenses and deals with taxes that may be owed.",
          "Prepares the liquidation and distribution account for scrutiny and, in due course, allows creditors and heirs to inspect it.",
          "Distributes what remains to those entitled to it, as the will or the law directs.",
        ],
      },
      { type: "h2", text: "Why timing matters" },
      {
        type: "p",
        text: "Bank accounts of the deceased may be frozen, bills continue to accrue and property may need to be secured. Acting early, and keeping a clear record of what has been done, helps the process move more smoothly. Many families choose to have an attorney assist with the reporting and administration so that the correct steps are followed in the correct order.",
      },
      {
        type: "p",
        text: "This article is general information only and is not legal advice.",
      },
    ],
  },
  {
    slug: "divorce-and-children-a-general-introduction",
    title: "Divorce and Children: A General Introduction",
    category: "Family Law",
    date: "2026-09-16",
    readMinutes: 5,
    excerpt:
      "When a marriage ends, arrangements for children are usually the most important issue. Here is a general overview of how the law approaches it.",
    image: IMG.articleBond,
    body: [
      {
        type: "p",
        text: "Divorce is rarely easy, and it becomes more complicated when there are children involved. South African law generally treats the best interests of the child as the paramount consideration in matters affecting children. What that means in a particular family depends on the circumstances, so the points below are general only.",
      },
      { type: "h2", text: "Care and contact" },
      {
        type: "p",
        text: "Terms such as care and contact describe where a child lives and how time is shared with each parent. Parents are encouraged to reach agreement wherever possible, and a written parenting plan can record what has been agreed. Where agreement is not possible, a court may be asked to decide.",
      },
      { type: "h2", text: "Maintenance" },
      {
        type: "p",
        text: "Both parents generally have a duty to support their children according to their means. Maintenance is usually assessed by considering the child's reasonable needs and each parent's financial position. An agreed or ordered amount can be reviewed if circumstances change significantly.",
      },
      { type: "h2", text: "The matrimonial property regime" },
      {
        type: "p",
        text: "How assets are divided on divorce depends largely on the marriage's property regime, such as in community of property or out of community of property, with or without the accrual system. It is important to know which regime applies to you, as it affects what can be claimed.",
      },
      { type: "h2", text: "Settlement or trial" },
      {
        type: "p",
        text: "Many divorces end with a settlement agreement that is made an order of court. A settled approach is often quicker, less costly and less stressful than a contested trial, though it is not always possible. Mediation can sometimes help parties to reach agreement.",
      },
      { type: "h2", text: "Getting advice early" },
      {
        type: "ul",
        items: [
          "Collect documents about income, assets, debts and the marriage regime.",
          "Think about what arrangements would be workable for your children.",
          "Avoid signing agreements before you understand their effect.",
        ],
      },
      {
        type: "p",
        text: "This article is general information only and is not legal advice.",
      },
    ],
  },
  {
    slug: "what-to-expect-when-a-dispute-heads-towards-court",
    title: "What to Expect When a Dispute Heads Towards Court",
    category: "Labour & Litigation",
    date: "2026-09-03",
    readMinutes: 5,
    excerpt:
      "From a letter of demand to a judgment, here is a general outline of how a civil dispute commonly progresses and why many are resolved earlier.",
    image: IMG.articleOffer,
    body: [
      {
        type: "p",
        text: "Few people look forward to litigation. It can take time and it involves cost and uncertainty, which is why many disputes are resolved before they reach a trial. Understanding the general stages can help you make better decisions along the way, although every matter is different.",
      },
      { type: "h2", text: "Start with the facts and documents" },
      {
        type: "p",
        text: "An early review of contracts, correspondence and other documents helps to establish what is in dispute and what is realistically achievable. Time limits, known as prescription periods, may apply to claims, so it is sensible to obtain advice before too much time passes.",
      },
      { type: "h2", text: "The letter of demand" },
      {
        type: "p",
        text: "A letter of demand sets out the claim and asks the other party to put things right within a stated period. In some cases a notice is a legal requirement before proceedings may begin. A clear, well-supported letter sometimes resolves the matter without further steps.",
      },
      { type: "h2", text: "Negotiation and alternative dispute resolution" },
      {
        type: "p",
        text: "Settlement discussions, mediation or arbitration may be available and often save time and cost. Some agreements even require parties to attempt these steps before approaching a court.",
      },
      { type: "h2", text: "If proceedings are issued" },
      {
        type: "ul",
        items: [
          "Summons or an application is issued and served on the other party.",
          "The other party may defend the matter or oppose the application.",
          "Documents are exchanged and the issues are narrowed down.",
          "The matter is set down for hearing or trial, where evidence and argument are presented.",
          "The court gives judgment, which may be subject to appeal in some circumstances.",
        ],
      },
      { type: "h2", text: "Costs and expectations" },
      {
        type: "p",
        text: "Legal costs can be significant, and a court may order the unsuccessful party to contribute to the other side's costs. Timelines vary widely between courts and between matters. Discussing the likely costs, risks and alternatives at the outset helps you to decide on a sensible course.",
      },
      {
        type: "p",
        text: "This article is general information only and is not legal advice.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category,
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}
