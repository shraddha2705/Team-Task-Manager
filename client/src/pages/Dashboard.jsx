import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const token = localStorage.getItem("token");

  // 🔹 FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: { authorization: token },
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("TASK ERROR:", text);
      return;
    }

    const data = await res.json();
    setTasks(data || []);
  };

  // 🔹 CREATE TASK
  const createTask = async () => {
    if (!title) {
      alert("Enter task title");
      return;
    }

    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        title,
        status,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("CREATE TASK ERROR:", text);
      return;
    }

    setTitle("");
    setStatus("todo");
    fetchTasks();
  };

  // 🔹 FETCH PROJECTS
  const fetchProjects = async () => {
    const res = await fetch(`${API}/projects`, {
      headers: { authorization: token },
    });

    if (!res.ok) {
      const text = await res.text();
      console.log("PROJECT ERROR:", text);
      return;
    }

    const data = await res.json();
    setProjects(data || []);
  };

  // 🔹 CREATE PROJECT
  const createProject = async () => {
    if (!projectName) {
      alert("Enter project name");
      return;
    }

    const res = await fetch(`${API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ name: projectName }),
    });

    if (!res.ok) {
      const text = await res.text();
      alert(text); // shows "Admins only"
      return;
    }

    setProjectName("");
    fetchProjects();
  };

  // 🔹 LOAD DATA
  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="text-red-500 text-2xl">Tailwind Working?</div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 relative">
        {/* 🔴 LOGOUT */}
        <button
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>

        {/* 🧠 TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🚀 Team Task Manager
        </h1>

        {/* 📁 PROJECT SECTION */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Projects</h2>

          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-400 p-2 rounded-md outline-none"
              placeholder="Enter project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
              onClick={createProject}
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {projects.length === 0 && (
              <p className="text-gray-400 text-sm">No projects yet</p>
            )}

            {projects.map((p) => (
              <div
                key={p._id}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition"
              >
                📁 {p.name}
              </div>
            ))}
          </div>
        </div>

        {/* 📋 TASK SECTION */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Tasks</h2>

          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 border border-gray-300 focus:ring-2 focus:ring-green-400 p-2 rounded-md outline-none"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              className="border border-gray-300 p-2 rounded-md"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
              onClick={createTask}
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 && (
              <p className="text-gray-400 text-sm">No tasks yet</p>
            )}

            {tasks.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm"
              >
                <span className="text-gray-800">{t.title}</span>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    t.status === "done"
                      ? "bg-green-200 text-green-800"
                      : t.status === "in-progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
