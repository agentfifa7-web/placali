import type { Metadata } from 'next'
import OrderTrackingPageView from './page-view'

export const metadata: Metadata = {
  title: 'Suivi de commande',
  robots: { index: false, follow: false },
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <OrderTrackingPageView params={params} />
}
