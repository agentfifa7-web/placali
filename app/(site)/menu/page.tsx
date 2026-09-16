import type { Metadata } from 'next'
import MenuPageView from './page-view'

export const metadata: Metadata = {
  title: 'La Carte',
  description: 'Menu digital interactif : Placali, grillades, boissons et desserts. Composez votre plat en 4 étapes.',
}

export default function Page() {
  return <MenuPageView />
}
