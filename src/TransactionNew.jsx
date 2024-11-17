import { useState, useEffect } from "react";
import axios from "axios";

export function TransactionNew({ onCreate }) {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);

  const loadAssetsData = () => {
    axios.get("http://localhost:3000/financial_assets.json").then((response) => {
      setAssets(response.data);
    });
  };

  useEffect(loadAssetsData, []);

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
    setSelectedAsset(null); // Clear the selected asset when the search term changes
  };

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setSearchTerm(""); // Clear the search term to hide dropdown
  }

  const handleUnselectAsset = () => {
    setSelectedAsset(null);
    setSearchTerm(""); // Reset search term
  }

  const filteredAssets = assets.filter((asset) =>
    asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.ticker.localeCompare(b.ticker)); // Sort tickers

  return (
    <div>
      <h1 className="font-prata font-medium text-5xl m-8">Purchase Asset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="m-1 mt-2" htmlFor="ticker">Search Ticker</label>
          <input
            id="ticker_search"
            type="search"
            // maxLength={5}
            value={searchTerm}
            // onChange={(event) => setTicker(event.target.value)}
            onChange={handleSearchChange}
            placeholder="Search by ticker or asset name"
            className="w-1/2 m-1 p-1 border rounded"
          />
          {searchTerm && (
            <div className="search-results w-3/4 absolute z-10 bg-white border rounded max-h-40 overflow-y-auto">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelectAsset(asset)}
                  className="p-2 hover:bg-indigo-100 cursor-pointer"
                >
                  {asset.ticker} - {asset.name}
                </div>
              ))}
            </div>
          )}
          {selectedAsset && (
            <div className="mb-5 ml-48 mt-2 text-indigo-700">
              {selectedAsset.ticker} - {selectedAsset.name}
              <button
                type="button"
                className="ml-2 text-slate-500 hover:text-red-500"
                onClick={handleUnselectAsset}
              >&#x2716;
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="m-1 mt-2" htmlFor="shares">Shares</label>
          <input className="m-1 p-1 border rounded" name="shares" type="decimal" />
        </div>
        <div>
          <label className="m-1 mt-2" htmlFor="cost_per_share">Cost Per Share</label>
          <input className="m-1 p-1 border rounded" name="cost_per_share" type="decimal" />
        </div>
        <div>
          <label className="m-1 mt-2" htmlFor="trade_date">Trade Date</label>
          <input className="m-1 p-1 border rounded" name="trade_date" type="date" />
        </div>
        <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-md  px-5 py-1 mt-8 mb-1 my-2" type="submit">Create</button>
      </form>
    </div>
  );
}