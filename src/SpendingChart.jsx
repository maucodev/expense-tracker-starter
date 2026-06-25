import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const COLORS = {
  food:          '#F59E0B',
  housing:       '#3B82F6',
  utilities:     '#EAB308',
  transport:     '#10B981',
  entertainment: '#8B5CF6',
  salary:        '#059669',
  other:         '#94A3B8',
}

const TICK_STYLE = { fontSize: 12, fill: '#64748B', fontFamily: "'DM Sans', system-ui, sans-serif" }

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
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <XAxis dataKey="name" tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `$${v}`} tick={TICK_STYLE} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #DDE3EE',
                fontSize: '13px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                boxShadow: '0 4px 12px rgba(0,0,0,.08)',
              }}
              cursor={{ fill: '#F0F4FA' }}
            />
            <Bar dataKey="value" isAnimationActive={false} radius={[4, 4, 0, 0]}>
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
