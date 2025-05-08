import React from "react";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-60 transition-opacity duration-300"
        onClick={onCancel}
      />
      <div className="relative z-10 bg-white p-4 rounded-lg shadow-lg w-full max-w-sm mx-auto animate-fadeIn">
        <div className="flex gap-2  mb-4">
          <svg
            className="w-6 h-6 text-orange-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 ">
            <span className="text-gray-900">Warning!</span>
          </h2>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-3 py-[2px] rounded mr-2 hover:bg-red-600 transition duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-3 py-[2px] rounded hover:bg-gray-400 transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
