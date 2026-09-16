'use client'

import { use, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Bike, ChefHat, ClipboardCheck, Home, PackageCheck } from 'lucide-react'
import { useAccount, type Order } from '@/lib/store'
import { formatFCFA } from '@/lib/format'

const deliverySteps: { status: Order['status']; label: string; icon: typeof ClipboardCheck }[] = [
  { status: 'Commande reçue', label: 'Reçue', icon: ClipboardCheck },
  { status: 'Cuisine en préparation', label: 'Préparation', icon: ChefHat },
  { status: 'Commande prête', label: 'Prête', icon: PackageCheck },
  { status: 'Livreur en route', label: 'Livreur en route', icon: Bike },
  { status: 'Livrée', label: 'Livrée', icon: Home },
]

const collectSteps = deliverySteps.filter((step) => step.status !== 'Livreur en route')

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { orders, updateOrderStatus } = useAccount()
  const order = orders.find((entry) => entry.id === id)
  const steps = order?.mode === 'collect' ? collectSteps : deliverySteps

  const currentIndex = useMemo(() => steps.findIndex((step) => step.status === order?.status), [steps, order?.status])

  useEffect(() => {
    if (!order || order.status === 'Livrée') return
    const nextIndex = steps.findIndex((step) => step.status === order.status) + 1
    if (nextIndex >= steps.length) return
    const timer = setTimeout(() => updateOrderStatus(order.id, steps[nextIndex].status), 4500)
    return () => clearTimeout(timer)
  }, [order, steps, updateOrderStatus])

  if (!order) {
    return (
      <section className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Suivi de commande</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, margin: '10px 0 22px' }}>Commande introuvable.</h1>
        <Link className="button button-gold" href="/menu" style={{ display: 'inline-flex' }}>
          Retour à la carte
        </Link>
      </section>
    )
  }

  const progressPercent = steps.length > 1 ? (currentIndex / (steps.length - 1)) * 100 : 100

  return (
    <>
      <section className="page-hero" style={{ padding: '150px 11% 55px' }}>
        <span className="crumb">Suivi de livraison</span>
        <h1>
          Commande <i>#{order.id}</i>
        </h1>
        <p>{order.mode === 'livraison' ? `Livraison à : ${order.address}` : `Retrait chez ${order.restaurant}`}</p>
      </section>

      <section className="shell">
        <div className="track-map" style={{ marginBottom: 40 }}>
          <div className="track-route">
            <div className="progress" style={{ width: `${progressPercent}%` }} />
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div className={`track-node ${index <= currentIndex ? 'reached' : ''}`} key={step.status}>
                  <span className="pin">
                    <Icon size={20} />
                  </span>
                  <span>{step.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 30, gridTemplateColumns: '1fr 1fr' }} className="builder-grid">
          <div className="card" style={{ padding: 28 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Statut actuel
            </p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, margin: '0 0 10px' }}>{order.status}</h2>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
              {order.status === 'Livrée' ? 'Bon appétit ! Merci pour votre confiance.' : 'Vous recevrez une notification à chaque étape de votre commande.'}
            </p>
            <div style={{ borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, marginTop: 20, paddingTop: 20 }}>
              <span>
                <strong>Restaurant :</strong> {order.restaurant}
              </span>
              <span>
                <strong>Paiement :</strong> {order.paymentMethod}
              </span>
              <span>
                <strong>Passée le :</strong> {new Date(order.date).toLocaleString('fr-FR')}
              </span>
            </div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Détail de la commande
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {order.items.map((line) => (
                <div key={line.id} style={{ display: 'flex', fontSize: 12.5, justifyContent: 'space-between' }}>
                  <span>
                    {line.quantity}× {line.name}
                  </span>
                  <span>{formatFCFA(line.unitPrice * line.quantity)}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', paddingTop: 14 }}>
              <strong>Total</strong>
              <strong style={{ color: 'var(--terracotta)' }}>{formatFCFA(order.total)}</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
