import type { Metadata } from 'next'
import FidelitePageView from './page-view'

export const metadata: Metadata = {
  title: 'Programme de fidélité',
  description: 'Rejoignez l’Abouré Club : 1 000 FCFA dépensé = 10 points, plats gratuits, réductions et accès à des événements privés.',
}

export default function Page() {
  return <FidelitePageView />
}
