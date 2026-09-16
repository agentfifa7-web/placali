'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { reservationTypes } from '@/lib/data/content'
import { restaurants } from '@/lib/data/restaurants'
import { useAccount, type Reservation } from '@/lib/store'

export default function ReservationPage() {
  const { addReservation } = useAccount()
  const [type, setType] = useState(reservationTypes[0].id)
  const [restaurant, setRestaurant] = useState(restaurants[0].slug)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('20:00')
  const [guests, setGuests] = useState('2')
  const [confirmed, setConfirmed] = useState<Reservation | null>(null)

  function submit() {
    const reservation: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurant: restaurants.find((entry) => entry.slug === restaurant)?.name ?? '',
      date,
      time,
      guests: Number(guests),
      type: reservationTypes.find((entry) => entry.id === type)?.label ?? '',
      name,
      status: 'Confirmée',
    }
    addReservation(reservation)
    setConfirmed(reservation)
  }

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Réservation de table</span>
        <h1>
          Une place
          <br />
          <i>pour vous.</i>
        </h1>
        <p>Table classique, espace privé, anniversaire, dîner en couple, repas professionnel ou groupe — réservez en quelques secondes.</p>
      </section>

      <section className="shell builder-grid" style={{ display: 'grid', gap: 50, gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 14 }}>
            Type de réservation
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 34 }}>
            {reservationTypes.map((entry) => (
              <button
                key={entry.id}
                className="chip"
                aria-pressed={type === entry.id}
                onClick={() => setType(entry.id)}
                style={type === entry.id ? { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' } : undefined}
              >
                {entry.label}
              </button>
            ))}
          </div>

          {confirmed ? (
            <div className="booking-success" style={{ padding: 0, textAlign: 'left' }}>
              <span>
                <Check />
              </span>
              <p className="eyebrow">C’est noté !</p>
              <h2>
                Votre table
                <br />
                <i>est réservée.</i>
              </h2>
              <p>
                Référence {confirmed.id} · {confirmed.restaurant} · {new Date(confirmed.date).toLocaleDateString('fr-FR')} à {confirmed.time} · {confirmed.guests} personne{confirmed.guests > 1 ? 's' : ''}.
              </p>
              <button className="button button-dark" onClick={() => setConfirmed(null)}>
                Nouvelle réservation
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
              <label>
                Votre nom
                <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Prénom et nom" />
              </label>
              <label>
                Restaurant
                <select value={restaurant} onChange={(event) => setRestaurant(event.target.value)}>
                  {restaurants.map((entry) => (
                    <option key={entry.slug} value={entry.slug}>
                      {entry.name} — {entry.city}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-row">
                <label>
                  Date
                  <input required type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                </label>
                <label>
                  Heure
                  <select value={time} onChange={(event) => setTime(event.target.value)}>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </label>
              </div>
              <label>
                Nombre de personnes
                <select value={guests} onChange={(event) => setGuests(event.target.value)}>
                  <option value="2">2 personnes</option>
                  <option value="3">3 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="8">5 personnes ou plus</option>
                </select>
              </label>
              <button className="button button-gold full-button">Confirmer la réservation</button>
            </form>
          )}
        </div>

        <div className="story-photo" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85')", minHeight: 420 }} />
      </section>
    </>
  )
}
