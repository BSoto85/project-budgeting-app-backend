const express = require("express");
const cors = require("cors");

const app = express();

const transactionController = require("./controllers/transaction.controller");

//Middleware
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionController);

app.get("/", (req, res) => {
  res.send("Welcome to Budgetr!");
});

app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

module.exports = app;
