export function TransactionShow({ transaction, onUpdate }) {
  console.log(transaction.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(transaction.id, params, () => event.target.reset());
  };

  return (
    <div>
      <h1 className="font-medium text-6xl m-8">{transaction.asset_name}</h1>
      <div>
        <label>Ticker</label>
        <div>{transaction.asset_ticker}</div>
      </div>
      <div>
        <label>Shares</label>
        <div>{transaction.shares}</div>
      </div>
      <div>
        <label>Cost Per Share</label>
        <div>$ {transaction.cost_per_share}</div>
      </div>
      <div>
        <label>Trade Date</label>
        <div>{transaction.trade_date}</div>
      </div>
      <div>
        <label>Latest Price</label>
        <div>$ {transaction.latest_price}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold m-8 mb-3">Update</h3>
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
        <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-md  px-5 py-1 mt-8 mb-1 my-2" type="submit">Update</button>
      </form>


    </div>
  )
}