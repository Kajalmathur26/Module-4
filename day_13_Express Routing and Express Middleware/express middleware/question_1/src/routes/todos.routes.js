const express = require("express");
const fs = require("fs");
const path = require("path");

const validateTodoMiddleware = require("../middleware/validateTodo.middleware");
const rateLimiterMiddleware = require("../middleware/rateLimiter.middleware");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

// Helpers
const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// CREATE TODO
router.post("/add", validateTodoMiddleware, (req, res) => {
    const db = readDB();
    const newTodo = { id: Date.now().toString(), title: req.body.title, completed: false };
    db.todos.push(newTodo);
    writeDB(db);
    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
});

// GET ALL TODOS (Rate limited)
router.get("/", rateLimiterMiddleware, (req, res) => {
    const db = readDB();
    res.status(200).json(db.todos);
});

// GET SINGLE TODO
router.get("/:todoId", (req, res) => {
    const db = readDB();
    const todo = db.todos.find(t => t.id === req.params.todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
});

// UPDATE TODO
router.put("/update/:todoId", (req, res) => {
    const db = readDB();
    const index = db.todos.findIndex(t => t.id === req.params.todoId);
    if (index === -1) return res.status(404).json({ message: "Todo not found" });

    db.todos[index] = { ...db.todos[index], ...req.body };
    writeDB(db);
    res.status(200).json({ message: "Todo updated successfully" });
});

// DELETE TODO
router.delete("/delete/:todoId", (req, res) => {
    const db = readDB();
    const filtered = db.todos.filter(t => t.id !== req.params.todoId);
    if (filtered.length === db.todos.length) return res.status(404).json({ message: "Todo not found" });

    db.todos = filtered;
    writeDB(db);
    res.status(200).json({ message: "Todo deleted successfully" });
});

module.exports = router;
