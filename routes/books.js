const express = require("express");
const router = express.Router();

const {
    signupUser,
    loginUser,
    addNewBook,
    getAllBooks,
    deleteSingleBook,
    updateBook,
    getSingleBook,
} = require("../controllers/books");

router.get("/books", getAllBooks);
router.get("/:id", getSingleBook);
router.post("/user", signupUser);
router.post("/login", loginUser);
router.post("/books", addNewBook);
router.delete("/:id", deleteSingleBook);
router.patch("/:id", updateBook);

module.exports = router;
