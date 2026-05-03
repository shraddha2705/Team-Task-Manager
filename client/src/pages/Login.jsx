import { useState } from "react";
import API from "../api";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    setPage("dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <h1 className="text-center text-lg text-gray-500 mb-2">
        Team Task Manager
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          🔐 Login
        </h2>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="eg. - admin@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="eg. - admin123"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-500 mt-4">Don’t have an account?</p>

        <button
          onClick={() => setPage("signup")}
          className="w-full mt-2 border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded-lg transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
