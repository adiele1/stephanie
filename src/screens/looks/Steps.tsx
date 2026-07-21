import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../state/SessionContext';
import { fetchLookSteps, type LookStep } from '../../lib/steps';
import { TechniqueDiagram } from '../../components/technique/TechniqueDiagram';

const TIER_LABEL: Record<string, string> = { drugstore: 'Drugstore', mid: 'Mid-Range', luxury: 'Luxury' };
const TIER_COLOR: Record<string, string> = {
  drugstore: 'var(--color-muted)',
  mid: 'var(--color-blue-dark)',
  luxury: 'var(--color-coral-dark)',
};
const TIER_SWATCH: Record<string, string> = {
  drugstore: 'var(--color-chip-bg)',
  mid: 'var(--color-blue-pale)',
  luxury: 'var(--color-coral-pale)',
};

export function Steps() {
  const navigate = useNavigate();
  const { looks, activeLookId, stepIndex, setStepIndex } = useSession();
  const look = looks.find((l) => l.id === activeLookId);
  const [steps, setSteps] = useState<LookStep[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeLookId) return;
    fetchLookSteps(activeLookId).then(setSteps).catch((e) => setError(e.message));
  }, [activeLookId]);

  if (!look) {
    navigate('/looks/grid', { replace: true });
    return null;
  }
  if (error) return <p style={{ padding: 20, color: 'var(--color-coral-dark)' }}>{error}</p>;
  if (!steps) return <p style={{ padding: 20, color: 'var(--color-muted)' }}>Loading steps…</p>;

  const current = steps[Math.min(stepIndex, steps.length - 1)];
  const isLast = stepIndex >= steps.length - 1;

  function goBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
    else navigate('/looks/detail');
  }
  function goNext() {
    if (isLast) navigate('/looks/completion');
    else setStepIndex(stepIndex + 1);
  }

  return (
    <div style={{ minHeight: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '16px 18px 22px', background: 'var(--color-page-bg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13 }}>
        <button
          onClick={goBack}
          aria-label="Back"
          style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'var(--color-chip-bg)', fontSize: 15, cursor: 'pointer' }}
        >
          ←
        </button>
        <p style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, margin: 0 }}>
          {look.name}
        </p>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ display: 'flex', gap: 5, marginBottom: 16 }}>
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => i <= stepIndex && setStepIndex(i)}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 999,
              border: 'none',
              background: i <= stepIndex ? 'var(--color-blue)' : 'var(--color-border)',
              cursor: i <= stepIndex ? 'pointer' : 'default',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13 }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: 'var(--color-blue-pale)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
          💄
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Step {stepIndex + 1} of {steps.length}
          </p>
          <h3 style={{ fontWeight: 600, fontSize: 19 }}>
            {current.category[0].toUpperCase() + current.category.slice(1)}
          </h3>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ background: 'var(--color-panel-bg)', borderRadius: 20, padding: 6, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TechniqueDiagram category={current.category} />
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.55, margin: '0 0 11px' }}>{current.instruction}</p>
        {current.tip && (
          <div style={{ background: 'var(--color-coral-pale)', borderRadius: 16, padding: '13px 15px', marginBottom: 16 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 800, color: 'var(--color-coral-dark)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Pro Tip
            </p>
            <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: 'oklch(35% 0.05 25)' }}>{current.tip}</p>
          </div>
        )}
        <p style={{ margin: '0 0 9px', fontSize: 12, fontWeight: 800, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Shade-Matched Products
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {current.products.map((p) => (
            <a
              key={p.id}
              href={p.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'var(--color-panel-bg)', borderRadius: 16, padding: '9px 13px', textDecoration: 'none', color: 'inherit' }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: TIER_SWATCH[p.tier] }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: TIER_COLOR[p.tier] }}>
                  {TIER_LABEL[p.tier]}
                </p>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.brand} {p.name}
                </p>
                <p style={{ margin: 0, fontSize: 11.5, color: 'var(--color-muted)' }}>
                  ${p.price.toFixed(2)}{p.shade ? ` · ${p.shade}` : ''}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <button className="btn-primary" style={{ marginTop: 13 }} onClick={goNext}>
        {isLast ? 'Finish Look' : 'Next Step'}
      </button>
    </div>
  );
}
