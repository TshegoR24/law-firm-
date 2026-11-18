import { useId, type ReactNode } from "react";
import type { SceneKind } from "@/lib/images";

/**
 * Art-directed architectural scenes, drawn as SVG.
 * Deterministic (seeded) so server and client always agree.
 * Each scene fills a 1600 × 1000 canvas and is cropped with `slice`,
 * exactly like a photograph set to `object-fit: cover`.
 */

const W = 1600;
const H = 1000;

type Align = "left" | "center" | "right";
type Framing = "default" | "right";

interface SceneProps {
  variant: number;
  align: Align;
  grain: boolean;
}

/* ── helpers ─────────────────────────────────────────────── */

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 10) / 10;

type Stop = [offset: number, color: string, opacity?: number];

function Gradient({
  id,
  stops,
  x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 1,
  units,
}: {
  id: string;
  stops: Stop[];
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  units?: "userSpaceOnUse";
}) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits={units}>
      {stops.map(([o, c, op], i) => (
        <stop key={i} offset={o} stopColor={c} stopOpacity={op ?? 1} />
      ))}
    </linearGradient>
  );
}

function Radial({
  id,
  stops,
}: {
  id: string;
  stops: Stop[];
}) {
  return (
    <radialGradient id={id}>
      {stops.map(([o, c, op], i) => (
        <stop key={i} offset={o} stopColor={c} stopOpacity={op ?? 1} />
      ))}
    </radialGradient>
  );
}

function Blur({ id, std }: { id: string; std: number }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation={std} />
    </filter>
  );
}

/** Sky palettes — one per variant. */
const SKIES: Stop[][] = [
  // 0 · dusk
  [
    [0, "#0a1524"],
    [0.4, "#14263d"],
    [0.72, "#4a566e"],
    [0.9, "#c4a874"],
    [1, "#ecd9ae"],
  ],
  // 1 · deep night
  [
    [0, "#070f1a"],
    [0.5, "#0f1f34"],
    [0.82, "#27405f"],
    [1, "#8d7c5a"],
  ],
  // 2 · early morning
  [
    [0, "#2a415f"],
    [0.45, "#6f86a3"],
    [0.78, "#d8cbb0"],
    [1, "#f3e6c8"],
  ],
  // 3 · rose-gold evening
  [
    [0, "#0c182a"],
    [0.45, "#1c3150"],
    [0.75, "#7a6a78"],
    [0.92, "#d3a779"],
    [1, "#efd3a0"],
  ],
];

const GLOWS = ["#f4d99b", "#d9b46e", "#fff0cf", "#f0c08a"];

function Finish({ id, grain }: { id: string; grain: boolean }) {
  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-vig)`} />
      {grain && (
        <rect
          width={W}
          height={H}
          filter={`url(#${id}-grain)`}
          opacity="0.5"
          style={{ mixBlendMode: "overlay" }}
        />
      )}
    </>
  );
}

function CommonDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-vig`} cx="50%" cy="48%" r="75%">
        <stop offset="0.55" stopColor="#050b14" stopOpacity="0" />
        <stop offset="1" stopColor="#050b14" stopOpacity="0.55" />
      </radialGradient>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 0.22"
        />
      </filter>
    </>
  );
}

function Stars({ seed, count, limit }: { seed: number; count: number; limit: number }) {
  const r = rng(seed);
  return (
    <g fill="#fff">
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={n(r() * W)}
          cy={n(r() * limit)}
          r={n(0.5 + r() * 1.1)}
          opacity={n(0.15 + r() * 0.5)}
        />
      ))}
    </g>
  );
}

/* ── Residence ───────────────────────────────────────────── */

function Residence({ id, variant, framing }: { id: string; variant: number; framing: Framing }) {
  const r = rng(101 + variant * 13);
  const ground = 700;
  // "right": scale the house down and push it right, leaving room for copy.
  const k = framing === "right" ? 0.84 : 1;
  const dx = framing === "right" ? 250 : 0;
  const T = `translate(${dx} ${n(ground * (1 - k))}) scale(${k})`;
  const flip = variant % 2 === 1;
  const night = variant === 1;
  const glow = GLOWS[variant % GLOWS.length];

  const mullions = Array.from({ length: 9 }, (_, i) => 430 + i * 102.5);
  const louvres = Array.from({ length: 61 }, (_, i) => 640 + i * 11);
  const battens = Array.from({ length: 31 }, (_, i) => 700 + i * 18);
  const courses = Array.from({ length: 18 }, (_, i) => 312 + i * 22);

  const foliage = Array.from({ length: 22 }, () => ({
    cx: 110 + r() * 270,
    cy: 400 + r() * 230,
    r: 34 + r() * 56,
    o: 0.85 + r() * 0.15,
  }));
  const shrubs = Array.from({ length: 12 }, () => ({
    cx: 1310 + r() * 260,
    cy: 660 + r() * 50,
    rx: 30 + r() * 42,
    ry: 18 + r() * 24,
  }));

  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <defs>
        <Gradient id={`${id}-sky`} stops={SKIES[variant % 4]} />
        <Radial
          id={`${id}-sun`}
          stops={[
            [0, glow, 0.9],
            [0.5, glow, 0.25],
            [1, glow, 0],
          ]}
        />
        <Gradient
          id={`${id}-room`}
          stops={[
            [0, "#f8e7bf"],
            [0.55, "#e0b873"],
            [1, "#a97f46"],
          ]}
        />
        <Gradient
          id={`${id}-upper`}
          stops={[
            [0, "#243750"],
            [1, "#142133"],
          ]}
        />
        <Gradient
          id={`${id}-stone`}
          x2={1}
          y2={0}
          stops={[
            [0, "#3a4e68"],
            [1, "#1b2a3d"],
          ]}
        />
        <Gradient
          id={`${id}-pool`}
          stops={[
            [0, "#1b2e45"],
            [0.25, "#0d1a2b"],
            [1, "#060d17"],
          ]}
        />
        <Gradient
          id={`${id}-fade`}
          units="userSpaceOnUse"
          x1={0}
          y1={ground}
          x2={0}
          y2={ground + 240}
          stops={[
            [0, "#fff", 0.9],
            [1, "#fff", 0],
          ]}
        />
        <mask id={`${id}-fadeMask`} maskUnits="userSpaceOnUse" x="0" y={ground} width={W} height="300">
          <rect x="0" y={ground} width={W} height="300" fill={`url(#${id}-fade)`} />
        </mask>
        <Blur id={`${id}-b3`} std={3} />
        <Blur id={`${id}-b40`} std={40} />
        <Blur id={`${id}-b2`} std={2} />
        <g id={`${id}-bld`}>
          {/* stone feature wall */}
          <rect x="380" y="300" width="92" height="400" fill={`url(#${id}-stone)`} />
          {courses.map((y) => (
            <rect key={y} x="380" y={y} width="92" height="1.4" fill="#fff" opacity="0.07" />
          ))}
          {/* upper volume */}
          <rect x="640" y="302" width="660" height="168" fill={`url(#${id}-upper)`} />
          {louvres.map((x) => (
            <rect key={x} x={x} y="302" width="2" height="168" fill="#fff" opacity="0.05" />
          ))}
          <rect x="700" y="372" width="540" height="68" fill={`url(#${id}-room)`} opacity="0.95" />
          {battens.map((x) => (
            <rect key={x} x={x} y="372" width="3" height="68" fill="#0b1521" opacity="0.4" />
          ))}
          <rect x="700" y="372" width="540" height="3" fill="#0b1521" opacity="0.55" />
          {/* roof slab with LED edge */}
          <rect x="590" y="282" width="760" height="20" fill="#08111c" />
          <rect x="590" y="282" width="760" height="1.6" fill={glow} opacity="0.5" />
          <rect x="590" y="302" width="760" height="3" fill={glow} opacity="0.75" />
          {/* floor slab */}
          <rect x="380" y="470" width="940" height="30" fill="#08111c" />
          <rect x="380" y="470" width="940" height="1.6" fill={glow} opacity="0.35" />
          <rect x="380" y="500" width="940" height="2.5" fill={glow} opacity="0.55" />
          {/* ground-floor glazing */}
          <rect x="472" y="503" width="780" height="197" fill={`url(#${id}-room)`} />
          <rect x="472" y="503" width="780" height="26" fill="#2a1d0e" opacity="0.28" />
          {[560, 700, 850, 1000, 1140].map((x) => (
            <g key={x}>
              <line x1={x} y1="503" x2={x} y2="528" stroke="#fff3d6" strokeWidth="1.5" opacity="0.6" />
              <circle cx={x} cy="532" r="6" fill="#fff6dd" />
              <circle cx={x} cy="532" r="22" fill="#fff0c8" opacity="0.28" />
            </g>
          ))}
          <rect x="520" y="648" width="210" height="52" rx="4" fill="#2a1c0e" opacity="0.5" />
          <rect x="770" y="640" width="70" height="60" fill="#2a1c0e" opacity="0.38" />
          <rect x="930" y="600" width="6" height="100" fill="#2a1c0e" opacity="0.4" />
          <ellipse cx="1070" cy="640" rx="46" ry="60" fill="#2a1c0e" opacity="0.32" />
          {mullions.map((x) => (
            <rect key={x} x={x} y="503" width="6" height="197" fill="#08111c" />
          ))}
          <rect x="472" y="503" width="780" height="5" fill="#08111c" />
          {/* entry plinth */}
          <rect x="560" y="700" width="330" height="14" fill="#0f1b2b" />
          <rect x="560" y="700" width="330" height="2" fill={glow} opacity="0.4" />
          <rect x="1252" y="520" width="70" height="180" fill="#101d2e" />
        </g>
      </defs>

      {/* sky */}
      <rect width={W} height={ground + 6} fill={`url(#${id}-sky)`} />
      {variant !== 2 && <Stars seed={5 + variant} count={46} limit={380} />}
      <ellipse cx="1000" cy={ground - 10} rx="820" ry="300" fill={`url(#${id}-sun)`} opacity={night ? 0.35 : 0.7} />

      {/* distant treeline */}
      <path
        d={`M0 ${ground} L0 640 Q80 600 160 636 T330 626 T520 650 T720 630 T940 652 T1160 628 T1380 648 T1600 624 L1600 ${ground} Z`}
        fill="#1a2c43"
        opacity="0.65"
      />
      <path
        d={`M0 ${ground} L0 668 Q120 640 230 664 T470 660 T700 672 T960 656 T1200 670 T1440 654 T1600 668 L1600 ${ground} Z`}
        fill="#0e1b2d"
        opacity="0.9"
      />

      <g transform={T}>
      {/* building glow */}
      <ellipse cx="860" cy="610" rx="560" ry="170" fill={glow} opacity="0.4" filter={`url(#${id}-b40)`} />

      {/* planting */}
      <g filter={`url(#${id}-b2)`}>
        <rect x="236" y="470" width="9" height="240" fill="#09131f" />
        {foliage.map((f, i) => (
          <circle key={i} cx={n(f.cx)} cy={n(f.cy)} r={n(f.r)} fill={i % 3 === 0 ? "#12263a" : "#0a1623"} opacity={n(f.o)} />
        ))}
      </g>

      <use href={`#${id}-bld`} />

      <g filter={`url(#${id}-b2)`}>
        {shrubs.map((s, i) => (
          <ellipse key={i} cx={n(s.cx)} cy={n(s.cy)} rx={n(s.rx)} ry={n(s.ry)} fill="#08121e" />
        ))}
      </g>
      </g>

      {/* reflecting pool */}
      <rect x="0" y={ground} width={W} height={H - ground} fill={`url(#${id}-pool)`} />
      <rect x="0" y={ground - 2} width={W} height="6" fill="#2b3e55" opacity="0.8" />
      <rect x="0" y={ground - 2} width={W} height="1.4" fill={glow} opacity="0.35" />
      <g mask={`url(#${id}-fadeMask)`} opacity="0.34" filter={`url(#${id}-b3)`}>
        <g transform={T}>
          <use href={`#${id}-bld`} transform={`translate(0 ${ground * 2}) scale(1 -1)`} />
        </g>
      </g>
      <ellipse cx="860" cy="780" rx="420" ry="40" fill={glow} opacity="0.16" filter={`url(#${id}-b40)`} />
      {Array.from({ length: 14 }, (_, i) => (
        <rect
          key={i}
          x={n(r() * 1400)}
          y={ground + 22 + i * 21}
          width={n(120 + r() * 380)}
          height="1.2"
          fill="#fff"
          opacity={n(0.02 + r() * 0.045)}
        />
      ))}
    </g>
  );
}

