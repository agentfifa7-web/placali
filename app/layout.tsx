import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/store'

export const metadata: Metadata = {
  metadataBase: new URL('https://placali-aboure.example'),
  title: { default: 'Placali Abouré — Cuisine ivoirienne à Abidjan', template: '%s · Placali Abouré' },
  description: 'Une cuisine généreuse, des recettes transmises et la chaleur de la Côte d’Ivoire, au cœur de Cocody, Zone 4 et Bingerville.',
  generator: 'v0.app',
  icons: { icon: '/images/logo.png', apple: '/images/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'fr_CI',
    siteName: 'Placali Abouré',
    title: 'Placali Abouré — Cuisine ivoirienne à Abidjan',
    description: 'Commande, livraison, réservation, fidélité et événements : l’écosystème digital de la gastronomie ivoirienne.',
    images: ['/images/dish-crabe-sauce.jpg'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
