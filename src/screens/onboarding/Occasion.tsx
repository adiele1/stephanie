import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboarding, type Occasion as OccasionValue } from '../../state/OnboardingContext';
import { Chip } from '../../components/ChoiceControls';
import { ScreenShell, StepHeader } from '../../components/OnboardingChrome';

const OPTIONS: OccasionValue[] = [
  'Wedding Guest',
  'Date Night',
  'Interview',
  'Everyday',
  'Night Out',
  'Formal',
  'Other',
];

function UploadSlot({
  label,
  height,
  file,
  onPick,
}: {
  label: string;
  height: number;
  file: File | null;
  onPick: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        style={{ display: 'none' }}
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
      <button
        onClick={() => inputRef.current?.click()}
        style={{
          width: '100%',
          height,
          borderRadius: 22,
          border: '2.5px dashed oklch(78% 0.08 255)',
          backgroundColor: previewUrl ? 'transparent' : 'var(--color-blue-pale)',
          color: 'var(--color-blue-dark)',
          fontSize: 12.5,
          fontWeight: 600,
          lineHeight: 1.4,
          cursor: 'pointer',
          padding: 0,
          overflow: 'hidden',
          backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!previewUrl && `📸 ${label}`}
      </button>
    </>
  );
}

export function Occasion() {
  const navigate = useNavigate();
  const {
    occasion,
    setOccasion,
    occasionOther,
    setOccasionOther,
    selfieFile,
    setSelfieFile,
    styleRefFile,
    setStyleRefFile,
  } = useOnboarding();

  const showStyleRefField = styleRefFile !== null;
  const canProceed = !!occasion && !!selfieFile;

  return (
    <ScreenShell>
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <StepHeader back="/onboarding/camera" progress={75} />
        <h2 style={{ fontWeight: 600, fontSize: 21, margin: '16px 0 4px' }}>
          What are you getting ready for?
        </h2>
        <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 13px' }}>
          Pick an occasion and share a selfie to get started.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 6 }}>
          {OPTIONS.map((opt) => (
            <Chip key={opt} label={opt} selected={occasion === opt} onClick={() => setOccasion(opt)} />
          ))}
        </div>
        {occasion === 'Other' && (
          <input
            value={occasionOther}
            onChange={(e) => setOccasionOther(e.target.value)}
            placeholder="Tell us what's the occasion..."
            style={{
              margin: '8px 0 4px',
              padding: '13px 15px',
              borderRadius: 16,
              border: '2px solid var(--color-border)',
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              background: 'var(--color-white)',
              width: '100%',
            }}
          />
        )}
        <div style={{ marginTop: 15 }}>
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              margin: '0 0 7px',
            }}
          >
            Your selfie
          </p>
          <UploadSlot
            label="Drop your selfie — on-device only"
            height={150}
            file={selfieFile}
            onPick={setSelfieFile}
          />
        </div>
        <div style={{ marginTop: 13 }}>
          {showStyleRefField ? (
            <>
              <p
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: '0 0 7px',
                }}
              >
                Style reference
              </p>
              <UploadSlot
                label="Optional inspiration photo"
                height={110}
                file={styleRefFile}
                onPick={setStyleRefFile}
              />
            </>
          ) : (
            <input
              type="file"
              accept="image/*"
              id="style-ref-input"
              style={{ display: 'none' }}
              onChange={(e) => setStyleRefFile(e.target.files?.[0] ?? null)}
            />
          )}
          {!showStyleRefField && (
            <button
              className="btn-ghost"
              style={{ padding: '8px 0', color: 'var(--color-blue-dark)' }}
              onClick={() => document.getElementById('style-ref-input')?.click()}
            >
              + Add a style reference photo
            </button>
          )}
        </div>
      </div>
      <button
        className="btn-primary"
        style={{ marginTop: 16 }}
        disabled={!canProceed}
        onClick={() => navigate('/looks/finding')}
      >
        Find My Looks
      </button>
    </ScreenShell>
  );
}