/* ── Tower ───────────────────────────────────────────────── */

function Tower({ id, variant }: { id: string; variant: number }) {
  const r = rng(311 + variant * 17);
  const ground = 930;
  const glow = GLOWS[variant % GLOWS.length];
  const flip = variant % 2 === 1;
  const light = variant === 2;

  const base = [
    { x: 40, w: 290, h: 560 },
    { x: 360, w: 350, h: 760 },
    { x: 740, w: 300, h: 540 },
    { x: 1070, w: 390, h: 700 },
    { x: 1490, w: 220, h: 480 },
  ];
  const towers = base.map((t, i) => ({
    ...t,
    h: t.h + Math.round((r() - 0.5) * 120) + (variant === 3 ? (i % 2) * 70 : 0),
  }));

  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <defs>
        <Gradient id={`${id}-sky`} stops={SKIES[variant % 4]} />
        <Gradient
          id={`${id}-glass`}
          x2={1}
          y2={0.15}
          stops={[
            [0, light ? "#586f8e" : "#33496a"],
            [0.5, light ? "#33465f" : "#1a2b44"],
            [1, light ? "#1f2f45" : "#0e1a2b"],
          ]}
        />
        <Gradient
          id={`${id}-sheen`}
          x2={1}
          y2={1}
          stops={[
            [0, "#fff", 0.22],
            [0.35, "#fff", 0],
            [1, "#fff", 0],
          ]}
        />
        <Gradient
          id={`${id}-haze`}
          stops={[
            [0, "#0d1a2b", 0],
            [1, light ? "#d8cbb0" : "#0d1a2b", light ? 0.8 : 0.85],
          ]}
        />
        <Radial
          id={`${id}-sun`}
          stops={[
            [0, glow, 0.85],
            [1, glow, 0],
          ]}
        />
        <Blur id={`${id}-b30`} std={30} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {!light && <Stars seed={17 + variant} count={40} limit={300} />}
      <ellipse cx="800" cy={ground - 40} rx="900" ry="320" fill={`url(#${id}-sun)`} opacity="0.8" />

      {towers.map((t, i) => {
        const top = ground - t.h;
        const cellW = 22;
        const cellH = 28;
        const cols = Math.floor((t.w - 24) / cellW);
        const rows = Math.floor((t.h - 36) / cellH);
        let lit = "";
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            if (r() < (light ? 0.1 : 0.24)) {
              lit += `M${n(t.x + 14 + col * cellW)} ${n(top + 20 + row * cellH)}h13v16h-13z`;
            }
          }
        }
        const pid = `${id}-win${i}`;
        return (
          <g key={i}>
            <rect x={t.x} y={top} width={t.w} height={t.h} fill={`url(#${id}-glass)`} />
            <pattern id={pid} width={cellW} height={cellH} patternUnits="userSpaceOnUse" x={t.x + 14} y={top + 20}>
              <rect width="13" height="16" fill="#0a1522" opacity={light ? 0.28 : 0.55} />
              <rect y="9" width="13" height="7" fill="#6d8cb5" opacity="0.1" />
            </pattern>
            <rect x={t.x + 14} y={top + 20} width={cols * cellW} height={rows * cellH} fill={`url(#${pid})`} />
            <path d={lit} fill={glow} opacity={light ? 0.55 : 0.8} />
            <rect x={t.x} y={top} width={t.w} height={t.h} fill={`url(#${id}-sheen)`} />
            <rect x={t.x} y={top} width={t.w} height="5" fill="#0a1522" />
            <rect x={t.x} y={top} width={t.w} height="1.4" fill={glow} opacity="0.5" />
            {i % 2 === 1 && <rect x={t.x + t.w / 2 - 1.5} y={top - 70} width="3" height="70" fill="#0a1522" />}
          </g>
        );
      })}

      <rect y={ground - 340} width={W} height={H - ground + 340} fill={`url(#${id}-haze)`} />
      <rect y={ground} width={W} height={H - ground} fill="#08121e" />
      <rect y={ground} width={W} height="2" fill={glow} opacity="0.45" />
      {Array.from({ length: 26 }, (_, i) => (
        <circle key={i} cx={n(30 + i * 62 + r() * 20)} cy={n(ground + 36 + (i % 3) * 14)} r="3" fill={glow} opacity={n(0.35 + r() * 0.4)} />
      ))}
      <ellipse cx="800" cy={ground + 18} rx="760" ry="26" fill={glow} opacity="0.18" filter={`url(#${id}-b30)`} />
    </g>
  );
}

