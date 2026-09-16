'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag } from 'lucide-react'
import { builderBases, builderGarnitures, builderSauces, categories, dishes, type BuilderOption } from '@/lib/data/dishes'
import { formatFCFA } from '@/lib/format'
import { useCart } from '@/lib/store'

function OptionGrid({ options, selected, onSelect }: { options: BuilderOption[]; selected: string; onSelect: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map((option) => (
        <button key={option.id} type="button" className="chip" aria-pressed={selected === option.id} onClick={() => onSelect(option.id)} style={selected === option.id ? { background: 'var(--terracotta)', borderColor: 'var(--terracotta)', color: '#fff' } : undefined}>
          {option.label} · {formatFCFA(option.price)}
        </button>
      ))}
    </div>
  )
}

export default function MenuPage() {
  const { addItem } = useCart()
  const [category, setCategory] = useState<(typeof categories)[number]>('Placali')
  const [base, setBase] = useState(builderBases[0].id)
  const [sauce, setSauce] = useState(builderSauces[0].id)
  const [garniture, setGarniture] = useState(builderGarnitures[0].id)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  const visibleDishes = dishes.filter((dish) => dish.category === category)

  const selection = useMemo(() => {
    const baseOption = builderBases.find((option) => option.id === base)!
    const sauceOption = builderSauces.find((option) => option.id === sauce)!
    const garnitureOption = builderGarnitures.find((option) => option.id === garniture)!
    const unitPrice = baseOption.price + sauceOption.price + garnitureOption.price
    return { baseOption, sauceOption, garnitureOption, unitPrice, total: unitPrice * quantity }
  }, [base, sauce, garniture, quantity])

  function addCustomToCart() {
    const id = `custom-${base}-${sauce}-${garniture}`
    addItem({
      id,
      name: `${selection.baseOption.label} + sauce ${selection.sauceOption.label}`,
      meta: `${selection.garnitureOption.label} · composé`,
      unitPrice: selection.unitPrice,
      quantity,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2200)
  }

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Menu digital interactif</span>
        <h1>
          Nos saveurs,
          <br />
          <i>à votre façon.</i>
        </h1>
        <p>Parcourez la carte par catégorie ou composez votre plat en 4 étapes : base, sauce, accompagnement et quantité.</p>
      </section>

      <section className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Composer</p>
            <h2>
              Créez <i>votre assiette.</i>
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 40, gridTemplateColumns: '1.4fr 1fr' }} className="builder-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Étape 1 · Choisir la base
              </p>
              <OptionGrid options={builderBases} selected={base} onSelect={setBase} />
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Étape 2 · Choisir la sauce
              </p>
              <OptionGrid options={builderSauces} selected={sauce} onSelect={setSauce} />
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Étape 3 · Choisir l’accompagnement
              </p>
              <OptionGrid options={builderGarnitures} selected={garniture} onSelect={setGarniture} />
            </div>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                Étape 4 · Quantité
              </p>
              <div className="quantity" style={{ width: 'max-content' }}>
                <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Diminuer">
                  <Minus size={13} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((current) => current + 1)} aria-label="Augmenter">
                  <Plus size={13} />
                </button>
              </div>
            </div>
          </div>
          <div className="card" style={{ alignSelf: 'start', padding: 30 }}>
            <p className="eyebrow" style={{ marginBottom: 4 }}>
              Récapitulatif
            </p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 500, margin: '6px 0 18px' }}>
              {selection.baseOption.label} · {selection.sauceOption.label} · {selection.garnitureOption.label}
            </h3>
            <div style={{ borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 13, color: 'var(--muted)' }}>
              <span>Prix unitaire</span>
              <span>{formatFCFA(selection.unitPrice)}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', padding: '16px 0', marginBottom: 20 }}>
              <span>Total</span>
              <strong style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: 'var(--terracotta)' }}>{formatFCFA(selection.total)}</strong>
            </div>
            <button className="button button-gold full-button" onClick={addCustomToCart}>
              {justAdded ? 'Ajouté ✓' : 'Ajouter au panier'} <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="shell-tight" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">À la carte</p>
            <h2>
              Toute <i>la carte.</i>
            </h2>
          </div>
        </div>
        <div className="category-tabs" role="tablist">
          {categories.map((item) => (
            <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish) => (
            <article className="dish-card" key={dish.id}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
                {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                <button className="add-button" onClick={() => addItem({ id: `dish-${dish.id}`, name: dish.name, unitPrice: dish.price, image: dish.image })} aria-label={`Ajouter ${dish.name}`}>
                  <Plus size={19} />
                </button>
              </div>
              <div className="dish-info">
                <div>
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  {dish.spice > 0 && <p style={{ color: 'var(--terracotta)', marginTop: 4 }}>{'🌶'.repeat(dish.spice)}</p>}
                </div>
                <strong>{formatFCFA(dish.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reservation-banner">
        <div>
          <p className="eyebrow light">Prêt à commander ?</p>
          <h2>
            Passez à
            <br />
            <i>la caisse.</i>
          </h2>
        </div>
        <Link className="button button-light" href="/commander">
          Voir mon panier <ArrowRight size={17} />
        </Link>
      </section>
    </>
  )
}
