import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/app/lib/service/task/taskService";

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  if (tasks.length <= 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500 pb-4">No tasks available</p>
      </div>
    );
  }
  return (
    <div className="space-y-2 pb-3 max-h-[26.3rem] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* count */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-500 text-sm font-semibold">
          {tasks.length} {tasks.length > 1 ? "tasks" : "task"} 
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm font-semibold">
            {tasks.filter((task) => task.completed).length} completed
          </span>
          <span className="text-gray-500 text-sm font-semibold">
            {tasks.filter((task) => !task.completed).length} remaining
          </span>
        </div>
      </div>
   
      <ul className="space-y-2 pb-3 max-h-[20.3rem] overflow-y-auto scrollbar-thin ">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
