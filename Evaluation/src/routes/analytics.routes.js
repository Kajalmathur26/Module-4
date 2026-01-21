const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "db.json");

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));

/* 1️⃣ All Orders */
router.get("/allorders", (req, res) => {
    const db = readDB();
    res.json({ count: db.orders.length, orders: db.orders });
});

/* 2️⃣ Cancelled Orders */
router.get("/cancelled-orders", (req, res) => {
    const cancelled = readDB().orders.filter(o => o.status === "cancelled");
    res.json({ count: cancelled.length, orders: cancelled });
});

/* 3️⃣ Shipped Orders */
router.get("/shipped", (req, res) => {
    const shipped = readDB().orders.filter(o => o.status === "shipped");
    res.json({ count: shipped.length, orders: shipped });
});

/* 4️⃣ Revenue by Product */
router.get("/total-revenue/:productId", (req, res) => {
    const db = readDB();
    const product = db.products.find(p => p.id == req.params.productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const totalRevenue = db.orders
        .filter(o => o.productId == product.id && o.status !== "cancelled")
        .reduce((sum, o) => sum + o.quantity * product.price, 0);

    res.json({ productId: product.id, totalRevenue });
});

/* 5️⃣ Overall Revenue */
router.get("/alltotalrevenue", (req, res) => {
    const db = readDB();

    const totalRevenue = db.orders
        .filter(o => o.status !== "cancelled")
        .reduce((sum, o) => {
            const product = db.products.find(p => p.id === o.productId);
            return sum + o.quantity * product.price;
        }, 0);

    res.json({ totalRevenue });
});

module.exports = router;
