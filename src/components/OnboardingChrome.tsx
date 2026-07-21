import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

/** Back button + progress bar row shared by every onboarding step after Welcome. */
export function StepHeader({ back, progress }: { back: string; progress: number }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 6 }}>
      <button
        onClick={() => navigate(back)}
        aria-label="Back"
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: 'none',
          background: 'var(--color-chip-bg)',
          fontSize: 15,
          color: 'var(--color-ink)',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        ←
      </button>
      <div
        style={{
          flex: 1,
          height: 7,
          background: 'var(--color-border)',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-blue), var(--color-blue-deep))',
            borderRadius: 'var(--radius-pill)',
            transition: 'width 200ms ease',
          }}
        />
      </div>
    </div>
  );
}

export function ScreenShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '18px 20px 28px',
        background: 'var(--color-page-bg)',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
}

export function NextButton({
  disabled,
  onClick,
  children = 'Next',
}: {
  disabled?: boolean;
  onClick: () => void;
  children?: ReactNode;
}) {
  return (
    <button className="btn-primary" style={{ marginTop: 14 }} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
