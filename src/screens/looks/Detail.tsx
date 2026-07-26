import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../state/SessionContext';
import { LookRenderCanvas } from '../../components/LookRenderCanvas';
import { LookFullscreenViewer } from '../../components/LookFullscreenViewer';

export function Detail() {
  const navigate = useNavigate();
  const { selfieImage, landmarks, looks, activeLookId, setStepIndex, setRating } = useSession();
  const look = looks.find((l) => l.id === activeLookId);
  const [viewerOpen, setViewerOpen] = useState(false);

  if (!selfieImage || !look) {
    navigate('/looks/grid', { replace: true });
    return null;
  }

  return (
    <div style={{ minHeight: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', background: 'var(--color-page-bg)' }}>
      <div style={{ position: 'relative', height: 280, flexShrink: 0 }}>
        <button
          onClick={() => setViewerOpen(true)}
          aria-label={`View the full ${look.name} look`}
          style={{ position: 'absolute', inset: 0, border: 'none', padding: 0, cursor: 'pointer', display: 'block', width: '100%', height: '100%' }}
        >
          <LookRenderCanvas image={selfieImage} landmarks={landmarks} palette={look.palette} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, oklch(20% 0.02 260 / 0.3), transparent 30%, transparent 70%, var(--color-page-bg) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(20,20,30,0.55)',
              color: '#fff',
              fontSize: 11.5,
              fontWeight: 700,
              padding: '7px 12px',
              borderRadius: 999,
              pointerEvents: 'none',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
            </svg>
            See full look
          </div>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/looks/grid');
          }}
          aria-label="Back"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            width: 34,
            height: 34,
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.9)',
            fontSize: 15,
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          ←
        </button>
      </div>
      <div style={{ flex: 1, padding: '15px 22px 22px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ fontWeight: 600, fontSize: 23, margin: '0 0 4px' }}>{look.name}</h2>
        <p style={{ fontSize: 13.5, color: 'var(--color-muted)', margin: '0 0 13px', lineHeight: 1.4 }}>
          {look.tagline}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'var(--color-blue-pale)',
            color: 'var(--color-blue-dark)',
            fontWeight: 700,
            fontSize: 12.5,
            padding: '7px 13px',
            borderRadius: 999,
            width: 'fit-content',
            marginBottom: 13,
          }}
        >
          ✓ Matched to your skin tone
        </div>
        <div style={{ display: 'flex', gap: 9, marginBottom: 18 }}>
          {[
            { v: look.steps, l: 'steps' },
            { v: look.time, l: 'time' },
            { v: look.coverage, l: 'coverage' },
          ].map((s) => (
            <div key={s.l} style={{ flex: 1, background: 'var(--color-panel-bg)', borderRadius: 16, padding: 12, textAlign: 'center' }}>
              <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16 }}>{s.v}</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--color-muted)' }}>{s.l}</p>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <button
          className="btn-primary"
          onClick={() => {
            setStepIndex(0);
            setRating(0);
            navigate('/looks/steps');
          }}
        >
          Start This Look
        </button>
      </div>
      {viewerOpen && (
        <LookFullscreenViewer
          image={selfieImage}
          landmarks={landmarks}
          palette={look.palette}
          lookName={look.name}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
