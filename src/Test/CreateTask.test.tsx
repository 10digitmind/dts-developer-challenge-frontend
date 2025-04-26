import React from "react"; 
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Createtask from "../Component/pages/Createtask"; 
import { createTask as mockCreateTask } from "../Component/services/createTaskService"; 
import { toast } from "react-toastify";

// Mock the createTask service
jest.mock("../Component/services/createTaskService");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Createtask Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form elements", () => {
    render(<Createtask />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create task/i })).toBeInTheDocument();
  });

  it("creates a task successfully", async () => {
    (mockCreateTask as jest.Mock).mockResolvedValue({ id: 1 }); // fake successful response

    render(<Createtask />);
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "Pending" } });

    fireEvent.click(screen.getByRole("button", { name: /Create task/i }));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: "New Task",
        description: "",
        status: "Pending",
      });
      expect(toast.success).toHaveBeenCalledWith("Task created successfully!");
    });
  });
  
  it("shows error when title is missing", async () => {
    render(<Createtask />);
  
    // Only fill in the status field
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "Pending" } });
  
    // Trigger form submission
    fireEvent.click(screen.getByRole("button", { name: /Create task/i }));
  
    // Check if the error toast is triggered for the missing title field
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Please fill all the required fields");
    });
  
    // Ensure that the task creation function is not called
    expect(mockCreateTask).not.toHaveBeenCalled();
  });
  

  it("handles API error", async () => {
    // Create a spy for console.error
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  
    (mockCreateTask as jest.Mock).mockRejectedValue(new Error("API Error"));
  
    render(<Createtask />);
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Fail Task" } });
    fireEvent.change(screen.getByLabelText(/status/i), { target: { value: "Pending" } });
  
    fireEvent.click(screen.getByRole("button", { name: /Create task/i }));
  
    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalled(); // Check if console.error was called in the catch block
    });
    // Clean up the spy after the test
    consoleErrorSpy.mockRestore();
  });
});
