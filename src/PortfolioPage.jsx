import axios from "axios";
import { useState, useEffect } from "react";
import { PortfolioIndex } from "./PortfolioIndex"
import { TransactionNew } from "./TransactionNew";
import { TransactionShow } from "./TransactionShow";
import { Modal } from "./Modal";

export function PortfolioPage() {
  const [transactions, setTransactions] = useState([]);
  const [isTransactionShowVisible, setIsTransactionShowVisible] = useState(false);
  const [isTransactionNewVisible, setIsTransactionNewVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const handleIndex = () => {
    axios.get("http://localhost:3000/transactions.json").then((response) => {
      setTransactions(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    axios.post("http://localhost:3000/transactions.json", params).then((response) => {
      setTransactions([...transactions, response.data]);
      successCallback();
      setIsTransactionNewVisible(false);
    });
  };

  const handleShow = (transaction) => {
    setIsTransactionShowVisible(true);
    setCurrentTransaction(transaction);
  };

  const handlePurchaseAsset = () => {
    setIsTransactionNewVisible(true);
  };

  const handleClose = () => {
    setIsTransactionShowVisible(false);
    setIsTransactionNewVisible(false);
  };

  const handleUpdate = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/transactions/${id}.json`, params).then((response) => {
      setTransactions(
        transactions.map((transaction) => {
          if (transaction.id === response.data.id) {
            return response.data;
          } else {
            return transaction;
          }
        })
      );
      successCallback();
      setIsTransactionShowVisible(false);
    });
  };

  useEffect(handleIndex, []);

  return (
    <main className="font-raleway">
      <h1 className="float-left font-prata font-medium text-6xl m-8">All-Weather Portfolio</h1>
      <button className="bg-indigo-700 hover:bg-indigo-500 text-slate-200     rounded-md  px-5 py-1 mt-11 mb-1" onClick={handlePurchaseAsset}>+ Purchase Asset</button>
      <div className="clear-both">
        <PortfolioIndex transactions={transactions} onShow={handleShow} />
        <Modal show={isTransactionNewVisible} onClose={handleClose} >
          <TransactionNew onCreate={handleCreate} />
        </Modal>
        <Modal show={isTransactionShowVisible} onClose={handleClose} >
          <TransactionShow transaction={currentTransaction} onUpdate={handleUpdate} />
        </Modal>
      </div>
    </main>
  );
}