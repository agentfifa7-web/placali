import { BarChart } from '@/components/admin/bar-chart'
import { restaurants } from '@/lib/data/restaurants'
import { formatFCFA } from '@/lib/format'

export default function AdminMultiRestaurantsPage() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Vue siège
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Gestion multi-restaurants</h1>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 28, overflow: 'hidden' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--line)', textAlign: 'left' }}>
              {['Restaurant', 'Commandes', 'CA', 'Clients'].map((head) => (
                <th key={head} style={{ color: 'var(--muted)', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', padding: '14px 20px', textTransform: 'uppercase' }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant.slug} style={{ borderBottom: '1px solid var(--line)', fontSize: 13 }}>
                <td style={{ padding: '16px 20px' }}>
                  <strong>{restaurant.city}</strong>
                </td>
                <td style={{ padding: '16px 20px' }}>{restaurant.orders}</td>
                <td style={{ padding: '16px 20px' }}>{formatFCFA(restaurant.revenue)}</td>
                <td style={{ padding: '16px 20px' }}>{restaurant.clients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ padding: 26 }}>
        <p className="eyebrow" style={{ marginBottom: 18 }}>
          Chiffre d’affaires par restaurant
        </p>
        <BarChart data={restaurants.map((restaurant) => ({ label: restaurant.city, value: restaurant.revenue }))} format="fcfa" />
      </div>
    </>
  )
}
