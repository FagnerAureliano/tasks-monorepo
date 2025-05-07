import React from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface TaskSearchProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
const TaskSearch: React.FC<TaskSearchProps> = ({ tasks, setTasks }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    React.useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`/tasks?search=${searchTerm}`);
                const data = await res.json();
                setTasks(data);
            } catch (err) {
                console.error('Error fetching tasks', err);
            }
        };
        fetchTasks();
    }, [searchTerm, setTasks]);

    return (
        <div className="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mt-3">

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search tasks..."
                className="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
            />
        </div>
    );


}
export default TaskSearch;