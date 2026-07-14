const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

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

// Start Server
app.listen(PORT, () => {
    console.log(`RetailHub running on http://localhost:${PORT}`);
});