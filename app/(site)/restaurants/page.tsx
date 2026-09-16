import Link from 'next/link'
import { ArrowRight, Clock3, MapPin, Phone, Truck } from 'lucide-react'
import { restaurants } from '@/lib/data/restaurants'

export default function RestaurantsPage() {
  return (
    <>
      <section className="page-hero" style={{ ['--hero-bg' as string]: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85')" }}>
        <span className="crumb">Trouver un restaurant</span>
        <h1>
          Trois adresses,
          <br />
          <i>une seule maison.</i>
        </h1>
        <p>Cocody, Zone 4, Bingerville : retrouvez horaires, services et zone de livraison de chaque restaurant.</p>
      </section>

      <section className="shell">
        <div className="map-plate" style={{ marginBottom: 50 }}>
          {restaurants.map((restaurant) => (
            <div key={restaurant.slug} style={{ left: `${restaurant.coords.x}%`, position: 'absolute', top: `${restaurant.coords.y}%` }}>
              <span className="map-pin" style={{ position: 'relative', left: 0, top: 0, transform: 'none' }} />
              <span className="map-pin-label">{restaurant.city}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {restaurants.map((restaurant) => (
            <div key={restaurant.slug} className="card restaurant-row" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>
              <div className="dish-image" style={{ aspectRatio: 'auto', height: '100%' }}>
                <img src={restaurant.image} alt={restaurant.name} />
              </div>
              <div style={{ padding: '26px 30px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 500, margin: '0 0 12px' }}>{restaurant.name}</h3>
                <div style={{ color: 'var(--muted)', display: 'flex', flexDirection: 'column', fontSize: 12.5, gap: 8, marginBottom: 16 }}>
                  <span style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                    <MapPin size={14} /> {restaurant.address}, {restaurant.city}
                  </span>
                  <span style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                    <Clock3 size={14} /> {restaurant.hours}
                  </span>
                  <span style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                    <Phone size={14} /> {restaurant.phone}
                  </span>
                  <span style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                    <Truck size={14} /> Livraison : {restaurant.deliveryZone}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                  {restaurant.services.map((service) => (
                    <span className="chip" key={service}>
                      {service}
                    </span>
                  ))}
                </div>
                <Link className="text-link" href={`/restaurants/${restaurant.slug}`}>
                  Voir le restaurant <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
