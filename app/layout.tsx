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

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={neuton.variable}>
      <body>{children}</body>
    </html>
  );
}
