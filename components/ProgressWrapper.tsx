'use client';

import { ReactNode } from 'react';
import { ProgressProvider } from '@/contexts/ProgressContext';
import { useUser } from '@/contexts/UserContext';

export default function ProgressWrapper({ children }: { children: ReactNode }) {
  const { user } = useUser();
  
  return (
    <ProgressProvider userName={user?.name || null}>
      {children}
    </ProgressProvider>
  );
}
