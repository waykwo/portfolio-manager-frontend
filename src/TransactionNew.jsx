import { useState } from "react";

export function TransactionNew({ assets, onCreate }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    if (selectedAsset) {
      params.append("financial_asset_id", selectedAsset.id);
      onCreate(params, () => {
        event.target.reset();
        setSearchTerm(""); // Reset search term
        setSelectedAsset(null); // Reset the selected asset
      });
    } else {
      alert("Please select an asset.");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setSearchTerm(asset.ticker); // set search term to selected asset's ticker
  }

  const filteredAssets = assets.filter((asset) =>
    asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-medium text-6xl m-8">Purchase Asset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticker">Search Ticker</label>
          <input
            id="ticker_search"
            type="search"
            // maxLength={5}
            value={searchTerm}
            // onChange={(event) => setTicker(event.target.value)}
            onChange={handleSearchChange}
            placeholder="Search by ticker or asset name"
            className="p-1 border rounded"
          />
          {searchTerm && (
            <ul className="search-results absolute z-10 bg-white border rounded max-h-40 overflow-y-auto">
              {filteredAssets.map((asset) => (
                <li
                  key={asset.id}
                  onClick={() => handleSelectAsset(asset)}
                  className="p-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {asset.ticker} - {asset.name}
                </li>
              ))}
            </ul>
          )}
          {/* {searchTerm && (
            <ul className="search-results">
              {filteredAssets.map((asset) => (
                <li key={asset.id} onClick={() => handleSelectAsset(asset)}>
                  {asset.ticker} - {asset.name}
                </li>
              ))}
            </ul>
          )} */}
          {/* &nbsp;{ticker.toUpperCase()}
          <select name="financial_asset_id" id="financial_asset_id">
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.ticker}</option>
            ))}
          </select> */}
        </div>
        {/* <div>
          <label htmlFor="financial_asset_id">Select Asset</label>
          <select name="financial_asset_id" id="financial_asset_id">
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>{asset.name}</option>
            ))}
          </select> */}

        {/* <label htmlFor="financial_asset_id">Asset</label>
          <input name="financial_asset_id" type="number" /> */}
        {/* </div> */}
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