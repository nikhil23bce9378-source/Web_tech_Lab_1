const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/bookFinderDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Book = require("./models/Book");


// ===============================
// 1️⃣ Search Books by Title
// GET /books/search?title=javascript
// ===============================
app.get("/books/search", async (req, res) => {
    const title = req.query.title;

    const books = await Book.find({
        title: { $regex: title, $options: "i" }
    });

    res.json(books);
});


// ===============================
// 2️⃣ Filter by Category
// GET /books/category/programming
// ===============================
app.get("/books/category/:category", async (req, res) => {
    const books = await Book.find({
        category: req.params.category
    });

    res.json(books);
});


// ===============================
// 3️⃣ Sort Books
// GET /books/sort/price
// GET /books/sort/rating
// ===============================
app.get("/books/sort/:field", async (req, res) => {
    const field = req.params.field;

    let sortOption = {};
    if (field === "price") sortOption.price = 1;
    if (field === "rating") sortOption.rating = -1;

    const books = await Book.find().sort(sortOption);
    res.json(books);
});


// ===============================
// 4️⃣ Top Rated Books
// GET /books/top
// ===============================
app.get("/books/top", async (req, res) => {
    const books = await Book.find({
        rating: { $gte: 4 }
    }).limit(5);

    res.json(books);
});


// ===============================
// 5️⃣ Pagination
// GET /books?page=2
// ===============================
app.get("/books", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
        .skip(skip)
        .limit(limit);

    res.json(books);
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});