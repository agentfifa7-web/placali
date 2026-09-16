import type { Metadata } from 'next'
import CartesCadeauxPageView from './page-view'

export const metadata: Metadata = {
  title: 'Cartes cadeaux',
  description: 'Offrez un moment Placali Abouré : la carte cadeau se partage par WhatsApp ou e-mail, avec un message personnalisé.',
}

export default function Page() {
  return <CartesCadeauxPageView />
}