/* ── Facade ──────────────────────────────────────────────── */

function Facade({ id, variant }: { id: string; variant: number }) {
  const r = rng(517 + variant * 11);
  const glow = GLOWS[variant % GLOWS.length];
  const light = variant === 2;
  const count = 26;
  const flip = variant % 2 === 1;

  const fins: Array<{ x: number; w: number; i: number; tint: number }> = [];
  for (let i = 0, x = -20; i < count; i++) {
    const w = 42 + r() * 26;
    const gap = 16 + r() * 8;
    fins.push({ x, w, i, tint: r() });
    x += w + gap;
  }
  const goldIdx = 14 + variant;

  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <defs>
        <Gradient
          id={`${id}-wall`}
          stops={[
            [0, light ? "#2f4560" : "#0b1624"],
            [1, light ? "#1c2c42" : "#050b14"],
          ]}
        />
        <Gradient
          id={`${id}-fin`}
          x2={1}
          y2={0}
          stops={[
            [0, light ? "#f1e6cc" : "#9a8b6c"],
            [0.18, light ? "#cdbd9b" : "#475874"],
            [0.7, light ? "#556a88" : "#1d2e46"],
            [1, light ? "#27384f" : "#0c1726"],
          ]}
        />
        <Gradient
          id={`${id}-gold`}
          x2={1}
          y2={0}
          stops={[
            [0, "#ecd5a0"],
            [0.3, "#b69a68"],
            [1, "#4d3e22"],
          ]}
        />
        <Gradient
          id={`${id}-beam`}
          x1={0}
          y1={0}
          x2={1}
          y2={1}
          stops={[
            [0, glow, 0.5],
            [1, glow, 0],
          ]}
        />
        <Blur id={`${id}-b24`} std={24} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-wall)`} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="0" y={150 + i * 300} width={W} height="22" fill="#060d17" opacity="0.8" />
          <rect x="0" y={150 + i * 300} width={W} height="1.4" fill={glow} opacity="0.3" />
        </g>
      ))}
      {fins.map((f) => (
        <g key={f.i}>
          <rect x={n(f.x + f.w)} y="-10" width="14" height="1020" fill="#02060c" opacity="0.5" />
          <rect
            x={n(f.x)}
            y="-10"
            width={n(f.w)}
            height="1020"
            fill={`url(#${id}-${f.i === goldIdx ? "gold" : "fin"})`}
            opacity={n(0.82 + f.tint * 0.18)}
          />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="0" y={150 + i * 300} width={W} height="22" fill="#060d17" opacity="0.55" />
          <rect x="0" y={172 + i * 300} width={W} height="2" fill={glow} opacity="0.5" />
        </g>
      ))}
      <polygon points="900,-60 1700,-60 1700,500 1100,1060 600,1060" fill={`url(#${id}-beam)`} opacity="0.55" filter={`url(#${id}-b24)`} style={{ mixBlendMode: "screen" }} />
    </g>
  );
}

