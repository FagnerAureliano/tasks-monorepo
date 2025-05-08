import React from "react"; 

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className="flex-1 border px-3 py-2 rounded" {...props} />;
};

export default Input;
