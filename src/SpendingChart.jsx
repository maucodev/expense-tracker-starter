import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const COLORS = {
  food: '#ef4444',
  housing: '#3b82f6',
  utilities: '#f59e0b',
  transport: '#10b981',
  entertainment: '#8b5cf6',
  salary: '#06b6d4',
  other: '#6b7280',
}

const TICK_STYLE = { fontSize: 12, fontFamily: "'DM Sans', sans-serif", fill: '#888' }

function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense')

  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    return acc
  }, {})

  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }))

  if (data.length === 0) return null

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
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
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                border: '1px solid #E0E0E0',
                borderRadius: 0,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" isAnimationActive={false} radius={0}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SpendingChart
