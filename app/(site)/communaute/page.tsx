import type { Metadata } from 'next'
import { clientOfWeek, communityPosts, testimonials } from '@/lib/data/content'
import { Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Communauté',
  description: '#MonPlacaliAbouré : la communauté, la galerie et les avis clients.',
}

export default function CommunautePage() {
  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Espace communauté</span>
        <h1>
          #MonPlacali
          <br />
          <i>Abouré.</i>
        </h1>
        <p>Partagez vos photos et retrouvez la communauté Abouré sur Instagram et TikTok.</p>
      </section>

      <section className="shell">
        <div className="card" style={{ alignItems: 'center', display: 'flex', gap: 24, marginBottom: 50, padding: 26 }}>
          <div className="dish-image" style={{ aspectRatio: '1', flexShrink: 0, width: 110 }}>
            <img src={clientOfWeek.image} alt={clientOfWeek.name} />
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 6 }}>
              Client de la semaine
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 500, margin: '0 0 6px' }}>{clientOfWeek.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, fontStyle: 'italic', margin: 0 }}>“{clientOfWeek.quote}”</p>
          </div>
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Galerie</p>
            <h2>
              La communauté <i>en images.</i>
            </h2>
          </div>
        </div>
        <div className="insta-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 60 }}>
          {communityPosts.map((post) => (
            <div className="insta-tile" key={post.user}>
              <img src={post.image} alt={post.caption} />
              <span>
                {post.user} · {post.caption}
              </span>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Avis clients</p>
            <h2>
              Ce que <i>vous en pensez.</i>
            </h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={13} fill={index < testimonial.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
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
