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

    if (xp < thresholds[0]) return "🌰 Seed";
    if (xp < thresholds[1]) return "🌱 Sprout";
    if (xp < thresholds[2]) return "🌿 Growing";
    if (xp < thresholds[3]) return "🌳 Mature";

    return "✨ Flourishing";
  };

  const getProgress = (plant) => {
    const thresholds = plant.thresholds;

    let stageIndex = 0;

    for (let i = 0; i < thresholds.length; i++) {
      if (xp >= thresholds[i]) {
        stageIndex = i;
      }
    }

    const current = thresholds[stageIndex] || 0;
    const next = thresholds[stageIndex + 1] || current + 500;

    const progress =
      ((xp - current) / (next - current)) * 100;

    return Math.max(
      0,
      Math.min(progress, 100)
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>🌱 Garden</h1>

        <p
          style={{
            opacity: 0.7,
            marginTop: 4
          }}
        >
          Every dollar saved helps your garden grow.
        </p>
      </div>

      <div style={summaryCard}>
        <h2>⚡ Garden Energy</h2>
        <p>{xp} XP Collected</p>
      </div>

      {plantList.map((plant) => {
        const unlocked = hasSeed(plant.seedId);

        return (
          <div
            key={plant.id}
            style={card}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center"
              }}
            >
              <h2>{plant.name}</h2>

              <span>
                {unlocked
                  ? "🪴 Owned"
                  : "🔒 Locked"}
              </span>
            </div>

            <p
              style={{
                opacity: 0.8
              }}
            >
              {plant.fact}
            </p>

            {!unlocked ? (
              <div style={lockedBox}>
                Buy this seed in the shop
                to begin growing it.
              </div>
            ) : (
              <>
                <div
                  style={{
                    marginTop: 10
                  }}
                >
                  <strong>
                    {getStage(plant)}
                  </strong>
                </div>

                <div style={barWrap}>
                  <div
                    style={{
                      ...bar,
                      width: `${getProgress(
                        plant
                      )}%`
                    }}
                  />
                </div>

                <p
                  style={{
                    marginTop: 10,
                    opacity: 0.7
                  }}
                >
                  Growth:{" "}
                  {Math.floor(
                    getProgress(plant)
                  )}
                  %
                </p>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

const summaryCard = {
  background: "#12201c",
  padding: 16,
  marginBottom: 16,
  borderRadius: 20,
  border:
    "1px solid rgba(255,255,255,.05)"
};

const card = {
  background: "#0f1715",
  padding: 16,
  marginBottom: 14,
  borderRadius: 20,
  border:
    "1px solid rgba(255,255,255,.05)"
};

const lockedBox = {
  background: "#101413",
  padding: 12,
  borderRadius: 12,
  marginTop: 10,
  opacity: 0.7
};

const barWrap = {
  height: 12,
  background: "#1a2421",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 12
};

const bar = {
  height: "100%",
  background: "#7dd3a0",
  transition: "width .5s ease"
};