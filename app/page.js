"use client";

import { useEffect, useState } from "react";

export default function Page() {
  // 🌿 CORE
  const [vault, setVault] = useState(0);
  const [log, setLog] = useState([]);

  const [streak, setStreak] = useState(0);
  const [weather, setWeather] = useState("☀️ Stable");

  const [plants, setPlants] = useState({
    moneyTree: 40,
    hustleSprout: 30,
    disciplineFern: 20
  });

  const [inventory, setInventory] = useState([]);

  const addLog = (t) => setLog((l) => [t, ...l]);

  // 🌿 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("greenland_v2");
    if (saved) {
      const d = JSON.parse(saved);
      setVault(d.vault || 0);
      setLog(d.log || []);
      setStreak(d.streak || 0);
      setPlants(d.plants || plants);
      setInventory(d.inventory || []);
      setWeather(d.weather || "☀️ Stable");
    }
  }, []);

  // 🌿 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_v2",
      JSON.stringify({ vault, log, streak, plants, inventory, weather })
    );
  }, [vault, log, streak, plants, inventory, weather]);

  // 🌧️ WEATHER LOGIC
  const updateWeather = () => {
    if (streak >= 7) setWeather("☀️ Stable");
    else if (streak >= 3) setWeather("🌤️ Building");
    else setWeather("🌧️ Struggling");
  };

  // 🌿 SEED DROP SYSTEM
  const dropSeed = () => {
    const seeds = ["Emergency Lily", "Focus Vine", "Wealth Orchid"];
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    setInventory((i) => [...i, seed]);
    addLog(`🌰 Seed Pack unlocked: ${seed}`);
  };

  // 🚗 WORK
  const doWork = () => {
    setPlants((p) => ({
      moneyTree: p.moneyTree + 15,
      hustleSprout: p.hustleSprout + 15,
      disciplineFern: p.disciplineFern + 10
    }));

    setVault((v) => v + 10);
    addLog("🚗 Work completed — garden watered");

    dropSeed();
    updateWeather();
  };

  // 💰 SAVE
  const saveMoney = () => {
    setPlants((p) => ({
      ...p,
      moneyTree: p.moneyTree + 25
    }));

    setVault((v) => v + 10);
    addLog("💰 Savings added — Money Tree boosted");

    dropSeed();
    updateWeather();
  };

  // 🔥 CHECK-IN
  const checkIn = () => {
    setStreak((s) => s + 1);
    setWeather("☀️ Stable");
    addLog("🔥 Daily check-in completed");
    updateWeather();
  };

  // 🌱 PLANT RENDER
  const Plant = ({ name, value }) => {
    const stage =
      value < 30 ? "🌰 Seed" :
      value < 60 ? "🌱 Growing" :
      value < 100 ? "🌿 Strong" :
      "🌳 Thriving";

    return (
      <div style={styles.card}>
        <h3>{name}</h3>
        <p>{stage}</p>
        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${value}%` }} />
        </div>
      </div>
    );
  };

  return (
    <div style={styles.bg}>

      {/* 🌿 HEADER */}
      <div style={styles.card}>
        <h2>🌱 Greenland Garden</h2>
        <p>Weather: {weather}</p>
        <p>Streak: {streak} 🔥</p>
        <p>Vault: ${vault}</p>
      </div>

      {/* 🌿 ZONE: BACKYARD */}
      <div style={styles.zone}>
        <h3>🏡 Backyard</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* 💧 ACTIONS */}
      <div style={styles.card}>
        <h3>💧 Care Actions</h3>

        <button style={styles.btn} onClick={doWork}>
          🚗 Work Shift (Water Garden)
        </button>

        <button style={styles.btn} onClick={saveMoney}>
          💰 Save Money (Boost Growth)
        </button>

        <button style={styles.btn} onClick={checkIn}>
          🔥 Daily Check-In
        </button>
      </div>

      {/* 🌰 INVENTORY */}
      <div style={styles.card}>
        <h3>🌰 Seed Packs</h3>
        {inventory.length === 0 && <p>No seeds yet</p>}
        {inventory.map((s, i) => (
          <div key={i}>• {s}</div>
        ))}
      </div>

      {/* 📜 LOG */}
      <div style={styles.card}>
        <h3>📜 Garden Log</h3>
        {log.map((l, i) => (
          <div key={i}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "#07130f",
    minHeight: "100vh",
    color: "white",
    padding: 15,
    fontFamily: "Arial"
  },
  card: {
    background: "#0f1f18",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12
  },
  zone: {
    marginBottom: 15
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
  }
};