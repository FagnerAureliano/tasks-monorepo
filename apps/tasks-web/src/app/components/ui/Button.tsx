import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="text-green-400 text-xs font-semibold focus:outline-none hover:text-green-300"
      type="submit"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
