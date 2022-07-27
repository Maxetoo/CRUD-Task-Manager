const Task = require('../db/connect')
    // get all tasks
const getAllTasks = async(req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json({ success: true, data: task, amount: task.length })
    } catch (error) {
        res.status(400).json({ success: false, msg: error })
    }
}

// create task
const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

// get single task
const getSingleTask = async(req, res) => {
    const { id: taskID } = req.params
    try {
        const task = await Task.findOne({ _id: taskID })
        res.status(200).send(task)
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

// edit task
const editTask = async(req, res) => {
    const { id: taskID } = req.params
    try {
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({ task })
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

// delete task
const deleteTask = async(req, res) => {
    const { id: taskID } = req.params
    try {
        const task = await Task.findOneAndDelete({ _id: taskID })
        res.status(200).send(task)
    } catch (error) {
        res.status(400).json({ success: false, msg: error.message })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    editTask,
    deleteTask,
}