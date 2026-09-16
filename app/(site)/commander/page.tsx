'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart, useCheckout } from '@/lib/store'
import { restaurants } from '@/lib/data/restaurants'
import { promotions } from '@/lib/data/content'
import { formatFCFA } from '@/lib/format'

const addressKinds = ['Domicile', 'Bureau', 'Autre emplacement']
const tipOptions = [0, 200, 500, 1000]

export default function CommanderPage() {
  const router = useRouter()
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const { draft, setDraft } = useCheckout()
  const [addressKind, setAddressKind] = useState(addressKinds[0])
  const [promoInput, setPromoInput] = useState('')
  const [promoMessage, setPromoMessage] = useState('')

  const deliveryFee = draft.mode === 'livraison' ? 1500 : 0
  const discountAmount = Math.round((subtotal * draft.promoDiscount) / 100)
  const total = Math.max(0, subtotal + deliveryFee - discountAmount + draft.tip)

  function applyPromo() {
    const promo = promotions.find((entry) => entry.code.toLowerCase() === promoInput.trim().toLowerCase())
    if (!promo) {
      setPromoMessage('Code promo introuvable.')
      setDraft({ promoCode: '', promoDiscount: 0 })
      return
    }
    const percent = Number(promo.discount.replace(/[^0-9]/g, ''))
    if (!percent) {
      setPromoMessage(`« ${promo.title} » n’est pas applicable directement au panier.`)
      setDraft({ promoCode: '', promoDiscount: 0 })
      return
    }
    setDraft({ promoCode: promo.code, promoDiscount: percent })
    setPromoMessage(`Code appliqué : ${promo.title} (${promo.discount}).`)
  }

  if (items.length === 0) {
    return (
      <section className="shell" style={{ textAlign: 'center' }}>
        <ShoppingBag size={40} style={{ color: 'var(--terracotta)', margin: '0 auto 20px' }} />
        <p className="eyebrow">Votre panier</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, margin: '10px 0 22px' }}>
          Il est <i style={{ color: 'var(--terracotta)' }}>encore vide.</i>
        </h1>
        <Link className="button button-gold" href="/menu" style={{ display: 'inline-flex' }}>
          Voir la carte <ArrowRight size={17} />
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="page-hero" style={{ padding: '150px 11% 60px' }}>
        <span className="crumb">Commande en ligne</span>
        <h1>
          Votre <i>panier.</i>
        </h1>
      </section>
      <section className="shell" style={{ display: 'grid', gap: 44, gridTemplateColumns: '1.5fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }} className="builder-grid">
          <div className="cart-lines" style={{ margin: 0 }}>
            {items.map((line) => (
              <div className="cart-line" key={line.id}>
                {line.image && <img src={line.image} alt="" />}
                <div style={{ flex: 1 }}>
                  <h3>{line.name}</h3>
                  {line.meta && <p style={{ color: 'var(--muted)', fontSize: 11 }}>{line.meta}</p>}
                  <p>{formatFCFA(line.unitPrice)}</p>
                  <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
                    <div className="quantity">
                      <button onClick={() => updateQuantity(line.id, -1)} aria-label="Diminuer">
                        <Minus size={13} />
                      </button>
                      <span>{line.quantity}</span>
                      <button onClick={() => updateQuantity(line.id, 1)} aria-label="Augmenter">
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(line.id)} aria-label="Retirer" style={{ background: 'none', border: 0, color: 'var(--muted)' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Mode de réception
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="chip" aria-pressed={draft.mode === 'livraison'} onClick={() => setDraft({ mode: 'livraison' })} style={draft.mode === 'livraison' ? { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' } : undefined}>
                🚚 Livraison
              </button>
              <button className="chip" aria-pressed={draft.mode === 'collect'} onClick={() => setDraft({ mode: 'collect' })} style={draft.mode === 'collect' ? { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' } : undefined}>
                🏪 Click &amp; Collect
              </button>
            </div>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Restaurant
            </p>
            <select value={draft.restaurant} onChange={(event) => setDraft({ restaurant: event.target.value })} style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: 13, width: '100%' }}>
              {restaurants.map((restaurant) => (
                <option key={restaurant.slug} value={restaurant.slug}>
                  {restaurant.name} — {restaurant.city}
                </option>
              ))}
            </select>
          </div>

          {draft.mode === 'livraison' && (
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Adresse de livraison
              </p>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                {addressKinds.map((kind) => (
                  <button key={kind} className="chip" aria-pressed={addressKind === kind} onClick={() => setAddressKind(kind)} style={addressKind === kind ? { background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' } : undefined}>
                    {kind}
                  </button>
                ))}
              </div>
              <input
                value={draft.address}
                onChange={(event) => setDraft({ address: event.target.value })}
                placeholder="Quartier, rue, repère..."
                style={{ background: 'var(--cream)', border: '1px solid var(--line)', padding: 13, width: '100%' }}
              />
            </div>
          )}

          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Instructions spéciales
            </p>
            <textarea
              value={draft.instructions}
              onChange={(event) => setDraft({ instructions: event.target.value })}
              placeholder="Sonnette cassée, sans piment, etc."
              rows={3}
              style={{ background: 'var(--cream)', border: '1px solid var(--line)', fontFamily: 'inherit', padding: 13, resize: 'vertical', width: '100%' }}
            />
          </div>
        </div>

        <div className="card" style={{ alignSelf: 'start', padding: 30 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Récapitulatif
          </p>

          <div style={{ marginBottom: 18 }}>
            <p className="eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>
              Pourboire
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tipOptions.map((tip) => (
                <button key={tip} className="chip" aria-pressed={draft.tip === tip} onClick={() => setDraft({ tip })} style={draft.tip === tip ? { background: 'var(--saffron)', borderColor: 'var(--saffron)', color: 'var(--espresso)' } : undefined}>
                  {tip === 0 ? 'Aucun' : formatFCFA(tip)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <input value={promoInput} onChange={(event) => setPromoInput(event.target.value)} placeholder="Code promo" style={{ background: 'var(--cream)', border: '1px solid var(--line)', flex: 1, padding: 11 }} />
            <button className="button button-dark" onClick={applyPromo} style={{ minHeight: 'auto', padding: '0 16px' }}>
              Valider
            </button>
          </div>
          {promoMessage && (
            <p style={{ color: draft.promoDiscount ? 'var(--forest)' : 'var(--terracotta)', fontSize: 11, marginBottom: 14 }}>{promoMessage}</p>
          )}

          <div className="cart-total" style={{ marginTop: 10 }}>
            <div>
              <span>Sous-total</span>
              <span>{formatFCFA(subtotal)}</span>
            </div>
            <div>
              <span>Frais de livraison</span>
              <span>{deliveryFee ? formatFCFA(deliveryFee) : 'Offerts'}</span>
            </div>
            {draft.promoDiscount > 0 && (
              <div>
                <span>Réduction ({draft.promoDiscount}%)</span>
                <span>-{formatFCFA(discountAmount)}</span>
              </div>
            )}
            {draft.tip > 0 && (
              <div>
                <span>Pourboire</span>
                <span>{formatFCFA(draft.tip)}</span>
              </div>
            )}
            <div>
              <span>Total</span>
              <strong>{formatFCFA(total)}</strong>
            </div>
            <button className="button button-gold full-button" onClick={() => router.push('/paiement')} disabled={draft.mode === 'livraison' && !draft.address.trim()}>
              Passer au paiement <ArrowRight size={16} />
            </button>
            {draft.mode === 'livraison' && !draft.address.trim() && <small style={{ color: 'var(--terracotta)' }}>Renseignez une adresse de livraison.</small>}
          </div>
        </div>
      </section>
    </>
  )
}
