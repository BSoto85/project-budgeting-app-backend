const express = require("express");
const budget = express.Router();

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

let budgetArray = require("../models/budget.model");

budget.get("/", (req, res) => {
  res.json({ budget: budgetArray });
});

budget.get("/:id", (req, res) => {
  const { id } = req.params;
  const selectedTransaction = budgetArray.find((budget) => budget.id === +id);
  if (selectedTransaction) {
    res.json({ transaction: selectedTransaction });
  } else res.json({ message: "Transaction not found" });
});

budget.post("/", validateForm, (req, res) => {
  const idForNewTransaction = budgetArray[budgetArray.length - 1].id + 1;
  req.body.id = idForNewTransaction;
  budgetArray.push(req.body);
  res.json({ budget: budgetArray });
});

budget.put("/:id", (req, res) => {
  const { id } = req.params;
  const budgetIndex = budgetArray.findIndex(
    (transaction) => transaction.id === +id
  );
  if (budgetIndex > -1) {
    budgetArray[budgetIndex] = req.body;
    res.json({ budget: budgetArray });
  } else res.json({ message: "Transaction not found" });
});

budget.delete("/:id", (req, res) => {
  const { id } = req.params;
  budgetArray = budgetArray.filter((transaction) => transaction.id !== +id);
  if (budgetArray) {
    res.json({ budget: budgetArray });
  } else res.json({ message: "Budget not found" });
});

module.exports = budget;
