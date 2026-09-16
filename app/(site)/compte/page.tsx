import type { Metadata } from 'next'
import ComptePageView from './page-view'

export const metadata: Metadata = {
  title: 'Mon espace client',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ComptePageView />
}
