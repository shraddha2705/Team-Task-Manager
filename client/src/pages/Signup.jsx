import { useState } from "react";
import API from "../api";

export default function Signup({ setPage }) {
  const [form, setForm] = useState({});

  const signup = async () => {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    // ✅ Small delay to avoid race condition
    setTimeout(() => {
      setPage("login");
    }, 500);
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200">
      <h1 className="text-center text-3xl bold underline text-gray-500 mb-2">
        Team Task Manager
      </h1>

      <div className="flex gap-10 items-center mt-10">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            📝 Create Account
          </h2>

          <p className="text-gray-500 text-sm mb-4 text-center">
            Create an account and select your role{" "}
            <strong>(Admin or Member)</strong>
          </p>

          <input
            className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Admin"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="admin@gmail.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="admin123"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
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

        <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg mb-4 text-sm inline-block h-max text-base">
          <p className="font-semibold mb-1">👋 Quick Start</p>
          <p>You can create a new account or use demo credentials:</p>

          <div className="mt-2">
            <p>
              <b>Admin:</b> admin@test.com / admin123
            </p>
            <p>
              <b>Member:</b> user@test.com / user123
            </p>
          </div>

          <p className="mt-2 text-gray-600">
            Admin can create/edit/delete projects. Members can only view and
            manage tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
