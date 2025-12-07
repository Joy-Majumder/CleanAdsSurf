const express = require("express");

const router = express.Router();

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin"
  }
];

router.post("/signup", (req, res) => {
  const { username, email, password, confirmPassword } = req.body || {};

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  users.push({ username, email, password });

  return res.json({
    message: "Signup successful (demo mode - no persistence yet).",
    user: { username, email }
  });
});

router.post("/login", (req, res) => {
  const { username, password, usernameOrEmail } = req.body || {};
  const userField = username || usernameOrEmail;

  if (!userField || !password) {
    return res.status(400).json({ error: "Username/email and password required." });
  }

  const isDemoAdmin =
    (userField === "admin" || userField === "admin@example.com") &&
    password === "admin";

  if (!isDemoAdmin) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const mockUser = {
    username: "admin",
    email: "admin@example.com",
    plan: "free"
  };

  return res.json({ user: mockUser });
});

router.get("/me", (req, res) => {
  const mockUser = {
    username: "admin",
    email: "admin@example.com",
    plan: "free"
  };

  return res.json(mockUser);
});

module.exports = router;
