import { dishes, type Dish } from '@/lib/data/dishes'
import { restaurants } from '@/lib/data/restaurants'

export interface AssistantReply {
  text: string
  dishes?: Dish[]
}

function pickPopular(max = 2) {
  return dishes.filter((dish) => dish.popular).slice(0, max)
}

export function askAboure(raw: string): AssistantReply {
  const question = raw.toLowerCase()

  const guestsMatch = question.match(/(\d+)\s*(personnes|convives|gens)/)
  if (guestsMatch) {
    const guests = Number(guestsMatch[1])
    const picks = pickPopular(guests >= 6 ? 3 : 2)
    return {
      text: `Pour ${guests} personnes, je recommande un menu à partager : ${picks.map((dish) => dish.name).join(', ')}. Je peux aussi vous proposer notre menu famille avec -15% pour les grandes tablées.`,
      dishes: picks,
    }
  }

  if (/pas.{0,10}épic|peu épic|sans piment|doux/.test(question)) {
    const mild = dishes.filter((dish) => dish.spice <= 1).slice(0, 2)
    return {
      text: `Je vous recommande notre ${mild[0]?.name.toLowerCase()} avec poisson braisé. 🌶 Faible niveau d’épices.`,
      dishes: mild,
    }
  }

  if (/épic|piment|fort|relevé/.test(question)) {
    const spicy = dishes.filter((dish) => dish.spice >= 2).slice(0, 2)
    return {
      text: `Pour les amateurs de sensations fortes : ${spicy.map((dish) => dish.name).join(' ou ')}. 🔥`,
      dishes: spicy,
    }
  }

  if (/horaire|ouvert|fermé|heure/.test(question)) {
    return { text: 'Nous sommes ouverts du lundi au samedi de 12h à 23h, et le dimanche de 12h à 20h, dans nos trois restaurants (Cocody, Zone 4, Bingerville).' }
  }

  if (/restaurant|adresse|où êtes|localis/.test(question)) {
    return { text: `Vous nous trouverez à ${restaurants.map((restaurant) => restaurant.city + ' (' + restaurant.name.split('—')[1]?.trim() + ')').join(', ')}. Consultez la page « Nos restaurants » pour l’itinéraire complet.` }
  }

  if (/réserv/.test(question)) {
    return { text: 'Je peux vous aider à réserver une table classique, un espace privé ou organiser un dîner en couple. Rendez-vous sur la page Réservation, ou dites-moi la date et le nombre de convives.' }
  }

  if (/livr|command/.test(question)) {
    return { text: 'Vous pouvez commander en livraison ou en Click & Collect directement depuis la carte. Le paiement accepte Orange Money, MTN Mobile Money, Moov Money, Wave et carte bancaire.' }
  }

  if (/promo|réduction|offre/.test(question)) {
    return { text: 'En ce moment : -20% sur l’offre déjeuner en semaine, -15% sur le menu famille et un dessert offert pour votre anniversaire. Voir toutes les promotions.' }
  }

  if (/événement|mariage|anniversaire|corporate|séminaire/.test(question)) {
    return { text: 'Notre espace événements organise anniversaires, mariages, cérémonies et séminaires d’entreprise, avec menu et décoration sur-mesure. Dites-moi le nombre d’invités pour une proposition personnalisée.' }
  }

  if (/point|fidélité|club|récompense/.test(question)) {
    return { text: 'Chaque 1 000 FCFA dépensé rapporte 10 points Abouré Club, échangeables contre des plats gratuits, réductions et accès à des événements privés.' }
  }

  const picks = pickPopular(2)
  return {
    text: `Je vous suggère nos incontournables du moment : ${picks.map((dish) => dish.name).join(' et ')}. Dites-m’en plus sur vos envies (épicé, nombre de personnes, budget) pour un conseil plus précis.`,
    dishes: picks,
  }
}
