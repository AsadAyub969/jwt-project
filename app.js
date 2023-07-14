require("dotenv").config();
require("./config/database").connect();
const books = require("./routes/books");
const express = require("express");

const app = express();
app.use(express.json());

app.use("/api", books);

module.exports = app;
