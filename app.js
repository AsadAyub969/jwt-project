require("dotenv").config();
require("./config/database").connect();
const books = require("./src/api/books/books.route");
const express = require("express");

const app = express();
app.use(express.json());

app.use("/api", books);

module.exports = app;
