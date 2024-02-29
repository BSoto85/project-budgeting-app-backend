const express = require("express");
const transactions = express.Router();

const validateForm = (req, res, next) => {
  if (
    !req.body.item_name ||
    typeof req.body.item_name !== "string" ||
    !req.body.amount ||
    typeof req.body.amount !== "number" ||
    !req.body.date ||
    typeof req.body.date !== "string" ||
    !res.body.from ||
    typeof req.body.from !== "string" ||
    !res.body.category ||
    typeof req.body.category !== "string"
  )
    res.status(400).json({ message: "Invalid inputs" });
  else next();
};

let transactionArray = require("../models/transaction.model");

transactions.get("/", (req, res) => {
  res.json({ transactions: transactionArray });
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedTransaction = transactionArray.find(
    (transaction) => transaction.id === +id
  );
  if (selectedTransaction) {
    res.json({ transaction: selectedTransaction });
  } else res.json({ message: "Transaction not found" });
});

transactions.post("/", validateForm, (req, res) => {
  const idForNewTransaction =
    transactionArray[transactionArray.length - 1].id + 1;
  req.body.id = idForNewTransaction;
  transactionArray.push(req.body);
  res.json({ transactions: transactionArray });
});

transactions.put("/:id", (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (transactionIndex > -1) {
    transactionArray[transactionIndex] = req.body;
    res.json({ transactions: transactionArray });
  } else res.json({ message: "Transaction not found" });
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  transactionArray = transactionArray.filter(
    (transaction) => transaction.id !== +id
  );
  if (transactionArray) {
    res.json({ transactions: transactionArray });
  } else res.json({ message: "Budget not found" });
});

module.exports = transactions;
