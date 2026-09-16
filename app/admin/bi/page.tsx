import { BarChart } from '@/components/admin/bar-chart'
import { clientStats, flopDishes, neighborhoods, topDishes, weeklyRevenue } from '@/lib/data/admin'
import { restaurants } from '@/lib/data/restaurants'
import { formatFCFA } from '@/lib/format'

const totalOrders = restaurants.reduce((sum, restaurant) => sum + restaurant.orders, 0)
const totalRevenue = restaurants.reduce((sum, restaurant) => sum + restaurant.revenue, 0)
const basketAverage = Math.round(totalRevenue / totalOrders)

export default function AdminBIPage() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Intelligence business
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Analyses &amp; performance</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr', marginBottom: 30 }} className="builder-grid">
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Ventes · évolution 7 jours
          </p>
          <BarChart data={weeklyRevenue.map((entry) => ({ label: entry.day, value: entry.value }))} format="fcfa" />
          <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 16 }}>Panier moyen estimé : {formatFCFA(basketAverage)}</p>
        </div>
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Clients
          </p>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
            <div className="stat-tile">
              <span>Nouveaux clients</span>
              <strong>{clientStats.new}</strong>
            </div>
            <div className="stat-tile">
              <span>Clients réguliers</span>
              <strong>{clientStats.returning}</strong>
            </div>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 16 }}>Fréquence de commande moyenne : {clientStats.frequency}× / mois</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr' }} className="builder-grid">
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>
            Produits les plus / moins vendus
          </p>
          <p style={{ color: 'var(--forest)', fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>Top ventes</p>
          {topDishes.slice(0, 3).map((dish) => (
            <div key={dish.name} style={{ display: 'flex', fontSize: 12.5, justifyContent: 'space-between', padding: '6px 0' }}>
              <span>{dish.name}</span>
              <strong>{dish.sales}</strong>
            </div>
          ))}
          <p style={{ color: 'var(--terracotta)', fontSize: 11, fontWeight: 700, margin: '14px 0 8px', textTransform: 'uppercase' }}>À surveiller</p>
          {flopDishes.map((dish) => (
            <div key={dish.name} style={{ display: 'flex', fontSize: 12.5, justifyContent: 'space-between', padding: '6px 0' }}>
              <span>{dish.name}</span>
              <strong>{dish.sales}</strong>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Géographie des commandes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {neighborhoods.map((zone) => (
              <div key={zone.name}>
                <div style={{ display: 'flex', fontSize: 12, justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>{zone.name}</span>
                  <span>{zone.orders}</span>
                </div>
                <div style={{ background: 'var(--line)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--terracotta)', height: '100%', width: `${(zone.orders / neighborhoods[0].orders) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
