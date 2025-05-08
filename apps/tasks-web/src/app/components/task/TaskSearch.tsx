import React from 'react';

interface TaskSearchProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TaskSearch: React.FC<TaskSearchProps> = ({ handleSearch }) => {
    return (
        <div className="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 ">

            <input
                type="text"
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'Search tasks...'}
                onChange={handleSearch}
                placeholder="Search tasks..."
                className="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
            />
        </div>
    );


}
export default TaskSearch;