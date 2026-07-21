export function CelebrateIllustration() {
  return (
    <svg viewBox="0 0 220 220" width="180" height="180" overflow="visible">
      <circle cx="110" cy="110" r="100" fill="oklch(93% 0.035 255)" />
      <g className="illo-shadow">
        <ellipse cx="110" cy="196" rx="52" ry="9" fill="oklch(88% 0.05 255 / 0.5)" />
      </g>
      <g className="illo-bob">
        <path
          d="M66 210 C66 158 74 122 110 122 C146 122 154 158 154 210 Z"
          fill="var(--color-blue)"
        />
        <circle cx="110" cy="86" r="38" fill="oklch(86% 0.06 55)" />
        <path
          d="M72 84 C70 46 150 46 148 84 C148 60 132 50 110 50 C88 50 72 60 72 84Z"
          fill="oklch(33% 0.05 40)"
        />
        <g className="illo-eyes">
          <circle cx="98" cy="88" r="3.4" fill="oklch(30% 0.03 265)" />
          <circle cx="122" cy="88" r="3.4" fill="oklch(30% 0.03 265)" />
        </g>
        <path
          d="M96 100 Q110 112 124 100"
          stroke="oklch(45% 0.08 30)"
          strokeWidth="3.4"
          fill="none"
          strokeLinecap="round"
        />
        <g className="illo-arm-l">
          <path
            d="M66 150 C50 118 46 84 58 58"
            stroke="oklch(86% 0.06 55)"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        <g className="illo-arm-r">
          <path
            d="M154 150 C170 118 174 84 162 58"
            stroke="oklch(86% 0.06 55)"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '0s' }}>
        <path d="M40 30 L44 40 L54 44 L44 48 L40 58 L36 48 L26 44 L36 40 Z" fill="oklch(78% 0.12 40)" />
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '.5s' }}>
        <path d="M182 46 L185 53 L192 56 L185 59 L182 66 L179 59 L172 56 L179 53 Z" fill="var(--color-blue)" />
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '.9s' }}>
        <path d="M14 110 L17 117 L24 120 L17 123 L14 130 L11 123 L4 120 L11 117 Z" fill="oklch(88% 0.07 60)" />
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '1.3s' }}>
        <circle cx="196" cy="120" r="5" fill="var(--color-lavender)" />
      </g>
    </svg>
  );
}
