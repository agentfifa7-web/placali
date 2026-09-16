export type SpiceLevel = 0 | 1 | 2 | 3

export interface Dish {
  id: number
  name: string
  description: string
  price: number
  category: 'Placali' | 'Accompagnements' | 'Grillades' | 'Boissons' | 'Desserts'
  image: string
  tag?: string
  spice: SpiceLevel
  popular?: boolean
}

export const dishes: Dish[] = [
  { id: 1, name: 'Placali sauce graine', description: 'Pâte de manioc souple, sauce graine de palme et poisson fumé.', price: 3500, category: 'Placali', image: '/images/dish-sauce-verte.webp', tag: 'Signature', spice: 1, popular: true },
  { id: 2, name: 'Placali sauce kopè', description: 'Sauce crabe et fruits de mer relevée, pâte de manioc filante.', price: 4200, category: 'Placali', image: '/images/dish-crabe-sauce.jpg', spice: 2 },
  { id: 3, name: 'Placali sauce arachide', description: 'Onctueuse sauce arachide, viande braisée et légumes.', price: 3800, category: 'Placali', image: '/images/dish-table-service.jpg', spice: 1, popular: true },
  { id: 4, name: 'Placali sauce pklala', description: 'Feuilles de pklala mijotées, saveur végétale et fumée.', price: 3600, category: 'Placali', image: '/images/dish-sauce-closeup.jpg', spice: 2 },
  { id: 5, name: 'Placali gouagouassou', description: 'Sauce pimentée intense, spécialité corsée de la maison.', price: 3900, category: 'Placali', image: '/images/dish-placali-ball.jpg', tag: 'Épicé', spice: 3 },
  { id: 6, name: 'Poisson braisé', description: 'Dorade entière braisée au feu de bois, oignons confits.', price: 4500, category: 'Accompagnements', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 7, name: 'Crabe farci', description: 'Crabe mijoté dans sa carapace, épices douces.', price: 5200, category: 'Accompagnements', image: 'https://images.unsplash.com/photo-1550747545-c896b5f89ff7?auto=format&fit=crop&w=900&q=85', spice: 1 },
  { id: 8, name: 'Escargots sautés', description: 'Escargots géants d’Abidjan, ail et piment doux.', price: 4800, category: 'Accompagnements', image: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=85', spice: 1 },
  { id: 9, name: 'Viande de bœuf mijotée', description: 'Bœuf fondant, cuisson lente aux épices de la maison.', price: 4200, category: 'Accompagnements', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 10, name: 'Tripes façon Abouré', description: 'Recette traditionnelle, mijotée longuement aux épices.', price: 3400, category: 'Accompagnements', image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=900&q=85', spice: 2 },
  { id: 11, name: 'Poulet braisé', description: 'Poulet fermier mariné, braisé au feu de bois.', price: 3900, category: 'Grillades', image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85', spice: 1, popular: true },
  { id: 12, name: 'Brochettes bœuf & poivrons', description: 'Brochettes marinées, grillées minute.', price: 4100, category: 'Grillades', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=85', spice: 1 },
  { id: 13, name: 'Crevettes grillées', description: 'Crevettes royales, beurre à l’ail et citron vert.', price: 5400, category: 'Grillades', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 14, name: 'Alloco maison', description: 'Bananes plantain frites, piment doux et sauce tomate.', price: 1800, category: 'Grillades', image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=900&q=85', spice: 1 },
  { id: 15, name: 'Bissap frais', description: 'Infusion d’hibiscus, menthe fraîche et gingembre.', price: 1200, category: 'Boissons', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85', spice: 0, popular: true },
  { id: 16, name: 'Gingembre glacé', description: 'Jus de gingembre frais, ananas et citron.', price: 1200, category: 'Boissons', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 17, name: 'Jus de bouye', description: 'Fruit du baobab, onctueux et légèrement acidulé.', price: 1400, category: 'Boissons', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 18, name: 'Eau minérale', description: 'Bouteille 50cl.', price: 600, category: 'Boissons', image: 'https://images.unsplash.com/photo-1553455565-f9fb7d1b8f76?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 19, name: 'Dégué à la mangue', description: 'Perles de mil, lait fermenté et mangue fraîche.', price: 2000, category: 'Desserts', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85', spice: 0, popular: true },
  { id: 20, name: 'Beignets de banane', description: 'Beignets moelleux, sucre vanillé.', price: 1600, category: 'Desserts', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85', spice: 0 },
  { id: 21, name: 'Salade d’ananas victoria', description: 'Ananas frais, sirop de gingembre.', price: 1800, category: 'Desserts', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=900&q=85', spice: 0 },
]

export const categories: Dish['category'][] = ['Placali', 'Accompagnements', 'Grillades', 'Boissons', 'Desserts']

export interface BuilderOption { id: string; label: string; price: number; image?: string }

export const builderBases: BuilderOption[] = [
  { id: 'placali', label: 'Placali', price: 2000 },
  { id: 'riz', label: 'Riz', price: 1500 },
  { id: 'attieke', label: 'Attiéké', price: 1500 },
  { id: 'igname', label: 'Igname', price: 1800 },
]

export const builderSauces: BuilderOption[] = [
  { id: 'arachide', label: 'Arachide', price: 1500 },
  { id: 'graine', label: 'Graine', price: 1500 },
  { id: 'pklala', label: 'Pklala', price: 1600 },
  { id: 'kope', label: 'Kopè', price: 1900 },
  { id: 'gouagouassou', label: 'Gouagouassou', price: 1700 },
]

export const builderGarnitures: BuilderOption[] = [
  { id: 'poisson', label: 'Poisson', price: 2500 },
  { id: 'crabe', label: 'Crabe', price: 3200 },
  { id: 'escargot', label: 'Escargot', price: 2900 },
  { id: 'viande', label: 'Viande', price: 2400 },
  { id: 'tripe', label: 'Tripe', price: 2000 },
  { id: 'poulet', label: 'Poulet', price: 2300 },
  { id: 'crevettes', label: 'Crevettes', price: 3400 },
]

export function dishById(id: number) {
  return dishes.find((dish) => dish.id === id)
}
