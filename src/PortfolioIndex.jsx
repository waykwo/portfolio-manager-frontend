export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  return (
    <div>
      <h1>Portfolio</h1>
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <h2>{transaction.asset_name}</h2>
          <p>{transaction.asset_ticker}</p>
          <p>{transaction.shares}</p>
          <p>{transaction.cost_per_share}</p>
          <p>{transaction.trade_date}</p>
          <button onClick={() => onShow(transaction)}>More info</button>
        </div>
      ))}
    </div>
  );
}