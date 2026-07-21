import { createContext, useContext, useState, type ReactNode } from 'react';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { LookPalette } from '../lib/faceRender';

export interface Look {
  id: string;
  name: string;
  tagline: string;
  steps: number;
  time: string;
  coverage: string;
  palette: LookPalette;
}

interface SessionState {
  selfieImage: HTMLImageElement | null;
  landmarks: NormalizedLandmark[] | null;
  looks: Look[];
  compareIds: string[];
  activeLookId: string | null;
  stepIndex: number;
  rating: number;
}

interface SessionContextValue extends SessionState {
  setSelfieImage: (img: HTMLImageElement | null) => void;
  setLandmarks: (l: NormalizedLandmark[] | null) => void;
  setLooks: (looks: Look[]) => void;
  toggleCompare: (id: string) => void;
  setActiveLookId: (id: string | null) => void;
  setStepIndex: (i: number) => void;
  setRating: (r: number) => void;
  reset: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [selfieImage, setSelfieImage] = useState<HTMLImageElement | null>(null);
  const [landmarks, setLandmarks] = useState<NormalizedLandmark[] | null>(null);
  const [looks, setLooks] = useState<Look[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [activeLookId, setActiveLookId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [rating, setRating] = useState(0);

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      const next = [...prev, id];
      return next.length > 3 ? next.slice(1) : next;
    });
  }

  function reset() {
    setCompareIds([]);
    setActiveLookId(null);
    setStepIndex(0);
    setRating(0);
  }

  const value: SessionContextValue = {
    selfieImage,
    landmarks,
    looks,
    compareIds,
    activeLookId,
    stepIndex,
    rating,
    setSelfieImage,
    setLandmarks,
    setLooks,
    toggleCompare,
    setActiveLookId,
    setStepIndex,
    setRating,
    reset,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
}
