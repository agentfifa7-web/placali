import type { Metadata } from 'next'
import PaiementPageView from './page-view'

export const metadata: Metadata = {
  title: 'Paiement',
  robots: { index: false, follow: true },
}

export default function Page() {
  return <PaiementPageView />
}
