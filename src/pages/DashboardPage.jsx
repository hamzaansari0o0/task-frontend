// src/pages/DashboardPage.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiTask from "../utils/apiTask";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import { FaPlus, FaUserCircle, FaTasks, FaClipboardList } from 'react-icons/fa'; // ✅ Icons import kiye

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // --- Data Fetching aur Handlers (In mein koi change nahi) ---
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await apiTask.get("/");
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await apiTask.put(`/${taskToEdit._id}`, taskData);
        alert('Task updated successfully!');
      } else {
        await apiTask.post("/", taskData);
        alert('Task added successfully!');
      }
      fetchTasks();
    } catch (err) {
      alert(`Failed to save task: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await apiTask.delete(`/${taskId}`);
        alert('Task deleted successfully!');
        fetchTasks();
      } catch (err) {
        alert(`Failed to delete task: ${err.response?.data?.message || err.message}`);
      }
    }
  };
  
  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => 
      task._id === updatedTask._id ? updatedTask : task
    ));
  };

  // --- Loading aur Error States ---
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-lg font-semibold text-slate-500">Loading Tasks...</p></div>;
  }
  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><p className="text-lg font-semibold text-red-500">{error}</p></div>;
  }

  // --- Main Component Return (Updated UI) ---
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ✅ Header Section */}
        <header className="flex items-center justify-between py-6 border-b border-slate-200">
          {/* Logo/Homepage Link */}
          <Link to="/" className="flex items-center gap-2 text-indigo-600 transition-transform hover:scale-105">
            <FaTasks className="h-8 w-8" />
            <span className="font-bold text-xl hidden sm:block">TaskMaster</span>
          </Link>

          {/* Page Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            My Dashboard
          </h1>

          {/* Profile Link */}
          <Link to="/profile" className="h-12 w-12 bg-white text-slate-600 rounded-full flex items-center justify-center shadow-md border border-slate-200 hover:bg-slate-100 transition">
            <FaUserCircle className="text-2xl" />
          </Link>
        </header>

        {/* ✅ Main Content Area */}
        <main className="py-8">
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tasks.map((task) => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  onTaskUpdate={handleTaskUpdate}
                />
              ))}
            </div>
          ) : (
            // ✅ Behtar Empty State
            <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-slate-200 mt-10 flex flex-col items-center">
              <FaClipboardList className="w-24 h-24 text-slate-300 mb-6" />
              <h2 className="text-xl font-semibold text-slate-700">No Tasks Yet</h2>
              <p className="text-slate-500 mt-2">
                Click the <span className="font-bold text-green-600">'+'</span> button to add your first task.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Add Task Button (is mein koi change nahi) */}
      <button 
        onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }} 
        className="fixed bottom-8 right-8 z-50 h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Add New Task"
      >
        <FaPlus className="text-2xl" />
      </button>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit} 
      />
    </div>
  );
};

export default DashboardPage;