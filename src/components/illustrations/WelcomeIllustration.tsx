export function WelcomeIllustration() {
  return (
    <svg viewBox="0 0 220 220" width="180" height="180" overflow="visible">
      <circle cx="110" cy="110" r="100" fill="oklch(93% 0.035 255)" />
      <g className="illo-shadow">
        <ellipse cx="110" cy="196" rx="52" ry="9" fill="oklch(88% 0.05 255 / 0.5)" />
      </g>
      <g className="illo-bob">
        <path
          d="M62 210 C62 150 70 110 110 110 C150 110 158 150 158 210 Z"
          fill="var(--color-blue)"
        />
        <path
          d="M78 210 C78 165 84 128 110 128 C136 128 142 165 142 210 Z"
          fill="oklch(60% 0.15 255)"
        />
        <circle cx="110" cy="80" r="38" fill="oklch(86% 0.06 55)" />
        <path
          d="M72 78 C70 40 150 40 148 78 C148 55 132 44 110 44 C88 44 72 55 72 78Z"
          fill="oklch(33% 0.05 40)"
        />
        <path
          d="M72 76 C68 100 74 118 74 118 C64 108 62 82 68 66 Z"
          fill="oklch(33% 0.05 40)"
        />
        <path
          d="M148 76 C152 100 146 118 146 118 C156 108 158 82 152 66 Z"
          fill="oklch(33% 0.05 40)"
        />
        <g className="illo-eyes">
          <circle cx="97" cy="83" r="3.4" fill="oklch(30% 0.03 265)" />
          <circle cx="123" cy="83" r="3.4" fill="oklch(30% 0.03 265)" />
        </g>
        <path
          d="M99 96 Q110 104 121 96"
          stroke="oklch(45% 0.08 30)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="86" cy="90" rx="6" ry="4" fill="oklch(78% 0.09 20 / 0.55)" />
        <ellipse cx="134" cy="90" rx="6" ry="4" fill="oklch(78% 0.09 20 / 0.55)" />
        <path
          d="M62 150 C48 156 42 172 46 184"
          stroke="oklch(86% 0.06 55)"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <g className="illo-object">
          <path
            d="M158 150 C150 132 138 122 128 122"
            stroke="oklch(86% 0.06 55)"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M118 108 l14 -20 l10 8 l-14 20 Z" fill="var(--color-coral)" />
          <g className="illo-sparkle">
            <path
              d="M132 88 L136 96 L144 98 L136 100 L132 108 L128 100 L120 98 L128 96 Z"
              fill="oklch(88% 0.07 60)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
