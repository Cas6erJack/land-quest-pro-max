"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [saved, setSaved] = useState(0);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);

  // Load saved data
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

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "greenland",
      JSON.stringify({ saved, xp, coins, level })
    );
  }, [saved, xp, coins, level]);

  // Level formula
  const calculateLevel = (xpValue) => {
    return Math.floor(xpValue / 500) + 1;
  };

  // Main game engine action
  const addSavings = (amount) => {
    setSaved((prevSaved) => {
      const newSaved = prevSaved + amount;

      const newXp = xp + amount * 10;
      const newCoins = coins + amount;
      const newLevel = calculateLevel(newXp);

      setXp(newXp);
      setCoins(newCoins);
      setLevel(newLevel);

      return newSaved;
    });
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
  background: "#0f1715",
  padding: 16,
  marginBottom: 12,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.05)"
};