/* ── Hall (receding arches) ──────────────────────────────── */

function Hall({ id, variant }: { id: string; variant: number }) {
  const glow = GLOWS[variant % GLOWS.length];
  const light = variant === 2;
  const vx = 800;
  const vy = 470;
  const rings = Array.from({ length: 9 }, (_, i) => 1 - i * 0.105);

  return (
    <g>
      <defs>
        <Radial
          id={`${id}-end`}
          stops={[
            [0, "#fff6df", 1],
            [0.25, glow, 0.85],
            [1, glow, 0],
          ]}
        />
        <radialGradient id={`${id}-bg`} cx="50%" cy="47%" r="60%">
          <stop offset="0" stopColor={light ? "#d9c8a0" : "#6d5a3a"} />
          <stop offset="0.35" stopColor={light ? "#6f819b" : "#1c2f48"} />
          <stop offset="1" stopColor={light ? "#1d2c42" : "#070f1a"} />
        </radialGradient>
        <Gradient
          id={`${id}-floor`}
          stops={[
            [0, glow, 0.55],
            [0.35, "#26364d", 0.9],
            [1, "#070f1a"],
          ]}
        />
        <Gradient
          id={`${id}-ring`}
          x2={1}
          y2={0}
          stops={[
            [0, light ? "#38506f" : "#16273d"],
            [0.5, light ? "#26394f" : "#0e1b2d"],
            [1, light ? "#38506f" : "#16273d"],
          ]}
        />
        <Blur id={`${id}-b30`} std={30} />
        <Blur id={`${id}-b6`} std={6} />
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      <ellipse cx={vx} cy={vy} rx="230" ry="260" fill={`url(#${id}-end)`} />
      <polygon points={`-100,1010 1700,1010 ${vx + 70},${vy + 70} ${vx - 70},${vy + 70}`} fill={`url(#${id}-floor)`} />
      <polygon points={`${vx - 90},1010 ${vx + 90},1010 ${vx + 22},${vy + 70} ${vx - 22},${vy + 70}`} fill={glow} opacity="0.22" filter={`url(#${id}-b30)`} />
      {rings.map((s, i) => {
        const half = 550 * s;
        const outer = 830 * s;
        const floor = vy + 360 * s;
        const crown = floor - 760 * s;
        const springY = crown + half;
        const topOuter = vy - 720 * s;
        const d =
          `M${n(vx - outer)} ${n(topOuter)}H${n(vx + outer)}V${n(floor)}H${n(vx + half)}V${n(springY)}` +
          `A${n(half)} ${n(half)} 0 0 0 ${n(vx - half)} ${n(springY)}V${n(floor)}H${n(vx - outer)}Z`;
        return (
          <g key={i}>
            <path d={d} fill={`url(#${id}-ring)`} fillRule="evenodd" opacity={n(0.96 - i * 0.015)} />
            <path
              d={`M${n(vx + half)} ${n(floor)}V${n(springY)}A${n(half)} ${n(half)} 0 0 0 ${n(vx - half)} ${n(springY)}V${n(floor)}`}
              fill="none"
              stroke={glow}
              strokeWidth={n(3.2 * s + 0.6)}
              opacity={n(0.2 + (1 - s) * 0.6)}
            />
            <rect x={n(vx - outer)} y={n(floor)} width={n(outer * 2)} height={n(3 * s + 1)} fill={glow} opacity="0.4" />
          </g>
        );
      })}
      <ellipse cx={vx} cy={vy + 40} rx="90" ry="150" fill="#fff6df" opacity="0.5" filter={`url(#${id}-b30)`} />
    </g>
  );
}

