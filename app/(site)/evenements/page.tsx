import type { Metadata } from 'next'
import EvenementsPageView from './page-view'

export const metadata: Metadata = {
  title: 'Espace événements',
  description: 'Anniversaires, mariages, cérémonies, baptêmes, événements corporate ou culturels : demandez votre proposition personnalisée.',
}

export default function Page() {
  return <EvenementsPageView />
}
