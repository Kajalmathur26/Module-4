import { readDB, writeDB } from "../models/todo.model.js";

/* CREATE TODO */
export const createTodo = (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const db = readDB();

    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };

    db.todos.push(newTodo);
    writeDB(db);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo" });
  }
};

/* GET ALL TODOS */
export const getTodos = (req, res) => {
  try {
    const db = readDB();
    res.status(200).json(db.todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

/* UPDATE TODO (MARK AS COMPLETED) */
export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();

    const todoIndex = db.todos.findIndex(todo => todo.id == id);

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    db.todos[todoIndex].completed = true;

    writeDB(db);
    res.status(200).json(db.todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo" });
  }
};

/* DELETE TODO */
export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const db = readDB();

    const index = db.todos.findIndex(todo => todo.id == id);

    if (index === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    db.todos.splice(index, 1);
    writeDB(db);

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
