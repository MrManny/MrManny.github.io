import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Self-hosted at build time via next/font — no runtime CDN dependency.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const viewport: Viewport = {
  themeColor: '#11110f',
};

const SITE_URL = 'https://mrmanny.github.io';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Manuel Warum',
    alternateName: 'Mr. Manny',
    url: SITE_URL,
    image: `${SITE_URL}/img/profile.webp`,
    jobTitle: 'IT Professional, AI-Assisted Software Engineering',
    worksFor: {
      '@type': 'Organization',
      name: 'Dynatrace',
      url: 'https://www.dynatrace.com/',
    },
    description:
      'Works in the IT industry on AI-assisted software engineering (AIDLC), follows technological developments, and contributes to open data such as OpenStreetMap.',
    knowsAbout: [
      'Information Technology',
      'Artificial Intelligence',
      'AI-Assisted Software Engineering',
      'AI Development Life Cycle (AIDLC)',
      'Technological Developments',
      'Open Data',
      'OpenStreetMap',
      'Geographic Information Systems',
    ],
    sameAs: [
      'https://www.linkedin.com/in/manuel-w-a54850235/',
      'https://github.com/MrManny',
      'https://www.openstreetmap.org/user/MrManny',
      'https://www.researchgate.net/profile/Manuel-Warum',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'German', alternateName: 'de' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Manuel Warum — IT and AI-Assisted Software Engineering',
  description:
    'Manuel Warum works in the IT industry on AI-assisted software engineering (AIDLC), follows technological developments, and contributes to open data such as OpenStreetMap.',
  authors: [{ name: 'Manuel Warum', url: SITE_URL }],
  openGraph: {
    type: 'profile',
    title: 'Manuel Warum — IT and AI-Assisted Software Engineering',
    description:
      'Manuel Warum works in the IT industry on AI-assisted software engineering (AIDLC), follows technological developments, and contributes to open data such as OpenStreetMap.',
    url: SITE_URL,
    siteName: 'Manuel Warum',
    images: [{ url: '/img/profile.webp', width: 420, height: 420, alt: 'Manuel Warum' }],
    firstName: 'Manuel',
    lastName: 'Warum',
  },
  twitter: {
    card: 'summary',
    title: 'Manuel Warum — IT and AI-Assisted Software Engineering',
    description:
      'Manuel Warum works in the IT industry on AI-assisted software engineering (AIDLC), follows technological developments, and contributes to open data such as OpenStreetMap.',
    images: ['/img/profile.webp'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
