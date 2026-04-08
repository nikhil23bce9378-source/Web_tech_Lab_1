const express = require("express");
const app = express();

// Global middleware
app.use((req, res, next) => {
  console.log(`Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`);
  next();
});

// Route-level middleware
const checkAuth = (req, res, next) => {
  console.log("Auth middleware executed");
  next();
};

// Route
app.get("/home", checkAuth, (req, res) => {
  res.send("Welcome to Home Page");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});