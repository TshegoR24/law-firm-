import { cx } from "@/lib/format";

export function Eyebrow({ children, tone = "dark", className }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p className={cx("flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em]", tone === "light" ? "text-gold" : "text-gold-deep", className)}>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-70" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow tone={tone} className={cx("mb-6", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <Tag className={cx("text-[2.4rem] font-medium leading-[1.04] sm:text-5xl lg:text-[3.6rem]", tone === "light" ? "text-white" : "text-navy")}>{title}</Tag>
      {intro && <p className={cx("mt-6 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-white/75" : "text-grey-dark")}>{intro}</p>}
    </div>
  );
}
