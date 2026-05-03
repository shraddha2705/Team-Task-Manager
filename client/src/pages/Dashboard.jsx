import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/tasks`, {
      headers: { authorization: token },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.log("ERROR:", text);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        console.log("TASKS:", data);
        setTasks(data || []);
      })
      .catch((err) => console.log("FETCH ERROR:", err));
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {Array.isArray(tasks) && tasks.length === 0 && <p>No tasks yet</p>}

      {Array.isArray(tasks) &&
        tasks.map((t) => (
          <div key={t._id}>
            {t.title} - {t.status}
          </div>
        ))}
    </div>
  );
}
