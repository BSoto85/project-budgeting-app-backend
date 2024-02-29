const express = require("express");
const transactions = express.Router();

const validateForm = (req, res, next) => {
  if (
    !req.body.itemName ||
    typeof req.body.itemName !== "string" ||
    req.body.amount === 0 ||
    !req.body.date ||
    typeof req.body.date !== "string" ||
    !req.body.from ||
    typeof req.body.from !== "string" ||
    !req.body.category ||
    typeof req.body.category !== "string" ||
    !req.body.transactionType ||
    typeof req.body.transactionType !== "string"
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
  req.body.amount = +req.body.amount;
  transactionArray.push(req.body);
  res.json({ transactions: transactionArray });
});

transactions.put("/:id", validateForm, (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (transactionIndex > -1) {
    req.body.amount = +req.body.amount;
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
