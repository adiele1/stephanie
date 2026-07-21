import { useNavigate } from 'react-router-dom';
import { WelcomeIllustration } from '../../components/illustrations/WelcomeIllustration';

export function Welcome() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '26px 22px 34px',
        background: 'linear-gradient(180deg, oklch(93% 0.035 255) 0%, var(--color-page-bg) 60%)',
      }}
    >
      <div />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
        <WelcomeIllustration />
        <h1 style={{ fontWeight: 600, fontSize: 27, lineHeight: 1.18, marginTop: 4 }}>
          Your face,
          <br />
          your perfect look.
        </h1>
        <p style={{ fontSize: 14.5, color: 'var(--color-muted)', maxWidth: 250, lineHeight: 1.5, margin: 0 }}>
          A personal makeup artist in your pocket — matched to your skin, guided step by step.
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={() => navigate('/onboarding/skin-type')}>
          Get Started
        </button>
        <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--color-muted)', margin: 0 }}>
          Takes about 2 minutes
        </p>
      </div>
    </div>
  );
}
