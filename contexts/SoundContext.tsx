'use client';

import { createContext, useContext, ReactNode } from 'react';

interface SoundContextType {
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playClick: () => void;
  playQuizComplete: () => void;
  playEncouragement: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const noop = () => {};

export function SoundProvider({ children }: { children: ReactNode }) {
  return (
    <SoundContext.Provider
      value={{
        playBackgroundMusic: noop,
        stopBackgroundMusic: noop,
        playClick: noop,
        playQuizComplete: noop,
        playEncouragement: noop,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
