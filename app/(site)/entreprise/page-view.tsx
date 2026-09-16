'use client'

import { useState } from 'react'
import { Check, FileText, Repeat, Users, Wallet } from 'lucide-react'

const corporateFeatures = [
  { icon: Users, title: 'Commandes de groupe', text: 'Plateaux repas et déjeuners d’entreprise livrés sur site.' },
  { icon: Repeat, title: 'Commandes récurrentes', text: 'Programmez vos livraisons hebdomadaires en toute simplicité.' },
  { icon: FileText, title: 'Facturation entreprise', text: 'Factures groupées et historique complet pour votre comptabilité.' },
  { icon: Wallet, title: 'Plafond de dépenses', text: 'Définissez un budget par collaborateur ou par service.' },
]

export default function EntreprisePage() {
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [headcount, setHeadcount] = useState('')
  const [need, setNeed] = useState('Déjeuner d’entreprise')
  const [sent, setSent] = useState(false)

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('/images/dish-table-service.jpg')" }}>
        <span className="crumb">Espace entreprise</span>
        <h1>
          La gastronomie
          <br />
          <i>ivoirienne, au bureau.</i>
        </h1>
        <p>Plateaux repas, déjeuners d’entreprise, séminaires et événements corporate, avec compte entreprise dédié.</p>
      </section>

      <section className="shell">
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 60 }} className="event-grid">
          {corporateFeatures.map((feature) => (
            <div key={feature.title} className="card" style={{ padding: 24 }}>
              <feature.icon size={22} style={{ color: 'var(--terracotta)', marginBottom: 14 }} />
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 500, margin: '0 0 8px' }}>{feature.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.6, margin: 0 }}>{feature.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 44, gridTemplateColumns: '1fr 1fr' }} className="builder-grid">
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Ouvrir un compte entreprise
            </p>
            {sent ? (
              <div className="booking-success" style={{ padding: 0, textAlign: 'left' }}>
                <span>
                  <Check />
                </span>
                <p className="eyebrow">Demande reçue</p>
                <h2>
                  Notre équipe
                  <br />
                  <i>vous recontacte.</i>
                </h2>
                <p>Un conseiller dédié vous présentera nos formules entreprise sous 24h ouvrées.</p>
                <button className="button button-dark" onClick={() => setSent(false)}>
                  Nouvelle demande
                </button>
              </div>
            ) : (
              <form
                className="booking-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  setSent(true)
                }}
              >
                <label>
                  Nom de l’entreprise
                  <input required value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Votre société" />
                </label>
                <label>
                  Contact
                  <input required value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Nom, e-mail ou téléphone" />
                </label>
                <div className="form-row">
                  <label>
                    Effectif concerné
                    <input value={headcount} onChange={(event) => setHeadcount(event.target.value)} placeholder="ex : 25" />
                  </label>
                  <label>
                    Besoin
                    <select value={need} onChange={(event) => setNeed(event.target.value)}>
                      <option>Déjeuner d’entreprise</option>
                      <option>Plateaux repas récurrents</option>
                      <option>Séminaire</option>
                      <option>Événement corporate</option>
                    </select>
                  </label>
                </div>
                <button className="button button-gold full-button">Envoyer la demande</button>
              </form>
            )}
          </div>
          <div className="story-photo" style={{ backgroundImage: "url('/images/dish-table-service.jpg')", minHeight: 380 }} />
        </div>
      </section>
    </>
  )
}
