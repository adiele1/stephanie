import { useNavigate } from 'react-router-dom';
import { useOnboarding, type SkillLevel } from '../../state/OnboardingContext';
import { OptionCard, TILE_PALETTE } from '../../components/ChoiceControls';
import { ScreenShell, StepHeader, NextButton } from '../../components/OnboardingChrome';

const OPTIONS: { value: SkillLevel; emoji: string; description: string }[] = [
  { value: 'Beginner', emoji: '🌱', description: 'New to makeup, keep it simple' },
  { value: 'Intermediate', emoji: '✨', description: 'Comfortable with the basics' },
  { value: 'Advanced', emoji: '💫', description: 'I know my way around a palette' },
];

export function Skill() {
  const navigate = useNavigate();
  const { skill, setSkill } = useOnboarding();

  return (
    <ScreenShell>
      <StepHeader back="/onboarding/skin-type" progress={33} />
      <h2 style={{ fontWeight: 600, fontSize: 22, margin: '18px 0 5px' }}>
        How would you describe your skill?
      </h2>
      <p style={{ fontSize: 13, color: 'var(--color-muted)', margin: '0 0 18px' }}>
        We'll pace the tutorials to match.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {OPTIONS.map((opt, i) => (
          <OptionCard
            key={opt.value}
            icon={opt.emoji}
            title={opt.value}
            description={opt.description}
            selected={skill === opt.value}
            tile={TILE_PALETTE[i % TILE_PALETTE.length]}
            onClick={() => setSkill(opt.value)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }} />
      <NextButton disabled={!skill} onClick={() => navigate('/onboarding/profession')}>
        Next
      </NextButton>
    </ScreenShell>
  );
}
