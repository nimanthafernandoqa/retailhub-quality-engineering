const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;
let cart = [];
// View Engine
app.set("view engine", "ejs");

// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.redirect("/login");
});

// Login Page
app.get("/login", (req, res) => {
    res.render("login", { error: null });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "nimantha@retailhub.com" && password === "Password123") {
        return res.redirect("/dashboard");
    }

    res.render("login", {
        error: "Invalid email or password"
    });
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 1200,
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 150,
    },
    {
      id: 3,
      name: "Wireless Mouse",
      price: 45,
    },
  ];

  res.render("products", {
    products,
    cartCount: cart.length,
  });
});

// Add product to cart
app.post("/cart/add", (req, res) => {
  const { productId } = req.body;

  cart.push(Number(productId));

  res.redirect("/products");
});

// Start Server
app.listen(PORT, () => {
    console.log(`RetailHub running on http://localhost:${PORT}`);
});