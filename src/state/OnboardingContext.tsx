import { createContext, useContext, useState, type ReactNode } from 'react';

export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type Occasion =
  | 'Wedding Guest'
  | 'Date Night'
  | 'Interview'
  | 'Everyday'
  | 'Night Out'
  | 'Formal'
  | 'Other';

interface OnboardingState {
  skinType: SkinType | null;
  skill: SkillLevel | null;
  profession: string | null;
  occasion: Occasion | null;
  occasionOther: string;
  selfieFile: File | null;
  styleRefFile: File | null;
}

interface OnboardingContextValue extends OnboardingState {
  setSkinType: (v: SkinType) => void;
  setSkill: (v: SkillLevel) => void;
  setProfession: (v: string) => void;
  setOccasion: (v: Occasion) => void;
  setOccasionOther: (v: string) => void;
  setSelfieFile: (f: File | null) => void;
  setStyleRefFile: (f: File | null) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [skill, setSkill] = useState<SkillLevel | null>(null);
  const [profession, setProfession] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [occasionOther, setOccasionOther] = useState('');
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [styleRefFile, setStyleRefFile] = useState<File | null>(null);

  const value: OnboardingContextValue = {
    skinType,
    skill,
    profession,
    occasion,
    occasionOther,
    selfieFile,
    styleRefFile,
    setSkinType,
    setSkill,
    setProfession,
    setOccasion,
    setOccasionOther,
    setSelfieFile,
    setStyleRefFile,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
