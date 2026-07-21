/** The pastel tile palette used to give single-choice screens visual variety,
 *  matching the v2 preview's mood-chip grid pattern. Cycled by index. */
export const TILE_PALETTE = [
  { bg: 'var(--color-blue-pale)', fg: 'var(--color-blue-dark)' },
  { bg: 'var(--color-lavender)', fg: 'var(--color-lavender-dark)' },
  { bg: 'var(--color-mint)', fg: 'var(--color-mint-dark)' },
  { bg: 'var(--color-peach)', fg: 'var(--color-peach-dark)' },
];

export function MoodChip({
  emoji,
  label,
  selected,
  tile,
  onClick,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  tile: { bg: string; fg: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        padding: '16px 8px',
        borderRadius: 20,
        border: selected ? '3px solid var(--color-blue)' : 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 12.5,
        textAlign: 'center',
        background: selected ? tile.bg : 'var(--color-chip-bg)',
        color: selected ? tile.fg : 'var(--color-ink)',
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: selected ? '#fff' : 'rgba(255,255,255,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {emoji}
      </span>
      {label}
    </button>
  );
}

export function OptionCard({
  icon,
  title,
  description,
  selected,
  tile,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  tile: { bg: string; fg: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        textAlign: 'left',
        padding: '15px 16px',
        borderRadius: 20,
        background: selected ? 'var(--color-blue-pale)' : 'var(--color-panel-bg)',
        border: selected ? '2px solid var(--color-blue)' : '2px solid var(--color-border)',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          borderRadius: 14,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 19,
          background: tile.bg,
        }}
      >
        {icon}
      </span>
      <span>
        <span
          style={{
            display: 'block',
            fontWeight: 700,
            fontSize: 15,
            color: selected ? 'var(--color-blue-dark)' : 'var(--color-ink)',
          }}
        >
          {title}
        </span>
        <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--color-muted)' }}>
          {description}
        </span>
      </span>
    </button>
  );
}

export function TileChip({
  label,
  selected,
  tile,
  onClick,
}: {
  label: string;
  selected: boolean;
  tile: { bg: string; fg: string };
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '12px 16px',
        borderRadius: 16,
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 13.5,
        border: 'none',
        cursor: 'pointer',
        color: selected ? '#fff' : tile.fg,
        background: selected ? 'var(--color-blue)' : tile.bg,
      }}
    >
      {label}
    </button>
  );
}

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 13.5,
        cursor: 'pointer',
        background: selected ? 'var(--color-blue)' : 'var(--color-panel-bg)',
        border: selected ? '2px solid var(--color-blue)' : '2px solid var(--color-border)',
        color: selected ? '#fff' : 'var(--color-ink)',
      }}
    >
      {label}
    </button>
  );
}
