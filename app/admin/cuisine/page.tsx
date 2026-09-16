'use client'

import { useState } from 'react'
import { kitchenQueue, type KitchenOrder } from '@/lib/data/admin'

const columns: KitchenOrder['status'][] = ['En attente', 'En préparation', 'Prête']

const nextStatus: Record<KitchenOrder['status'], KitchenOrder['status'] | null> = {
  'En attente': 'En préparation',
  'En préparation': 'Prête',
  Prête: null,
}

const actionLabel: Record<KitchenOrder['status'], string> = {
  'En attente': 'Préparer',
  'En préparation': 'Commande prête',
  Prête: 'Transmise au livreur',
}

export default function AdminCuisinePage() {
  const [orders, setOrders] = useState<KitchenOrder[]>(kitchenQueue)

  function advance(id: string) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order
        const next = nextStatus[order.status]
        return next ? { ...order, status: next } : order
      }),
    )
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Cuisine en direct
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Dashboard cuisine</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(3,1fr)' }} className="event-grid">
        {columns.map((column) => (
          <div key={column}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              {column} ({orders.filter((order) => order.status === column).length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {orders
                .filter((order) => order.status === column)
                .map((order) => (
                  <div key={order.id} className="card" style={{ padding: 18 }}>
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <strong>#{order.id}</strong>
                      <span style={{ color: 'var(--muted)', fontSize: 11 }}>{order.restaurant}</span>
                    </div>
                    <ul style={{ color: 'var(--muted)', fontSize: 12, listStyle: 'none', margin: '0 0 14px', padding: 0 }}>
                      {order.items.map((item) => (
                        <li key={item}>· {item}</li>
                      ))}
                    </ul>
                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--muted)', fontSize: 10.5 }}>Il y a {order.time}</span>
                      {nextStatus[order.status] ? (
                        <button className="chip" onClick={() => advance(order.id)} style={{ background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' }}>
                          {actionLabel[order.status]}
                        </button>
                      ) : (
                        <span className="chip">Prête ✓</span>
                      )}
                    </div>
                  </div>
                ))}
              {orders.filter((order) => order.status === column).length === 0 && <p style={{ color: 'var(--muted)', fontSize: 12 }}>Aucune commande.</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
