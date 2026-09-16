'use client'

import { useState } from 'react'
import { Check, Mail, MessageCircle } from 'lucide-react'
import { useAccount } from '@/lib/store'
import { formatFCFA } from '@/lib/format'

const amounts = [50000, 100000, 150000]

export default function CartesCadeauxPage() {
  const { redeemCoupon } = useAccount()
  const [amount, setAmount] = useState(amounts[1])
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp')
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState<string | null>(null)

  function submit() {
    const code = `CADEAU-${Math.floor(1000 + Math.random() * 9000)}`
    redeemCoupon(code)
    setSent(code)
  }

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Cartes cadeaux</span>
        <h1>
          Offrez un moment
          <br />
          <i>Placali Abouré.</i>
        </h1>
        <p>La carte cadeau Abouré se partage par WhatsApp ou e-mail, avec un message personnalisé.</p>
      </section>

      <section className="shell builder-grid" style={{ display: 'grid', gap: 44, gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            Montant
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
            {amounts.map((value) => (
              <button key={value} className="chip" aria-pressed={amount === value} onClick={() => setAmount(value)} style={amount === value ? { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' } : undefined}>
                {formatFCFA(value)}
              </button>
            ))}
          </div>

          {sent ? (
            <div className="booking-success" style={{ padding: 0, textAlign: 'left' }}>
              <span>
                <Check />
              </span>
              <p className="eyebrow">Carte envoyée</p>
              <h2>
                Merci pour
                <br />
                <i>ce beau geste.</i>
              </h2>
              <p>
                Référence {sent} · {formatFCFA(amount)} envoyée par {channel === 'whatsapp' ? 'WhatsApp' : 'e-mail'} à {recipient}.
              </p>
              <button className="button button-dark" onClick={() => setSent(null)}>
                Offrir une autre carte
              </button>
            </div>
          ) : (
            <form
              className="booking-form"
              onSubmit={(event) => {
                event.preventDefault()
                submit()
              }}
            >
              <label>Mode d’envoi</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="chip" aria-pressed={channel === 'whatsapp'} onClick={() => setChannel('whatsapp')} style={channel === 'whatsapp' ? { background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' } : undefined}>
                  <MessageCircle size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} /> WhatsApp
                </button>
                <button type="button" className="chip" aria-pressed={channel === 'email'} onClick={() => setChannel('email')} style={channel === 'email' ? { background: 'var(--espresso)', borderColor: 'var(--espresso)', color: '#fff' } : undefined}>
                  <Mail size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} /> E-mail
                </button>
              </div>
              <label>
                {channel === 'whatsapp' ? 'Numéro du destinataire' : 'E-mail du destinataire'}
                <input required value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder={channel === 'whatsapp' ? '07 XX XX XX XX' : 'destinataire@exemple.com'} />
              </label>
              <label>
                Message personnalisé
                <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} placeholder="Joyeux anniversaire !" style={{ background: 'var(--cream)', border: '1px solid var(--line)', fontFamily: 'inherit', padding: 13, resize: 'vertical' }} />
              </label>
              <button className="button button-gold full-button">Envoyer la carte cadeau</button>
            </form>
          )}
        </div>

        <div className="card" style={{ alignSelf: 'start', padding: 36 }}>
          <div style={{ background: 'linear-gradient(135deg,var(--espresso),#4a3527)', borderRadius: 4, color: '#fff', padding: '40px 32px' }}>
            <p style={{ color: '#dca34c', fontSize: 10, fontWeight: 700, letterSpacing: '.14em', margin: 0, textTransform: 'uppercase' }}>Carte cadeau</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, margin: '12px 0' }}>Placali Abouré</h2>
            <strong style={{ fontFamily: "'Playfair Display',serif", fontSize: 40 }}>{formatFCFA(amount)}</strong>
          </div>
        </div>
      </section>
    </>
  )
}
