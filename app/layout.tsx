import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { UserProvider } from '@/contexts/UserContext';
import ProgressWrapper from '@/components/ProgressWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kids Math Quiz - Learn & Have Fun!',
  description: 'Educational quiz platform for children to practice math skills',
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
              {children}
            </SettingsProvider>
          </ProgressWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
