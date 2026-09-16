'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from '@/lib/store'

export default function ConnexionPage() {
  const router = useRouter()
  const { login } = useAccount()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  function submit() {
    login({ name, phone, email })
    router.push('/compte')
  }

  return (
    <section className="shell" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: 420, padding: 40, width: '100%' }}>
        <p className="eyebrow">Espace client</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, margin: '8px 0 26px' }}>
          Bon retour <i style={{ color: 'var(--terracotta)' }}>parmi nous.</i>
        </h1>
        <form
          className="booking-form"
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
        >
          <label>
            Nom complet
            <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Prénom et nom" />
          </label>
          <label>
            Téléphone
            <input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="07 XX XX XX XX" />
          </label>
          <label>
            E-mail
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@exemple.com" />
          </label>
          <button className="button button-gold full-button">Accéder à mon espace</button>
        </form>
        <p style={{ color: 'var(--muted)', fontSize: 11, marginTop: 18, textAlign: 'center' }}>Démo — aucune vérification par SMS n’est envoyée.</p>
      </div>
    </section>
  )
}
