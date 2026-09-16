'use client'

import Link from 'next/link'
import { ArrowRight, Gift, Sparkles, Trophy } from 'lucide-react'
import { useAccount, nextTierThreshold, tierForPoints, type LoyaltyTier } from '@/lib/store'
import { challenges } from '@/lib/data/content'

const tiers: { tier: LoyaltyTier; threshold: number; perks: string[] }[] = [
  { tier: 'Abouré Bronze', threshold: 0, perks: ['Points sur chaque commande', 'Offres anniversaire'] },
  { tier: 'Abouré Silver', threshold: 1000, perks: ['Livraison prioritaire', '-5% sur la carte'] },
  { tier: 'Abouré Gold', threshold: 3000, perks: ['Plats gratuits réguliers', 'Accès événements privés'] },
  { tier: 'Abouré VIP', threshold: 7000, perks: ['Table réservée en priorité', 'Cadeaux exclusifs'] },
]

const rewards = [
  { points: 500, label: 'Boisson offerte' },
  { points: 1200, label: 'Dessert offert' },
  { points: 2500, label: 'Plat gratuit au choix' },
  { points: 5000, label: 'Accès à un événement privé Abouré' },
]

export default function FidelitePage() {
  const account = useAccount()
  const tier = tierForPoints(account.points)
  const next = nextTierThreshold(account.points)
  const currentThreshold = tiers.find((entry) => entry.tier === tier)!.threshold
  const progress = next ? Math.min(100, ((account.points - currentThreshold) / (next - currentThreshold)) * 100) : 100

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Programme de fidélité</span>
        <h1>
          Bienvenue au
          <br />
          <i>Abouré Club.</i>
        </h1>
        <p>1 000 FCFA dépensé = 10 points. Vos points débloquent plats gratuits, réductions, boissons offertes et accès à des événements privés.</p>
      </section>

      <section className="shell">
        <div className="card" style={{ marginBottom: 50, padding: 30 }}>
          {account.isAuthenticated ? (
            <>
              <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className={`tier-badge tier-${tier.split(' ')[1].toLowerCase()}`}>{tier}</span>
                <strong style={{ fontFamily: "'Playfair Display',serif", fontSize: 24 }}>{account.points} pts</strong>
              </div>
              <div style={{ background: 'var(--line)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                <div style={{ background: 'var(--terracotta)', height: '100%', width: `${progress}%`, transition: 'width .4s' }} />
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>{next ? `${next - account.points} points avant le niveau suivant.` : 'Vous avez atteint le niveau le plus élevé !'}</p>
            </>
          ) : (
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0 }}>Connectez-vous pour suivre vos points et débloquer vos récompenses.</p>
              <Link className="button button-dark" href="/connexion">
                Se connecter
              </Link>
            </div>
          )}
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Niveaux</p>
            <h2>
              Progressez <i>avec nous.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 60 }} className="event-grid">
          {tiers.map((entry) => (
            <div key={entry.tier} className={`card ${entry.tier === tier ? '' : ''}`} style={{ border: entry.tier === tier ? '2px solid var(--terracotta)' : '1px solid var(--line)', padding: 24 }}>
              <span className={`tier-badge tier-${entry.tier.split(' ')[1].toLowerCase()}`}>{entry.tier.split(' ')[1]}</span>
              <p style={{ color: 'var(--muted)', fontSize: 11, margin: '12px 0' }}>{entry.threshold}+ points</p>
              <ul style={{ display: 'flex', flexDirection: 'column', fontSize: 12, gap: 6, listStyle: 'none', margin: 0, padding: 0 }}>
                {entry.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Récompenses</p>
            <h2>
              À échanger <i>contre vos points.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 60 }} className="event-grid">
          {rewards.map((reward) => (
            <div key={reward.label} className="card" style={{ padding: 22, textAlign: 'center' }}>
              <Gift size={24} style={{ color: 'var(--terracotta)', margin: '0 auto 12px' }} />
              <strong style={{ display: 'block', fontFamily: "'Playfair Display',serif", fontSize: 18 }}>{reward.label}</strong>
              <span style={{ color: 'var(--muted)', fontSize: 11 }}>{reward.points} points</span>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <div>
            <p className="eyebrow">Gamification</p>
            <h2>
              Défis <i>Abouré.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {challenges.map((challenge) => (
            <div key={challenge.id} className="card" style={{ padding: 22 }}>
              <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                  <Trophy size={17} style={{ color: 'var(--saffron)' }} />
                  <strong style={{ fontSize: 14 }}>{challenge.title}</strong>
                </div>
                <span style={{ color: 'var(--muted)', fontSize: 11 }}>{challenge.reward}</span>
              </div>
              <div style={{ background: 'var(--line)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                <div style={{ background: 'var(--forest)', height: '100%', width: `${(challenge.progress / challenge.goal) * 100}%` }} />
              </div>
              <span style={{ color: 'var(--muted)', fontSize: 11 }}>
                {challenge.progress}/{challenge.goal}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="reservation-banner">
        <div>
          <p className="eyebrow light">
            <Sparkles size={13} style={{ display: 'inline', marginRight: 6 }} />
            Rejoignez le club
          </p>
          <h2>
            Chaque repas
            <br />
            <i>vous rapproche.</i>
          </h2>
        </div>
        <Link className="button button-light" href="/menu">
          Commander &amp; gagner des points <ArrowRight size={17} />
        </Link>
      </section>
    </>
  )
}
