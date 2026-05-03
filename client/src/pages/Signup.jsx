import { useState } from "react";
import API from "../api";

export default function Signup({ setPage }) {
  const [form, setForm] = useState({});

  const signup = async () => {
    await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setPage("login");
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200">
      <h1 className="text-center text-lg text-gray-500 mb-2">
        Team Task Manager
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📝 Create Account
        </h2>

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={signup}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Signup
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?
        </p>

        <button
          onClick={() => setPage("login")}
          className="w-full mt-2 border border-green-500 text-green-500 hover:bg-green-50 py-2 rounded-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
