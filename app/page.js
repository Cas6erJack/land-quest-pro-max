"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [coins, setCoins] = useState(0);
  const [vault, setVault] = useState(0);
  const [plants, setPlants] = useState({
    moneyTree: 35,
    hustleSprout: 25,
    disciplineFern: 15
  });

  const [log, setLog] = useState([]);

  const addLog = (t) => setLog((l) => [t, ...l.slice(0, 6)]); // keep it clean

  // 💾 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("greenland_real");
    if (saved) {
      const d = JSON.parse(saved);
      setCoins(d.coins || 0);
      setVault(d.vault || 0);
      setPlants(d.plants || plants);
      setLog(d.log || []);
    }
  }, []);

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_real",
      JSON.stringify({ coins, vault, plants, log })
    );
  }, [coins, vault, plants, log]);

  // 🌱 GROWTH ENGINE (soft + consistent)
  const grow = (amount) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amount, 100),
      hustleSprout: Math.min(p.hustleSprout + amount * 0.8, 100),
      disciplineFern: Math.min(p.disciplineFern + amount * 0.6, 100)
    }));
  };

  // 🚗 WORK (primary loop)
  const doWork = () => {
    setCoins((c) => c + 20);
    setVault((v) => v + 10);
    grow(15);
    addLog("Work completed — garden supported");
  };

  // 💰 SAVE OPTIONS (simple but meaningful)
  const saveSmall = () => {
    setCoins((c) => c + 10);
    setVault((v) => v + 5);
    grow(8);
    addLog("Small save added");
  };

  const saveStrong = () => {
    setCoins((c) => c + 30);
    setVault((v) => v + 20);
    grow(20);
    addLog("Strong save added");
  };

  // 🧘 DAILY CHECK-IN (retention hook)
  const checkIn = () => {
    setCoins((c) => c + 5);
    grow(5);
    addLog("Daily check-in complete");
  };

  return (
    <div style={styles.bg}>

      {/* 🟢 TOP STATUS */}
      <div style={styles.topCard}>
        <h2>🌿 Garden</h2>
        <p>🪙 Coins: {coins} • 💰 Vault: ${vault}</p>
        <p style={{ opacity: 0.7 }}>
          “Take care of your money, one day at a time.”
        </p>
      </div>

      {/* 🌱 GARDEN */}
      <div style={styles.card}>
        <h3>Your Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ⚡ ACTIONS */}
      <div style={styles.card}>
        <h3>Today</h3>

        <button style={styles.primary} onClick={doWork}>
          🚗 Work Completed
        </button>

        <button style={styles.secondary} onClick={saveSmall}>
          💰 Small Save
        </button>

        <button style={styles.secondary} onClick={saveStrong}>
          🏦 Strong Save
        </button>

        <button style={styles.soft} onClick={checkIn}>
          🔥 Daily Check-In
        </button>
      </div>

      {/* 📖 FEED (MINIMAL) */}
      <div style={styles.card}>
        <h3>Activity</h3>
        {log.length === 0 && (
          <p style={{ opacity: 0.5 }}>No activity yet today</p>
        )}

        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12, opacity: 0.85 }}>
            • {l}
          </div>
        ))}
      </div>

    </div>
  );
}

const Plant = ({ name, value }) => (
  <div style={{ marginBottom: 12 }}>
    <p style={{ marginBottom: 4 }}>{name}</p>
    <div style={styles.bar}>
      <div style={{ ...styles.fill, width: `${value}%` }} />
    </div>
    <p style={{ fontSize: 11, opacity: 0.6 }}>{Math.floor(value)}%</p>
  </div>
);

const styles = {
  bg: {
    background: "#070c0a",
    minHeight: "100vh",
    color: "white",
    padding: 16,
    fontFamily: "system-ui"
  },

  topCard: {
    background: "#0f1f18",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12
  },

  card: {
    background: "#0c1713",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12
  },

  primary: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#1f6f4a",
    color: "white",
    marginTop: 8
  },

  secondary: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: "#1f2d26",
    color: "white",
    marginTop: 8
  },

  soft: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #1f2d26",
    background: "transparent",
    color: "white",
    marginTop: 8
  },

  bar: {
    height: 10,
    background: "#1b2a23",
    borderRadius: 10,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)"
  }
};