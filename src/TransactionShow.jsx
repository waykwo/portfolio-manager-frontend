export function TransactionShow({ transaction, onUpdate }) {
  console.log(transaction.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(transaction.id, params, () => event.target.reset());
  };

  return (
    <div>
      <h1>{transaction.asset_name}</h1>
      <p>Ticker: {transaction.asset_ticker}</p>
      <p>Shares: {transaction.shares}</p>
      <p>Cost Per Share: {transaction.cost_per_share}</p>
      <p>Trade Date: {transaction.trade_date}</p>

      <form onSubmit={handleSubmit}>
        <h3>Update</h3>
        <div>
          <label htmlFor="shares">Shares</label>
          <input name="shares" type="decimal" defaultValue={transaction.shares} />
        </div>
        <div>
          <label htmlFor="cost_per_share">Cost Per Share</label>
          <input name="cost_per_share" type="decimal" defaultValue={transaction.cost_per_share} />
        </div>
        <div>
          <label htmlFor="trade_date">Trade Date</label>
          <input name="trade_date" type="date" defaultValue={transaction.trade_date} />
        </div>
        <button type="submit">Update</button>
      </form>


    </div>
  )
}