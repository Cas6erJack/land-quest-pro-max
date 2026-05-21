"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [saved, setSaved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [log, setLog] = useState([]);

  const [plants, setPlants] = useState({
    moneyTree: 40,
    hustleSprout: 30,
    disciplineFern: 20
  });

  const addLog = (t) => setLog((l) => [t, ...l.slice(0, 6)]);

  useEffect(() => {
    const data = localStorage.getItem("greenland_clean");
    if (data) {
      const d = JSON.parse(data);
      setSaved(d.saved || 0);
      setStreak(d.streak || 0);
      setPlants(d.plants || plants);
      setLog(d.log || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland_clean",
      JSON.stringify({ saved, streak, plants, log })
    );
  }, [saved, streak, plants, log]);

  const grow = (amt) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amt, 100),
      hustleSprout: Math.min(p.hustleSprout + amt * 0.8, 100),
      disciplineFern: Math.min(p.disciplineFern + amt * 0.6, 100)
    }));
  };

  const work = () => {
    setSaved((s) => s + 10);
    setStreak((s) => s + 1);
    grow(15);
    addLog("Worked today");
  };

  const save = () => {
    setSaved((s) => s + 20);
    grow(10);
    addLog("Saved money");
  };

  const checkIn = () => {
    grow(5);
    addLog("Checked in");
  };

  return (
    <div style={styles.bg}>

      {/* HERO */}
      <div style={styles.hero}>
        <h2>🌿 Greenland</h2>
        <p>💰 Saved: ${saved}</p>
        <p>🔥 Streak: {streak}</p>
        <div style={styles.miniText}>
          Keep it simple. Stay consistent.
        </div>
      </div>

      {/* GARDEN */}
      <div style={styles.section}>
        <h3>Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ACTIONS */}
      <div style={styles.section}>
        <h3>Today</h3>

        <button style={styles.primary} onClick={work}>Work</button>
        <button style={styles.secondary} onClick={save}>Save</button>
        <button style={styles.soft} onClick={checkIn}>Check-in</button>
      </div>

      {/* LOG */}
      <div style={styles.section}>
        <h3>Activity</h3>

        {log.map((l, i) => (
          <div key={i} style={styles.log}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const Plant = ({ name, value }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={styles.row}>
      <span>{name}</span>
      <span style={{ opacity: 0.6 }}>{Math.floor(value)}%</span>
    </div>
    <div style={styles.bar}>
      <div style={{ ...styles.fill, width: `${value}%` }} />
    </div>
  </div>
);

const styles = {
  bg: {
    background: "#070c0a",
    minHeight: "100vh",
    color: "white",
    padding: 20,
    fontFamily: "system-ui"
  },

  hero: {
    background: "#0f1f18",
    padding: 20,
    borderRadius: 16,
    marginBottom: 14
  },

  section: {
    background: "#0c1713",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 6
  },

  bar: {
    height: 10,
    background: "#1b2a23",
    borderRadius: 999,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)"
  },

  primary: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "#1f6f4a",
    color: "white",
    marginBottom: 8
  },

  secondary: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "#1f2d26",
    color: "white",
    marginBottom: 8
  },

  soft: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #1f2d26",
    background: "transparent",
    color: "white"
  },

  log: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6
  },

  miniText: {
    opacity: 0.6,
    fontSize: 12,
    marginTop: 8
  }
};