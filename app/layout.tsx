import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://mrmanny.github.io';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Manuel Warum',
    alternateName: 'Mr. Manny',
    url: SITE_URL,
    image: `${SITE_URL}/img/profile.png`,
    jobTitle:
      'Senior Software Engineer, Product Owner, Research Engineer, Generative AI Champion',
    worksFor: {
      '@type': 'Organization',
      name: 'Dynatrace',
      url: 'https://www.dynatrace.com/',
    },
    description:
      'AI product leader specializing in platform integrations, DevOps automation, and generative AI. Experienced in shipping AI-driven products at scale including MCP servers, CI/CD connectors, and site reliability tools.',
    knowsAbout: [
      'Artificial Intelligence',
      'Generative AI',
      'Large Language Models',
      'AI Agent Development',
      'Predictability',
      'Product Management',
      'DevOps',
      'Site Reliability Engineering',
      'Platform Engineering',
      'Model Context Protocol (MCP)',
      'CI/CD Pipeline Integrations',
      'Agile Product Ownership',
      '3D Printing',
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
  title: 'Manuel Warum — Senior Software Engineer and AI Champion',
  description:
    'Manuel Warum builds products at the intersection of AI, DevOps, and platform engineering. At Dynatrace, he leads product execution for AI-powered integrations and observability-driven workflows.',
  authors: [{ name: 'Manuel Warum', url: SITE_URL }],
  openGraph: {
    type: 'profile',
    title: 'Manuel Warum — Senior Software Engineer and AI Champion',
    description:
      'Manuel Warum builds products at the intersection of AI, DevOps, and platform engineering.',
    url: SITE_URL,
    siteName: 'Manuel Warum',
    images: [{ url: '/img/profile.png', width: 400, height: 400, alt: 'Manuel Warum' }],
    firstName: 'Manuel',
    lastName: 'Warum',
  },
  twitter: {
    card: 'summary',
    title: 'Manuel Warum — Senior Software Engineer and AI Champion',
    description:
      'Manuel Warum builds products at the intersection of AI, DevOps, and platform engineering.',
    images: ['/img/profile.png'],
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
    <html lang="en" className={inter.variable}>
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
