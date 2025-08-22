
import '../styles/globals.css';
import '../styles/layout.css';
import '../styles/home-page.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  metadataBase: new URL('https://paddle-billing.vercel.app'),
  title: 'Fundación Batta',
  description:
    'Fundación Batta is a powerful team design collaboration app and image editor. With plans for businesses of all sizes, streamline your workflow with real-time collaboration, advanced editing tools, and seamless project management.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="min-h-full" style={{ background: '#fff', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}