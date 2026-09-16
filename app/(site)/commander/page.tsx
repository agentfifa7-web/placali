import type { Metadata } from 'next'
import CommanderPageView from './page-view'

export const metadata: Metadata = {
  title: 'Mon panier',
  robots: { index: false, follow: true },
}

export default function Page() {
  return <CommanderPageView />
}
