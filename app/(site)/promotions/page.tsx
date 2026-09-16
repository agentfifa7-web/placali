import type { Metadata } from 'next'
import PromotionsPageView from './page-view'

export const metadata: Metadata = {
  title: 'Promotions',
  description: 'Menu famille, offre déjeuner, after-work, weekend Abouré : profitez de nos codes promotionnels.',
}

export default function Page() {
  return <PromotionsPageView />
}
