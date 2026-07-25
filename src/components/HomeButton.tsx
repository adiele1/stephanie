import { useNavigate } from 'react-router-dom';

/** Jumps straight back to the look grid — the app's home base once onboarding is
 *  done — bypassing however many steps deep the user has gone (Detail/Steps/Completion
 *  all sit "under" Grid). Styled a step more prominent than the plain back button since
 *  it's a shortcut, not the default nav action. */
export function HomeButton({ light = false }: { light?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/looks/grid')}
      aria-label="Go home"
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: 'none',
        background: light ? 'rgba(255,255,255,0.92)' : 'var(--color-blue-pale)',
        boxShadow: '0 4px 12px oklch(28% 0.03 260 / 0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path
          d="M3.5 11.5 12 4l8.5 7.5"
          stroke="var(--color-blue-dark)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10v8.5a1 1 0 0 0 1 1h3.5v-5.5h3v5.5H17a1 1 0 0 0 1-1V10"
          stroke="var(--color-blue-dark)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
