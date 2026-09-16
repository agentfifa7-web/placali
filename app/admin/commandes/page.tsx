'use client'

import { useAccount } from '@/lib/store'
import { recentOrders } from '@/lib/data/admin'
import { formatFCFA } from '@/lib/format'

export default function AdminCommandesPage() {
  const { orders } = useAccount()

  const liveRows = orders.map((order) => ({
    id: order.id,
    client: 'Client démo',
    restaurant: order.restaurant.split('—')[1]?.trim() ?? order.restaurant,
    total: order.total,
    status: order.status,
    date: order.date,
  }))

  const rows = [...liveRows, ...recentOrders]

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
          </tbody>
        </table>
      </div>
    </>
  )
}
