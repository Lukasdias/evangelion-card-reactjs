import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vignette | Title Card Generator',
  description:
    'Create stylized title cards from your favorite movies, series, and anime. A chameleon-like design tool that adapts to each theme.',
  keywords: [
    'Vignette',
    'title card',
    'episode card',
    'generator',
    'anime',
    'movie',
    'series',
    'meme generator',
    'Evangelion',
    'Twin Peaks',
  ],
  authors: [{ name: 'Vignette' }],
  creator: 'Vignette',
  metadataBase: new URL('https://vignette.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vignette | Title Card Generator',
    description:
      'Create stylized title cards from your favorite movies, series, and anime.',
    url: '/',
    siteName: 'Vignette',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vignette | Title Card Generator',
    description:
      'Create stylized title cards from your favorite movies, series, and anime.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050508',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' dir='ltr'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
        <meta name='apple-mobile-web-app-title' content='Vignette' />
      </head>
      <body className={`${spaceGrotesk.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
