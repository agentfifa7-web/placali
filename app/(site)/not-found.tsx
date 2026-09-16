import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', alignItems: 'center', display: 'flex' }}>
      <div>
        <span className="crumb">Erreur 404</span>
        <h1>
          Cette table
          <br />
          <i>n’existe pas.</i>
        </h1>
        <p>La page que vous cherchez a peut-être changé d’adresse ou n’a jamais été servie. Retournez à la carte ou à l’accueil.</p>
        <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
          <Link className="button button-gold" href="/">
            Retour à l’accueil <ArrowRight size={17} />
          </Link>
          <Link className="text-link light-link" href="/menu">
            Voir la carte
          </Link>
        </div>
      </div>
    </section>
  )
}
