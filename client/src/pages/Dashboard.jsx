import React, {useEffect, useState} from "react";
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import EditTask from "../components/Dashboard/EditTask";
import StackTitle from "../components/Dashboard/StackTitle";
import Pending from "../components/Dashboard/Pending";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import API_BASE_URL from "../config";  // Import API URL

const Dashboard = () => {
    const [AddTaskDiv, setAddTaskDiv] = useState("hidden");
    const [ Tasks, setTasks] = useState();
    const [EditTaskDiv, setEditTaskDiv] = useState("hidden");
    const [EditTaskId, setEditTaskId] = useState();
    useEffect(() => {       
        const fetchUserDetails = async() => {
            try {
                const res = await axios.get(`${API_BASE_URL}/userDetails`, {
                    withCredentials: true,
                });
                setTasks(res.data.tasks); 
            } catch(error){

            }
        };
        fetchUserDetails();    
        if(window.sessionStorage.getItem("editTaskId")) {
            setEditTaskDiv("block");
            setEditTaskId(window.sessionStorage.getItem("editTaskId"));
        }
    },[AddTaskDiv]);    
    return (
        <div className="w-full relative">
            <div className="bg-white">
                <Header setAddTaskDiv={setAddTaskDiv} />
            </div>
            <div className="px-12 py-4 flex gap-12 bg-zinc-100 min-h[89vw] mx-h-auto">                
                <div className="w-1/2">
                    <StackTitle title={"Pending"} />
                    <div className="pt-2">
                    {Tasks && <Pending task = {Tasks[0].pending} />}
                    </div>
                </div>
                <div className="w-1/2">
                <StackTitle title={"Completed"} />
                <div className="pt-2">
                {Tasks && <Completed task = {Tasks[1].completed} />}
                    </div>
                </div>
            </div>
            <div className={`w-full ${AddTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
            <div className={`w-full ${AddTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
                <AddTask  setAddTaskDiv={setAddTaskDiv}/>
            </div>

            <div className={`w-full ${EditTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
            <div className={`w-full ${EditTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
                <EditTask EditTaskId= {EditTaskId} setEditTaskDiv={setEditTaskDiv}/>
            </div>
        </div>
    );
};

export default Dashboard;