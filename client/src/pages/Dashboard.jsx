import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: { authorization: token }
    })
    .then(res => res.json())
    .then(data => setTasks(data));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {tasks.map(t => (
        <div key={t._id}>
          {t.title} - {t.status}
        </div>
      ))}
    </div>
  );
}