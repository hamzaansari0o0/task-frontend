// src/components/TaskCard.jsx

import { useState } from 'react';
import { FaEdit, FaTrashAlt, FaFileUpload, FaCheckCircle } from 'react-icons/fa';
import { uploadTaskFile } from '../utils/apiTask';

const TaskCard = ({ task, onEdit, onDelete, onTaskUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
    : 'No Deadline';

  const isDeadlinePassed = task.deadline && new Date() > new Date(task.deadline);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError('');
    } else {
      setSelectedFile(null);
      setError('Please select a PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }
    
    setIsUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('taskFile', selectedFile);

    try {
      const res = await uploadTaskFile(task._id, formData);
      alert(res.data.message);
      onTaskUpdate(res.data.task);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "File upload failed.";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-shadow">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 break-words pr-2">{task.title}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.status === "Complete" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
            {task.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{task.description || "No description."}</p>
      </div>
      
      <div>
        <p className="text-sm text-gray-500 mb-4"><strong>Deadline:</strong> {formattedDeadline}</p>

        {task.status === 'Pending' && (
          <div className="mb-4">
            {isDeadlinePassed ? (
              <p className="text-center font-semibold text-red-600 bg-red-100 p-2 rounded-lg">Deadline Passed</p>
            ) : (
              <div>
                <div className="flex items-center space-x-2">
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
                    <button onClick={handleUpload} disabled={isUploading || !selectedFile} className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-gray-400 transition-all">
                      <FaFileUpload />
                    </button>
                </div>
                {isUploading && <p className="text-sm text-indigo-600 mt-2">Uploading...</p>}
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
              </div>
            )}
          </div>
        )}
        
        {task.status === 'Complete' && task.fileUrl && (
          <div className="mb-4">
             <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-500 text-white px-3 py-2 rounded-md text-sm hover:bg-green-600 transition">
              <FaCheckCircle className="mr-2" /> View Submission
             </a>
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="flex-1 bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition flex items-center justify-center">
            <FaEdit className="mr-2" /> Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm hover:bg-red-600 transition flex items-center justify-center">
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;