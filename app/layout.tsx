import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SoundProvider } from '@/contexts/SoundContext';
import { UserProvider } from '@/contexts/UserContext';
import ProgressWrapper from '@/components/ProgressWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kid Quiz – Practice, Learn & Enjoy',
  description: 'Practice Math, Science, English, and more. Learn at your own pace and enjoy quizzes for kids.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <ProgressWrapper>
            <SettingsProvider>
              <SoundProvider>
                {children}
              </SoundProvider>
            </SettingsProvider>
          </ProgressWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
