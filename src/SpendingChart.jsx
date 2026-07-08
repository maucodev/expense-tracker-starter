import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { COLORS } from './categoryColors'

const TICK_STYLE = { fontSize: 12, fontFamily: 'var(--font-sans)', fill: '#8b949e' }

function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {})

  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

  if (data.length === 0) return null

  return (
    <div className="panel spending-chart">
      <div className="panel-header">
        <h2>Spending by category</h2>
      </div>
      <div className="panel-body">
        <div className="spending-chart-inner">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(v) => `$${v}`}
                tick={TICK_STYLE}
                axisLine={false}
                tickLine={false}
                width={56}
              />
              <Tooltip
                cursor={{ fill: 'rgba(139, 148, 158, 0.08)' }}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                contentStyle={{
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: 6,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: '#e6edf3',
                }}
                labelStyle={{ color: '#e6edf3' }}
                itemStyle={{ color: '#e6edf3' }}
              />
              <Bar dataKey="value" isAnimationActive={false} radius={[3, 3, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default SpendingChart
