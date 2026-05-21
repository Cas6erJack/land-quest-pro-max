"use client";

import { useEffect, useState } from "react";
import { plantList } from "@/data/plants";

export default function PlantsPage() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setXp(parsed.xp || 0);
    }
  }, []);

  const getStage = (plant) => {
    const progress = xp - plant.threshold;

    if (progress < 0) return "Seed";
    if (progress < 200) return "Sprout";
    if (progress < 500) return "Growing";
    return "Mature";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌱 Your Garden</h1>

      {plantList.map((plant) => (
        <div key={plant.id} style={card}>
          <h2>{plant.name}</h2>
          <p>{plant.fact}</p>

          <p>
            Stage: <b>{getStage(plant)}</b>
          </p>

          <div style={barWrap}>
            <div
              style={{
                ...bar,
                width: `${Math.min(
                  ((xp - plant.threshold) / 500) * 100,
                  100
                )}%`
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