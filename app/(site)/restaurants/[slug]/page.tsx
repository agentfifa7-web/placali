import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Clock3, MapPin, Phone, Truck } from 'lucide-react'
import { restaurantBySlug, restaurants } from '@/lib/data/restaurants'

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ slug: restaurant.slug }))
}

export default async function RestaurantDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const restaurant = restaurantBySlug(slug)
  if (!restaurant) notFound()

  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: `url('${restaurant.image}')` }}>
        <span className="crumb">Nos restaurants</span>
        <h1>
          {restaurant.name.split('—')[0]}
          <br />
          <i>{restaurant.name.split('—')[1]}</i>
        </h1>
        <p>{restaurant.address}, {restaurant.city}</p>
      </section>

      <section className="shell builder-grid" style={{ display: 'grid', gap: 44, gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 26 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Informations
            </p>
            <div style={{ color: 'var(--muted)', display: 'flex', flexDirection: 'column', fontSize: 13, gap: 12 }}>
              <span style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                <MapPin size={16} /> {restaurant.address}, {restaurant.city}
              </span>
              <span style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                <Clock3 size={16} /> {restaurant.hours}
              </span>
              <span style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                <Phone size={16} /> {restaurant.phone}
              </span>
              <span style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
                <Truck size={16} /> Zone de livraison : {restaurant.deliveryZone}
              </span>
            </div>
          </div>
          <div className="card" style={{ padding: 26 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>
              Services disponibles
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {restaurant.services.map((service) => (
                <span className="chip" key={service}>
                  {service}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <Link className="button button-gold" href="/commander">
              Commander <ArrowRight size={16} />
            </Link>
            <Link className="button button-dark" href="/reservation">
              Réserver une table
            </Link>
          </div>
        </div>
        <div className="dish-image" style={{ aspectRatio: 'auto', minHeight: 380 }}>
          <img src={restaurant.image} alt={restaurant.name} />
        </div>
      </section>
    </>
  )
}
