import api from "@/app/lib/auth/api";
import { getUserIdFromToken } from "@/app/lib/auth/auth";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  authorId: string;
};
export type TaskResponse = {
  tasks: Task[];
};
export type TaskRequest = {
  title: string;
  completed: boolean;
  authorId: string;
};
export type TaskUpdateRequest = {
  completed: boolean;
};
export type TaskUpdateResponse = {
  task: Task;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const userId = getUserIdFromToken();
  const response = await api.get<Task[]>(`/tasks/user/${userId}`);
  return response.data;
};
export const addTask = async (title: string): Promise<Task> => {
  const userId = getUserIdFromToken();
  if (!userId) {
    throw new Error("User ID not found");
  }
  const taskRequest: TaskRequest = {
    title,
    completed: false,
    authorId: userId,
  };
  const response = await api.post<Task>("/tasks", taskRequest);

  if (!response.data) {
    throw new Error("Failed to create task");
  }
  return response.data;
};
export const toggleTask = async (
  id: string,
  completed: boolean
): Promise<Task> => {
  const taskUpdateRequest: TaskUpdateRequest = {
    completed,
  };
  const response = await api.put<Task>(`/tasks/${id}`, taskUpdateRequest);
  return response.data;
};
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
export const deleteAllTasks = async (): Promise<void> => {
  const userId = getUserIdFromToken();
  await api.delete(`/tasks/${userId}`);
};

export const searchTaskByTitle = async (title: string): Promise<Task[]> => {
  const response = await api.get<Task[]>(`/tasks/title/${title}`);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  
  const response = await api.put<Task>(`/tasks/${task.id}`, task);
  return response.data;
};
