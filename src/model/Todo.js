import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        required: true
    },

    isComplete: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema)

export default Todo