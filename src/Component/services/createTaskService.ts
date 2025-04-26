import axios from "axios";

export interface Task {
    title: string;
    description: string;
    status: string;
  }
  
  export interface CreatedTask {
    id: number;
    title: string;
    description: string;
    status: string;
    date: string;  // date returned by the backend
  }
  export const createTask = async (task: Task): Promise<CreatedTask> => {
    try {

       
      const response = await axios.post<CreatedTask>(
        "http://localhost:3500/api/createtask",
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data;
    } catch (error) {;
      throw error;
    }
  };
  