/* ── Estate (jacaranda at golden hour) ───────────────────── */

function Estate({ id, variant }: { id: string; variant: number }) {
  const r = rng(733 + variant * 19);
  const ground = 700;
  const glow = GLOWS[(variant + 2) % GLOWS.length];
  const flip = variant % 2 === 1;
  const blossom = ["#8a7aa6", "#a595c0", "#6f5f8c", "#b6a8cf"];

  const canopy = Array.from({ length: 70 }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    return {
      cx: 430 + Math.cos(a) * d * 290,
      cy: 340 + Math.sin(a) * d * 175,
      r: 34 + r() * 62,
      c: blossom[Math.floor(r() * blossom.length)],
      o: 0.5 + r() * 0.4,
    };
  });
  const fallen = Array.from({ length: 46 }, () => ({
    cx: 250 + r() * 460,
    cy: ground + 20 + r() * 150,
    rx: 6 + r() * 16,
    o: 0.25 + r() * 0.4,
  }));

  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <defs>
        <Gradient
          id={`${id}-sky`}
          stops={[
            [0, "#1b2f49"],
            [0.45, "#5f7290"],
            [0.78, "#d3bf96"],
            [1, "#f1e1bb"],
          ]}
        />
        <Radial
          id={`${id}-sun`}
          stops={[
            [0, "#fff3d2", 1],
            [0.4, glow, 0.5],
            [1, glow, 0],
          ]}
        />
        <Gradient
          id={`${id}-lawn`}
          stops={[
            [0, "#3a4a3c"],
            [0.4, "#1d2b27"],
            [1, "#0d1816"],
          ]}
        />
        <Gradient
          id={`${id}-wall`}
          x2={1}
          y2={0}
          stops={[
            [0, "#e8dfcd"],
            [1, "#a79c86"],
          ]}
        />
        <Gradient
          id={`${id}-room`}
          stops={[
            [0, "#fbe9c2"],
            [1, "#d9ac66"],
          ]}
        />
        <Blur id={`${id}-b2`} std={2.5} />
        <Blur id={`${id}-b30`} std={30} />
        <Blur id={`${id}-b8`} std={8} />
      </defs>

      <rect width={W} height={ground + 4} fill={`url(#${id}-sky)`} />
      <ellipse cx="1240" cy="640" rx="620" ry="300" fill={`url(#${id}-sun)`} />
      <path d={`M0 ${ground} L0 610 Q220 560 440 600 T860 590 T1280 610 T1600 580 L1600 ${ground} Z`} fill="#6b7a92" opacity="0.5" />
      <path d={`M0 ${ground} L0 648 Q260 620 520 646 T1060 640 T1600 636 L1600 ${ground} Z`} fill="#3d4d66" opacity="0.7" />

      {/* house */}
      <g>
        <rect x="900" y="440" width="300" height="110" fill={`url(#${id}-wall)`} />
        <polygon points="880,440 1050,372 1220,440" fill="#1e2b3d" />
        <rect x="640" y="540" width="600" height="160" fill={`url(#${id}-wall)`} />
        <rect x="620" y="518" width="640" height="22" fill="#1b2738" />
        <rect x="620" y="538" width="640" height="3" fill={glow} opacity="0.7" />
        <rect x="690" y="574" width="330" height="126" fill={`url(#${id}-room)`} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={688 + i * 110} y="574" width="5" height="126" fill="#251b10" opacity="0.7" />
        ))}
        <rect x="1080" y="590" width="110" height="110" fill={`url(#${id}-room)`} opacity="0.95" />
        <rect x="1134" y="590" width="4" height="110" fill="#251b10" opacity="0.7" />
        <rect x="948" y="476" width="64" height="48" fill={`url(#${id}-room)`} opacity="0.9" />
        <rect x="1086" y="476" width="64" height="48" fill={`url(#${id}-room)`} opacity="0.9" />
        <rect x="1228" y="540" width="14" height="160" fill="#2a3a52" opacity="0.5" />
        <ellipse cx="860" cy="640" rx="260" ry="70" fill={glow} opacity="0.4" filter={`url(#${id}-b30)`} />
      </g>

      {/* lawn + path */}
      <rect x="0" y={ground} width={W} height={H - ground} fill={`url(#${id}-lawn)`} />
      <polygon points="800,702 880,702 1060,1000 560,1000" fill={glow} opacity="0.2" />
      <polygon points="820,704 860,704 960,1000 720,1000" fill="#fff3d2" opacity="0.14" />
      {fallen.map((f, i) => (
        <ellipse key={i} cx={n(f.cx)} cy={n(f.cy)} rx={n(f.rx)} ry={n(f.rx * 0.32)} fill={blossom[i % 4]} opacity={n(f.o)} />
      ))}

      {/* jacaranda */}
      <g>
        <path d="M418 720 C424 600 410 520 392 440 L404 430 C430 500 446 580 452 720 Z" fill="#0f1a28" />
        <path d="M410 520 C360 470 330 440 296 416 L304 404 C344 424 380 450 424 496 Z" fill="#0f1a28" />
        <path d="M430 500 C480 450 520 430 560 410 L566 422 C524 446 488 470 444 520 Z" fill="#0f1a28" />
        <g filter={`url(#${id}-b2)`}>
          {canopy.map((c, i) => (
            <circle key={i} cx={n(c.cx)} cy={n(c.cy)} r={n(c.r)} fill={c.c} opacity={n(c.o)} />
          ))}
        </g>
        <ellipse cx="430" cy="720" rx="190" ry="20" fill="#08110f" opacity="0.55" filter={`url(#${id}-b8)`} />
      </g>

      {/* lamps */}
      {[1320, 1470].map((x) => (
        <g key={x}>
          <rect x={x} y="640" width="4" height="80" fill="#0c1520" />
          <circle cx={x + 2} cy="636" r="22" fill={glow} opacity="0.5" filter={`url(#${id}-b8)`} />
          <circle cx={x + 2} cy="636" r="5" fill="#fff3d2" />
        </g>
      ))}
    </g>
  );
}

