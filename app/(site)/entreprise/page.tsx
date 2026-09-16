import type { Metadata } from 'next'
import EntreprisePageView from './page-view'

export const metadata: Metadata = {
  title: 'Espace entreprise',
  description: 'Plateaux repas, déjeuners d’entreprise, séminaires et facturation groupée : la gastronomie ivoirienne au bureau.',
}

export default function Page() {
  return <EntreprisePageView />
}
