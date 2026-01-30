// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const { createTodo, getTodosByUser, updateTodo, deleteTodo } = require('../controllers/todoController');

router.post('/add-todo', createTodo);
router.get('/get-my-todo/:userId', getTodosByUser);
router.put('/update-todo/:todoId', updateTodo);
router.delete('/delete-todo/:todoId', deleteTodo);

module.exports = router;