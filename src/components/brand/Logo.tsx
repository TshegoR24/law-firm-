import Link from "next/link";
import { site } from "@/config/site";
import { cx } from "@/lib/format";

interface Props {
  /** "light" for dark backgrounds, "dark" for light backgrounds. */
  tone?: "light" | "dark";
  className?: string;
  asLink?: boolean;
}

/**
 * Typographic placeholder logo. To use the client's real logo, replace the
 * contents of <LogoMark /> / the wordmark below (or render an <Image />).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <rect x="1" y="1" width="38" height="38" stroke="currentColor" strokeWidth="1" />
      <path d="M10 29V19.5L20 11l10 8.5V29" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter" />
      <path d="M15 29V22h10v7" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M7 29h26" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo({ tone = "light", className, asLink = true }: Props) {
  const inner = (
    <span className={cx("inline-flex items-center gap-3.5", className)}>
      <LogoMark className={cx("h-9 w-9 shrink-0", tone === "light" ? "text-gold" : "text-gold-deep")} />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            "font-serif text-[1.45rem] font-semibold tracking-[0.34em]",
            tone === "light" ? "text-white" : "text-navy",
          )}
        >
          {site.logoWordmark.primary}
        </span>
        <span
          className={cx(
            "mt-1.5 flex items-center gap-2 text-[0.6rem] font-medium tracking-[0.62em]",
            tone === "light" ? "text-gold" : "text-gold-deep",
          )}
        >
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
          {site.logoWordmark.secondary}
        </span>
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
      {inner}
    </Link>
  );
}
