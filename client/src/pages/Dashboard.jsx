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
    <div>
      <h2>Dashboard</h2>

      {/* 🔥 PROJECT SECTION */}
      <h3>Create Project</h3>

      <input
        placeholder="Project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <button onClick={createProject}>Create Project</button>

      <h4>Projects:</h4>
      {projects.length === 0 && <p>No projects yet</p>}
      {projects.map((p) => (
        <div key={p._id}>{p.name}</div>
      ))}

      <hr />

      {/* 🔥 TASK SECTION */}
      <h3>Create Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button onClick={createTask}>Add Task</button>

      <h4>Tasks:</h4>
      {tasks.length === 0 && <p>No tasks yet</p>}
      {tasks.map((t) => (
        <div key={t._id}>
          {t.title} - {t.status}
        </div>
      ))}
    </div>
  );
}