/* ── Skyline ─────────────────────────────────────────────── */

function Skyline({ id, variant }: { id: string; variant: number }) {
  const r = rng(907 + variant * 23);
  const glow = GLOWS[variant % GLOWS.length];
  const light = variant === 2;
  const flip = variant % 2 === 1;

  const layer = (base: number, minH: number, maxH: number, minW: number, maxW: number) => {
    const out: { x: number; w: number; h: number; spire: boolean }[] = [];
    let x = -40;
    while (x < W + 40) {
      const w = minW + r() * (maxW - minW);
      out.push({ x, w, h: minH + r() * (maxH - minH), spire: r() < 0.12 });
      x += w + r() * 6;
    }
    return out.map((b) => ({ ...b, y: base - b.h }));
  };

  const far = layer(760, 160, 380, 50, 110);
  const mid = layer(820, 220, 520, 56, 130);
  const near = layer(900, 140, 360, 70, 160);

  let lit = "";
  mid.forEach((b) => {
    const cols = Math.floor((b.w - 12) / 14);
    const rows = Math.floor((b.h - 20) / 20);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (r() < (light ? 0.1 : 0.2)) lit += `M${n(b.x + 8 + col * 14)} ${n(b.y + 12 + row * 20)}h7v9h-7z`;
      }
    }
  });
  let litNear = "";
  near.forEach((b) => {
    const cols = Math.floor((b.w - 12) / 16);
    const rows = Math.floor((b.h - 20) / 22);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (r() < (light ? 0.06 : 0.14)) litNear += `M${n(b.x + 8 + col * 16)} ${n(b.y + 12 + row * 22)}h9v11h-9z`;
      }
    }
  });

  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <defs>
        <Gradient id={`${id}-sky`} stops={SKIES[variant % 4]} />
        <Radial
          id={`${id}-sun`}
          stops={[
            [0, "#fff3d2", 0.95],
            [0.3, glow, 0.6],
            [1, glow, 0],
          ]}
        />
        <Gradient
          id={`${id}-haze`}
          stops={[
            [0, glow, 0],
            [1, glow, 0.5],
          ]}
        />
        <Gradient
          id={`${id}-street`}
          stops={[
            [0, "#0c1827"],
            [1, "#040a12"],
          ]}
        />
        <Blur id={`${id}-b20`} std={20} />
        <Blur id={`${id}-b4`} std={4} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {!light && <Stars seed={29 + variant} count={36} limit={340} />}
      <ellipse cx="900" cy="760" rx="800" ry="300" fill={`url(#${id}-sun)`} />

      <g fill={light ? "#7e8ea6" : "#2a3d58"} opacity="0.55">
        {far.map((b, i) => (
          <g key={i}>
            <rect x={n(b.x)} y={n(b.y)} width={n(b.w)} height={n(b.h + 20)} />
            {b.spire && <rect x={n(b.x + b.w / 2 - 1.5)} y={n(b.y - 46)} width="3" height="46" />}
          </g>
        ))}
      </g>
      <rect y="560" width={W} height="260" fill={`url(#${id}-haze)`} opacity="0.7" />

      <g fill={light ? "#3d5170" : "#14243a"}>
        {mid.map((b, i) => (
          <g key={i}>
            <rect x={n(b.x)} y={n(b.y)} width={n(b.w)} height={n(b.h + 20)} />
            <rect x={n(b.x)} y={n(b.y)} width={n(b.w)} height="2" fill={glow} opacity="0.35" />
            {b.spire && <rect x={n(b.x + b.w / 2 - 1.5)} y={n(b.y - 60)} width="3" height="60" />}
          </g>
        ))}
      </g>
      <path d={lit} fill={glow} opacity={light ? 0.5 : 0.85} />

      <g fill={light ? "#22344e" : "#0a1522"}>
        {near.map((b, i) => (
          <rect key={i} x={n(b.x)} y={n(b.y)} width={n(b.w)} height={n(b.h + 20)} />
        ))}
      </g>
      <path d={litNear} fill={glow} opacity={light ? 0.45 : 0.75} />

      <rect y="900" width={W} height="100" fill={`url(#${id}-street)`} />
      <rect y="899" width={W} height="2" fill={glow} opacity="0.35" />
      <g filter={`url(#${id}-b4)`}>
        {Array.from({ length: 22 }, (_, i) => (
          <rect
            key={i}
            x={n(r() * 1500)}
            y={n(918 + r() * 60)}
            width={n(40 + r() * 140)}
            height="3"
            fill={i % 4 === 0 ? "#ff8f6b" : glow}
            opacity={n(0.35 + r() * 0.45)}
          />
        ))}
      </g>
      <ellipse cx="800" cy="905" rx="780" ry="34" fill={glow} opacity="0.2" filter={`url(#${id}-b20)`} />
    </g>
  );
}

/* ── Public renderer ─────────────────────────────────────── */

const ALIGN: Record<Align, string> = {
  left: "xMinYMid slice",
  center: "xMidYMid slice",
  right: "xMaxYMid slice",
};

export function SceneSvg({
  scene,
  variant = 0,
  align = "center",
  grain = true,
  framing = "default",
}: {
  scene: SceneKind;
  variant?: number;
  align?: Align;
  grain?: boolean;
  framing?: Framing;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = `s${uid}`;
  const props = { id, variant } as const;

  let body: ReactNode;
  switch (scene) {
    case "residence":
      body = <Residence {...props} framing={framing} />;
      break;
    case "tower":
      body = <Tower {...props} />;
      break;
    case "facade":
      body = <Facade {...props} />;
      break;
    case "hall":
      body = <Hall {...props} />;
      break;
    case "estate":
      body = <Estate {...props} />;
      break;
    case "skyline":
      body = <Skyline {...props} />;
      break;
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={ALIGN[align]}
      className="block h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <CommonDefs id={id} />
      </defs>
      {body}
      <Finish id={id} grain={grain} />
    </svg>
  );
}

export type { SceneProps };
