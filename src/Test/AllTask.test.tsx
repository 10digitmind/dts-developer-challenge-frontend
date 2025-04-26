
import React from "react"; 
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import Alltask, { TaskItem } from '../Component/pages/Alltask';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom' // for the 'toBeInTheDocument' matcher

// Mocking axios for testing
const mockAxios = new MockAdapter(axios);


describe('Alltask Component', () => {

    const mockTasks: TaskItem[] = [
      {
        id: 1,
        title: 'Test Task 1',
        description: 'This is the first test task',
        status: 'Pending',
        date: '2025-04-26',
      },
      {
        id: 2,
        title: 'Test Task 2',
        description: 'This is the second test task',
        status: 'Completed',
        date: '2025-04-26',
      },
    ];
  
    beforeEach(() => {
    
      mockAxios.onGet('http://localhost:3500/api/getalltasks').reply(200, {
        tasks: mockTasks,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();  
    });
  
    it('should render tasks correctly', async () => {
    
      await act(async () => {
        render(<Alltask />);
      });
  
      // Wait for the tasks to be fetched
      await waitFor(() => screen.getByDisplayValue('Test Task 1'));

expect(screen.getByDisplayValue('Test Task 1')).toBeInTheDocument();
    });
  

    it('should allow searching by task ID', async () => {
      render(<Alltask />);
  
      await waitFor(() => screen.getByDisplayValue('Test Task 1'));
  
     
      const searchInput = screen.getByPlaceholderText('Search by task ID');
      fireEvent.change(searchInput, { target: { value: '1' } });

     
      expect(screen.getByDisplayValue('Test Task 1')).toBeInTheDocument();
    

    });
  
    it('should handle empty search result gracefully', async () => {
      render(<Alltask />);
  
   
      await waitFor(() => screen.getByDisplayValue('Test Task 1'));
  
   
      const searchInput = screen.getByPlaceholderText('Search by task ID');
      fireEvent.change(searchInput, { target: { value: '999' } });
  
      expect(screen.getByText('No task found with ID number "999".')).toBeInTheDocument();
    });
  
  
  
    it('should allow updating a task', async () => {
      render(<Alltask />);
  
      // Wait for tasks to load
      await waitFor(() => screen.getByDisplayValue('Test Task 1'));
  
      
      const updateButton = screen.getAllByRole('button', { name: /update/i });
  
      
      fireEvent.click(updateButton[0]);
  
    
      const titleInput = screen.getByDisplayValue('Test Task 1');
      fireEvent.change(titleInput, { target: { value: 'Updated Task 1' } });
  
      mockAxios.onPatch('http://localhost:3500/api/updatetask/1').reply(200);
  
      
      expect(mockAxios.history.patch.length).toBe(1);
    });
  
    it('should allow deleting a task', async () => {
      render(<Alltask />);
  
     
      await waitFor(() => screen.getByDisplayValue('Test Task 1'));
  
      const deleteButton = screen.getAllByRole('button', { name: /Delete/i });;
  
      // Simulate clicking the delete button
      fireEvent.click(deleteButton[0]);
  
     
      const confirmDeleteButton = screen.getByText('Yes, Delete');
      fireEvent.click(confirmDeleteButton);
  
    
      mockAxios.onDelete('http://localhost:3500/api/deletetask/1').reply(200);
  
      
      expect(mockAxios.history.delete.length).toBe(1);
    });
  });