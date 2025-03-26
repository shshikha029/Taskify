import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config";

const EditTask = ({ setEditTaskDiv, EditTaskId }) => {
    const [Values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: "", // Added due date field
    });

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...Values, [name]: value });
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/getTask/${EditTaskId}`, {
                    withCredentials: true,
                });
                setValues(res.data.taskDetails);
            } catch (error) {
                console.error("Error fetching task details:", error);
            }
        };
        fetch();
    }, [EditTaskId]);

    const editTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${API_BASE_URL}/editTask/${id}`, Values, {
                withCredentials: true
            });
            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");
            setEditTaskDiv("hidden");
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.error || "Error updating task");
        }
    };

    const deleteTask = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`${API_BASE_URL}/deleteTask/${id}`, {
                withCredentials: true
            });
            alert(res.data.success);
            window.sessionStorage.clear("editTaskId");
            setEditTaskDiv("hidden");
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.error || "Error deleting task");
        }
    };

    return (
        <div className="bg-white rounded px-4 py-4 w-[40%]">
            <h1 className="text-center font-semibold text-xl">Edit Task</h1>
            <hr className="mb-4 mt-2" />
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    className="border px-2 py-1 rounded border-zinc-300 outline-none"
                    placeholder="Title"
                    name="title"
                    value={Values.title}
                    onChange={change}
                />

                <div className="flex items-center justify-between gap-4">
                    <div className="w-full">
                        <h3 className="mb-2">Select Priority</h3>
                        <select
                            name="priority"
                            className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
                            value={Values.priority}
                            onChange={change}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <h3 className="mb-2">Select Status</h3>
                        <select
                            name="status"
                            className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
                            value={Values.status}
                            onChange={change}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Added Due Date Field */}
                <div className="w-full">
                    <h3 className="mb-2">Due Date</h3>
                    <input
                        type="date"
                        name="dueDate"
                        className="border px-2 py-1 rounded border-zinc-300 outline-none w-full"
                        value={Values.dueDate ? Values.dueDate.split("T")[0] : ""}
                        onChange={change}
                    />
                </div>

                <textarea
                    name="description"
                    placeholder="Description"
                    className="border px-2 py-1 rounded border-zinc-300 outline-none h-[25vw]"
                    value={Values.description}
                    onChange={change}
                ></textarea>

                <div className="flex items-center justify-between gap-4">
                    <button
                        className="w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
                        onClick={(e) => editTask(e, Values._id)}
                    >
                        Edit Task
                    </button>
                    <button
                        className="w-full border border-red-600 text-red-600 py-2 hover:bg-red-100 transition-all duration-300"
                        onClick={(e) => deleteTask(e, Values._id)}
                    >
                        Delete Task
                    </button>
                    <button
                        className="border border-black w-full py-2 hover:bg-zinc-100 transition-all duration-300 text-black rounded"
                        onClick={(event) => {
                            event.preventDefault();
                            window.sessionStorage.clear("editTaskId");
                            setEditTaskDiv("hidden");
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTask;
