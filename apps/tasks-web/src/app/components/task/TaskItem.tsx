"use client";

import { Task } from "@/app/lib/service/task/taskService";
import React, { useState, useRef, useEffect } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void; // callback para atualização
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowConfirm(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setEditTitle(task.title);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setEditTitle(task.title); // resetar título para o original
  };

  const handleEditSubmit = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate({ ...task, title: editTitle });
    }
    setEditing(false);
  };

  return (
    <>
      <li
        className={`flex justify-between items-center py-2 px-2 rounded-sm ${editing ? "bg-gray-200" : " bg-gray-400  hover:bg-gray-500"}`}
      >
        <div className="flex items-center gap-2 flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task)}
            className="cursor-pointer w-5 h-5"
          />

          {editing ? (
            <input
              ref={inputRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSubmit();
              }}
              className="bg-auto placeholder-gray-500 text-gray-900 font-semibold focus:outline-none block w-full appearance-none leading-normal pr-3"
            />
          ) : (
            <label
              htmlFor={task.id}
              className={`cursor-pointer text-gray-900 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => onToggle(task)}
            >
              {task.title}
            </label>
          )}
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                onClick={handleEditSubmit}
                className="hover:text-green-500"
              >
                <svg
                  className="w-6 h-6 text-gray-800 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button onClick={handleCancelEdit} className="hover:text-red-500">
                <svg
                  className="w-5 h-5 text-red-500 hover:text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="hover:text-yellow-500">
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                  />
                </svg>
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="hover:text-red-600 hover:text-red-500"
              >
                <svg
                  className="w-5 h-5 text-gray-600   hover:text-red-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
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
