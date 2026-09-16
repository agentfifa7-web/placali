'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Copy, Flame } from 'lucide-react'
import { promotions } from '@/lib/data/content'
import { useAccount } from '@/lib/store'

export default function PromotionsPage() {
  const { redeemCoupon } = useAccount()
  const [copied, setCopied] = useState<string | null>(null)

  function copyCode(code: string) {
    redeemCoupon(code)
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {})
    }
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Promotions</span>
        <h1>
          Les offres
          <br />
          <i>du moment.</i>
        </h1>
        <p>Menu famille, offre déjeuner, after-work, weekend Abouré : profitez de nos codes promotionnels directement au panier.</p>
      </section>

      <section className="shell">
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(3,1fr)' }} className="event-grid">
          {promotions.map((promo) => (
            <div key={promo.code} className="card" style={{ overflow: 'hidden' }}>
              <div className="dish-image" style={{ aspectRatio: '1.4' }}>
                <img src={promo.image} alt={promo.title} />
                <span className="dish-tag">
                  <Flame size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  {promo.discount}
                </span>
              </div>
              <div style={{ padding: '20px 22px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, margin: '0 0 8px' }}>{promo.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 12.5, lineHeight: 1.6, margin: '0 0 18px' }}>{promo.description}</p>
                <button onClick={() => copyCode(promo.code)} className="chip" style={{ alignItems: 'center', display: 'inline-flex', gap: 8 }}>
                  {copied === promo.code ? <Check size={12} /> : <Copy size={12} />}
                  {promo.code}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reservation-banner">
        <div>
          <p className="eyebrow light">Envie de craquer ?</p>
          <h2>
            Utilisez votre
            <br />
            <i>code au panier.</i>
          </h2>
        </div>
        <Link className="button button-light" href="/commander">
          Aller au panier <ArrowRight size={17} />
        </Link>
      </section>
    </>
  )
}
