export function TransactionShow({ transaction, onUpdate }) {
  console.log(transaction.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onUpdate(transaction.id, params, () => event.target.reset());
  };

  return (
    <div className="m-8">
      <h1 className="font-prata font-medium text-5xl m-8">{transaction.asset_name}</h1>
      <h2 className="text-xl ml-8 -mt-6 mb-5">{transaction.asset_ticker}</h2>

      <div className="">
        <label>Shares</label>
        <div>{transaction.shares}</div>
      </div>
      <div>
        <label>Cost Per Share</label>
        <div>$ {Number(transaction.cost_per_share).toFixed(2)}</div>
      </div>
      <div>
        <label>Trade Date</label>
        <div>{transaction.trade_date}</div>
      </div>
      <div>
        <label>Latest Price</label>
        <div>$ {Number(transaction.latest_price).toFixed(2)}</div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold m-8 mb-3">Update</h3>
        <div>
          <label className="m-1 mt-2" htmlFor="shares">Shares</label>
          <input className="m-1 p-1 border rounded" name="shares" type="decimal" defaultValue={transaction.shares} />
        </div>
        <div>
          <label className="m-1 mt-2" htmlFor="cost_per_share">Cost Per Share</label>
          <input className="m-1 p-1 border rounded" name="cost_per_share" type="decimal" defaultValue={transaction.cost_per_share} />
        </div>
        <div>
          <label className="m-1 mt-2" htmlFor="trade_date">Trade Date</label>
          <input className="m-1 p-1 border rounded" name="trade_date" type="date" defaultValue={transaction.trade_date} />
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-md  px-5 py-1 mt-8 mb-1 my-2" type="submit">Update</button>
      </form>


    </div>
  )
}