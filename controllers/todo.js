const Joi = require("joi")
const { createTodoInDB, updateTodoInDB, getAllTodoFromDB, deleteTodoFromDB, updateStatusTodoInDB } = require("../bussineRule/todo")
const { responseWithError, responseInvalidArgs } = require("../config/commonFunction")

const createTodo = async (req, res) => {
    try {
        const validate = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            due_date: Joi.date().required().greater('now'),
        })

        const validateSchema = validate.validate(req.body)
        if (validateSchema.error) {
            return responseInvalidArgs(res, validateSchema)
        }
        return createTodoInDB(req, res)
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const updateTodo = async (req, res) => {
    try {
        const validate = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            due_date: Joi.date().required().greater('now'),
        })

        const validateSchema = validate.validate(req.body)
        if (validateSchema.error) {
            return responseInvalidArgs(res, validateSchema)
        }
        return updateTodoInDB(req, res)
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const getAllTodo = async (req, res) => {
    try {

        const validation = Joi.object({
            date: Joi.date().less('now'),
            skip: Joi.number().required(),
            take: Joi.number().min(1).required()
        })
        const validateSchema = validation.validate(req.query)
        if (validateSchema.error) {
            return responseInvalidArgs(res, validateSchema)
        }
        return getAllTodoFromDB(req, res)
    } catch (error) {
        return responseWithError(req, res, error)
    }
}

const deleteTodo = async (req, res) => {
    try {
        return deleteTodoFromDB(req, res)
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
const updateStatusTodo = async (req, res) => {
    try {
        const validation = Joi.object({
            status: Joi.number().required().allow(0, 1)
        })
        const validateSchema = validation.validate(req.body)
        if (validateSchema.error) {
            return responseInvalidArgs(res, validateSchema)
        }
        return updateStatusTodoInDB(req, res)
    } catch (error) {
        return responseWithError(req, res, error)
    }
}
module.exports = {
    createTodo,
    updateTodo,
    getAllTodo,
    deleteTodo,
    updateStatusTodo
}