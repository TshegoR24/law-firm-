import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/format";

type Variant = "gold" | "outline-light" | "outline-dark" | "navy";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-navy-deep border-gold hover:bg-gold-light hover:border-gold-light",
  navy: "bg-navy text-white border-navy hover:bg-navy-soft hover:border-navy-soft",
  "outline-light": "border-white/40 text-white hover:border-gold hover:bg-white/10",
  "outline-dark": "border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white",
};

interface Props {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  size?: "md" | "lg";
  external?: boolean;
}

export function Button({ href, variant = "gold", children, className, arrow = true, size = "md", external }: Props) {
  const classes = cx(
    "group inline-flex items-center justify-center gap-3 border text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
    size === "lg" ? "px-8 py-[1.05rem]" : "px-6 py-3.5",
    VARIANTS[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

/** Understated text link with an animated arrow. */
export function TextLink({ href, children, tone = "dark", className }: { href: string; children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em]",
        tone === "dark" ? "text-navy hover:text-gold-deep" : "text-white hover:text-gold",
        "transition-colors duration-300",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
