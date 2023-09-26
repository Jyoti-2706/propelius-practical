const { responseWithError, responseREST, dbStatus } = require("../config/commonFunction")
const httpStatus = require("../config/httpStatus")
const TodoList = require("../models/todoList")


const createTodoInDB = async (req, res) => {
    try {
        let currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const { title, description, due_date } = req.body
        const createTodo = await TodoList.create({
            title,
            description,
            due_date: new Date(due_date),
            user_id: req.userInfo._id,
            created_at: currentDate, // Store date without time
            created_by: req.userInfo._id
        })
        return responseREST(
            res,
            httpStatus.SUCCESS,
            "Your Todo Task created successfully",
            createTodo,
        )
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const updateTodoInDB = async (req, res) => {
    try {
        const todoId = req.params.id;
        const {
            title,
            description,
            due_date
        } = req.body
        // get todo by id
        let todoData = await TodoList.findById(todoId)
        if (!todoData) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "Todo not found"
            )
        }
        // check if this todo is create the current date or not
        let currentDate = new Date()
        if (todoData.created_at.toDateString() !== currentDate.toDateString()) {
            return responseREST(
                res,
                httpStatus.NOT_SUCCESS,
                "You can't update the previously created todo task"
            )
        }

        // update todo
        let updateData = await TodoList.findByIdAndUpdate(todoId, {
            title,
            description,
            due_date: new Date(due_date),
        }, {
            new: true
        })
        return responseREST(
            res,
            httpStatus.SUCCESS,
            "Your Todo Task updated successfully",
            updateData,
        )
    } catch (error) {
        return responseWithError(req, res, error)
    }
}

const getAllTodoFromDB = async (req, res) => {
    try {
        let dateFilter = req.query.date || new Date().setUTCHours(0, 0, 0, 0);
        dateFilter = new Date(dateFilter).toISOString();
        let todoData = await TodoList.find({
            created_by: req.userInfo._id,
            created_at: dateFilter
        })
            .skip(parseInt(req.query.skip))
            .limit(parseInt(req.query.take))

        if (todoData.length === 0) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "No todo task found for this Day"
            )
        }

        return responseREST(
            res,
            httpStatus.SUCCESS,
            "Your Todo Task",
            todoData,
        )

    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const deleteTodoFromDB = async (req, res) => {
    try {
        const id = req.params.id;
        let getTodo = await TodoList.findById(id)
        if (!getTodo) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "Todo not found"
            )
        }
        // check if this todo is create the current date or not
        let currentDate = new Date()
        if (getTodo.created_at.toDateString() !== currentDate.toDateString()) {
            return responseREST(
                res,
                httpStatus.NOT_SUCCESS,
                "You can't update the previously created todo task"
            )
        }
        let deleteTodo = await TodoList.findByIdAndDelete(id)
        return responseREST(
            res,
            httpStatus.SUCCESS,
            "Your Todo Task deleted successfully",
            deleteTodo,
        )





    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const updateStatusTodoInDB = async (req, res) => {
    try {
        //get todo
        const todoId = req.params.id;

        let todoData = await TodoList.findById(todoId)
        if (!todoData) {
            return responseREST(
                res,
                httpStatus.NOT_FOUND,
                "Todo not found"
            )
        }
        let status = req.body.status === 1 ? dbStatus.COMPLETED : dbStatus.PENDING;

        // check if status is already same
        if (todoData.status === status) {
            let msg = status === dbStatus.COMPLETED ? "This task is already completed"
                : "This task is already pending"
            return responseREST(
                res,
                httpStatus.NOT_SUCCESS,
                msg
            )
        }


        let updateData = await TodoList.findByIdAndUpdate(todoId, {
            status
        }, {
            new: true
        })
        let msg = status === dbStatus.COMPLETED ? "Your Todo Task completed successfully"
            : "Your Todo Task pending."
        return responseREST(
            res,
            httpStatus.SUCCESS,
            msg,
            updateData,
        )
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
module.exports = {
    createTodoInDB,
    updateTodoInDB,
    getAllTodoFromDB,
    deleteTodoFromDB,
    updateStatusTodoInDB
}