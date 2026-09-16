'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, Smartphone } from 'lucide-react'
import { useAccount, useCart, useCheckout, type Order } from '@/lib/store'
import { restaurantBySlug } from '@/lib/data/restaurants'
import { formatFCFA } from '@/lib/format'

const methods = [
  { id: 'orange', label: 'Orange Money', color: '#ff7900' },
  { id: 'mtn', label: 'MTN Mobile Money', color: '#ffcc08' },
  { id: 'moov', label: 'Moov Money', color: '#0066b3' },
  { id: 'wave', label: 'Wave', color: '#1dd3b0' },
  { id: 'carte', label: 'Carte bancaire', color: '#241b17' },
  { id: 'especes', label: 'Paiement à la livraison', color: '#786e64' },
]

export default function PaiementPage() {
  const router = useRouter()
  const { items, subtotal, clear } = useCart()
  const { draft, setDraft } = useCheckout()
  const { addOrder, addPoints } = useAccount()
  const [method, setMethod] = useState('orange')
  const [phone, setPhone] = useState('')
  const [processing, setProcessing] = useState(false)

  const restaurant = restaurantBySlug(draft.restaurant)
  const deliveryFee = draft.mode === 'livraison' ? 1500 : 0
  const discountAmount = Math.round((subtotal * draft.promoDiscount) / 100)
  const total = Math.max(0, subtotal + deliveryFee - discountAmount + draft.tip)
  const needsPhone = method === 'orange' || method === 'mtn' || method === 'moov' || method === 'wave'

  function confirmPayment() {
    if (items.length === 0) return
    setProcessing(true)
    setTimeout(() => {
      const id = `PA-${Math.floor(20000 + Math.random() * 9000)}`
      const order: Order = {
        id,
        date: new Date().toISOString(),
        items,
        total,
        mode: draft.mode,
        address: draft.mode === 'livraison' ? draft.address : undefined,
        restaurant: restaurant?.name ?? 'Placali Abouré',
        paymentMethod: methods.find((entry) => entry.id === method)?.label ?? 'Orange Money',
        status: 'Commande reçue',
      }
      addOrder(order)
      addPoints(Math.round(total / 100))
      clear()
      setDraft({ address: '', instructions: '', tip: 0, promoCode: '', promoDiscount: 0 })
      router.push(`/commande/${id}`)
    }, 1400)
  }

  if (items.length === 0 && !processing) {
    return (
      <section className="shell" style={{ textAlign: 'center' }}>
        <p className="eyebrow">Paiement</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, margin: '10px 0 20px' }}>Votre panier est vide.</h1>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero" style={{ padding: '150px 11% 60px' }}>
        <span className="crumb">Paiement sécurisé</span>
        <h1>
          Choisissez votre <i>moyen de paiement.</i>
        </h1>
      </section>
      <section className="shell builder-grid" style={{ display: 'grid', gap: 44, gridTemplateColumns: '1.4fr 1fr' }}>
        <div>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
            {methods.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setMethod(entry.id)}
                className="card"
                style={{
                  alignItems: 'center',
                  border: method === entry.id ? '2px solid var(--terracotta)' : '1px solid var(--line)',
                  display: 'flex',
                  gap: 12,
                  padding: '18px 16px',
                  textAlign: 'left',
                }}
              >
                <span style={{ background: entry.color, borderRadius: '50%', display: 'block', flexShrink: 0, height: 14, width: 14 }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{entry.label}</span>
              </button>
            ))}
          </div>

          {needsPhone && (
            <div style={{ marginTop: 24 }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Numéro {methods.find((entry) => entry.id === method)?.label}
              </p>
              <div style={{ alignItems: 'center', background: 'var(--cream)', border: '1px solid var(--line)', display: 'flex', gap: 10, padding: 13 }}>
                <Smartphone size={16} style={{ color: 'var(--muted)' }} />
                <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="07 XX XX XX XX" style={{ background: 'none', border: 0, flex: 1, font: 'inherit', outline: 0 }} />
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 10 }}>Vous recevrez une demande de confirmation sur votre téléphone.</p>
            </div>
          )}

          {method === 'carte' && (
            <div style={{ marginTop: 24 }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Carte bancaire
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input placeholder="Numéro de carte" style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: 13 }} />
                <div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
                  <input placeholder="MM / AA" style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: 13 }} />
                  <input placeholder="CVC" style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: 13 }} />
                </div>
              </div>
            </div>
          )}

          {method === 'especes' && <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 20 }}>Vous réglerez en espèces {draft.mode === 'livraison' ? 'auprès du livreur' : 'sur place'} à la réception de votre commande.</p>}
        </div>

        <div className="card" style={{ alignSelf: 'start', padding: 30 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Récapitulatif
          </p>
          <div className="cart-total" style={{ borderTop: 0, paddingTop: 0 }}>
            <div>
              <span>Sous-total</span>
              <span>{formatFCFA(subtotal)}</span>
            </div>
            <div>
              <span>Livraison</span>
              <span>{deliveryFee ? formatFCFA(deliveryFee) : 'Offerte'}</span>
            </div>
            {draft.tip > 0 && (
              <div>
                <span>Pourboire</span>
                <span>{formatFCFA(draft.tip)}</span>
              </div>
            )}
            <div>
              <span>Total à payer</span>
              <strong>{formatFCFA(total)}</strong>
            </div>
            <button className="button button-gold full-button" onClick={confirmPayment} disabled={processing || (needsPhone && !phone.trim())}>
              {processing ? (
                <>
                  <Loader2 size={16} className="spin" /> Traitement…
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} /> Confirmer le paiement
                </>
              )}
            </button>
            <small>Démo — aucune transaction réelle ne sera effectuée.</small>
          </div>
        </div>
      </section>
    </>
  )
}
