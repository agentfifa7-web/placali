import { ArrowUpRight } from 'lucide-react'
import { BarChart } from '@/components/admin/bar-chart'
import { restaurants } from '@/lib/data/restaurants'
import { topDishes, weeklyRevenue } from '@/lib/data/admin'
import { formatFCFA } from '@/lib/format'

const totalOrders = restaurants.reduce((sum, restaurant) => sum + restaurant.orders, 0)
const totalRevenue = restaurants.reduce((sum, restaurant) => sum + restaurant.revenue, 0)
const totalClients = restaurants.reduce((sum, restaurant) => sum + restaurant.clients, 0)

const kpis = [
  { label: 'Chiffre d’affaires (semaine)', value: formatFCFA(totalRevenue), change: '+12,4%' },
  { label: 'Commandes', value: totalOrders.toString(), change: '+8,1%' },
  { label: 'Clients actifs', value: totalClients.toString(), change: '+5,6%' },
  { label: 'Réservations', value: '64', change: '+2,3%' },
]

export default function AdminDashboardPage() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>
            Vue d’ensemble
          </p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 500, margin: 0 }}>Dashboard direction</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 34 }} className="event-grid">
        {kpis.map((kpi) => (
          <div className="stat-tile" key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <em>
              <ArrowUpRight size={11} style={{ verticalAlign: 'middle' }} /> {kpi.change}
            </em>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.4fr 1fr' }} className="builder-grid">
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Chiffre d’affaires · 7 derniers jours
          </p>
          <BarChart data={weeklyRevenue.map((entry) => ({ label: entry.day, value: entry.value }))} format="fcfa" />
        </div>
        <div className="card" style={{ padding: 26 }}>
          <p className="eyebrow" style={{ marginBottom: 18 }}>
            Plats les plus vendus
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topDishes.map((dish, index) => (
              <div key={dish.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
                <span>
                  {index + 1}. {dish.name}
                </span>
                <strong>{dish.sales}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
