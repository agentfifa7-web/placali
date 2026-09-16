import type { Metadata } from 'next'
import ConnexionPageView from './page-view'

export const metadata: Metadata = {
  title: 'Connexion',
  robots: { index: false, follow: true },
}

export default function Page() {
  return <ConnexionPageView />
}
