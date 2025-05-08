"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../lib/service/login/loginService"; 

export default function LoginPage() {
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (isRegistering && !name)) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);

   
      if (isRegistering) {
        await register(email, password, name);
        const response = await login(email, password);
        localStorage.setItem("token", response.access_token);
        router.push("/tasks");
      } else {
        const response = await login(email, password);
        localStorage.setItem("token", response.access_token);
        router.push("/tasks");
      }
     
      setLoading(false);
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 rounded-md p-5 shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          {isRegistering ? "Create" : "Login"}
        </h2>
        <p className="text-gray-400 mb-4">
          {isRegistering ? "Create a new account" : "Login to your account"}
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {isRegistering && (
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <div className="flex items-center px-2 bg-gray-700 h-10 rounded-sm border-l-2 border-green-400">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-gray-700 placeholder-gray-500 text-white font-light focus:outline-none w-full py-2 pr-3"
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="flex items-center px-2 bg-gray-700 h-10 rounded-sm border-l-2 border-green-400">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="bg-gray-700 placeholder-gray-500 text-white font-light focus:outline-none w-full py-2 pr-3"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="flex items-center px-2 bg-gray-700 h-10 rounded-sm border-l-2 border-green-400">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="bg-gray-700 placeholder-gray-500 text-white font-light focus:outline-none w-full py-2 pr-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >  
          {loading ? "Loading..." : isRegistering ? "Register" : "Login"}

        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
            }}
            className="text-green-400 hover:underline px-2"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
