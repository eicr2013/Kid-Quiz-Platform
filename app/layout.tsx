import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { SoundProvider } from '@/contexts/SoundContext';
import { UserProvider } from '@/contexts/UserContext';
import ProgressWrapper from '@/components/ProgressWrapper';

const inter = Inter({ subsets: ['latin'] });

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Kid Quiz – Practice, Learn & Enjoy',
  description: 'Practice Math, Science, English, and more. Learn at your own pace and enjoy quizzes for kids.',
  openGraph: {
    title: 'Kid Quiz – Practice, Learn & Enjoy',
    description: 'Practice Math, Science, English, and more. Learn at your own pace and enjoy quizzes for kids.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kid Quiz – Practice, Learn & Enjoy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kid Quiz – Practice, Learn & Enjoy',
    description: 'Practice Math, Science, English, and more. Learn at your own pace and enjoy quizzes for kids.',
  },
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
