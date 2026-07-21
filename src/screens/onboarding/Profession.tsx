import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../state/OnboardingContext';
import { TileChip, TILE_PALETTE } from '../../components/ChoiceControls';
import { ScreenShell, StepHeader, NextButton } from '../../components/OnboardingChrome';

const OPTIONS = [
  { value: 'Student', emoji: '🎓' },
  { value: 'Corporate / Office', emoji: '💼' },
  { value: 'Creative / Artist', emoji: '🎨' },
  { value: 'Healthcare', emoji: '🩺' },
  { value: 'Hospitality / Service', emoji: '🛎️' },
  { value: 'Other', emoji: '⭐' },
];

export function Profession() {
  const navigate = useNavigate();
  const { profession, setProfession } = useOnboarding();

  return (
    <ScreenShell>
      <StepHeader back="/onboarding/skill" progress={50} />
      <h2 style={{ fontWeight: 600, fontSize: 22, margin: '18px 0 5px' }}>What do you do?</h2>
      <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 18px' }}>
        Helps us suggest looks that fit your day.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
        {OPTIONS.map((opt, i) => (
          <TileChip
            key={opt.value}
            label={`${opt.emoji} ${opt.value}`}
            selected={profession === opt.value}
            tile={TILE_PALETTE[i % TILE_PALETTE.length]}
            onClick={() => setProfession(opt.value)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <NextButton disabled={!profession} onClick={() => navigate('/onboarding/camera')}>
        Next
      </NextButton>
    </ScreenShell>
  );
}
