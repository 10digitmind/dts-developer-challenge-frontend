import React from "react"; 
import "/src/styles/createtask.css";
import { createTask,Task } from "../services/createTaskService";
import { useState } from "react";
import { toast } from "react-toastify";

function Createtask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title,
      description,
      status,
      
    };

    try {
      if (!newTask.title || !newTask.status) {
        toast.error("Please fill all the required fields");
        return;
      }
      await createTask(newTask);
      toast.success("Task created successfully!");
    

  
      setTitle("");
      setDescription("");
      setStatus("Pending");
    
    } catch (error) {
      console.error("Error creating task", error);
    }
  };
  return (
    <div>
      <div className="create-task-con">
        <h1>create task</h1>
        <div className="form-con">
          <form onSubmit={handleSubmit}>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
              />
            </label>
            <label>
              description (optional)
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              
              />
            </label>
            <label>
              status
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Pending</option>
                <option>In-progress</option>
                <option>Completed</option>
              </select>
            </label>
            <div className="btn-con">
            <button>Create task</button>
            </div>
          
          </form>
       
        </div>
      </div>
    </div>
  );
}

export default Createtask;
