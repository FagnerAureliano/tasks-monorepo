'use client';

import { Task } from '@/app/lib/service/task/taskService';
import React, { useState } from 'react';
import ConfirmDialog from '../ui/ConfirmDialog';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowConfirm(false);
  };

  return (
    <>
      <li className="flex justify-between items-center py-2 bg-gray-400 hover:bg-gray-500 rounded-sm">
        <div className="flex items-center px-4" onClick={() => onToggle(task)}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="mr-2 cursor-pointer w-5 h-5"
          />
          <label
            htmlFor={task.id}
            className={`cursor-pointer text-gray-900 ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {task.title}
          </label>
        </div>

        <button className="focus:outline-none pr-3" onClick={() => setShowConfirm(true)}>
          <svg
            className="ml-3 h-5 w-5 text-gray-600 hover:text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </li>

      {showConfirm && (
        <ConfirmDialog
          message="Tem certeza que deseja excluir esta tarefa?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default TaskItem;
