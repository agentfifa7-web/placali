'use client'

import { useState } from 'react'
import { MapPin, Navigation, Wallet } from 'lucide-react'
import { deliveryOrders, type DeliveryOrder } from '@/lib/data/admin'
import { formatFCFA } from '@/lib/format'

export default function AdminLivreurPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>(deliveryOrders)

  function accept(id: string) {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status: 'En cours' } : order)))
  }

  const todayPayout = orders.filter((order) => order.status === 'En cours').reduce((sum, order) => sum + order.payout, 0)

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Application livreur
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Mes courses</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 30 }} className="event-grid">
        <div className="stat-tile">
          <span>Revenus du jour</span>
          <strong>{formatFCFA(todayPayout)}</strong>
        </div>
        <div className="stat-tile">
          <span>Distance parcourue</span>
          <strong>18.4 km</strong>
        </div>
        <div className="stat-tile">
          <span>Courses livrées</span>
          <strong>7</strong>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ alignItems: 'center', display: 'flex', gap: 16, justifyContent: 'space-between', padding: '18px 22px' }}>
            <div style={{ alignItems: 'center', display: 'flex', gap: 14 }}>
              <MapPin size={18} style={{ color: 'var(--terracotta)' }} />
              <div>
                <strong>#{order.id}</strong>
                <p style={{ color: 'var(--muted)', fontSize: 12, margin: '4px 0 0' }}>{order.address}</p>
                <p style={{ color: 'var(--muted)', fontSize: 11, margin: '2px 0 0' }}>
                  <Navigation size={11} style={{ verticalAlign: 'middle' }} /> {order.distance} · <Wallet size={11} style={{ verticalAlign: 'middle' }} /> {formatFCFA(order.payout)}
                </p>
              </div>
            </div>
            {order.status === 'Disponible' ? (
              <button className="chip" onClick={() => accept(order.id)} style={{ background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' }}>
                Accepter
              </button>
            ) : (
              <span className="chip">En cours</span>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
