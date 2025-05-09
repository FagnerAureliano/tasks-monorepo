"use client";

import { useLogout } from "@/app/lib/auth/useLogout";

type NavbarProps = {
  userName: string;
};

export default function Navbar({ userName }: NavbarProps) {
  const logout = useLogout();

  return (
    <nav className="bg-auto text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">Hello,  {userName || 'usuário'}!</div>
      <button
        className="flex cursor-pointer items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-[4px] pl-3 pr-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
        onClick={logout}
        aria-label="Logout dsystem"
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="none"
          viewBox="0 0 22 22"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
          />
        </svg>

        <span>Exit</span>
      </button>
    </nav>
  );
}
