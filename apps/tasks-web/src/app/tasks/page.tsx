"use client";
/* eslint-disable */
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  fetchTasks,
  searchTaskByTitle,
  Task,
  toggleTask,
  updateTask,
} from "../lib/service/task/taskService";
import TaskForm from "../components/task/TaskForm";
import TaskList from "../components/task/TaskList";
import TaskSearch from "../components/task/TaskSearch";
import { useAuth } from "../lib/auth/useAuth";
import Navbar from "../components/task/Navbar";
import { getUserFromToken } from "../lib/auth/auth";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useAuth();
  const user = getUserFromToken();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        toast.error("Error loading tasks");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    try {
      const newTask = await addTask(title);
      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      toast.success("Task added successfully");
    } catch (err) {
      toast.error("Error adding task");
    }
  };

  const handleToggle = async (task: Task) => {
    if (!task) return;

    try {
      const updated = await toggleTask(task.id, !task.completed);
      toast.success("Task updated successfully");

      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);

      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Error deleting task");
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
      return;
    }
    const response = await searchTaskByTitle(searchTerm);
    setTasks(response);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const updated = await updateTask(updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  return (
    <>
      <Navbar userName={user?.name} />
      <main className="p-6 max-w-xl mx-auto">
        <div className="mb-2 text-center text-white md:mb-10 w-full bg-gray-900 rounded-md p-5">
          <svg
            className="w-16 h-16 mx-auto text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
            ></path>
          </svg>

          <h1 className="text-3xl font-bold text-white mb-5">Todo List</h1>
          <p className="text-gray-400">
            Add, search, edit and remove your tasks
          </p>
        </div>

        {loading ? (
          <p className="text-gray-500 pb-4">Carregando tarefas...</p>
        ) : (
          <>
            <TaskSearch handleSearch={handleSearch} />
            <br />
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdateTask}
            />
          </>
        )}
        <TaskForm title={title} setTitle={setTitle} onSubmit={handleAddTask} />
      </main>
    </>
  );
}
