"use client";

import { useEffect, useState } from "react";

const defaultTasks = [
  { id: 1, title: "Log savings today", xp: 50, coins: 10 },
  { id: 2, title: "Complete a work shift", xp: 100, coins: 25 },
  { id: 3, title: "Check your finances", xp: 30, coins: 5 }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [lastReset, setLastReset] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("greenland_tasks");
    const savedTime = localStorage.getItem("greenland_tasks_time");

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // RESET EVERY 24 HOURS
    if (!saved || !savedTime || now - savedTime > oneDay) {
      localStorage.setItem("greenland_tasks", JSON.stringify(defaultTasks));
      localStorage.setItem("greenland_tasks_time", now);

      setTasks(defaultTasks);
      setLastReset(now);
    } else {
      setTasks(JSON.parse(saved));
      setLastReset(Number(savedTime));
    }
  }, []);

  const completeTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);

    localStorage.setItem("greenland_tasks", JSON.stringify(updatedTasks));

    const data = JSON.parse(localStorage.getItem("greenland"));

    const task = tasks.find((t) => t.id === taskId);

    const newData = {
      ...data,
      xp: (data.xp || 0) + task.xp,
      coins: (data.coins || 0) + task.coins,
      saved: data.saved || 0
    };

    localStorage.setItem("greenland", JSON.stringify(newData));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 Daily Tasks</h1>

      <p>⏳ Resets every 24 hours</p>

const card = {
  background: "#0f1715",
  padding: 16,
  marginBottom: 12,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.05)"
};