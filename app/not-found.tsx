import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Page introuvable · Placali Abouré' }

export default function GlobalNotFound() {
  return (
    <main style={{ alignItems: 'center', background: 'var(--espresso)', color: '#fff', display: 'flex', justifyContent: 'center', minHeight: '100vh', padding: '0 8%', textAlign: 'center' }}>
      <div>
        <p className="eyebrow light">Erreur 404</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(40px,6vw,64px)', margin: '16px 0' }}>
          Cette page <i style={{ color: 'var(--saffron)', fontStyle: 'italic' }}>n’existe pas.</i>
        </h1>
        <Link className="button button-gold" href="/" style={{ display: 'inline-flex', marginTop: 20 }}>
          Retour à l’accueil <ArrowRight size={17} />
        </Link>
      </div>
    </main>
  )
}
