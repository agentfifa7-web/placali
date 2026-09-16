import type { Metadata } from 'next'
import ReservationPageView from './page-view'

export const metadata: Metadata = {
  title: 'Réserver une table',
  description: 'Table classique, espace privé, anniversaire, dîner en couple, repas professionnel ou groupe — réservez en quelques secondes.',
}

export default function Page() {
  return <ReservationPageView />
}
