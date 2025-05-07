'use client';

import React, { useEffect, useState } from 'react'; 
import { addTask, deleteTask, fetchTasks, Task, toggleTask } from '../lib/service/task/taskService';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';
 

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error('Erro ao buscar tarefas', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;
    try {
      const newTask = await addTask(title);
      setTasks(prev => [newTask, ...prev]);
      setTitle('');
    } catch (err) {
      console.error('Erro ao adicionar tarefa', err);
    }
  };

  const handleToggle = async (task: Task) => {  
    if (!task) return;

    try {
      const updated = await toggleTask(task.id, !task.completed);
      setTasks(prev => prev.map(t => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error('Erro ao atualizar tarefa', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Erro ao deletar tarefa', err);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
    <div
      className="mb-2 text-center text-white md:mb-10 w-full bg-gray-900 rounded-md p-5"
    >
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
        Adicione, busque, edite e remove suas tarefas
      </p>
    </div>


    {loading ? (
      <p className="text-gray-500">Carregando tarefas...</p>
    ) : (
      <>
       
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </>
    )}
    <TaskForm title={title} setTitle={setTitle} onSubmit={handleAddTask} />
  </main>
  );
}
