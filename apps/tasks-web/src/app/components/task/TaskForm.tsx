import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface TaskFormProps {
  title: string;
  setTitle: (value: string) => void;
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ title, setTitle, onSubmit }) => {
  return (
    <div className="flex items-center pl-4 pr-2 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal pr-3"
      /> 
      <Button
        onClick={onSubmit}
        className="flex items-center justify-center bg-green-500 hover:bg-green-800 text-gray-400 p-2 rounded-sm ml-2"
      >
        <div className="flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-white text-lg ml-2">Add</span>
        </div>
      </Button>
    </div>
  );
};

export default TaskForm;
