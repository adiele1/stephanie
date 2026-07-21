export type TechniqueCategory = 'foundation' | 'concealer' | 'eyes' | 'brows' | 'lips';

const GUIDE_STROKE = 'oklch(50% 0.13 255 / 0.3)';

function FaceBase() {
  return (
    <>
      <ellipse cx="100" cy="76" rx="44" ry="54" fill="oklch(86% 0.06 55)" />
      <ellipse cx="80" cy="58" rx="14" ry="10" fill="oklch(90% 0.05 55 / 0.55)" />
      <path
        d="M56 62 C56 26 144 26 144 62 C144 42 128 32 100 32 C72 32 56 42 56 62Z"
        fill="oklch(33% 0.05 40)"
      />
      <path d="M72 48 Q81 42 91 47" stroke="oklch(33% 0.05 40)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M109 47 Q119 42 128 48" stroke="oklch(33% 0.05 40)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M75 60 Q83 64 91 60" stroke="oklch(30% 0.03 265)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M109 60 Q117 64 125 60" stroke="oklch(30% 0.03 265)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M100 64 L97 78 Q100 81 103 78" stroke="oklch(72% 0.05 55)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M84 98 Q100 92 116 98 Q100 106 84 98 Z" fill="oklch(80% 0.04 40)" stroke="oklch(70% 0.05 40)" strokeWidth="1" />
    </>
  );
}

function ToolSponge() {
  return (
    <>
      <path
        d="M0,-10 C6,-10 9,-3 9,4 C9,12 4,17 0,17 C-4,17 -9,12 -9,4 C-9,-3 -6,-10 0,-10 Z"
        fill="oklch(97% 0.02 60)"
        stroke="var(--color-coral)"
        strokeWidth="1.6"
      />
      <ellipse cx="-2.6" cy="-3" rx="3.2" ry="2.2" fill="oklch(99% 0.01 60 / 0.85)" />
    </>
  );
}
function ToolBrush({ tipColor }: { tipColor: string }) {
  return (
    <>
      <line x1="0" y1="16" x2="0" y2="1" stroke="oklch(50% 0.02 265)" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="0" cy="-3" rx="4.6" ry="6.5" fill={tipColor} stroke="oklch(38% 0.05 265)" strokeWidth="1" />
    </>
  );
}
function ToolPencil() {
  return (
    <>
      <path d="M-2.2,13 L2.2,13 L1.3,-5 L0,-9 L-1.3,-5 Z" fill="oklch(33% 0.05 40)" stroke="oklch(18% 0.02 265)" strokeWidth="0.6" />
      <path d="M-1.3,-5 L0,-9 L1.3,-5 Z" fill="oklch(20% 0.02 265)" />
    </>
  );
}

const FOUNDATION_PATH =
  'M100 40 C78 46 66 60 68 78 C58 86 58 100 70 110 C82 122 118 122 130 110 C142 100 142 86 132 78 C134 60 122 46 100 40 Z';
const CONCEALER_PATH = 'M82 66 L72 80 L92 80 Z';
const EYES_PATH = 'M70 54 Q100 44 130 54';
const LIPS_PATH = 'M84 98 Q100 92 116 98 Q100 106 84 98 Z';
const BROW_TICKS = [
  { x: 75, y: 47, r: -25 },
  { x: 80, y: 45.3, r: -12 },
  { x: 85, y: 44.8, r: 2 },
  { x: 89, y: 45.6, r: 16 },
  { x: 112, y: 45.6, r: -16 },
  { x: 117, y: 44.8, r: -2 },
  { x: 122, y: 45.3, r: 12 },
  { x: 126, y: 47, r: 25 },
];
const BROW_TOOL_PATH = 'M71 47 L96 44 L104 44 L129 47';

function GuidePath({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={GUIDE_STROKE} strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" />;
}

function CategoryOverlay({ category }: { category: TechniqueCategory }) {
  switch (category) {
    case 'foundation': {
      const glow = [
        { cx: 100, cy: 50, rx: 24, ry: 14, delay: '0s' },
        { cx: 74, cy: 84, rx: 15, ry: 19, delay: '.55s' },
        { cx: 100, cy: 113, rx: 19, ry: 11, delay: '.95s' },
        { cx: 126, cy: 84, rx: 15, ry: 19, delay: '1.35s' },
      ];
      return (
        <>
          <GuidePath d={FOUNDATION_PATH} />
          {glow.map((g, i) => (
            <ellipse
              key={i}
              cx={g.cx}
              cy={g.cy}
              rx={g.rx}
              ry={g.ry}
              fill="oklch(92% 0.035 55 / 0.55)"
              className="tech-glow tech-glow-a"
              style={{ animationDelay: g.delay }}
            />
          ))}
          <g className="tech-applicator tech-anim-a" style={{ offsetPath: `path('${FOUNDATION_PATH}')`, offsetRotate: 'auto 90deg' }}>
            <ToolSponge />
          </g>
        </>
      );
    }
    case 'concealer':
      return (
        <>
          <GuidePath d={CONCEALER_PATH} />
          <path d={CONCEALER_PATH} fill="oklch(96% 0.025 60)" className="tech-fill tech-fill-b" />
          <g className="tech-applicator tech-anim-b" style={{ offsetPath: `path('${CONCEALER_PATH}')`, offsetRotate: 'auto 90deg' }}>
            <ToolBrush tipColor="oklch(93% 0.03 60)" />
          </g>
        </>
      );
    case 'eyes':
      return (
        <>
          <GuidePath d={EYES_PATH} />
          <path d="M72 58 Q100 48 128 58 Q100 64 72 58 Z" fill="var(--color-lavender)" className="tech-fill tech-fill-c" />
          <g className="tech-applicator tech-anim-c" style={{ offsetPath: `path('${EYES_PATH}')`, offsetRotate: 'auto' }}>
            <ToolBrush tipColor="var(--color-lavender)" />
          </g>
        </>
      );
    case 'brows':
      return (
        <>
          {BROW_TICKS.map((t, i) => (
            <line
              key={i}
              x1={t.x - 4}
              y1={t.y}
              x2={t.x + 4}
              y2={t.y}
              stroke="oklch(28% 0.05 40)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="8"
              transform={`rotate(${t.r} ${t.x} ${t.y})`}
              className="tech-tick"
              style={{ animationDelay: `${(i * 0.16).toFixed(2)}s` }}
            />
          ))}
          <g className="tech-applicator tech-anim-e" style={{ offsetPath: `path('${BROW_TOOL_PATH}')`, offsetRotate: 'auto' }}>
            <ToolPencil />
          </g>
        </>
      );
    case 'lips':
      return (
        <>
          <GuidePath d={LIPS_PATH} />
          <path d={LIPS_PATH} fill="oklch(55% 0.15 25)" className="tech-fill tech-fill-d" />
          <g className="tech-applicator tech-anim-d" style={{ offsetPath: `path('${LIPS_PATH}')`, offsetRotate: 'auto 90deg' }}>
            <ToolBrush tipColor="oklch(55% 0.15 25)" />
          </g>
        </>
      );
  }
}

export function TechniqueDiagram({ category }: { category: TechniqueCategory }) {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="146" style={{ display: 'block' }}>
      <FaceBase />
      <CategoryOverlay category={category} />
    </svg>
  );
}
