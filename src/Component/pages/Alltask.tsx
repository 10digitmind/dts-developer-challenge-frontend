
import React from "react"; 
import Header from "./Header";
import Footer from "./Footer";
import "/src/styles/Alltask.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Utils/Loader";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: string;
  date: string;
}

function Alltask() {
  const [alltasks, setAlltasks] = useState<TaskItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/getalltasks", { timeout: 5000 }); // 5 seconds timeout
  
      if (response && response.data) {
        setAlltasks(response.data.tasks);
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
     toast.error('error fecthing task',)
     console.log(error)
      alert("Unable to fetch tasks. Please check your internet connection or try again later."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: number,
    field: keyof TaskItem
  ) => {
    const updatedTasks = alltasks.map((task) =>
      task.id === id ? { ...task, [field]: e.target.value } : task
    );
    setAlltasks(updatedTasks);
  };

  const handleUpdate = async (task: TaskItem) => {
    try {
      await axios.patch(
        `http://localhost:3500/api/updatetask/${task.id}`,
        task
      );
      toast.success("Task updated sucessfully");
      getTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const confirmDeleteTask = (id: number) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await axios.delete(
          `http://localhost:3500/api/deletetask/${taskToDelete}`
        );
        toast.success("Task deleted sucessfully");
        getTasks();
      } catch (err) {
        console.error("Error deleting task:", err);
      } finally {
        setShowModal(false);
        setTaskToDelete(null);
      }
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = searchQuery
    ? alltasks.filter((task) => task.id.toString() === searchQuery)
    : alltasks;

  return (
    <div>
      <ToastContainer />
      <Header />
      <div>
        <form className="search-con">
          <input
            type="number"
            placeholder="Search by task ID"
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button type="button" onClick={() => setSearchQuery("")}>
            Clear
          </button>
        </form>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="all-task-con">
          {filteredTasks.length > 0
            ? filteredTasks.map((task) => (
                <div key={task.id} className="task-card">
                  <h2>Id: {task.id}</h2>
                  <label>
                    Title:
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => handleInputChange(e, task.id, "title")}
                    />
                  </label>
                  <label>
                    Description:
                    <input
                      type="text"
                      value={task.description}
                      onChange={(e) =>
                        handleInputChange(e, task.id, "description")
                      }
                    />
                  </label>
                  <label>
                    Status:
                    <select
                      value={task.status}
                      onChange={(e) => handleInputChange(e, task.id, "status")}
                    >
                      <option value="Pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </label>
                  <p>Date: {new Date(task.date).toLocaleDateString()}</p>
                  <div className="btn-group">
                    <button onClick={() => handleUpdate(task)}>Update</button>
                    <button onClick={() => confirmDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : searchQuery && (
                <p className="no-task-message">
                  No task found with ID number "{searchQuery}".
                </p>
              )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-btn-group">
              <button onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Alltask;