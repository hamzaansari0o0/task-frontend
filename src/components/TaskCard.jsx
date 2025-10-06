import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formattedDeadline = task.deadline 
    ? new Date(task.deadline).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'No Deadline';

  return (
    // Responsive Padding
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-start mb-2 gap-2">
          {/* Responsive Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 break-words pr-2">{task.title}</h3>
          
          {/* Status Badge */}
          <span className={`px-3 py-1 text-xs font-semibold rounded-full text-center whitespace-nowrap ${
            task.status === "Complete"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {task.status}
          </span>
        </div>
        
        {/* Description with limited lines to prevent card from getting too long */}
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {task.description || "No description provided."}
        </p>
      </div>
      
      {/* Bottom Section */}
      <div>
        <p className="text-sm text-gray-500 mb-4">
          <strong className="font-medium">Deadline:</strong> {formattedDeadline}
        </p>
        
        {/* Responsive Buttons: Stacks on very small screens, row on others */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 bg-blue-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            <FaEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="flex-1 bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
          >
            <FaTrashAlt className="mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;