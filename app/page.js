"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  // 🌿 CORE STATE
  const [water, setWater] = useState(0);
  const [plants, setPlants] = useState({
    moneyTree: { growth: 0, unlocked: false },
    hustleSprout: { growth: 0, unlocked: false },
    disciplineFern: { growth: 0, unlocked: false }
  });

  const [log, setLog] = useState([]);

  const addLog = (text) => setLog((l) => [text, ...l]);

  // 🌿 LOAD SAVE
  useEffect(() => {
    const saved = localStorage.getItem("greenland_garden");
    if (saved) {
      const data = JSON.parse(saved);
      setWater(data.water || 0);
      setPlants(data.plants || plants);
      setLog(data.log || []);
    }
  }, []);

  // 🌿 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_garden",
      JSON.stringify({ water, plants, log })
    );
  }, [water, plants, log]);

  // 💧 HELPERS
  const growPlant = (key, amount) => {
    setPlants((p) => {
      const updated = { ...p };

      updated[key].growth += amount;

      // unlock at 100
      if (updated[key].growth >= 100) {
        updated[key].unlocked = true;
      }

      return updated;
    });
  };

  // 🚗 WORK = BIG WATER (ALL PLANTS)
  const doDoorDash = () => {
    setWater((w) => w + 1);

    setPlants((p) => {
      const updated = { ...p };
      Object.keys(updated).forEach((k) => {
        updated[k].growth += 15;
        if (updated[k].growth >= 100) updated[k].unlocked = true;
      });
      return updated;
    });

    addLog("🚗 You worked today — your garden was watered heavily");
  };

  // 💰 SAVE = MONEY TREE ONLY
  const saveMoney = () => {
    setWater((w) => w + 1);
    growPlant("moneyTree", 25);
    addLog("💰 You saved money — Money Tree watered");
  };

  // 🔥 CHECK-IN = DISCIPLINE BOOST
  const checkIn = () => {
    setWater((w) => w + 1);
    growPlant("disciplineFern", 20);
    addLog("🔥 Daily check-in — Discipline Fern gets sunlight");
  };

  // 🌿 HUSTLE BOOST (optional small action)
  const hustleBoost = () => {
    growPlant("hustleSprout", 15);
    addLog("⚡ Small hustle action completed");
  };

  const PlantCard = ({ name, plant, emoji, fact }) => {
    const stage =
      plant.growth < 25
        ? "🌰 Seed"
        : plant.growth < 50
        ? "🌱 Sprout"
        : plant.growth < 100
        ? "🌿 Growing"
        : "🌳 Fully Grown";

    return (
      <div style={styles.card}>
        <h3>
          {emoji} {name}
        </h3>
        <p>Stage: {stage}</p>

        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${plant.growth}%` }} />
        </div>

        {plant.unlocked && (
          <div style={styles.fact}>
            📖 {fact}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.bg}>
      <h2>🌱 Greenland Garden</h2>
      <p style={{ opacity: 0.7 }}>
        Take care of your financial garden. It grows with you.
      </p>

      {/* 🌿 PLANTS */}
      <PlantCard
        name="Money Tree"
        emoji="💰"
        plant={plants.moneyTree}
        fact="Small consistent savings grow stronger than random big wins."
      />

      <PlantCard
        name="Hustle Sprout"
        emoji="🚗"
        plant={plants.hustleSprout}
        fact="Consistency in work builds long-term financial stability."
      />

      <PlantCard
        name="Discipline Fern"
        emoji="🔥"
        plant={plants.disciplineFern}
        fact="Daily discipline matters more than motivation."
      />

      {/* 💧 ACTIONS */}
      <div style={styles.card}>
        <h3>💧 Care Actions</h3>

        <button style={styles.btn} onClick={doDoorDash}>
          🚗 DoorDash (Water All Plants)
        </button>

        <button style={styles.btn} onClick={saveMoney}>
          💰 Save Money (Money Tree)
        </button>

        <button style={styles.btn} onClick={checkIn}>
          🔥 Daily Check-In (Sunlight Boost)
        </button>

        <button style={styles.btn} onClick={hustleBoost}>
          ⚡ Small Hustle Action
        </button>
      </div>

      {/* 📖 COLLECTION FEED */}
      <div style={styles.card}>
        <h3>📜 Garden Activity</h3>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12 }}>
            • {l}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  bg: {
    background: "linear-gradient(#07130f, #050807)",
    minHeight: "100vh",
    color: "white",
    padding: 15,
    fontFamily: "Arial"
  },
  card: {
    background: "#0f1f18",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    boxShadow: "0 0 12px rgba(0,255,120,0.08)"
  },
  btn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#1f2d26",
    color: "white"
  },
  bar: {
    height: 10,
    background: "#1b2a23",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)"
  },
  fact: {
    marginTop: 10,
    fontSize: 12,
    opacity: 0.85,
    padding: 8,
    background: "#0b1511",
    borderRadius: 8
  }
};