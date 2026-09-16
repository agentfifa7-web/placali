'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAccount } from '@/lib/store'
import { recentOrders } from '@/lib/data/admin'
import { formatFCFA } from '@/lib/format'

const statuses = ['Commande reçue', 'Cuisine en préparation', 'Commande prête', 'Livreur en route', 'Livrée']

export default function AdminCommandesPage() {
  const { orders } = useAccount()
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const liveRows = orders.map((order) => ({
    id: order.id,
    client: 'Client démo',
    restaurant: order.restaurant.split('—')[1]?.trim() ?? order.restaurant,
    total: order.total,
    status: order.status,
    date: order.date,
  }))

  const rows = [...liveRows, ...recentOrders].filter((row) => {
    if (statusFilter && row.status !== statusFilter) return false
    if (query && !`${row.id} ${row.client} ${row.restaurant}`.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Suivi en temps réel
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Commandes</h1>
        </div>
      </div>

      <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        <div style={{ alignItems: 'center', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', gap: 8, padding: '9px 13px' }}>
          <Search size={14} style={{ color: 'var(--muted)' }} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une commande, un client…" style={{ background: 'none', border: 0, font: 'inherit', fontSize: 12, outline: 0, width: 220 }} />
        </div>
        <button className="chip" aria-pressed={statusFilter === null} onClick={() => setStatusFilter(null)} style={statusFilter === null ? { background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' } : undefined}>
          Toutes ({[...liveRows, ...recentOrders].length})
        </button>
        {statuses.map((status) => (
          <button
            key={status}
            className="chip"
            aria-pressed={statusFilter === status}
            onClick={() => setStatusFilter(status)}
            style={statusFilter === status ? { background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' } : undefined}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              {['Commande', 'Client', 'Restaurant', 'Total', 'Statut', 'Date'].map((head) => (
                <th key={head} style={{ color: 'var(--muted)', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', padding: '14px 20px', textTransform: 'uppercase' }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--line)', fontSize: 12.5 }}>
                <td style={{ padding: '14px 20px' }}>
                  <strong>#{row.id}</strong>
                </td>
                <td style={{ padding: '14px 20px' }}>{row.client}</td>
                <td style={{ padding: '14px 20px' }}>{row.restaurant}</td>
                <td style={{ padding: '14px 20px' }}>{formatFCFA(row.total)}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span className="chip">{row.status}</span>
                </td>
                <td style={{ color: 'var(--muted)', padding: '14px 20px' }}>{new Date(row.date).toLocaleString('fr-FR')}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} style={{ color: 'var(--muted)', padding: '24px 20px', textAlign: 'center' }}>
                  Aucune commande ne correspond à ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
