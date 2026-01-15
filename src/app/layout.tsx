import type { Metadata } from 'next';
import { Geist, Playfair_Display, Poppins } from 'next/font/google';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['500'], // Medium for H1
});

const barlowCondensed = Poppins({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  weight: ['300', '600'], // Light (body), Semi-Bold (H2)
});

export const metadata: Metadata = {
  title: 'Born to Explore – Luxury Travel Experiences in Bhutan',
  description: 'Discover curated luxury travel experiences in Bhutan with Born to Explore. Explore bespoke journeys, exquisite stays, and unforgettable adventures in Thimphu and beyond.',
  
  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Born to Explore – Luxury Travel Experiences in Bhutan',
    description: 'Discover curated luxury travel experiences in Bhutan with Born to Explore. Explore bespoke journeys, exquisite stays, and unforgettable adventures in Thimphu and beyond.',
    url: 'https://www.borntoexplore.com', // replace with your website URL
    siteName: 'Born to Explore',
    images: [
      {
        url: '/images/logo/logo.png', // your default OG image
        width: 1200,
        height: 630,
        alt: 'Born to Explore – Luxury Travel in Bhutan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Born to Explore – Luxury Travel Experiences in Bhutan',
    description: 'Discover curated luxury travel experiences in Bhutan with Born to Explore.',
    images: ['/images/logo/logo.png'],
    site: '@BornToExplore',
  },

  keywords: [
    'Bhutan travel',
    'Luxury travel Bhutan',
    'Bespoke journeys Bhutan',
    'Exquisite stays Bhutan',
    'Born to Explore',
    'Thimphu tours',
    'Adventure travel Bhutan',
  ],

  authors: [{ name: 'Born to Explore', url: 'https://www.borntoexplore.com' }],
  category: 'Luxury Travel',
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} ${barlowCondensed.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
