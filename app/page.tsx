'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Check, ChevronDown, ChevronRight, Clock3, Gift, MapPin, Menu, Minus, Phone, Plus, ShoppingBag, Star, Truck, Utensils, X } from 'lucide-react'

type Dish = { id: number; name: string; description: string; price: number; category: string; image: string; tag?: string }

const dishes: Dish[] = [
  { id: 1, name: 'Le placali abouré', description: 'Pâte de manioc souple, sauce graine et poisson fumé.', price: 16, category: 'Incontournables', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85', tag: 'Signature' },
  { id: 2, name: 'Poulet braisé', description: 'Poulet mariné aux épices, braisé au feu de bois.', price: 18, category: 'Incontournables', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Attiéké poisson', description: 'Semoule de manioc, oignons frais et dorade grillée.', price: 17, category: 'Incontournables', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Mafé de bœuf', description: 'Bœuf mijoté dans une sauce onctueuse aux arachides.', price: 19, category: 'À partager', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Alloco maison', description: 'Bananes plantain frites, piment doux et sauce tomate.', price: 8, category: 'À partager', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Bissap frais', description: 'Infusion d’hibiscus, menthe fraîche et gingembre.', price: 5, category: 'Boissons', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85' },
]

const categories = ['Incontournables', 'À partager', 'Boissons']

export default function Page() {
  const [category, setCategory] = useState('Incontournables')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [booked, setBooked] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [newsletterSent, setNewsletterSent] = useState(false)

  const visibleDishes = dishes.filter((dish) => dish.category === category)
  const cartItems = useMemo(() => dishes.filter((dish) => cart[dish.id]), [cart])
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartItems.reduce((sum, dish) => sum + dish.price * (cart[dish.id] ?? 0), 0)

  function addToCart(id: number) { setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 })); setCartOpen(true) }
  function updateQuantity(id: number, delta: number) { setCart((current) => { const next = (current[id] ?? 0) + delta; if (next <= 0) { const copy = { ...current }; delete copy[id]; return copy } return { ...current, [id]: next } }) }

  return (
    <main className="site-shell">
      <div className="topline"><span>Abidjan · Cocody</span><span className="topline-center">Ouvert aujourd’hui · 12h — 23h</span><span>+225 07 07 07 07 07</span></div>
      <header className="navbar">
        <a href="#accueil" className="brand" aria-label="Placali Abouré, accueil"><span className="brand-mark">PA</span><span><strong>PLACALI</strong><em>ABOURÉ</em></span></a>
        <nav className="desktop-nav" aria-label="Navigation principale"><a href="#menu">La carte</a><a href="#maison">Notre maison</a><a href="#experience">L’expérience</a><a href="#contact">Nous trouver</a></nav>
        <div className="nav-actions"><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}><ShoppingBag size={19} /><span>Panier</span>{cartCount > 0 && <b>{cartCount}</b>}</button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Ouvrir le menu"><Menu size={23} /></button></div>
      </header>
      {mobileOpen && <div className="mobile-nav"><a href="#menu" onClick={() => setMobileOpen(false)}>La carte</a><a href="#maison" onClick={() => setMobileOpen(false)}>Notre maison</a><a href="#experience" onClick={() => setMobileOpen(false)}>L’expérience</a><a href="#contact" onClick={() => setMobileOpen(false)}>Nous trouver</a></div>}

      <section id="accueil" className="hero">
        <div className="hero-image" />
        <div className="hero-content"><p className="eyebrow light">Cuisine ivoirienne · depuis 2018</p><h1>Le goût de<br /><i>chez nous.</i></h1><p className="hero-copy">Une cuisine généreuse, des recettes transmises, et cette chaleur qui transforme chaque repas en souvenir.</p><div className="hero-actions"><a className="button button-gold" href="#menu">Découvrir la carte <ArrowRight size={17} /></a><button className="text-link light-link" onClick={() => setBookingOpen(true)}>Réserver une table <ChevronRight size={17} /></button></div></div>
        <div className="hero-note"><span className="note-line" /><span>Une escale<br />en Côte d’Ivoire</span></div>
      </section>

      <section className="intro section-pad"><div className="intro-label"><span className="number">01</span><span className="rule" /><span>La maison</span></div><div className="intro-copy"><p className="eyebrow">Bienvenue chez nous</p><h2>Une table qui a<br /><i>une histoire à raconter.</i></h2><p>Chez Placali Abouré, on cuisine comme on reçoit : avec le cœur, les mains et le temps qu’il faut. Chaque assiette est un hommage aux femmes et aux hommes qui font vivre les saveurs de notre terre.</p><a className="text-link" href="#maison">Découvrir notre histoire <ArrowRight size={17} /></a></div><div className="intro-stamp"><span>Fait maison</span><strong>100%</strong><small>avec amour</small></div></section>

      <section id="menu" className="menu-section section-pad"><div className="section-heading"><div><p className="eyebrow">À table</p><h2>Nos <i>incontournables</i></h2></div><a href="#menu" className="desktop-link">Voir toute la carte <ArrowRight size={17} /></a></div><div className="category-tabs" role="tablist">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="dish-grid">{visibleDishes.map((dish) => <article className="dish-card" key={dish.id}><div className="dish-image"><img src={dish.image} alt={dish.name} />{dish.tag && <span className="dish-tag">{dish.tag}</span>}<button className="add-button" onClick={() => addToCart(dish.id)} aria-label={`Ajouter ${dish.name}`}><Plus size={19} /></button></div><div className="dish-info"><div><h3>{dish.name}</h3><p>{dish.description}</p></div><strong>{dish.price} <small>€</small></strong></div></article>)}</div></section>

      <section id="maison" className="story-section"><div className="story-photo photo-one" /><div className="story-photo photo-two" /><div className="story-copy"><p className="eyebrow">Notre maison</p><h2>Comme à<br /><i>Abouré.</i></h2><p>Dans notre village comme dans notre restaurant, la cuisine est un langage. Celui du partage, de la transmission et des grandes tablées qui ne finissent jamais.</p><a className="text-link" href="#contact">En savoir plus <ArrowRight size={17} /></a></div></section>

      <section id="experience" className="experience section-pad"><div className="section-heading"><div><p className="eyebrow">À votre façon</p><h2>Vivez <i>l’expérience</i></h2></div></div><div className="experience-grid"><div className="experience-card"><span className="experience-icon"><Utensils /></span><h3>Sur place</h3><p>Installez-vous, on s’occupe du reste. Une parenthèse chaleureuse au cœur de Cocody.</p><a href="#contact">Trouver le restaurant <ChevronRight size={16} /></a></div><div className="experience-card featured"><span className="experience-icon"><Truck /></span><h3>À emporter</h3><p>Vos plats préférés, soigneusement emballés pour prolonger le plaisir où vous voulez.</p><a href="#contact">Commander à emporter <ChevronRight size={16} /></a></div><div className="experience-card"><span className="experience-icon"><Gift /></span><h3>À offrir</h3><p>Offrez un moment de partage avec nos cartes cadeaux, valables toute l’année.</p><a href="#contact">Découvrir les cartes <ChevronRight size={16} /></a></div></div></section>

      <section className="reservation-banner"><div><p className="eyebrow light">Votre table vous attend</p><h2>On se retrouve<br /><i>à table ?</i></h2></div><button className="button button-light" onClick={() => setBookingOpen(true)}>Réserver maintenant <CalendarDays size={17} /></button></section>

      <section className="newsletter section-pad"><div><p className="eyebrow">La famille s’agrandit</p><h2>Recevez un peu<br /><i>d’Abouré chez vous.</i></h2></div><div className="newsletter-form">{newsletterSent ? <div className="success-line"><Check size={19} /> Merci, vous êtes des nôtres.</div> : <><p>Nos nouveautés, nos recettes et quelques bonnes nouvelles. Pas de spam, promis.</p><form onSubmit={(event) => { event.preventDefault(); setNewsletterSent(true) }}><input type="email" required placeholder="Votre adresse e-mail" aria-label="Votre adresse e-mail" /><button aria-label="S’inscrire"><ArrowRight size={19} /></button></form></>}</div></section>

      <footer id="contact" className="footer"><div className="footer-brand"><a href="#accueil" className="brand brand-light"><span className="brand-mark">PA</span><span><strong>PLACALI</strong><em>ABOURÉ</em></span></a><p>La cuisine ivoirienne<br />avec le cœur.</p></div><div className="footer-col"><h4>Nous trouver</h4><p>Rue des Jardins, Cocody<br />Abidjan, Côte d’Ivoire</p><a href="#contact">Voir l’itinéraire <ArrowRight size={15} /></a></div><div className="footer-col"><h4>Horaires</h4><p>Lun — Sam · 12h — 23h<br />Dimanche · 12h — 20h</p><a href="tel:+2250707070707">+225 07 07 07 07 07</a></div><div className="footer-col socials"><h4>Suivez-nous</h4><p>Instagram · Facebook<br />@placaliaboure</p><a href="#accueil">Revenir en haut <ChevronDown size={15} /></a></div><div className="footer-bottom"><span>© 2024 Placali Abouré</span><span>Fait avec le cœur à Abidjan</span><span>Mentions légales</span></div></footer>

      {cartOpen && <div className="overlay" onClick={() => setCartOpen(false)}><aside className="side-panel" onClick={(event) => event.stopPropagation()}><div className="panel-head"><div><p className="eyebrow">Votre sélection</p><h2>Le panier <span>({cartCount})</span></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X /></button></div>{cartItems.length === 0 ? <div className="empty-panel"><ShoppingBag size={32} /><p>Votre panier est encore vide.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Voir la carte</button></div> : <><div className="cart-lines">{cartItems.map((dish) => <div className="cart-line" key={dish.id}><img src={dish.image} alt="" /><div><h3>{dish.name}</h3><p>{dish.price} €</p><div className="quantity"><button onClick={() => updateQuantity(dish.id, -1)}><Minus size={13} /></button><span>{cart[dish.id]}</span><button onClick={() => updateQuantity(dish.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><div><span>Sous-total</span><strong>{subtotal} €</strong></div><button className="button button-gold full-button" onClick={() => setCartOpen(false)}>Passer la commande <ArrowRight size={16} /></button><small>Démo — aucune commande ne sera débitée.</small></div></>}</aside></div>}

      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="booking-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Fermer"><X /></button>{booked ? <div className="booking-success"><span><Check /></span><p className="eyebrow">C’est noté !</p><h2>Votre table<br /><i>est réservée.</i></h2><p>Merci pour votre confiance. Nous vous attendons avec impatience chez Placali Abouré.</p><button className="button button-dark" onClick={() => setBookingOpen(false)}>Fermer</button></div> : <><p className="eyebrow">Une place pour vous</p><h2>Réserver<br /><i>une table.</i></h2><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setBooked(true) }}><label>Votre nom<input required placeholder="Prénom et nom" /></label><div className="form-row"><label>Date<input required type="date" /></label><label>Heure<select defaultValue="20:00"><option>19:00</option><option>20:00</option><option>21:00</option></select></label></div><label>Nombre de personnes<select defaultValue="2"><option>2 personnes</option><option>3 personnes</option><option>4 personnes</option><option>5 personnes ou plus</option></select></label><button className="button button-gold full-button">Confirmer la réservation <ArrowRight size={17} /></button></form></>}</div></div>}
    </main>
  )
}
