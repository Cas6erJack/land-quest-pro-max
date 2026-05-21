"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [plants, setPlants] = useState({
    moneyTree: 35,
    hustleSprout: 25,
    disciplineFern: 15
  });

  const [log, setLog] = useState([]);
  const [streak, setStreak] = useState(0);

  const addLog = (t) => setLog((l) => [t, ...l.slice(0, 8)]);

  useEffect(() => {
    const saved = localStorage.getItem("greenland_ui");
    if (saved) {
      const d = JSON.parse(saved);
      setPlants(d.plants || plants);
      setLog(d.log || []);
      setStreak(d.streak || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland_ui",
      JSON.stringify({ plants, log, streak })
    );
  }, [plants, log, streak]);

  const grow = (amount) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amount, 100),
      hustleSprout: Math.min(p.hustleSprout + amount * 0.9, 100),
      disciplineFern: Math.min(p.disciplineFern + amount * 0.7, 100)
    }));
  };

  const work = () => {
    grow(18);
    setStreak((s) => s + 1);
    addLog("Worked today — progress added");
  };

  const save = () => {
    grow(12);
    addLog("Saved money today");
  };

  const checkIn = () => {
    grow(6);
    addLog("Daily check-in complete");
  };

  const Plant = ({ name, value }) => (
    <div style={styles.plantCard}>
      <div style={styles.plantHeader}>
        <span>{name}</span>
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
      <div style={styles.header}>
        <h1>🌿 Greenland</h1>
        <div style={styles.badge}>🔥 Streak {streak}</div>
        <p style={styles.subtitle}>
          Take care of your financial garden, one day at a time.
        </p>
      </div>

      {/* PLANTS */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ACTIONS */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Today</h3>

        <div style={styles.buttonRow}>
          <button style={styles.buttonPrimary} onClick={work}>
            🚗 Work
          </button>

          <button style={styles.buttonSecondary} onClick={save}>
            💰 Save
          </button>

          <button style={styles.buttonSoft} onClick={checkIn}>
            🔥 Check-in
          </button>
        </div>
      </div>

      {/* ACTIVITY */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Activity</h3>

        <div style={styles.feed}>
          {log.length === 0 && (
            <p style={{ opacity: 0.5 }}>No activity yet</p>
          )}

          {log.map((l, i) => (
            <div key={i} style={styles.feedItem}>
              • {l}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "linear-gradient(180deg, #050a08, #07130f)",
    minHeight: "100vh",
    color: "white",
    padding: 18,
    fontFamily: "system-ui"
  },

  header: {
    padding: 18,
    borderRadius: 18,
    background: "rgba(15, 31, 24, 0.7)",
    backdropFilter: "blur(10px)",
    marginBottom: 14,
    textAlign: "center"
  },

  subtitle: {
    opacity: 0.7,
    fontSize: 13,
    marginTop: 6
  },

  badge: {
    display: "inline-block",
    marginTop: 8,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#123524",
    fontSize: 12
  },

  section: {
    background: "#0c1713",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)"
  },

  sectionTitle: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12
  },

  plantCard: {
    marginBottom: 14
  },

  plantHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    marginBottom: 6
  },

  percent: {
    opacity: 0.6,
    fontSize: 12
  },

  bar: {
    height: 10,
    background: "#1b2a23",
    borderRadius: 999,
    overflow: "hidden"
  },

  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)",
    borderRadius: 999
  },

  buttonRow: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  buttonPrimary: {
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#1f6f4a",
    color: "white",
    fontWeight: 600
  },

  buttonSecondary: {
    padding: 14,
    borderRadius: 14,
    border: "none",
    background: "#1f2d26",
    color: "white"
  },

  buttonSoft: {
    padding: 14,
    borderRadius: 14,
    border: "1px solid #1f2d26",
    background: "transparent",
    color: "white"
  },

  feed: {
    fontSize: 12,
    opacity: 0.8
  },

  feedItem: {
    marginBottom: 6
  }
};