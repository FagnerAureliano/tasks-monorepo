import React from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface TaskFormProps {
  title: string;
  setTitle: (value: string) => void;
  onSubmit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ title, setTitle, onSubmit }) => {
  return (
    <div className="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400">
      <Input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nova tarefa..."
        className='bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal pr-3'
      />
      <Button onClick={onSubmit}>Adicionar</Button>
    </div>
  );
};

export default TaskForm;
