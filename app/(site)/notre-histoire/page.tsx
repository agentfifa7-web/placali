import type { Metadata } from 'next'
import { testimonials } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Notre histoire',
  description: 'Origine, fondateurs, évolution et valeurs de Placali Abouré, de la transmission familiale à l’écosystème digital.',
}

const milestones = [
  { year: '2011', title: 'Les origines', text: 'À Abouré, une grand-mère transmet ses recettes de placali à ses petits-enfants, autour du pilon familial.' },
  { year: '2018', title: 'Naissance du restaurant', text: 'Ouverture du premier Placali Abouré à Cocody, pour faire découvrir ce patrimoine culinaire au plus grand nombre.' },
  { year: '2022', title: 'Expansion', text: 'Deux nouvelles adresses ouvrent à Zone 4 et Bingerville, portées par la fidélité de nos clients.' },
  { year: '2026', title: 'L’écosystème digital', text: 'Placali Abouré devient une plateforme complète : commande, livraison, fidélité et événements.' },
]

export default function HistoirePage() {
  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Notre histoire</span>
        <h1>
          L’authenticité
          <br />
          <i>ivoirienne, racontée.</i>
        </h1>
        <p>Origine, fondateurs, évolution, valeurs et équipes : l’histoire d’une marque devenue ambassadrice de la gastronomie ivoirienne.</p>
      </section>

      <section className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Depuis les origines</p>
            <h2>
              Une transmission <i>de génération en génération.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {milestones.map((milestone, index) => (
            <div key={milestone.year} style={{ borderTop: index === 0 ? '1px solid var(--line)' : undefined, borderBottom: '1px solid var(--line)', display: 'grid', gap: 20, gridTemplateColumns: '120px 1fr', padding: '28px 0' }}>
              <strong style={{ color: 'var(--terracotta)', fontFamily: "'Playfair Display',serif", fontSize: 26 }}>{milestone.year}</strong>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, margin: '0 0 8px' }}>{milestone.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-photo photo-one" />
        <div className="story-photo photo-two" />
        <div className="story-copy">
          <p className="eyebrow">Nos valeurs</p>
          <h2>
            Partage,
            <br />
            <i>transmission.</i>
          </h2>
          <p>Le patrimoine culinaire ivoirien se vit et se partage. Chaque plat servi chez Placali Abouré est un hommage à celles et ceux qui l’ont façonné, génération après génération.</p>
        </div>
      </section>

      <section className="shell-tight" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Témoignages</p>
            <h2>
              Ce qu’ils <i>en disent.</i>
            </h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <p>“{testimonial.comment}”</p>
              <span>
                {testimonial.name} · {testimonial.location}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
