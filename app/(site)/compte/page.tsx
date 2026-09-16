'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Gift, Heart, LogOut, MapPin, Star, User } from 'lucide-react'
import { useAccount, tierForPoints } from '@/lib/store'
import { dishes } from '@/lib/data/dishes'
import { formatFCFA } from '@/lib/format'

const tabs = ['Profil', 'Mes commandes', 'Mes favoris', 'Mes récompenses', 'Mes réservations', 'Mes coupons'] as const

export default function ComptePage() {
  const account = useAccount()
  const [tab, setTab] = useState<(typeof tabs)[number]>('Profil')

  if (!account.isAuthenticated) {
    return (
      <section className="shell" style={{ textAlign: 'center' }}>
        <User size={36} style={{ color: 'var(--terracotta)', margin: '0 auto 18px' }} />
        <p className="eyebrow">Espace client</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, margin: '10px 0 24px' }}>
          Connectez-vous pour <i style={{ color: 'var(--terracotta)' }}>accéder à votre espace.</i>
        </h1>
        <Link className="button button-gold" href="/connexion" style={{ display: 'inline-flex' }}>
          Se connecter <ArrowRight size={17} />
        </Link>
      </section>
    )
  }

  const favoriteDishes = dishes.filter((dish) => account.favorites.includes(dish.id))

  return (
    <>
      <section className="page-hero" style={{ padding: '150px 11% 55px' }}>
        <span className="crumb">Espace client</span>
        <h1>
          Bonjour <i>{account.user?.name.split(' ')[0] || ''}.</i>
        </h1>
      </section>
      <section className="shell">
        <div className="category-tabs" role="tablist" style={{ flexWrap: 'wrap' }}>
          {tabs.map((entry) => (
            <button key={entry} role="tab" aria-selected={tab === entry} className={tab === entry ? 'active' : ''} onClick={() => setTab(entry)}>
              {entry}
            </button>
          ))}
        </div>

        {tab === 'Profil' && (
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr', marginTop: 30 }} className="builder-grid">
            <div className="card" style={{ padding: 28 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>
                Mon profil
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
                <span>
                  <strong>Nom :</strong> {account.user?.name}
                </span>
                <span>
                  <strong>Téléphone :</strong> {account.user?.phone}
                </span>
                <span>
                  <strong>E-mail :</strong> {account.user?.email || '—'}
                </span>
              </div>
              <button className="text-link" onClick={account.logout} style={{ marginTop: 22 }}>
                <LogOut size={15} /> Se déconnecter
              </button>
            </div>
            <div className="card" style={{ padding: 28 }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>
                Statut Abouré Club
              </p>
              <span className={`tier-badge tier-${tierForPoints(account.points).split(' ')[1].toLowerCase()}`}>{tierForPoints(account.points)}</span>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 16 }}>{account.points} points cumulés.</p>
              <Link className="text-link" href="/fidelite" style={{ marginTop: 10 }}>
                Voir le programme <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {tab === 'Mes commandes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            {account.orders.length === 0 && <p style={{ color: 'var(--muted)' }}>Aucune commande pour le moment.</p>}
            {account.orders.map((order) => (
              <Link href={`/commande/${order.id}`} key={order.id} className="card" style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '18px 22px' }}>
                <div>
                  <strong>#{order.id}</strong>
                  <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0 0' }}>
                    {new Date(order.date).toLocaleDateString('fr-FR')} · {order.restaurant}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="chip">{order.status}</span>
                  <p style={{ fontWeight: 700, margin: '8px 0 0' }}>{formatFCFA(order.total)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === 'Mes favoris' && (
          <div className="dish-grid" style={{ marginTop: 30 }}>
            {favoriteDishes.length === 0 && <p style={{ color: 'var(--muted)' }}>Ajoutez des plats en favoris depuis la carte pour les retrouver ici.</p>}
            {favoriteDishes.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />
                  <button className="add-button" onClick={() => account.toggleFavorite(dish.id)} aria-label="Retirer des favoris">
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="dish-info">
                  <div>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                  </div>
                  <strong>{formatFCFA(dish.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === 'Mes récompenses' && (
          <div className="stat-tile" style={{ marginTop: 30, maxWidth: 360 }}>
            <span>Points Abouré Club</span>
            <strong>
              <Star size={22} style={{ color: 'var(--saffron)', marginRight: 8, verticalAlign: 'middle' }} fill="currentColor" />
              {account.points}
            </strong>
            <Link className="text-link" href="/fidelite" style={{ marginTop: 14 }}>
              Échanger mes points <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {tab === 'Mes réservations' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            {account.reservations.length === 0 && <p style={{ color: 'var(--muted)' }}>Aucune réservation à venir.</p>}
            {account.reservations.map((reservation) => (
              <div key={reservation.id} className="card" style={{ alignItems: 'center', display: 'flex', gap: 16, padding: '18px 22px' }}>
                <MapPin size={18} style={{ color: 'var(--terracotta)' }} />
                <div>
                  <strong>
                    {reservation.type} · {reservation.restaurant}
                  </strong>
                  <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0 0' }}>
                    {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.time} · {reservation.guests} pers.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Mes coupons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            {account.coupons.length === 0 && <p style={{ color: 'var(--muted)' }}>Aucun coupon actif. Découvrez nos promotions.</p>}
            {account.coupons.map((code) => (
              <div key={code} className="card" style={{ alignItems: 'center', display: 'flex', gap: 14, padding: '16px 22px' }}>
                <Gift size={18} style={{ color: 'var(--terracotta)' }} />
                <strong>{code}</strong>
              </div>
            ))}
            <Link className="text-link" href="/promotions">
              Voir les promotions <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
