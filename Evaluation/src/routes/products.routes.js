const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post("/", (req, res) => {
    const db = readDB();
    const product = { id: Date.now(), ...req.body };
    db.products.push(product);
    writeDB(db);
    res.status(201).json(product);
});

router.get("/", (req, res) => {
    const db = readDB();
    res.json(db.products);
});

module.exports = router;
