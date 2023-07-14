const { User, Book } = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

//signup
const signupUser = async (req, res) => {
    // Our signup logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        let user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // save user data which want to show
        user = {
            first_name,
            last_name,
            email: user.email,
        };

        // return new user
        res.status(201).json({ statusCode: 201, success: true, data: user });
    } catch (err) {
        console.log(err);
    }
};

// Login
const loginUser = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        let user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            // user.token = token;

            // save user data which want to show
            user = {
                email,
                token,
            };

            // user
            res.status(200).json({
                statusCode: 200,
                success: true,
                data: user,
            });
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
};

//add books
const addNewBook = async (req, res) => {
    try {
        //Get book input
        const {
            author,
            country,
            imageLink,
            language,
            link,
            pages,
            title,
            year,
        } = req.body;

        //Add books in database
        const books = await Book.create({
            author,
            country,
            imageLink,
            language,
            link,
            pages,
            title,
            year,
        });

        // return new books
        res.status(201).json({ statusCode: 201, success: true, data: books });
    } catch (err) {
        console.log(err);
    }
};

//Get books
const getAllBooks =
    (auth,
    async (req, res) => {
        const books = await Book.find();
        res.status(200).json(books);
    });

// Get single book
const getSingleBook = async (req, res) => {
    const bookID = req.params.id;

    const book = await Book.findOne({
        _id: bookID,
    });
    if (!book) {
        return res.status(404).json({
            success: false,
            msg: `No book with id ${bookID}`,
        });
    }
    res.status(200).json({ statusCode: 200, success: true, data: book });
};

//Update books
const updateBook = async (req, res) => {
    const bookID = req.params.id;
    const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!book) {
        return res.status(404).json({
            success: false,
            msg: `No book with id ${bookID}`,
        });
    }

    res.status(200).json({ statusCode: 200, success: true, data: book });
};

//Delete books
const deleteSingleBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        console.log("jk", bookId);

        const book = await Book.findOneAndDelete({ _id: bookId });
        console.log("jkqwe", book);
        if (!book) {
            return res.status(404).json({
                success: false,
                msg: `No book with id ${bookId}`,
            });
        }

        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: book,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
    signupUser,
    loginUser,
    addNewBook,
    getSingleBook,
    getAllBooks,
    deleteSingleBook,
    updateBook,
};
