export function TransactionNew({ onCreate }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    onCreate(params, () => event.target.reset());
  };


  return (
    <div>
      <h1>Purchase Asset</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="ticker">Ticker</label>
          <input name="ticker" type="text" />
        </div> */}
        <div>
          <label htmlFor="financial_asset">Asset</label>
          <input name="financial_asset" type="number" />
        </div>
        <div>
          <label htmlFor="shares">Shares</label>
          <input name="shares" type="number" />
        </div>
        <div>
          <label htmlFor="cost_per_share">Cost Per Share</label>
          <input name="cost_per_share" type="number" />
        </div>
        <div>
          <label htmlFor="trade_date">Trade Date</label>
          <input name="trade_date" type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}