import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/lib/store'

export const metadata: Metadata = {
  title: 'Placali Abouré — Cuisine ivoirienne à Abidjan',
  description: 'Une cuisine généreuse, des recettes transmises et la chaleur de la Côte d’Ivoire, au cœur de Cocody, Zone 4 et Bingerville.',
  generator: 'v0.app',
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
