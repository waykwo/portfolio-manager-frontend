import axios from "axios";
import { useState, useEffect } from "react";
import { PortfolioIndex } from "./PortfolioIndex"
import { TransactionNew } from "./TransactionNew";
import { TransactionShow } from "./TransactionShow";
import { Modal } from "./Modal";

export function PortfolioPage() {
  const [transactions, setTransactions] = useState([]);
  const [isTransactionShowVisible, setIsTransactionShowVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/transactions.json").then((response) => {
      console.log(response.data);
      setTransactions(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    console.log("handleCreate", params);
    axios.post("http://localhost:3000/transactions.json", params).then((response) => {
      setTransactions([...transactions, response.data]);
      console.log(response.data);
      successCallback();
    });
  };

  const handleShow = (transaction) => {
    console.log("handleShow", transaction);
    setIsTransactionShowVisible(true);
    setCurrentTransaction(transaction);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsTransactionShowVisible(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <h1>Welcome to React!</h1>
      <PortfolioIndex transactions={transactions} onShow={handleShow} />
      <TransactionNew onCreate={handleCreate}/>
      <Modal show={isTransactionShowVisible} onClose={handleClose} >
        <h1>Test</h1>
        <TransactionShow transaction={currentTransaction} />
      </Modal>
    </main>
  );
}