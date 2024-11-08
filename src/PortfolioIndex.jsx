export function PortfolioIndex({ assets }) {
  console.log(assets)

  return (
    <div>
      <h1>Portfolio</h1>
      {assets.map((asset) => (
        <div key={asset.id}>
          <h2>{asset.asset_name}</h2>
          <p>{asset.asset_ticker}</p>
          <p>{asset.shares}</p>
          <p>{asset.cost_per_share}</p>
          <p>{asset.trade_date}</p>
        </div>
      ))}
    </div>
  );
}