import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n-context';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pdf-metadata-editor-theta.vercel.app';

const siteDescription =
  'Edit PDF metadata (title, author, subject, keywords, creator, dates) directly in your browser. ' +
  '100% client-side — no uploads, no server processing, no data collection. Free and open source.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PDF Metadata Editor — Edit PDF Metadata Online Free',
    template: '%s | PDF Metadata Editor',
  },
  description: siteDescription,
  keywords: [
    'PDF metadata editor',
    'edit PDF metadata',
    'PDF title editor',
    'PDF author editor',
    'change PDF properties',
    'PDF metadata online',
    'client-side PDF editor',
    'free PDF tool',
    'PDF keywords editor',
    'pdf-lib',
  ],
  authors: [{ name: 'Breno Alvim', url: 'https://github.com/obrenoalvim' }],
  creator: 'Breno Alvim',
  category: 'developer tools',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'PDF Metadata Editor',
    title: 'PDF Metadata Editor — Edit PDF Metadata Online Free',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Metadata Editor — Edit PDF Metadata Online Free',
    description: siteDescription,
    creator: '@obrenoalvim',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF Metadata Editor',
  url: siteUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  description: siteDescription,
  featureList: [
    'Edit PDF title, author, subject, keywords',
    'Edit creator, producer, creation and modification dates',
    '100% client-side processing — no uploads',
    'Drag and drop file upload',
    'English and Portuguese (Brazil) support',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'Breno Alvim',
    url: 'https://github.com/obrenoalvim',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          {children}
          <Toaster position="bottom-right" />
        </I18nProvider>
      </body>
    </html>
  );
}
