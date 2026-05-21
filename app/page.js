"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [saved, setSaved] = useState(0);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setSaved(parsed.saved || 0);
      setXp(parsed.xp || 0);
      setCoins(parsed.coins || 0);
      setLevel(parsed.level || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland",
      JSON.stringify({ saved, xp, coins, level })
    );
  }, [saved, xp, coins, level]);

  const calculateLevel = (xpValue) => Math.floor(xpValue / 500) + 1;

  const addSavings = (amount) => {
    const newSaved = saved + amount;
    const newXp = xp + amount * 10;
    const newCoins = coins + amount;
    const newLevel = calculateLevel(newXp);

    setSaved(newSaved);
    setXp(newXp);
    setCoins(newCoins);
    setLevel(newLevel);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌿 Greenland</h1>

      <div style={card}>
        <h2>💰 Savings</h2>
        <p>${saved}</p>
      </div>

      <div style={card}>
        <h2>⚡ XP</h2>
        <p>{xp}</p>
      </div>

      <div style={card}>
        <h2>🪙 Coins</h2>
        <p>{coins}</p>
      </div>

      <div style={card}>
        <h2>📈 Level</h2>
        <p>{level}</p>
      </div>

      <div style={card}>
        <h3>Add Savings</h3>
        <button onClick={() => addSavings(5)}>+ $5</button>
        <button onClick={() => addSavings(10)}>+ $10</button>
        <button onClick={() => addSavings(20)}>+ $20</button>
        <button onClick={() => addSavings(50)}>+ $50</button>
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