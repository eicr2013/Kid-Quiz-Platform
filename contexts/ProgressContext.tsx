'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CategoryProgress {
  category: string;
  subject: string;
  totalAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  lastPracticed: string;
}

export interface UserProgress {
  categories: Map<string, CategoryProgress>;
}

interface ProgressContextType {
  progress: UserProgress;
  recordAnswer: (category: string, isCorrect: boolean, subject?: string) => void;
  getWeakCategories: (subject?: string) => CategoryProgress[];
  getStrongCategories: (subject?: string) => CategoryProgress[];
  getAllProgress: (subject?: string) => CategoryProgress[];
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children, userName }: { children: ReactNode; userName: string | null }) {
  const [progress, setProgress] = useState<UserProgress>({
    categories: new Map(),
  });

  // Load progress from browser only (privacy: no server/database storage)
  useEffect(() => {
    if (!userName) {
      setProgress({ categories: new Map() });
      return;
    }

    const storageKey = `quizProgress_${userName}`;
    const savedProgress = localStorage.getItem(storageKey);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        const categoriesMap = new Map(
          Object.entries(parsed.categories || {}).map(([key, value]: [string, any]) => [
            key,
            { ...value, subject: value.subject || 'Mathematics' },
          ])
        );
        setProgress({ categories: categoriesMap });
      } catch {
        setProgress({ categories: new Map() });
      }
    } else {
      setProgress({ categories: new Map() });
    }
  }, [userName]);

  const recordAnswer = (category: string, isCorrect: boolean, subject: string = 'Mathematics') => {
    if (!userName) return;

    setProgress((prev) => {
      const newCategories = new Map(prev.categories);
      const key = `${subject}:${category}`;
      const existing = newCategories.get(key) || {
        category,
        subject,
        totalAttempted: 0,
        totalCorrect: 0,
        totalWrong: 0,
        lastPracticed: new Date().toISOString(),
      };

      const updated: CategoryProgress = {
        ...existing,
        totalAttempted: existing.totalAttempted + 1,
        totalCorrect: existing.totalCorrect + (isCorrect ? 1 : 0),
        totalWrong: existing.totalWrong + (isCorrect ? 0 : 1),
        lastPracticed: new Date().toISOString(),
      };

      newCategories.set(key, updated);

      const storageKey = `quizProgress_${userName}`;
      const toSave = { categories: Object.fromEntries(newCategories) };
      localStorage.setItem(storageKey, JSON.stringify(toSave));
      // Progress is stored only in the browser; not sent to any server (privacy)

      return { categories: newCategories };
    });
  };

  const getAllProgress = (subject?: string): CategoryProgress[] => {
    const all = Array.from(progress.categories.values());
    return subject ? all.filter(cat => cat.subject === subject) : all;
  };

  const getWeakCategories = (subject?: string): CategoryProgress[] => {
    const all = getAllProgress(subject);
    const sorted = all
      .filter((cat) => cat.totalAttempted >= 3) // Only consider categories with at least 3 attempts
      .sort((a, b) => {
        const aRate = a.totalCorrect / a.totalAttempted;
        const bRate = b.totalCorrect / b.totalAttempted;
        return aRate - bRate; // Ascending order: lowest rates first (weakest)
      });
    
    // Only show as weak if success rate is below 75%
    return sorted.filter(cat => {
      const rate = cat.totalCorrect / cat.totalAttempted;
      return rate < 0.75;
    }).slice(0, 5);
  };

  const getStrongCategories = (subject?: string): CategoryProgress[] => {
    const all = getAllProgress(subject);
    const sorted = all
      .filter((cat) => cat.totalAttempted >= 3)
      .sort((a, b) => {
        const aRate = a.totalCorrect / a.totalAttempted;
        const bRate = b.totalCorrect / b.totalAttempted;
        return bRate - aRate; // Descending order: highest rates first (strongest)
      });
    
    // Only show as strong if success rate is 75% or above
    return sorted.filter(cat => {
      const rate = cat.totalCorrect / cat.totalAttempted;
      return rate >= 0.75;
    }).slice(0, 5);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        recordAnswer,
        getWeakCategories,
        getStrongCategories,
        getAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
