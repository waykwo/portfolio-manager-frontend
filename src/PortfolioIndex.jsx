export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  // Calculate portfolio total
  const total = transactions.reduce((sum, transaction) => {
    return sum + Number(transaction.book_value);
  }, 0);

  // Calculate total by asset class
  const totalByAssetClass = () => {
    return transactions.reduce((result, transaction) => {
      if (!result[transaction.asset_class]) {
        result[transaction.asset_class] = 0;
      }
      result[transaction.asset_class] += Number(transaction.book_value);
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

  return (
    <div>
      <h1>Portfolio</h1>

      <table>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost Per Share</th>
            <th>Book Value</th>
            <th>Current Value</th>
            <th>Gain/Loss</th>
            <th>Trade Date</th>
            <th>Asset Class</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.asset_name}</td>
              <td>{transaction.asset_ticker}</td>
              <td>{transaction.shares}</td>
              <td>$ {parseFloat(transaction.cost_per_share).toFixed(6)}</td>
              <td>$ {parseFloat(transaction.book_value).toFixed(2)}</td>
              <td>$ {parseFloat(transaction.current_value).toFixed(2)}</td>
              <td>$ {parseFloat(transaction.gain_loss).toFixed(2)}</td>
              <td>{transaction.trade_date}</td>
              <td>{transaction.asset_class}</td>
              <td><button onClick={() => onShow(transaction)}>Info &#9432;</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <th><h2>Total Portfolio Value</h2></th>
          <td>$ {total.toLocaleString()}</td>
        </tfoot>
      </table>

      <h3>Totals by Asset Class</h3>
      <table>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Total</th> </tr>
        </thead>
        <tbody>
          {Object.entries(parsedTotals).map(([assetClass, total]) => (
            <tr key={assetClass}>
              <td>{assetClass}</td>
              <td>$ {total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Percentages by Asset Class</h3>
      <table>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(parsedPercentages).map(([assetClass, percentage]) => (
            <tr key={assetClass}>
              <td>{assetClass}</td>
              <td>{percentage} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}