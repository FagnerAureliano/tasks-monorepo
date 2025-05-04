import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <div
    className="space-y-2 pb-3 max-h-[26.3rem] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none]"
  > 
    <ul className="space-y-2 pb-3 max-h-[26.3rem] overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
    </div>
  );
};

export default TaskList;
