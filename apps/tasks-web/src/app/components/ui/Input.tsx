import React from 'react'; 
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="flex-1 border px-3 py-2 rounded"
      {...props} 
    /> 
  );
};

export default Input;
