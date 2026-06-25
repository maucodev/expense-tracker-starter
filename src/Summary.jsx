const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <p className="income-amount">{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card expenses">
        <h3>Expenses</h3>
        <p className="expense-amount">{fmt(totalExpenses)}</p>
      </div>
      <div className={`summary-card ${balance >= 0 ? 'balance-positive' : 'balance-negative'}`}>
        <h3>Balance</h3>
        <p className={`balance-amount${balance < 0 ? ' negative' : ''}`}>{fmt(balance)}</p>
      </div>
    </div>
  );
}

export default Summary
