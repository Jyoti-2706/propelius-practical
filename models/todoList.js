const mongoose = require('mongoose');
const { dbStatus } = require('../config/commonFunction');

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    due_date: {
        type: Date,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: dbStatus.PENDING
    }

});

const TodoList = mongoose.model('todoList', todoListSchema)
module.exports = TodoList;