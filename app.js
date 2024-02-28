const express = require("express");
const cors = require("cors");

const app = express();

const budgetController = require("./controllers/budget.controller");

//Middleware
app.use(cors());
app.use(express.json());
app.use("/budget", budgetController);

app.get("/", (req, res) => {
  res.send("Welcome to Budgetr!");
});

app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

module.exports = app;
