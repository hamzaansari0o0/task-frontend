import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiTask from "../utils/apiTask";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import { FaPlus, FaUserCircle } from 'react-icons/fa';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // --- Logic waisa hi rahega ---
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
  // --- Logic ka end ---

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Heading */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center sm:text-left">
            My Tasks
          </h1>
        </div>

        {tasks.length > 0 ? (
          // Responsive Grid for Task Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {tasks.map((task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          // Responsive Empty State Message
          <div className="text-center bg-white p-6 sm:p-8 rounded-lg shadow-md mt-10">
            <p className="text-lg sm:text-xl text-gray-600 mb-4">You have no tasks yet.</p>
            <p className="text-base sm:text-lg text-gray-500">Click the green button to get started!</p>
          </div>
        )}
      </div>

      {/* Responsive Floating Profile Button */}
      <Link
        to="/profile"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 h-12 w-12 md:h-14 md:w-14 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-transform hover:scale-110"
        aria-label="View Profile"
      >
        <FaUserCircle className="text-xl md:text-2xl" />
      </Link>

      {/* Responsive Floating Add Task Button */}
      <button
        onClick={() => { setTaskToEdit(null); setIsModalOpen(true); }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 h-14 w-14 md:h-16 md:w-16 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform hover:scale-110"
        aria-label="Add New Task"
      >
        <FaPlus className="text-xl md:text-2xl" />
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