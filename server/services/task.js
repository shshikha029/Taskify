const task = require("../models/tasks");

// Add Task
const addTask = async (req, res) => {
    try {
        const { title, description, priority, status, dueDate } = req.body;
        const { user } = req;

        if (!title || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "Title must have 6 characters" });
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "Description must have 6 characters" });
        }
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: "Invalid due date format" });
        }

        const newTask = new task({ title, description, priority, status, dueDate });
        await newTask.save();
        user.tasks.push(newTask._id);
        await user.save();
        return res.status(200).json({ success: "Task Added" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Edit Task
const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status, dueDate } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (title.length < 6) {
            return res.status(400).json({ error: "Title must have 6 characters" });
        }
        if (description.length < 6) {
            return res.status(400).json({ error: "Description must have 6 characters" });
        }
        if (dueDate && isNaN(Date.parse(dueDate))) {
            return res.status(400).json({ error: "Invalid due date format" });
        }

        await task.findByIdAndUpdate(id, { title, description, priority, status, dueDate });

        return res.status(200).json({ success: "Task Updated" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Task
const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const taskDetails = await task.findById(id);
        return res.status(200).json({ taskDetails });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await task.findByIdAndDelete(id);
        return res.status(200).json({ success: "Task deleted" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addTask, editTask, getTask, deleteTask };
