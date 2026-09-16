'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '@/lib/store'

const primaryLinks = [
  { href: '/menu', label: 'La carte' },
  { href: '/reservation', label: 'Réserver' },
  { href: '/evenements', label: 'Événements' },
  { href: '/restaurants', label: 'Nos restaurants' },
  { href: '/fidelite', label: 'Fidélité' },
  { href: '/magazine', label: 'Magazine' },
]

const moreLinks = [
  { href: '/notre-histoire', label: 'Notre histoire' },
  { href: '/savoir-faire', label: 'Notre savoir-faire' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/communaute', label: 'Communauté' },
  { href: '/entreprise', label: 'Espace entreprise' },
  { href: '/cartes-cadeaux', label: 'Cartes cadeaux' },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const { count } = useCart()

  return (
    <>
      <div className="topline">
        <span>Abidjan · Cocody · Zone 4 · Bingerville</span>
        <span className="topline-center">Ouvert aujourd’hui · 12h — 23h</span>
        <span>+225 07 07 07 07 07</span>
      </div>
      <header className="navbar">
        <Link href="/" className="brand" aria-label="Placali Abouré, accueil">
          <span className="brand-mark">PA</span>
          <span>
            <strong>PLACALI</strong>
            <em>ABOURÉ</em>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <div className="nav-more" onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button type="button" style={{ alignItems: 'center', background: 'none', border: 0, color: '#62574e', display: 'flex', fontSize: 12, fontWeight: 600, gap: 4 }}>
              Découvrir <ChevronDown size={13} />
            </button>
            {moreOpen && (
              <div className="nav-more-panel">
                {moreLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="nav-actions">
          <Link href="/compte" className="account-button" aria-label="Mon compte">
            <User size={19} />
          </Link>
          <Link href="/commander" className="bag-button" aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}>
            <ShoppingBag size={19} />
            <span>Panier</span>
            {count > 0 && <b>{count}</b>}
          </Link>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Ouvrir le menu">
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>
      {mobileOpen && (
        <div className="mobile-nav">
          {[...primaryLinks, ...moreLinks].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
