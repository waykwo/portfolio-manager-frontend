export function TransactionNew({ assets, onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.reset());
  };

  return (
    <div>
      <h1 className="font-medium text-6xl m-8">Purchase Asset</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="ticker">Ticker</label>
          <input name="ticker" type="text" />
        </div> */}
        <div>
          <label htmlFor="financial_asset_id">Select Asset</label>
          <select name="financial_asset_id" id="financial_asset_id">
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select>

          {/* <label htmlFor="financial_asset_id">Asset</label>
          <input name="financial_asset_id" type="number" /> */}
        </div>
        <div>
          <label htmlFor="shares">Shares</label>
          <input name="shares" type="decimal" />
        </div>
        <div>
          <label htmlFor="cost_per_share">Cost Per Share</label>
          <input name="cost_per_share" type="decimal" />
        </div>
        <div>
          <label htmlFor="trade_date">Trade Date</label>
          <input name="trade_date" type="date" />
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-md  px-5 py-1 mt-8 mb-1 my-2" type="submit">Create</button>
      </form>
    </div>
  );
}