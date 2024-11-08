export function TransactionShow({ transaction }) {
  return (
    <div>
      <h1>Transaction Info</h1>
      <h2>{transaction.asset_name}</h2>
      <p>{transaction.asset_ticker}</p>
      <p>{transaction.shares}</p>
      <p>{transaction.cost_per_share}</p>
      <p>{transaction.trade_date}</p>
    </div>
  )
}