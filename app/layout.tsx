import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Neuton } from 'next/font/google';
import './globals.css';

// Self-hosted at build time via next/font — no runtime CDN dependency.
// Neuton ships 400/700 normal and 400 italic.
const neuton = Neuton({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-neuton',
});

const SITE_URL = 'https://mrmanny.github.io';
const TITLE = 'Manuel Warum — AI Software Engineer (AIDLC)';
const DESCRIPTION =
  'Portfolio of Manuel Warum, IT professional in AI-assisted software engineering (AIDLC) — the whole development life cycle, from first prompt to shipped code. Open to AI engineering roles.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
    // llms.txt spec discovery: the clean markdown edition of this page
    // (public/index.md), linked as rel="alternate" type="text/markdown".
    types: { 'text/markdown': '/index.md' },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Manuel Warum',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Manuel Warum — AI Software Engineer: a fantasy artificer repairing a robot amid monitors full of code',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

// Person entity for search engines: ties the site to the name and to the
// external profiles listed in /llms.txt.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Manuel Warum',
  url: SITE_URL,
  jobTitle: 'AI Software Engineer',
  description: DESCRIPTION,
  image: `${SITE_URL}/og-image.png`,
  sameAs: [
    'https://github.com/MrManny',
    'https://www.linkedin.com/in/manuel-w-a54850235',
    'https://www.openstreetmap.org/user/MrManny',
    'https://www.researchgate.net/profile/Manuel-Warum',
  ],
  knowsAbout: [
    'AI-assisted software engineering',
    'AI development life cycle (AIDLC)',
    'LLM-assisted software development',
    'OpenStreetMap',
    'Open data',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={neuton.variable}>
      <body>
        {/* llms.txt spec discovery: the file describing this page. React
            hoists link elements into <head>. */}
        <link rel="describedby" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
