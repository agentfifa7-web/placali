import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/lib/data/content'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles.find((entry) => entry.slug === slug)
  if (!article) notFound()
  const others = articles.filter((entry) => entry.slug !== slug).slice(0, 3)

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: `url('${article.image}')` }}>
        <span className="crumb">
          Magazine · {article.category} · {article.date}
        </span>
        <h1>{article.title}</h1>
      </section>

      <section className="shell" style={{ maxWidth: 760, marginInline: 'auto' }}>
        <p style={{ color: 'var(--espresso)', fontSize: 16, lineHeight: 1.9 }}>{article.content}</p>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.9, marginTop: 20 }}>{article.excerpt}</p>
        <Link href="/magazine" className="text-link" style={{ marginTop: 30 }}>
          <ArrowRight size={15} style={{ transform: 'rotate(180deg)' }} /> Retour au magazine
        </Link>
      </section>

      <section className="shell-tight" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">À lire aussi</p>
            <h2>
              D’autres <i>récits.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 26, gridTemplateColumns: 'repeat(3,1fr)' }} className="event-grid">
          {others.map((entry) => (
            <Link href={`/magazine/${entry.slug}`} key={entry.slug} className="dish-card">
              <div className="dish-image">
                <img src={entry.image} alt={entry.title} />
              </div>
              <div className="dish-info" style={{ display: 'block' }}>
                <p className="eyebrow" style={{ marginBottom: 6 }}>
                  {entry.category}
                </p>
                <h3 style={{ fontSize: 18 }}>{entry.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
