import axios from "axios";
import { useState, useEffect } from "react";
import { PortfolioIndex } from "./PortfolioIndex"
import { TransactionNew } from "./TransactionNew";

export function PortfolioPage() {
  const [assets, setAssets] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/transactions.json").then((response) => {
      console.log(response.data);
      setAssets(response.data);
    });
  };

  const handleCreate = (params, succesCallback) => {
    console.log("handleCreate", params);
    axios.post("http://localhost:3000/transactions.json", params).then((response) => {
      setAssets([...assets, response.data]);
      succesCallback();
    });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PortfolioIndex assets={assets}/>
      <TransactionNew onCreate={handleCreate}/>
    </main>
  );
}