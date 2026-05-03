import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const token = localStorage.getItem("token");

  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const role = user?.role;

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

  const deleteProject = async (id) => {
    await fetch(`${API}/projects/${id}`, {
      method: "DELETE",
      headers: { authorization: token },
    });

    fetchProjects();
  };

  const editProject = async (id) => {
    const newName = prompt("Enter new project name");
    if (!newName) return;

    await fetch(`${API}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ name: newName }),
    });

    fetchProjects();
  };

  const updateTask = async (id, updates) => {
    await fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(updates),
    });

    fetchTasks();
  };

  const editTask = async (id) => {
    const newTitle = prompt("New task title");
    if (!newTitle) return;

    updateTask(id, { title: newTitle });
  };

  // 🔹 LOAD DATA
  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 pt-40 pb-40">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 relative">
        {/* 🔴 LOGOUT */}
        <button
          className="absolute top-6 right-6 bg-red-500 hover:bg-red-600 text-white text-base px-4 py-2 bold rounded-md"
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
              disabled={role !== "admin"}
              className={`flex-1 border p-2 rounded ${
                role !== "admin" ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <button
              disabled={role !== "admin"}
              className={`px-4 py-2 rounded text-white ${
                role !== "admin"
                  ? "bg-gray-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
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
                className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition"
              >
                <span>📁 {p.name}</span>

                {role === "admin" && (
                  <div className="flex gap-3">
                    {/* ✏️ EDIT */}
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm"
                      onClick={() => editProject(p._id)}
                    >
                      Edit
                    </button>

                    {/* 🗑 DELETE */}
                    <button
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => deleteProject(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
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

                  <div className="flex gap-2 items-center">
                    {/* 🔄 STATUS CHANGE */}
                    <select
                      value={t.status}
                      onChange={(e) =>
                        updateTask(t._id, { status: e.target.value })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>

                    {/* ✏️ EDIT */}
                    <button
                      className="text-blue-500 hover:text-blue-700 text-sm"
                      onClick={() => editTask(t._id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
