export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  const total = transactions.reduce((sum, transaction) => {
    return sum + Number(transaction.subtotal);
  }, 0);

  // let total = 0
  // let subtotal;
  // transactions.map((transaction) => {
  //   subtotal = transaction.subtotal;
  //   total += subtotal;
  // })

  return (
    <div>
      <h1>Portfolio</h1>
        <p>Total Value: {total}</p>
        <table>
          <tr>
            <th>Asset Name</th>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost Per Share</th>
            <th>Subtotal</th>
            <th>Trade Date</th>
            <th>Asset Class</th>
            <th>More Info</th>
          </tr>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.asset_name}</td>
              <td>{transaction.asset_ticker}</td>
              <td>{transaction.shares}</td>
              <td>{transaction.cost_per_share}</td>
              <td>{transaction.subtotal}</td>
              <td>{transaction.trade_date}</td>
              <td>{transaction.asset_class}</td>
              <td><button onClick={() => onShow(transaction)}>Info &#9432;</button></td>
            </tr>
          ))}
      </table>
    </div>
  );
}