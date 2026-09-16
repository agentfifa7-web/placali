import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Placali Abouré — Cuisine ivoirienne à Abidjan',
  description: 'Une cuisine généreuse, des recettes transmises et la chaleur de la Côte d’Ivoire, au cœur de Cocody.',
  generator: 'v0.app',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>
}
