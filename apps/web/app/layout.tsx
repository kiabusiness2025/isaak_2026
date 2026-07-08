import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { siteMeta } from '@isaak/content';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.siteUrl),
  title: {
    default: siteMeta.title,
    template: '%s · Isaak',
  },
  description: siteMeta.description,
  manifest: '/manifest.json',
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.siteUrl,
    siteName: siteMeta.siteName,
    images: [{ url: siteMeta.ogImage }],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMeta.title,
    description: siteMeta.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#3D2A1F',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Isaak',
  url: siteMeta.siteUrl,
  description: siteMeta.description,
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Isaak',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: siteMeta.description,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-chocolate antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <MotionConfig reducedMotion="user">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </MotionConfig>
      </body>
    </html>
  );
}
