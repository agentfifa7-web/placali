'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ChefHat, Gauge, LayoutGrid, ShoppingBag, TrendingUp, Truck } from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard direction', icon: Gauge },
  { href: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
  { href: '/admin/multi-restaurants', label: 'Multi-restaurants', icon: LayoutGrid },
  { href: '/admin/cuisine', label: 'Dashboard cuisine', icon: ChefHat },
  { href: '/admin/livreur', label: 'Application livreur', icon: Truck },
  { href: '/admin/bi', label: 'Business Intelligence', icon: TrendingUp },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link href="/" className="brand brand-light" style={{ marginBottom: 34 }}>
          <span className="brand-mark" style={{ borderColor: '#dca34c', color: '#dca34c' }}>
            PA
          </span>
          <span>
            <strong style={{ color: '#fff' }}>PLACALI</strong>
            <em style={{ color: '#dca34c' }}>BACK-OFFICE</em>
          </span>
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>
              <link.icon size={16} /> {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" style={{ marginTop: 24 }}>
          <ArrowLeft size={16} /> Retour au site
        </Link>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}
