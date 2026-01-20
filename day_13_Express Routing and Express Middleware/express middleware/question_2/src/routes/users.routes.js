const express = require("express");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../middleware/upload.middleware");
const uniqueEmailMiddleware = require("../middleware/uniqueEmail.middleware");
const streamifier = require("streamifier");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch {
    return { users: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ✅ GET all users
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.users || []);
});

// GET single user by ID
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
});

// DELETE user by ID
router.delete("/:userId", (req, res) => {
  const db = readDB();
  const initialLength = db.users.length;
  db.users = db.users.filter(u => u.id !== req.params.userId);
  if (db.users.length === initialLength)
    return res.status(404).json({ error: "User not found" });
  writeDB(db);
  res.status(200).json({ message: "User deleted successfully" });
});

// UPDATE user by ID
router.put("/:userId", (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.userId);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const updatedData = req.body;
  db.users[index] = { ...db.users[index], ...updatedData };
  writeDB(db);

  res.status(200).json({ message: "User updated successfully", user: db.users[index] });
});

// POST /signup
router.post("/signup", upload.single("profile"), uniqueEmailMiddleware, (req, res) => {
  const { name, email, password } = req.body;

  if (!req.file) return res.status(400).json({ error: "Profile image is required" });

  const uploadStream = cloudinary.uploader.upload_stream({ folder: "users" }, (err, result) => {
    if (err) return res.status(500).json({ error: "Cloudinary upload failed" });

    const db = readDB();
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      profilePic: result.secure_url
    };

    db.users = db.users || [];
    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  });

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

module.exports = router;
