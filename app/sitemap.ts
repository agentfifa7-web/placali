import type { MetadataRoute } from 'next'
import { restaurants } from '@/lib/data/restaurants'
import { articles } from '@/lib/data/content'

const BASE_URL = 'https://placali-aboure.example'

const staticRoutes = [
  '',
  '/menu',
  '/reservation',
  '/evenements',
  '/restaurants',
  '/fidelite',
  '/magazine',
  '/notre-histoire',
  '/savoir-faire',
  '/promotions',
  '/communaute',
  '/entreprise',
  '/cartes-cadeaux',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = staticRoutes.map((route) => ({ url: `${BASE_URL}${route}`, lastModified: now }))
  const restaurantPages = restaurants.map((restaurant) => ({ url: `${BASE_URL}/restaurants/${restaurant.slug}`, lastModified: now }))
  const articlePages = articles.map((article) => ({ url: `${BASE_URL}/magazine/${article.slug}`, lastModified: now }))
  return [...pages, ...restaurantPages, ...articlePages]
}
