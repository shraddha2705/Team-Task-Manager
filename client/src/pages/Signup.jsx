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
    <div>
      <h2>Signup</h2>
      <input
        placeholder="name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
