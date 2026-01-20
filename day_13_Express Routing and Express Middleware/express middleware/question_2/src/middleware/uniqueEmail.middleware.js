const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  } catch {
    return { users: [] };
  }
};

const uniqueEmailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const db = readDB();
  const userExists = db.users?.some(u => u.email === email);

  if (userExists) return res.status(409).json({ error: "Email already exists" });
  next();
};

module.exports = uniqueEmailMiddleware;
