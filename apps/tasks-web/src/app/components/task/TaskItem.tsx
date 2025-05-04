import React from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li className="flex justify-between items-center py-2 border-b bg-gray-300 rounded-sm">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-2"
        />
        <label
          htmlFor={task.id}
          className={`cursor-pointer ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {task.title}
        </label>
      </div>
      
      <button className="focus:outline-none" onClick={() => onDelete(task.id)}>
          <svg
            className="ml-3 h-4 w-4 text-gray-500 hover:text-red-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
    </li>
  );
};

export default TaskItem;
