import { useState } from 'react'
import { COLORS } from './categoryColors'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  return (
    <div className="panel transactions">
      <div className="panel-header">
        <h2>transactions.diff</h2>
        <span className="panel-meta">{filtered.length} changes</span>
      </div>
      <div className="panel-body">
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className={t.type === "income" ? "row-add" : "row-remove"}>
                <td className="date-cell">{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span className="badge" style={{ '--badge-color': COLORS[t.category] || COLORS.other }}>
                    {t.category}
                  </span>
                </td>
                <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                  {t.type === "income" ? "+" : "-"}${t.amount}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    aria-label={`Delete ${t.description}`}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this transaction?'))
                        onDelete(t.id);
                    }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 4.25h10M6.5 4.25V2.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5M4.5 4.25l.55 8.4a1 1 0 0 0 1 .94h3.9a1 1 0 0 0 1-.94l.55-8.4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M6.7 6.9v4M9.3 6.9v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionList
