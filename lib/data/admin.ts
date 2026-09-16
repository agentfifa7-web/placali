export const weeklyRevenue = [
  { day: 'Lun', value: 620000 },
  { day: 'Mar', value: 540000 },
  { day: 'Mer', value: 710000 },
  { day: 'Jeu', value: 690000 },
  { day: 'Ven', value: 980000 },
  { day: 'Sam', value: 1240000 },
  { day: 'Dim', value: 860000 },
]

export const topDishes = [
  { name: 'Placali sauce graine', sales: 312 },
  { name: 'Poulet braisé', sales: 274 },
  { name: 'Placali sauce arachide', sales: 251 },
  { name: 'Attiéké poisson', sales: 198 },
  { name: 'Alloco maison', sales: 176 },
]

export const flopDishes = [
  { name: 'Tripes façon Abouré', sales: 24 },
  { name: 'Placali gouagouassou', sales: 31 },
  { name: 'Crabe farci', sales: 38 },
]

export const clientStats = { new: 86, returning: 214, frequency: 2.4 }

export const neighborhoods = [
  { name: 'Cocody', orders: 412 },
  { name: 'Zone 4 / Marcory', orders: 356 },
  { name: 'Riviera', orders: 289 },
  { name: 'Bingerville', orders: 164 },
  { name: 'Treichville', orders: 121 },
]

export const recentOrders = [
  { id: 'PA-28448', client: 'Aïcha K.', restaurant: 'Cocody', total: 8500, status: 'Livrée', date: '2026-09-15T18:20:00' },
  { id: 'PA-28449', client: 'Yves-Marie D.', restaurant: 'Zone 4', total: 12200, status: 'Livrée', date: '2026-09-15T19:05:00' },
  { id: 'PA-28450', client: 'Fatou B.', restaurant: 'Bingerville', total: 6400, status: 'Livreur en route', date: '2026-09-16T12:10:00' },
  { id: 'PA-28451', client: 'Serge A.', restaurant: 'Cocody', total: 9800, status: 'Cuisine en préparation', date: '2026-09-16T12:32:00' },
  { id: 'PA-28452', client: 'Nafi K.', restaurant: 'Zone 4', total: 15400, status: 'Commande reçue', date: '2026-09-16T12:41:00' },
]

export interface KitchenOrder {
  id: string
  restaurant: string
  items: string[]
  status: 'En attente' | 'En préparation' | 'Prête'
  time: string
}

export const kitchenQueue: KitchenOrder[] = [
  { id: 'PA-28451', restaurant: 'Cocody', items: ['Placali', 'Sauce graine', 'Poisson', 'Boisson'], status: 'En attente', time: '2 min' },
  { id: 'PA-28452', restaurant: 'Cocody', items: ['Poulet braisé', 'Alloco'], status: 'En préparation', time: '6 min' },
  { id: 'PA-28453', restaurant: 'Zone 4', items: ['Placali', 'Sauce kopè', 'Crabe'], status: 'En préparation', time: '9 min' },
  { id: 'PA-28454', restaurant: 'Bingerville', items: ['Attiéké', 'Poisson braisé'], status: 'Prête', time: '13 min' },
]

export interface DeliveryOrder {
  id: string
  address: string
  distance: string
  payout: number
  status: 'Disponible' | 'En cours'
}

export const deliveryOrders: DeliveryOrder[] = [
  { id: 'PA-28451', address: 'Riviera Palmeraie, Cocody', distance: '3.2 km', payout: 1200, status: 'Disponible' },
  { id: 'PA-28449', address: 'Rue des Jardins, Cocody', distance: '1.8 km', payout: 900, status: 'En cours' },
  { id: 'PA-28444', address: 'Boulevard VGE, Zone 4', distance: '4.5 km', payout: 1500, status: 'Disponible' },
]
