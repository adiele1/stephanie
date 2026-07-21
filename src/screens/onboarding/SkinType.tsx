import { useNavigate } from 'react-router-dom';
import { useOnboarding, type SkinType as SkinTypeValue } from '../../state/OnboardingContext';
import { MoodChip, TILE_PALETTE } from '../../components/ChoiceControls';
import { ScreenShell, StepHeader, NextButton } from '../../components/OnboardingChrome';

const OPTIONS: { value: SkinTypeValue; emoji: string }[] = [
  { value: 'Oily', emoji: '💧' },
  { value: 'Dry', emoji: '🍂' },
  { value: 'Combination', emoji: '🌗' },
  { value: 'Normal', emoji: '🌸' },
  { value: 'Sensitive', emoji: '🌿' },
];

export function SkinType() {
  const navigate = useNavigate();
  const { skinType, setSkinType } = useOnboarding();

  return (
    <ScreenShell>
      <StepHeader back="/onboarding" progress={16} />
      <h2 style={{ fontWeight: 600, fontSize: 22, margin: '18px 0 5px' }}>What's your skin type?</h2>
      <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 18px' }}>
        So we can recommend products that actually work for you.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, overflowY: 'auto' }}>
        {OPTIONS.map((opt, i) => (
          <MoodChip
            key={opt.value}
            emoji={opt.emoji}
            label={opt.value}
            selected={skinType === opt.value}
            tile={TILE_PALETTE[i % TILE_PALETTE.length]}
            onClick={() => setSkinType(opt.value)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <NextButton disabled={!skinType} onClick={() => navigate('/onboarding/skill')}>
        Next
      </NextButton>
    </ScreenShell>
  );
}
