import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SITE_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Peculiar AI Labs | Building AI That\'s Different',
    template: '%s | Peculiar AI Labs',
  },
  description: 'Building AI that\'s different. Solutions that make a difference. Kinetic Cybernetic AI engineering for teams in constrained, real-world environments.',
  keywords: ['AI Consulting', 'Business Automation', 'Artificial Intelligence', 'Workflow Optimization', 'AI Strategy', 'Peculiar AI'],
  authors: [{ name: 'Peculiar AI' }],
  creator: 'Peculiar AI',
  publisher: 'Peculiar AI',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Peculiar AI',
    title: 'Peculiar AI Labs | Building AI That\'s Different',
    description: 'Building AI that\'s different. Solutions that make a difference. Kinetic Cybernetic AI engineering for teams in constrained, real-world environments.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Peculiar AI - Modern AI Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peculiar AI Labs | Building AI That\'s Different',
    description: 'Building AI that\'s different. Solutions that make a difference. Kinetic Cybernetic AI engineering for teams in constrained, real-world environments.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/icon-ai.png',
  },
};

import Chatbot from '@/components/Chatbot';

// Add favicon link (using branded icon) - Next.js will also pick up public/favicon.png / .ico automatically in many setups
// For best results, convert favicon.png to .ico or place in app/ folder later.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="antialiased relative" suppressHydrationWarning>
        {/* Background noise - must stay behind all content */}
        <div className="fixed inset-0 noise-overlay -z-10 pointer-events-none" />
        <Chatbot />
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Peculiar AI',
              image: `${SITE_URL}/og-image.png`,
              '@id': SITE_URL,
              url: SITE_URL,
              telephone: '+12405939636',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                addressLocality: 'Belize',
                addressCountry: 'BZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 17.1899,
                longitude: -88.4976,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday'
                ],
                opens: '09:00',
                closes: '17:00'
              },
              sameAs: [
                'https://twitter.com/peculiarai',
                'https://linkedin.com/company/peculiarai'
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
