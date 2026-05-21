"use client";

import { useEffect, useState } from "react";

const plants = [
  { name: "Bamboo", threshold: 0, fact: "One of the fastest-growing plants." },
  { name: "Lavender", threshold: 300, fact: "Used for calm and relaxation." },
  { name: "Cherry Blossom", threshold: 800, fact: "Symbol of renewal." },
  { name: "Oak Tree", threshold: 1500, fact: "Represents long-term strength." }
];

export default function PlantsPage() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setXp(parsed.xp || 0);
    }
  }, []);

  const getStage = (threshold) => {
    const progress = xp - threshold;

    if (progress < 0) return "Seed 🌰";
    if (progress < 200) return "Sprout 🌱";
    if (progress < 500) return "Growing 🌿";
    return "Mature 🌳";
  };

  const getProgress = (threshold) => {
    const value = ((xp - threshold) / 500) * 100;
    return Math.max(0, Math.min(value, 100));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌱 Your Garden</h1>

      <p>XP: {xp}</p>

      {plants.map((plant, i) => (
        <div key={i} style={card}>
          <h2>{plant.name}</h2>
          <p>{plant.fact}</p>

          <p>
            Stage: <b>{getStage(plant.threshold)}</b>
          </p>

          <div style={barWrap}>
            <div
              style={{
                ...bar,
                width: `${getProgress(plant.threshold)}%`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#111",
  padding: 16,
  marginBottom: 12,
  borderRadius: 12
};

const barWrap = {
  height: 10,
  background: "#222",
  borderRadius: 10,
  overflow: "hidden",
  marginTop: 10
};

const bar = {
  height: "100%",
  background: "#1f6f4a"
};