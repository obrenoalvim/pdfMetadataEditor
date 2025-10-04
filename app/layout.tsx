import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n-context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDF Metadata Editor',
  description: 'Edit PDF metadata directly in your browser - 100% client-side, no uploads',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <Toaster position="bottom-right" />
        </I18nProvider>
      </body>
    </html>
  );
}
