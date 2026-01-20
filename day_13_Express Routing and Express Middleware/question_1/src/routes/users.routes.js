const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

// Read DB
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

// Write DB
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// CREATE USER
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = req.body;

  if (!newUser.id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: "User added successfully", user: newUser });
});

// GET ALL USERS
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.users);
});

// GET SINGLE USER
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();

  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// UPDATE USER
router.put("/update/:userId", (req, res) => {
  const { userId } = req.params;
  const updatedData = req.body;
  const db = readDB();

  const index = db.users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users[index] = { ...db.users[index], ...updatedData };
  writeDB(db);

  res.status(200).json({ message: "User updated successfully" });
});

// DELETE USER
router.delete("/delete/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();

  const filteredUsers = db.users.filter((u) => u.id !== userId);

  if (filteredUsers.length === db.users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  db.users = filteredUsers;
  writeDB(db);

  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;
