const mongoose = require('mongoose')
const taskSchema = require('../models/models')
const Task = mongoose.model('Task', taskSchema)
module.exports = Task