const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"],
        default: "low"
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date, // Added Due Date field
        default: null // Default is null if not provided
    }
});

module.exports = mongoose.model("Task", taskSchema);
