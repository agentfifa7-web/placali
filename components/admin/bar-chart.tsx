'use client'

import { formatFCFA } from '@/lib/format'

interface BarChartProps {
  data: { label: string; value: number }[]
  format?: 'fcfa' | 'number'
  height?: number
}

export function BarChart({ data, format = 'number', height = 220 }: BarChartProps) {
  const max = Math.max(...data.map((entry) => entry.value), 1)
  const formatValue = format === 'fcfa' ? formatFCFA : (value: number) => String(value)

  return (
    <div style={{ alignItems: 'flex-end', display: 'flex', gap: 14, height }}>
      {data.map((entry, index) => {
        const barHeight = Math.max(6, (entry.value / max) * (height - 34))
        const shade = 0.45 + (index / Math.max(1, data.length - 1)) * 0.55
        return (
          <div key={entry.label} style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div
              title={`${entry.label} · ${formatValue(entry.value)}`}
              style={{
                background: `color-mix(in srgb, var(--terracotta) ${Math.round(shade * 100)}%, var(--paper))`,
                borderRadius: '3px 3px 0 0',
                height: barHeight,
                transition: 'height .4s ease',
                width: '100%',
              }}
            />
            <span style={{ color: 'var(--muted)', fontSize: 10.5, fontWeight: 600 }}>{entry.label}</span>
          </div>
        )
      })}
    </div>
  )
}
