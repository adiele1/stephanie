export function CameraIllustration() {
  return (
    <svg viewBox="0 0 220 220" width="170" height="170" overflow="visible">
      <circle cx="110" cy="110" r="100" fill="oklch(93% 0.035 255)" />
      <g className="illo-shadow">
        <ellipse cx="110" cy="196" rx="52" ry="9" fill="oklch(88% 0.05 255 / 0.5)" />
      </g>
      <g className="illo-bob">
        <path
          d="M64 210 C64 155 72 116 110 116 C148 116 156 155 156 210 Z"
          fill="var(--color-blue)"
        />
        <circle cx="104" cy="82" r="37" fill="oklch(86% 0.06 55)" />
        <path
          d="M68 80 C66 43 144 43 142 80 C142 58 127 48 104 48 C82 48 68 58 68 80Z"
          fill="oklch(33% 0.05 40)"
        />
        <g className="illo-eyes">
          <circle cx="92" cy="84" r="3.3" fill="oklch(30% 0.03 265)" />
        </g>
        <path
          d="M108 92 Q118 96 126 88"
          stroke="oklch(45% 0.08 30)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M64 150 C50 140 44 118 50 100"
          stroke="oklch(86% 0.06 55)"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <g className="illo-object">
          <rect
            x="18"
            y="82"
            width="46"
            height="34"
            rx="8"
            fill="var(--color-coral)"
            transform="rotate(-18 41 99)"
          />
          <circle cx="33" cy="92" r="7" fill="oklch(97% 0.01 60)" transform="rotate(-18 41 99)" />
        </g>
        <path
          d="M148 150 C158 138 160 120 156 108"
          stroke="oklch(86% 0.06 55)"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '.5s' }}>
        <path
          d="M28 40 L32 50 L42 54 L32 58 L28 68 L24 58 L14 54 L24 50 Z"
          fill="oklch(88% 0.07 60)"
        />
      </g>
      <g className="illo-sparkle" style={{ animationDelay: '.9s' }}>
        <path
          d="M176 60 L179 67 L186 70 L179 73 L176 80 L173 73 L166 70 L173 67 Z"
          fill="oklch(78% 0.12 40)"
        />
      </g>
    </svg>
  );
}
