export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  return (
    <div>
      <h1>Portfolio</h1>
        <table>
          <tr>
            <th>Asset Name</th>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost Per Share</th>
            <th>Trade Date</th>
            <th>More Info</th>
          </tr>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.asset_name}</td>
              <td>{transaction.asset_ticker}</td>
              <td>{transaction.shares}</td>
              <td>{transaction.cost_per_share}</td>
              <td>{transaction.trade_date}</td>
              <td><button onClick={() => onShow(transaction)}>&#9432;</button></td>
            </tr>
          ))}
      </table>
    </div>
  );
}