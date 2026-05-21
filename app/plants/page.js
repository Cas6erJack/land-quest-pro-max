"use client";

import { useEffect, useState } from "react";
import { plantList } from "@/data/plants";

export default function PlantsPage() {
  const [xp, setXp] = useState(0);
  const [ownedSeeds, setOwnedSeeds] = useState([]);

  useEffect(() => {
    const game = localStorage.getItem("greenland");
    if (game) {
      const parsed = JSON.parse(game);
      setXp(parsed.xp || 0);
    }

    const seeds = localStorage.getItem("greenland_seeds");
    if (seeds) {
      setOwnedSeeds(JSON.parse(seeds));
    }
  }, []);

  const hasSeed = (seedId) => {
    return ownedSeeds.some((s) => s.id === seedId);
  };

  const getStage = (plant) => {
    const thresholds = plant.thresholds;

    if (xp < thresholds[0]) return "Seed 🌰";
    if (xp < thresholds[1]) return "Sprout 🌱";
    if (xp < thresholds[2]) return "Growing 🌿";
    if (xp < thresholds[3]) return "Mature 🌳";

    return "Flourishing 🌳✨";
  };

  const getProgress = (plant) => {
    const thresholds = plant.thresholds;
    let stageIndex = 0;

    for (let i = 0; i < thresholds.length; i++) {
      if (xp >= thresholds[i]) stageIndex = i;
    }

    const current = thresholds[stageIndex] || 0;
    const next = thresholds[stageIndex + 1] || current + 500;

    const progress = ((xp - current) / (next - current)) * 100;

    return Math.max(0, Math.min(progress, 100));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌱 Your Garden</h1>

      <p>⚡ XP: {xp}</p>

      {plantList.map((plant) => (
        <div key={plant.id} style={card}>
          <h2>
            {plant.name}{" "}
            {!hasSeed(plant.seedId) && (
              <span style={{ fontSize: 12 }}>🔒 Locked (no seed)</span>
            )}
          </h2>

          <p>{plant.fact}</p>

          <p>
            Stage: <b>{getStage(plant)}</b>
          </p>

          {!hasSeed(plant.seedId) ? (
            <p style={{ opacity: 0.6 }}>
              Buy this seed in the shop to grow it.
            </p>
          ) : (
            <>
              <div style={barWrap}>
                <div
                  style={{
                    ...bar,
                    width: `${getProgress(plant)}%`
                  }}
                />
              </div>
            </>
          )}
        </div>
      ))}
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