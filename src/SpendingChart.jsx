import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'

const COLORS = {
  food: '#ef4444',
  housing: '#3b82f6',
  utilities: '#f59e0b',
  transport: '#10b981',
  entertainment: '#8b5cf6',
  salary: '#06b6d4',
  other: '#6b7280',
}

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
        <BarChart width={700} height={260} data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" isAnimationActive={false}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  )
}

export default SpendingChart
