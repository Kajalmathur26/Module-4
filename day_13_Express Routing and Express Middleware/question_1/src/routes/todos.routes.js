const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// CREATE TODO
router.post("/add", (req, res) => {
  const db = readDB();
  const newTodo = req.body;

  if (!newTodo.id) {
    return res.status(400).json({ message: "Todo ID is required" });
  }

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json({ message: "Todo added successfully", todo: newTodo });
});

// GET ALL TODOS
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.todos);
});

// GET SINGLE TODO
router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const todo = db.todos.find((t) => t.id === todoId);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json(todo);
});

// UPDATE TODO
router.put("/update/:todoId", (req, res) => {
  const { todoId } = req.params;
  const updatedData = req.body;
  const db = readDB();

  const index = db.todos.findIndex((t) => t.id === todoId);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  db.todos[index] = { ...db.todos[index], ...updatedData };
  writeDB(db);

  res.status(200).json({ message: "Todo updated successfully" });
});

// DELETE TODO
router.delete("/delete/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const filteredTodos = db.todos.filter((t) => t.id !== todoId);

  if (filteredTodos.length === db.todos.length) {
    return res.status(404).json({ message: "Todo not found" });
  }

  db.todos = filteredTodos;
  writeDB(db);

  res.status(200).json({ message: "Todo deleted successfully" });
});

module.exports = router;
