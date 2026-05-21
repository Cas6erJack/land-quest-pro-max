"use client";

import { useEffect, useState } from "react";

const defaultTasks = [
  { id: 1, title: "💰 Log savings today", xp: 50, coins: 10 },
  { id: 2, title: "💼 Complete a work shift", xp: 100, coins: 25 },
  { id: 3, title: "📊 Check your finances", xp: 30, coins: 5 }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("greenland_tasks");
    const savedTime = localStorage.getItem("greenland_tasks_time");

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!saved || !savedTime || now - savedTime > oneDay) {
      localStorage.setItem(
        "greenland_tasks",
        JSON.stringify(defaultTasks)
      );

      localStorage.setItem(
        "greenland_tasks_time",
        now
      );

      setTasks(defaultTasks);
    } else {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const completeTask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const updated = tasks.filter((t) => t.id !== taskId);

    setTasks(updated);

    localStorage.setItem(
      "greenland_tasks",
      JSON.stringify(updated)
    );

    const data = JSON.parse(
      localStorage.getItem("greenland")
    );

    const newData = {
      ...data,
      xp: (data.xp || 0) + task.xp,
      coins: (data.coins || 0) + task.coins
    };

    localStorage.setItem(
      "greenland",
      JSON.stringify(newData)
    );

    setMessage(
      `🎉 +${task.xp} XP, +${task.coins} coins`
    );

    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>📋 Daily Tasks</h1>

        <p style={{ opacity: 0.7 }}>
          Resets every 24 hours
        </p>
      </div>

      {message && (
        <div style={successBox}>
          {message}
        </div>
      )}

      {tasks.length === 0 ? (
        <div style={card}>
          🎉 All tasks completed for today
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} style={card}>
            <h2>{task.title}</h2>

            <p>⚡ +{task.xp} XP</p>
            <p>🪙 +{task.coins} Coins</p>

            <button
              onClick={() =>
                completeTask(task.id)
              }
            >
              Complete Task
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "#0f1715",
  padding: 16,
  marginBottom: 12,
  borderRadius: 16,
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const successBox = {
  background: "#173025",
  padding: 12,
  marginBottom: 12,
  borderRadius: 12,
  border:
    "1px solid rgba(255,255,255,0.05)"
};