import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../state/OnboardingContext';
import { useSession } from '../../state/SessionContext';
import { fetchLooks } from '../../lib/looks';
import { LookRenderCanvas } from '../../components/LookRenderCanvas';

export function Grid() {
  const navigate = useNavigate();
  const { occasion, occasionOther } = useOnboarding();
  const { selfieImage, landmarks, looks, setLooks, setActiveLookId } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selfieImage) {
      navigate('/onboarding/occasion', { replace: true });
      return;
    }
    fetchLooks()
      .then(setLooks)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selfieImage]);

  const occasionLabel = occasion === 'Other' && occasionOther ? occasionOther : occasion || 'Everyday';

  if (!selfieImage) return null;

  return (
    <div
      style={{
        minHeight: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-page-bg)',
        position: 'relative',
      }}
    >
      <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: 'var(--color-blue-dark)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: '0 0 2px',
            }}
          >
            {occasionLabel}
          </p>
          <h2 style={{ fontWeight: 600, fontSize: 21 }}>Your Looks</h2>
        </div>
      </div>

      {loading && (
        <p style={{ padding: '0 20px', color: 'var(--color-muted)' }}>Loading your looks…</p>
      )}
      {error && <p style={{ padding: '0 20px', color: 'var(--color-coral-dark)' }}>{error}</p>}

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '4px 20px 14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        {looks.map((look) => (
          <div
            key={look.id}
            style={{
              position: 'relative',
              borderRadius: 24,
              overflow: 'hidden',
              background: 'var(--color-panel-bg)',
              boxShadow: '0 8px 20px rgba(30,30,60,0.10)',
            }}
          >
            <button
              onClick={() => {
                setActiveLookId(look.id);
                navigate('/looks/detail');
              }}
              style={{ all: 'unset', display: 'block', width: '100%', cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', width: '100%', height: 150 }}>
                <LookRenderCanvas image={selfieImage} landmarks={landmarks} palette={look.palette} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, oklch(20% 0.02 260 / 0.55))',
                    pointerEvents: 'none',
                  }}
                />
                <p
                  style={{
                    position: 'absolute',
                    left: 12,
                    bottom: 9,
                    color: '#fff',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 15,
                    margin: 0,
                    pointerEvents: 'none',
                  }}
                >
                  {look.name}
                </p>
              </div>
            </button>
            <div style={{ padding: '10px 12px 12px', fontSize: 11.5, color: 'var(--color-muted)', fontWeight: 700 }}>
              {look.steps} steps · {look.time} · {look.coverage}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
