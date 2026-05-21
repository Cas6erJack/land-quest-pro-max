"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [plants, setPlants] = useState({
    moneyTree: 30,
    hustleSprout: 25,
    disciplineFern: 15
  });

  const [log, setLog] = useState([]);
  const [streak, setStreak] = useState(0);

  const addLog = (t) => setLog((l) => [t, ...l.slice(0, 8)]);

  // 💾 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("greenland_product");
    if (saved) {
      const d = JSON.parse(saved);
      setPlants(d.plants || plants);
      setLog(d.log || []);
      setStreak(d.streak || 0);
    }
  }, []);

  // 💾 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_product",
      JSON.stringify({ plants, log, streak })
    );
  }, [plants, log, streak]);

  // 🌱 CORE GROWTH ENGINE
  const grow = (amount) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amount, 100),
      hustleSprout: Math.min(p.hustleSprout + amount, 100),
      disciplineFern: Math.min(p.disciplineFern + amount, 100)
    }));
  };

  // 🚗 WORK
  const didWork = () => {
    grow(18);
    setStreak((s) => s + 1);
    addLog("🚗 Worked today — progress made");
  };

  // 💰 SAVE
  const didSave = () => {
    grow(12);
    addLog("💰 Saved money today");
  };

  // 🔥 CHECK-IN
  const didCheckIn = () => {
    grow(6);
    addLog("🔥 Daily check-in complete");
  };

  const Plant = ({ name, value }) => (
    <div style={styles.plant}>
      <p>{name}</p>
      <div style={styles.bar}>
        <div style={{ ...styles.fill, width: `${value}%` }} />
      </div>
      <p style={{ fontSize: 12, opacity: 0.6 }}>{Math.floor(value)}%</p>
    </div>
  );

  return (
    <div style={styles.bg}>

      {/* HEADER */}
      <div style={styles.card}>
        <h2>🌿 Greenland</h2>
        <p>Streak: {streak} 🔥</p>
        <p style={{ opacity: 0.7 }}>
          Take care of your financial habits daily.
        </p>
      </div>

      {/* PLANTS */}
      <div style={styles.card}>
        <h3>Today’s Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ACTIONS */}
      <div style={styles.card}>
        <h3>Today</h3>

        <button style={styles.btn} onClick={didWork}>
          🚗 I Worked Today
        </button>

        <button style={styles.btn} onClick={didSave}>
          💰 I Saved Money
        </button>

        <button style={styles.btn} onClick={didCheckIn}>
          🔥 Daily Check-In
        </button>
      </div>

      {/* LOG */}
      <div style={styles.card}>
        <h3>Activity</h3>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12 }}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "#070c0a",
    minHeight: "100vh",
    color: "white",
    padding: 16,
    fontFamily: "system-ui"
  },
  card: {
    background: "#0f1f18",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12
  },
  plant: {
    marginBottom: 12
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
  },
  btn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#1f2d26",
    color: "white"
  }
};