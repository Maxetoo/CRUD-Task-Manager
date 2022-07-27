const express = require('express')
const Router = express.Router()
const {
    getAllTasks,
    createTask,
    getSingleTask,
    editTask,
    deleteTask,
} = require('../controllers/controllers')

Router.get('/', getAllTasks)

Router.post('/', createTask)

Router.get('/:id', getSingleTask)

Router.patch('/:id', editTask)

Router.delete('/:id', deleteTask)

module.exports = Router