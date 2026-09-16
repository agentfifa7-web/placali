'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, Gift, Plus, Star, Truck, Utensils } from 'lucide-react'
import { dishes } from '@/lib/data/dishes'
import { testimonials, communityPosts } from '@/lib/data/content'
import { formatFCFA } from '@/lib/format'
import { useCart } from '@/lib/store'

const featured = dishes.filter((dish) => dish.popular).slice(0, 6)

export default function HomePage() {
  const { addItem } = useCart()
  const [newsletterSent, setNewsletterSent] = useState(false)

  return (
    <>
      <section id="accueil" className="hero">
        <div className="hero-image" />
        <div className="hero-content">
          <p className="eyebrow light">Cuisine ivoirienne · depuis 2018</p>
          <h1>
            Le goût de
            <br />
            <i>chez nous.</i>
          </h1>
          <p className="hero-copy">Une cuisine généreuse, des recettes transmises, et cette chaleur qui transforme chaque repas en souvenir. Commande, livraison, réservation et événements, réunis sur une seule plateforme.</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/menu">
              Découvrir la carte <ArrowRight size={17} />
            </Link>
            <Link className="text-link light-link" href="/reservation">
              Réserver une table <ChevronRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-note">
          <span className="note-line" />
          <span>
            Une escale
            <br />
            en Côte d’Ivoire
          </span>
        </div>
      </section>

      <section className="intro section-pad">
        <div className="intro-label">
          <span className="number">01</span>
          <span className="rule" />
          <span>La maison</span>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Bienvenue chez nous</p>
          <h2>
            Une table qui a
            <br />
            <i>une histoire à raconter.</i>
          </h2>
          <p>Chez Placali Abouré, on cuisine comme on reçoit : avec le cœur, les mains et le temps qu’il faut. Chaque assiette est un hommage aux femmes et aux hommes qui font vivre les saveurs de notre terre.</p>
          <Link className="text-link" href="/notre-histoire">
            Découvrir notre histoire <ArrowRight size={17} />
          </Link>
        </div>
        <div className="intro-stamp">
          <span>Fait maison</span>
          <strong>100%</strong>
          <small>avec amour</small>
        </div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">À table</p>
            <h2>
              Nos <i>incontournables</i>
            </h2>
          </div>
          <Link href="/menu" className="desktop-link">
            Voir toute la carte <ArrowRight size={17} />
          </Link>
        </div>
        <div className="dish-grid">
          {featured.map((dish) => (
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
                </div>
                <strong>{formatFCFA(dish.price)}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="maison" className="story-section">
        <div className="story-photo photo-one" />
        <div className="story-photo photo-two" />
        <div className="story-copy">
          <p className="eyebrow">Notre maison</p>
          <h2>
            Comme à
            <br />
            <i>Abouré.</i>
          </h2>
          <p>Dans notre village comme dans notre restaurant, la cuisine est un langage. Celui du partage, de la transmission et des grandes tablées qui ne finissent jamais.</p>
          <Link className="text-link" href="/notre-histoire">
            En savoir plus <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section id="experience" className="experience section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">À votre façon</p>
            <h2>
              Vivez <i>l’expérience</i>
            </h2>
          </div>
        </div>
        <div className="experience-grid">
          <div className="experience-card">
            <span className="experience-icon">
              <Utensils />
            </span>
            <h3>Sur place</h3>
            <p>Installez-vous, on s’occupe du reste. Une parenthèse chaleureuse à Cocody, Zone 4 et Bingerville.</p>
            <Link href="/restaurants">
              Trouver un restaurant <ChevronRight size={16} />
            </Link>
          </div>
          <div className="experience-card featured">
            <span className="experience-icon">
              <Truck />
            </span>
            <h3>Livraison &amp; à emporter</h3>
            <p>Vos plats préférés, livrés chez vous ou prêts en Click &amp; Collect, avec suivi en temps réel.</p>
            <Link href="/commander">
              Commander maintenant <ChevronRight size={16} />
            </Link>
          </div>
          <div className="experience-card">
            <span className="experience-icon">
              <Gift />
            </span>
            <h3>Événements &amp; cartes cadeaux</h3>
            <p>Anniversaires, mariages, séminaires ou une simple attention : on organise, vous profitez.</p>
            <Link href="/evenements">
              Organiser un événement <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--paper)' }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ils nous ont fait confiance</p>
            <h2>
              Les favoris <i>des clients</i>
            </h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={13} fill={index < testimonial.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
              <p>“{testimonial.comment}”</p>
              <span>
                {testimonial.name} · {testimonial.location}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sur les réseaux</p>
            <h2>
              #MonPlacali<i>Abouré</i>
            </h2>
          </div>
          <Link href="/communaute" className="desktop-link">
            Voir la communauté <ArrowRight size={17} />
          </Link>
        </div>
        <div className="insta-grid">
          {communityPosts.map((post) => (
            <Link href="/communaute" className="insta-tile" key={post.user}>
              <img src={post.image} alt={post.caption} />
              <span>{post.user}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="reservation-banner">
        <div>
          <p className="eyebrow light">Votre table vous attend</p>
          <h2>
            On se retrouve
            <br />
            <i>à table ?</i>
          </h2>
        </div>
        <Link className="button button-light" href="/reservation">
          Réserver maintenant <ArrowRight size={17} />
        </Link>
      </section>

      <section className="newsletter section-pad">
        <div>
          <p className="eyebrow">La famille s’agrandit</p>
          <h2>
            Recevez un peu
            <br />
            <i>d’Abouré chez vous.</i>
          </h2>
        </div>
        <div className="newsletter-form">
          {newsletterSent ? (
            <div className="success-line">
              <Check size={19} /> Merci, vous êtes des nôtres.
            </div>
          ) : (
            <>
              <p>Nos nouveautés, nos recettes et quelques bonnes nouvelles. Pas de spam, promis.</p>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setNewsletterSent(true)
                }}
              >
                <input type="email" required placeholder="Votre adresse e-mail" aria-label="Votre adresse e-mail" />
                <button aria-label="S’inscrire">
                  <ArrowRight size={19} />
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  )
}
