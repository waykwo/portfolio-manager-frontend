import { useState } from "react";

export function PortfolioIndex({ transactions, onShow }) {
  console.log(transactions)

  function titleCase(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const [selectedAssetClass, setSelectedAssetClass] = useState('All');

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

  // Calculate gain/loss by asset class 
  const gainLossByAssetClass = () => {
    return transactions.reduce((result, transaction) => {
      if (!result[transaction.asset_class]) {
        result[transaction.asset_class] = 0;
      }
      result[transaction.asset_class] += Number(transaction.gain_loss);
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
  const gainLossByClass = gainLossByAssetClass();
  const percentagesByClass = percentageByAssetClass(total, totalsByClass);

  // JSON
  const totalsJson = JSON.stringify(totalsByClass, null, 2);
  const gainLossJson = JSON.stringify(gainLossByClass, null, 2);
  const percentagesJson = JSON.stringify(percentagesByClass, null, 2);
  console.log(totalsJson);
  console.log(gainLossJson);
  console.log(percentagesJson);

  // Parse the JSON
  const parsedTotals = JSON.parse(totalsJson);
  const parsedGainLoss = JSON.parse(gainLossJson);
  const parsedPercentages = JSON.parse(percentagesJson);

  // Get unique asset classes
  const assetClasses = [
    'All',
    ...new Set(transactions.map((transaction) => transaction.asset_class))
  ];

  // Get the total for the selected asset class
  const selectedTotal = selectedAssetClass === 'All'
    ? total
    : parsedTotals[selectedAssetClass] || 0;

  // Get the gain/loss for the selected asset class
  const selectedGainLoss = selectedAssetClass === 'All'
    ? transactions.reduce((sum, transaction) => sum + Number(transaction.gain_loss), 0)
    : parsedGainLoss[selectedAssetClass] || 0;

  // Filter transactions based on selected asset class
  const filteredTransactions =
    selectedAssetClass === 'All'
      ? transactions
      : transactions.filter(
        (transaction) => transaction.asset_class === selectedAssetClass
      );

  return (
    <div>
      {assetClasses.map((assetClass) => {
        const isSelected = selectedAssetClass === assetClass;
        const buttonClass = isSelected
          ? "bg-indigo-700 text-slate-200"
          : "bg-transparent text-slate-800 hover:bg-indigo-700 hover:text-slate-200";
        return (
          <button
            className={`outline rounded-md px-5 py-1 mx-1 my-2 mb-6 ${buttonClass}`}
            key={assetClass}
            onClick={() => setSelectedAssetClass(assetClass)}
          > {titleCase(assetClass)}
          </button>);
      })}
      <table className="table-auto mb-5 border-separate my-table-spacing">
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
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
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
              <td><button onClick={() => onShow(transaction)}>&#9432;</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              <h2>
                Total{" "}
                {selectedAssetClass === "All"
                  ? "Portfolio"
                  : titleCase(selectedAssetClass)}{" "}
                Value
              </h2>
            </th>
            <td>$ {selectedTotal.toLocaleString()}</td>
          </tr>
          <tr>
            <th>
              <h2>
                Total{" "}
                {selectedAssetClass === "All"
                  ? "Portfolio"
                  : titleCase(selectedAssetClass)}{" "}
                Gain/Loss
              </h2>
            </th>
            <td>$ {selectedGainLoss.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      <h3 className="font-extrabold, text-2xl m-8 mb-2">Totals by Asset Class</h3>
      <table className="table-auto mb-5 border-separate my-table-spacing">
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Total</th> </tr>
        </thead>
        <tbody>
          {Object.entries(parsedTotals).map(([assetClass, total]) => (
            <tr key={assetClass}>
              <td>{titleCase(assetClass)}</td>
              <td>$ {total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="font-extrabold, text-2xl m-8 mb-2">Percentages by Asset Class</h3>
      <table className="table-auto mb-5 border-separate my-table-spacing">
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(parsedPercentages).map(([assetClass, percentage]) => (
            <tr key={assetClass}>
              <td>{titleCase(assetClass)}</td>
              <td>{percentage} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}