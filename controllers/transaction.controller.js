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
const formattedWords = (input) => {
  return input
    .split(" ")
    .map((word) => {
      const firstLetter = word.slice(0, 1).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    })
    .join(" ");
};

let transactionArray = require("../models/transaction.model");

transactions.get("/", (req, res) => {
  if (!transactionArray) {
    res.status(500).json({ error: "Data not found" });
  }
  res.status(200).json({ transactions: transactionArray });
});

transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedTransaction = transactionArray.find(
    (transaction) => transaction.id === +id
  );
  if (selectedTransaction) {
    res.status(200).json({ transaction: selectedTransaction });
  } else res.json({ message: "Transaction not found" });
});

transactions.post("/", validateForm, (req, res) => {
  const idForNewTransaction =
    transactionArray[transactionArray.length - 1].id + 1;
  req.body.id = idForNewTransaction;
  req.body.amount = +req.body.amount;
  req.body.itemName = formattedWords(req.body.itemName);
  req.body.from = formattedWords(req.body.from);
  req.body.category = formattedWords(req.body.category);
  transactionArray.push(req.body);
  const sortedTransactionArray = [...transactionArray].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  res.status(200).json({ transactions: sortedTransactionArray });
});

transactions.put("/:id", validateForm, (req, res) => {
  const { id } = req.params;
  const transactionIndex = transactionArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (transactionIndex > -1) {
    req.body.amount = +req.body.amount;
    req.body.itemName = formattedWords(req.body.itemName);
    req.body.from = formattedWords(req.body.from);
    req.body.category = formattedWords(req.body.category);
    transactionArray[transactionIndex] = req.body;
    const sortedTransactionArray = [...transactionArray].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    res.status(200).json({ transactions: sortedTransactionArray });
  } else res.status(400).json({ message: "Transaction not found" });
});

transactions.delete("/:id", (req, res) => {
  const { id } = req.params;
  transactionArray = transactionArray.filter(
    (transaction) => transaction.id !== +id
  );
  if (transactionArray) {
    res.json({ transactions: transactionArray });
  } else res.status(400).json({ message: "Budget not found" });
});

module.exports = transactions;
