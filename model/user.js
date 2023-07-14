const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
});

const booksSchema = new mongoose.Schema({
    author: { type: String },
    country: { type: String },
    imageLink: { type: String },
    language: { type: String },
    link: { type: String },
    pages: { type: String },
    title: { type: String },
    year: { type: String },
});

const User = mongoose.model("user", userSchema);
const Book = mongoose.model("book", booksSchema);

module.exports = { User, Book };
