import { useId } from "react";
import { cx } from "@/lib/format";

interface Props {
  name: string;
  tone: 0 | 1 | 2;
  className?: string;
}

const TONES = [
  { top: "#2a4466", bottom: "#0e1a2b", suit: "#0a1422", skin: "#7f8fa8", hair: "#0b1624", lamp: "#e7d3a3" },
  { top: "#3a3f47", bottom: "#15181c", suit: "#0d1014", skin: "#8a8174", hair: "#0e1114", lamp: "#d8b98a" },
  { top: "#4a3f35", bottom: "#17120e", suit: "#14100d", skin: "#93826e", hair: "#100c09", lamp: "#e2c79a" },
] as const;

/**
 * Placeholder studio portrait. These are illustrations, not photographs of
 * real people — swap for professional headshots when the firm supplies them.
 */
export function Portrait({ name, tone, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `p${uid}`;
  const t = TONES[tone];

  return (
    <div role="img" aria-label={`Sample portrait placeholder for ${name}`} className={cx("absolute inset-0 overflow-hidden", className)}>
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMax slice" className="block h-full w-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={t.top} />
            <stop offset="1" stopColor={t.bottom} />
          </linearGradient>
          <radialGradient id={`${id}-lamp`} cx="22%" cy="18%" r="70%">
            <stop offset="0" stopColor={t.lamp} stopOpacity="0.55" />
            <stop offset="0.5" stopColor={t.lamp} stopOpacity="0.12" />
            <stop offset="1" stopColor={t.lamp} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1b2a3f" />
            <stop offset="0.45" stopColor={t.suit} />
            <stop offset="1" stopColor="#060b12" />
          </linearGradient>
          <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor={t.skin} />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>
          <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id={`${id}-soft`} x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <rect width="600" height="750" fill={`url(#${id}-bg)`} />
        <rect width="600" height="750" fill={`url(#${id}-lamp)`} />
        <g opacity="0.1" stroke="#fff">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={60 + i * 90} y1="0" x2={60 + i * 90} y2="750" />
          ))}
        </g>

        {tone === 2 && <path d="M170 330 C150 470 170 560 200 600 L400 600 C430 560 450 470 430 330 Z" fill={t.hair} filter={`url(#${id}-soft)`} />}

        {/* shoulders & suit */}
        <path d="M40 750 C50 640 120 590 230 568 L370 568 C480 590 550 640 560 750 Z" fill={`url(#${id}-suit)`} />
        <path d="M232 568 L300 690 L368 568 Z" fill="#e9e3d6" opacity="0.92" />
        <path d="M232 568 L300 690 L268 750 L200 750 Z" fill="#0a111b" opacity="0.55" />
        <path d="M368 568 L300 690 L332 750 L400 750 Z" fill="#0a111b" opacity="0.35" />
        {/* neck */}
        <path d="M262 500 L262 580 Q300 612 338 580 L338 500 Z" fill={`url(#${id}-skin)`} />
        {/* head */}
        <ellipse cx="300" cy="400" rx="92" ry="112" fill={`url(#${id}-skin)`} />
        {/* hair */}
        {tone === 0 && <path d="M206 392 C196 290 260 262 306 266 C358 270 408 296 394 392 C384 340 350 318 300 318 C254 318 218 340 206 392 Z" fill={t.hair} />}
        {tone === 1 && <path d="M208 384 C204 300 252 276 302 276 C352 276 398 300 392 384 C380 346 350 330 302 330 C256 330 222 346 208 384 Z" fill={t.hair} />}
        {tone === 2 && <path d="M204 410 C190 290 250 258 304 260 C362 262 414 296 396 410 C388 350 350 316 302 316 C254 316 214 350 204 410 Z" fill={t.hair} />}
        {/* window-light rim */}
        <ellipse cx="258" cy="380" rx="26" ry="60" fill="#fff" opacity="0.08" filter={`url(#${id}-blur)`} />
        <rect width="600" height="750" fill="#050b14" opacity="0.12" />
      </svg>
    </div>
  );
}
