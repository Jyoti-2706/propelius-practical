const express = require('express');
const { createTodo, updateTodo, getAllTodo, updateStatusTodo, deleteTodo } = require('../controllers/todo');
// const { deleteTodoFromDB } = require('../bussineRule/todo');
const router = express.Router();

router.post('/create-todo', createTodo);
router.put('/update-todo/:id', updateTodo);
router.get('/get-all-todo', getAllTodo);
router.delete('/delete-todo/:id', deleteTodo);
router.put('/update-todo-status/:id', updateStatusTodo);
module.exports = router;