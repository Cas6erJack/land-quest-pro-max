"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [saved, setSaved] = useState(0);
  const [streak, setStreak] = useState(0);
  const [log, setLog] = useState([]);

  const [plants, setPlants] = useState({
    moneyTree: 45,
    hustleSprout: 35,
    disciplineFern: 25
  });

  const addLog = (t) => setLog((l) => [t, ...l.slice(0, 6)]);

  useEffect(() => {
    const data = localStorage.getItem("greenland_premium");
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
      "greenland_premium",
      JSON.stringify({ saved, streak, plants, log })
    );
  }, [saved, streak, plants, log]);

  const grow = (amt) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amt, 100),
      hustleSprout: Math.min(p.hustleSprout + amt * 0.85, 100),
      disciplineFern: Math.min(p.disciplineFern + amt * 0.65, 100)
    }));
  };

  const work = () => {
    setSaved((s) => s + 10);
    setStreak((s) => s + 1);
    grow(16);
    addLog("Work completed");
  };

  const save = () => {
    setSaved((s) => s + 20);
    grow(12);
    addLog("Savings added");
  };

  const checkIn = () => {
    grow(6);
    addLog("Daily check-in");
  };

  const Plant = ({ name, value }) => (
    <div style={styles.plantCard}>
      <div style={styles.row}>
        <span style={styles.plantName}>{name}</span>
        <span style={styles.percent}>{Math.floor(value)}%</span>
      </div>

      <div style={styles.bar}>
        <div style={{ ...styles.fill, width: `${value}%` }} />
      </div>
    </div>
  );

  return (
    <div style={styles.bg}>

      {/* HEADER */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🌿 Greenland</h1>

        <div style={styles.stats}>
          <div>💰 Saved: ${saved}</div>
          <div>🔥 Streak: {streak}</div>
        </div>

        <p style={styles.subtitle}>
          Your financial life, growing one day at a time.
        </p>
      </div>

      {/* GARDEN */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ACTIONS */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Today</h3>

        <button style={styles.primary} onClick={work}>Work</button>
        <button style={styles.secondary} onClick={save}>Save</button>
        <button style={styles.soft} onClick={checkIn}>Check-in</button>
      </div>

      {/* ACTIVITY */}
      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Activity</h3>

        {log.length === 0 && (
          <p style={styles.muted}>No activity yet</p>
        )}

        {log.map((l, i) => (
          <div key={i} style={styles.log}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "#050A08",
    minHeight: "100vh",
    color: "white",
    padding: 20,
    fontFamily: "system-ui",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  hero: {
    width: "100%",
    maxWidth: 420,
    padding: 22,
    borderRadius: 22,
    background: "rgba(15, 31, 24, 0.55)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    marginBottom: 14
  },

  title: {
    fontSize: 22,
    marginBottom: 10
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    opacity: 0.8
  },

  subtitle: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.6
  },

  card: {
    width: "100%",
    maxWidth: 420,
    padding: 20,
    borderRadius: 22,
    background: "rgba(15, 31, 24, 0.45)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
    marginBottom: 14
  },

  sectionTitle: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 14
  },

  plantCard: {
    marginBottom: 14
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6
  },

  plantName: {
    fontSize: 14
  },

  percent: {
    fontSize: 12,
    opacity: 0.6
  },

  bar: {
    height: 10,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 999,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)",
    borderRadius: 999
  },

  primary: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#1f6f4a",
    color: "white",
    marginBottom: 10,
    fontWeight: 500
  },

  secondary: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    marginBottom: 10
  },

  soft: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "transparent",
    color: "white"
  },

  log: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6
  },

  muted: {
    fontSize: 12,
    opacity: 0.5
  }
};