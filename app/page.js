
"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [saved, setSaved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setSaved(parsed.saved || 0);
      setStreak(parsed.streak || 0);
      setXp(parsed.xp || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland",
      JSON.stringify({ saved, streak, xp })
    );
  }, [saved, streak, xp]);

  const addMoney = (amount) => {
    setSaved((s) => s + amount);
    setXp((x) => x + amount * 10);
    setStreak((s) => s + 1);
  };

  return (
    <div>
      <h1>🌿 Greenland</h1>

      <div style={card}>
        <h2>💰 Saved</h2>
        <p style={{ fontSize: 24 }}>${saved}</p>
      </div>

      <div style={card}>
        <h2>🔥 Streak</h2>
        <p>{streak} days</p>
      </div>

      <div style={card}>
        <h2>⚡ XP</h2>
        <p>{xp}</p>
      </div>

      <div style={card}>
        <h3>Add Savings</h3>
        <button onClick={() => addMoney(10)}>+ $10</button>
        <button onClick={() => addMoney(20)}>+ $20</button>
        <button onClick={() => addMoney(50)}>+ $50</button>
      </div>
    </div>
  );
}

const card = {
  background: "#111",
  padding: 16,
  marginBottom: 12,
  borderRadius: 12
};