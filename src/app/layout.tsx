import type { Metadata } from 'next'
import { Cinzel, Crimson_Text, Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryProvider } from '@/lib/query-client'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Arkadia — Jeux de Société',
    template: '%s | Arkadia',
  },
  description:
    'Découvrez et réservez des soirées jeux de société à Arkadia. Stratégie, coopératif, ambiance — votre prochain événement vous attend.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="fr"
        suppressHydrationWarning
        className={`${cinzel.variable} ${crimsonText.variable} ${inter.variable}`}
      >
        <body className="font-sans antialiased">
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
          <Toaster richColors position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  )
}
