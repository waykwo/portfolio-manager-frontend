import { PortfolioIndex } from "./PortfolioIndex"
import axios from "axios";
import { useState, useEffect } from "react";

export function PortfolioPage() {
  const [assets, setAssets] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/transactions.json").then((response) => {
      console.log(response.data);
      setAssets(response.data);
    });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PortfolioIndex assets={assets}/>
    </main>
  );
}