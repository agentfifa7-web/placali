import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/lib/data/content'

export const metadata: Metadata = {
  title: 'Magazine',
  description: 'Gastronomie, recettes traditionnelles, portraits de chefs et culture ivoirienne : le magazine Abouré.',
}

export default function MagazinePage() {
  const [hero, ...rest] = articles

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Magazine Abouré</span>
        <h1>
          Gastronomie,
          <br />
          <i>culture, récits.</i>
        </h1>
        <p>Recettes traditionnelles, portraits de chefs, origine des produits et culture ivoirienne : un espace éditorial pour prolonger l’expérience.</p>
      </section>

      <section className="shell">
        <Link href={`/magazine/${hero.slug}`} className="card restaurant-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', marginBottom: 50, overflow: 'hidden' }}>
          <div className="dish-image" style={{ aspectRatio: 'auto', minHeight: 320 }}>
            <img src={hero.image} alt={hero.title} />
          </div>
          <div style={{ padding: 32 }}>
            <p className="eyebrow">{hero.category}</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, lineHeight: 1.1, margin: '12px 0' }}>{hero.title}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{hero.excerpt}</p>
            <span className="text-link">
              Lire l’article <ArrowRight size={15} />
            </span>
          </div>
        </Link>

        <div style={{ display: 'grid', gap: 26, gridTemplateColumns: 'repeat(3,1fr)' }} className="event-grid">
          {rest.map((article) => (
            <Link href={`/magazine/${article.slug}`} key={article.slug} className="dish-card">
              <div className="dish-image">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="dish-info" style={{ display: 'block' }}>
                <p className="eyebrow" style={{ marginBottom: 6 }}>
                  {article.category}
                </p>
                <h3 style={{ fontSize: 18 }}>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
