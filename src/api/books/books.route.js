const booksController = require("./books.controller");

const express = require("express");
const router = express.Router();

router.get("/books", booksController.getAllBooks);
router.get("/:id", booksController.getSingleBook);
router.post("/user", booksController.signupUser);
router.post("/login", booksController.loginUser);
router.post("/books", booksController.addNewBook);
router.delete("/:id", booksController.deleteSingleBook);
router.patch("/:id", booksController.updateBook);

module.exports = router;
