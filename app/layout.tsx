import type { Metadata } from 'next'
import { Geist, Geist_Mono, Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GoogleReCaptchaProvider } from '@/components/recaptcha-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { SupportButton } from '@/components/support-button'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });
const _outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'FluxoreAI',
  description: 'FluxoreAI',
  generator: 'FluxoreAI',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_outfit.variable} ${_jetbrainsMono.variable} ${_geist.variable} ${_geistMono.variable}`}>
      <body className="font-sans antialiased bg-black min-h-screen flex flex-col">
        <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
          {children}
          <SupportButton />
          <CookieConsent />
          <Analytics />
        </GoogleReCaptchaProvider>
      </body>
    </html>
  )
}
