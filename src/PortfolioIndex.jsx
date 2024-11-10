export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  // Calculate portfolio total
  const total = transactions.reduce((sum, transaction) => {
    return sum + Number(transaction.subtotal);
  }, 0);

  // Calculate total by asset class
  const totalByAssetClass = () => {
    return transactions.reduce((result, transaction) => {
      if (!result[transaction.asset_class]) {
        result[transaction.asset_class] = 0;
      }
      result[transaction.asset_class] += Number(transaction.subtotal);
      return result;
    }, {}); 
  };

  // Calculate percentage of each asset class in relation to total
  const percentageByAssetClass = (total, totalsByClass) => {
    const percentages = {};
    for (const assetClass in totalsByClass) {
      percentages[assetClass] = ((totalsByClass[assetClass] / total) * 100).toFixed(2);
    }
    return percentages;
  };

  // Totals and percentages by asset class
  const totalsByClass = totalByAssetClass();
  const percentagesByClass = percentageByAssetClass(total, totalsByClass);

  // JSON
  const totalsJson = JSON.stringify(totalsByClass, null, 2);
  const percentagesJson = JSON.stringify(percentagesByClass, null, 2);
  console.log(totalsJson);
  console.log(percentagesJson);

  // Parse the JSON
  const parsedTotals = JSON.parse(totalsJson);
  const parsedPercentages = JSON.parse(percentagesJson);

  // const equity_pct = transactions.reduce((sum, transaction) => {
  //   return sum 
  // })

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
        {/* <p>Total By Asset Class: {JSON.stringify(totalsJson)}</p>
        <p>Percentages By Asset Class: {JSON.stringify(percentagesJson)}</p> */}
        <p>Totals by Asset Class</p>
        <ul>
          {Object.entries(parsedTotals).map(([assetClass, total]) => (
            <li key={assetClass}>{assetClass}: {total.toFixed(2)}</li>
          ))}
        </ul>

        <p>Totals by Asset Class</p>
        <ul>
          {Object.entries(parsedPercentages).map(([assetClass, percentage]) => (
            <li key={assetClass}>{assetClass}: {percentage}%</li>
          ))}
        </ul>

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