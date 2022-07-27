const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [15, 'name cannot be more than 15'],
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
})

module.exports = taskSchema