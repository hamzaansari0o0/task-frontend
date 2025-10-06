import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaSave } from 'react-icons/fa';

const AddTaskModal = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title || '');
        setDescription(taskToEdit.description || '');
        const d = taskToEdit.deadline ? new Date(taskToEdit.deadline) : new Date();
        setDeadline(d.toISOString().split('T')[0]);
        setStatus(taskToEdit.status || 'Pending');
      } else {
        setTitle('');
        setDescription('');
        setDeadline('');
        setStatus('Pending');
      }
    }
  }, [isOpen, taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title cannot be empty!');
      return;
    }
    const taskData = {
      title,
      description,
      deadline: deadline ? new Date(deadline).toISOString() : undefined,
      status,
    };
    onSave(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    // Modal ka overlay
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      
      {/* Modal ka content, jo choti screens par scrollable hoga */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 sm:p-8 transform transition-all duration-300 scale-100 opacity-100 max-h-screen overflow-y-auto">
        
        {/* Responsive Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            {taskToEdit ? <FaSave className="inline mr-2 sm:mr-3 text-blue-600" /> : <FaPlus className="inline mr-2 sm:mr-3 text-green-600" />}
            {taskToEdit ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
            aria-label="Close modal"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Modal Form with responsive spacing */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-5">
            <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Complete Math Homework"
              required
            />
          </div>

          <div className="mb-4 sm:mb-5">
            <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Detailed description of the task..."
            ></textarea>
          </div>

          <div className="mb-4 sm:mb-5">
            <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
              Deadline (Optional)
            </label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {taskToEdit && (
            <div className="mb-4 sm:mb-6">
              <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          )}

          {/* Responsive Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;