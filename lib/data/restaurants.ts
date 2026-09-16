export interface Restaurant {
  slug: string
  name: string
  address: string
  city: string
  hours: string
  phone: string
  services: string[]
  deliveryZone: string
  image: string
  orders: number
  revenue: number
  clients: number
  coords: { x: number; y: number }
}

export const restaurants: Restaurant[] = [
  {
    slug: 'cocody',
    name: 'Placali Abouré — Cocody',
    address: 'Rue des Jardins, Cocody',
    city: 'Abidjan',
    hours: 'Lun — Sam · 12h — 23h · Dim · 12h — 20h',
    phone: '+225 07 07 07 07 07',
    services: ['Sur place', 'À emporter', 'Livraison', 'Espace privé'],
    deliveryZone: 'Cocody, Riviera, II Plateaux',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    orders: 142,
    revenue: 1800000,
    clients: 118,
    coords: { x: 62, y: 38 },
  },
  {
    slug: 'zone-4',
    name: 'Placali Abouré — Zone 4',
    address: 'Boulevard de Marseille, Zone 4',
    city: 'Abidjan',
    hours: 'Lun — Dim · 11h30 — 23h30',
    phone: '+225 07 07 07 07 08',
    services: ['Sur place', 'À emporter', 'Livraison', 'Événements'],
    deliveryZone: 'Zone 4, Marcory, Treichville',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85',
    orders: 187,
    revenue: 2400000,
    clients: 153,
    coords: { x: 45, y: 55 },
  },
  {
    slug: 'bingerville',
    name: 'Placali Abouré — Bingerville',
    address: 'Route du Jardin Botanique',
    city: 'Bingerville',
    hours: 'Lun — Dim · 12h — 22h',
    phone: '+225 07 07 07 07 09',
    services: ['Sur place', 'À emporter', 'Groupes'],
    deliveryZone: 'Bingerville centre',
    image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1000&q=85',
    orders: 96,
    revenue: 1100000,
    clients: 82,
    coords: { x: 80, y: 25 },
  },
]

export function restaurantBySlug(slug: string) {
  return restaurants.find((restaurant) => restaurant.slug === slug)
}
