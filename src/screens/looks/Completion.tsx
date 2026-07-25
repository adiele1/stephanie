import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../state/OnboardingContext';
import { useSession } from '../../state/SessionContext';
import { LookRenderCanvas } from '../../components/LookRenderCanvas';
import { CelebrateIllustration } from '../../components/illustrations/CelebrateIllustration';
import { saveCompletedSession } from '../../lib/sessions';
import { HomeButton } from '../../components/HomeButton';

export function Completion() {
  const navigate = useNavigate();
  const { occasion, occasionOther } = useOnboarding();
  const { selfieImage, landmarks, looks, activeLookId, rating, setRating, reset } = useSession();
  const look = looks.find((l) => l.id === activeLookId);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'signed-out' | 'error'>('idle');

  if (!selfieImage || !look) {
    navigate('/looks/grid', { replace: true });
    return null;
  }

  async function handleSave() {
    setSaveState('saving');
    try {
      await saveCompletedSession({
        occasion: occasion ?? 'Everyday',
        occasionOther,
        selectedLookId: look!.id,
        rating,
      });
      setSaveState('saved');
    } catch (e) {
      setSaveState(e instanceof Error && e.message === 'NOT_SIGNED_IN' ? 'signed-out' : 'error');
    }
  }

  return (
    <div
      style={{
        minHeight: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, oklch(93% 0.035 255), var(--color-page-bg))',
        padding: '22px 20px 22px',
        overflowY: 'auto',
      }}
    >
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: 4 }}>
        <HomeButton />
      </div>
      <CelebrateIllustration />
      <h2 style={{ fontWeight: 600, fontSize: 22, margin: '2px 0 4px', textAlign: 'center' }}>You did it! ✨</h2>
      <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 14px', textAlign: 'center' }}>
        Your {look.name} look is complete
      </p>

      <div style={{ display: 'flex', gap: 9, width: '100%', marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', margin: '0 0 5px' }}>
            Before
          </p>
          <div style={{ width: '100%', height: 120, borderRadius: 18, overflow: 'hidden' }}>
            <img src={selfieImage.src} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', margin: '0 0 5px' }}>
            After
          </p>
          <div style={{ width: '100%', height: 120, borderRadius: 18, overflow: 'hidden' }}>
            <LookRenderCanvas image={selfieImage} landmarks={landmarks} palette={look.palette} />
          </div>
        </div>
      </div>

      <p style={{ fontSize: 12.5, fontWeight: 700, margin: '0 0 7px' }}>How did it turn out?</p>
      <div style={{ display: 'flex', gap: 5, marginBottom: 18 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setRating(n)}
            style={{ background: 'none', border: 'none', fontSize: 26, cursor: 'pointer', padding: 2, color: n <= rating ? 'var(--color-coral)' : 'var(--color-border)' }}
          >
            ★
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 9, width: '100%', marginBottom: 6 }}>
        <button
          style={{
            flex: 1,
            background: 'var(--color-white)',
            border: '2px solid var(--color-blue)',
            color: 'var(--color-blue-dark)',
            borderRadius: 999,
            padding: 14,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: 'pointer',
          }}
          onClick={handleSave}
          disabled={saveState === 'saving'}
        >
          {saveState === 'saved' ? 'Saved ✓' : 'Save'}
        </button>
      </div>
      {saveState === 'signed-out' && (
        <p style={{ fontSize: 12, color: 'var(--color-muted)', textAlign: 'center', margin: '4px 0 0' }}>
          Sign in to save this to your history — coming soon.
        </p>
      )}
      {saveState === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--color-coral-dark)', textAlign: 'center', margin: '4px 0 0' }}>
          Couldn't save that — try again in a moment.
        </p>
      )}

      <button
        className="btn-ghost"
        style={{ marginTop: 10 }}
        onClick={() => {
          reset();
          navigate('/looks/grid');
        }}
      >
        Try another look
      </button>
    </div>
  );
}
