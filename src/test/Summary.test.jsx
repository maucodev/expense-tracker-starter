import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Summary from '../Summary'

const transactions = [
  { id: 1, type: 'income',  description: 'Salary',   amount: 3000, category: 'Salary' },
  { id: 2, type: 'expense', description: 'Rent',     amount: 1000, category: 'Housing' },
  { id: 3, type: 'expense', description: 'Groceries', amount:  200, category: 'Food' },
]

describe('Summary', () => {
  it('shows the correct balance', () => {
    render(<Summary transactions={transactions} />)
    expect(screen.getByText('$1800')).toBeInTheDocument()
  })

  it('shows the total income', () => {
    render(<Summary transactions={transactions} />)
    expect(screen.getByText('$3000')).toBeInTheDocument()
  })

  it('shows the total expenses', () => {
    render(<Summary transactions={transactions} />)
    expect(screen.getByText('$1200')).toBeInTheDocument()
  })

  it('shows zero when there are no transactions', () => {
    render(<Summary transactions={[]} />)
    expect(screen.getAllByText('$0')).toHaveLength(3)
  })
})
