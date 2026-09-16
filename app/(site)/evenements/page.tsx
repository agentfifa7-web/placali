'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { eventServices } from '@/lib/data/content'

export default function EvenementsPage() {
  const [service, setService] = useState(eventServices[0].id)
  const [guests, setGuests] = useState('80')
  const [menu, setMenu] = useState('Menu ivoirien premium')
  const [decoration, setDecoration] = useState(true)
  const [place, setPlace] = useState('')
  const [date, setDate] = useState('')
  const [budget, setBudget] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Espace événements</span>
        <h1>
          Vos moments,
          <br />
          <i>notre savoir-faire.</i>
        </h1>
        <p>Anniversaires, mariages, cérémonies, baptêmes, événements corporate ou culturels : une mini-plateforme événementielle à votre service.</p>
      </section>

      <section className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Nos services</p>
            <h2>
              Un événement, <i>toutes les occasions.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(3,1fr)' }} className="event-grid">
          {eventServices.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setService(entry.id)}
              className="card"
              style={{ alignItems: 'center', border: service === entry.id ? '2px solid var(--terracotta)' : '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10, padding: '28px 16px', textAlign: 'center' }}
            >
              <span style={{ fontSize: 28 }}>{entry.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{entry.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="shell-tight" style={{ background: 'var(--paper)' }}>
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: '1fr 1fr' }} className="builder-grid">
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Demander une proposition
            </p>
            {!sent ? (
              <form
                className="booking-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSent(true)
                }}
              >
                <label>
                  Nombre de personnes
                  <input required value={guests} onChange={(event) => setGuests(event.target.value)} placeholder="80" />
                </label>
                <label>
                  Menu souhaité
                  <select value={menu} onChange={(event) => setMenu(event.target.value)}>
                    <option>Menu ivoirien premium</option>
                    <option>Menu découverte</option>
                    <option>Menu végétarien</option>
                    <option>Sur mesure</option>
                  </select>
                </label>
                <div className="form-row">
                  <label>
                    Lieu
                    <input value={place} onChange={(event) => setPlace(event.target.value)} placeholder="Chez vous, en salle, en extérieur…" />
                  </label>
                  <label>
                    Date souhaitée
                    <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                  </label>
                </div>
                <label>
                  Budget estimé (FCFA)
                  <input value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="ex : 1 500 000" />
                </label>
                <label style={{ alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                  <input type="checkbox" checked={decoration} onChange={(event) => setDecoration(event.target.checked)} style={{ width: 'auto' }} />
                  <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>Inclure décoration et service à table</span>
                </label>
                <button className="button button-gold full-button">Demander un devis</button>
              </form>
            ) : (
              <div className="booking-success" style={{ padding: 0, textAlign: 'left' }}>
                <span>
                  <Check />
                </span>
                <p className="eyebrow">Demande envoyée</p>
                <h2>
                  Votre proposition
                  <br />
                  <i>arrive vite.</i>
                </h2>
                <p>Notre équipe événementiel vous recontacte sous 24h avec une proposition personnalisée et son devis détaillé.</p>
                <button className="button button-dark" onClick={() => setSent(false)}>
                  Nouvelle demande
                </button>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 30 }}>
            <p className="eyebrow" style={{ marginBottom: 4 }}>
              Exemple
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 500, margin: '6px 0 20px' }}>Votre événement</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
              <span>{eventServices.find((entry) => entry.id === service)?.icon} {eventServices.find((entry) => entry.id === service)?.label}</span>
              <span>{guests} personnes</span>
              <span>{menu}</span>
              <span>Service à table</span>
              {decoration && <span>Décoration incluse</span>}
              {place && <span>Lieu : {place}</span>}
              {budget && <span>Budget : {budget} FCFA</span>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
