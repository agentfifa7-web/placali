import type { Metadata } from 'next'
import { chefs, producers } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Notre savoir-faire',
  description: 'Découvrez nos chefs et nos producteurs locaux : manioc, huile de palme, poissons de lagune et épices.',
}

export default function SavoirFairePage() {
  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Notre savoir-faire</span>
        <h1>
          Les mains
          <br />
          <i>derrière chaque plat.</i>
        </h1>
        <p>Nos chefs perpétuent les recettes traditionnelles ; nos producteurs garantissent la fraîcheur et l’origine de chaque ingrédient.</p>
      </section>

      <section className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">L’équipe</p>
            <h2>
              Nos <i>chefs.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(4,1fr)' }} className="event-grid">
          {chefs.map((chef) => (
            <div key={chef.name}>
              <div className="dish-image" style={{ aspectRatio: '0.85', marginBottom: 14 }}>
                <img src={chef.image} alt={chef.name} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 500, margin: '0 0 4px' }}>{chef.name}</h3>
              <p style={{ color: 'var(--terracotta)', fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '.05em' }}>{chef.specialty}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell-tight" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nos producteurs</p>
            <h2>
              De la terre <i>à l’assiette.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(4,1fr)' }} className="event-grid">
          {producers.map((producer) => (
            <div key={producer.name} className="card">
              <div className="dish-image" style={{ aspectRatio: '1.1' }}>
                <img src={producer.image} alt={producer.name} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 500, margin: '0 0 4px' }}>{producer.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 11, margin: 0 }}>{producer.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
