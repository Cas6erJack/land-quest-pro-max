"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [vault, setVault] = useState(0);
  const [log, setLog] = useState([]);

  const [streak, setStreak] = useState(0);

  const [plants, setPlants] = useState([
    { id: 1, name: "💰 Money Tree", progress: 40, note: "Savings build freedom over time", archived: false },
    { id: 2, name: "🚗 Hustle Sprout", progress: 30, note: "Consistency beats intensity", archived: false },
    { id: 3, name: "🔥 Discipline Fern", progress: 20, note: "Daily discipline creates stability", archived: false }
  ]);

  const [collection, setCollection] = useState([]);

  const addLog = (t) => setLog((l) => [t, ...l]);

  // 🌿 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("greenland_v3");
    if (saved) {
      const d = JSON.parse(saved);
      setVault(d.vault || 0);
      setLog(d.log || []);
      setStreak(d.streak || 0);
      setPlants(d.plants || plants);
      setCollection(d.collection || []);
    }
  }, []);

  // 🌿 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_v3",
      JSON.stringify({ vault, log, streak, plants, collection })
    );
  }, [vault, log, streak, plants, collection]);

  // 🌱 GROW PLANT
  const grow = (amount, type) => {
    setPlants((prev) => {
      let updated = prev.map((p) => {
        if (p.archived) return p;

        let boost = amount;

        if (type === "small") boost = 10;
        if (type === "standard") boost = 20;
        if (type === "strong") boost = 35;
        if (type === "nostreak") boost = 50;

        let newProgress = p.progress + boost;

        if (newProgress >= 100) {
          setCollection((c) => [
            {
              name: p.name,
              note: p.note,
              unlocked: new Date().toLocaleDateString()
            },
            ...c
          ]);

          addLog(`🌿 ${p.name} fully grown → moved to collection`);

          return { ...p, progress: 100, archived: true };
        }

        return { ...p, progress: newProgress };
      });

      return updated;
    });
  };

  // 🚗 WORK
  const doWork = () => {
    setVault((v) => v + 10);
    grow(25, "standard");
    addLog("🚗 Work completed — garden watered");
  };

  // 💰 SAVE OPTIONS
  const saveSmall = () => {
    setVault((v) => v + 5);
    grow(10, "small");
    addLog("🪙 Small save completed");
  };

  const saveStandard = () => {
    setVault((v) => v + 20);
    grow(20, "standard");
    addLog("💵 Standard save completed");
  };

  const saveStrong = () => {
    setVault((v) => v + 50);
    grow(35, "strong");
    addLog("🏦 Strong save completed");
  };

  const noSpend = () => {
    setVault((v) => v + 10);
    grow(50, "nostreak");
    addLog("🚫 No-spend win (rare growth boost)");
  };

  const checkIn = () => {
    setStreak((s) => s + 1);
    addLog("🔥 Daily check-in completed");
  };

  return (
    <div style={styles.bg}>

      {/* HEADER */}
      <div style={styles.card}>
        <h2>🌿 Greenland Garden</h2>
        <p>Streak: {streak} 🔥</p>
        <p>Vault: ${vault}</p>
      </div>

      {/* 🌱 ACTIVE GARDEN */}
      <div style={styles.card}>
        <h3>🌱 Your Garden</h3>

        {plants.filter(p => !p.archived).map((p) => (
          <div key={p.id} style={styles.plant}>
            <h4>{p.name}</h4>
            <div style={styles.bar}>
              <div style={{ ...styles.fill, width: `${p.progress}%` }} />
            </div>
            <p style={{ fontSize: 12, opacity: 0.7 }}>{p.progress}% grown</p>
          </div>
        ))}
      </div>

      {/* 💰 ACTIONS */}
      <div style={styles.card}>
        <h3>💰 Save Options</h3>

        <button style={styles.btn} onClick={saveSmall}>🪙 Small Save</button>
        <button style={styles.btn} onClick={saveStandard}>💵 Standard Save</button>
        <button style={styles.btn} onClick={saveStrong}>🏦 Strong Save</button>
        <button style={styles.btn} onClick={noSpend}>🚫 No-Spend Win</button>

        <button style={styles.btn2} onClick={doWork}>🚗 Work Shift</button>
        <button style={styles.btn2} onClick={checkIn}>🔥 Daily Check-In</button>
      </div>

      {/* 📖 COLLECTION */}
      <div style={styles.card}>
        <h3>📖 Garden Collection</h3>

        {collection.length === 0 && <p style={{ opacity: 0.6 }}>No plants fully grown yet</p>}

        {collection.map((c, i) => (
          <div key={i} style={styles.collectionCard}>
            <h4>{c.name}</h4>
            <p style={{ fontSize: 12 }}>{c.note}</p>
            <p style={{ fontSize: 11, opacity: 0.6 }}>Unlocked: {c.unlocked}</p>
          </div>
        ))}
      </div>

      {/* LOG */}
      <div style={styles.card}>
        <h3>📜 Activity Feed</h3>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12 }}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "linear-gradient(#071a12, #050807)",
    minHeight: "100vh",
    color: "white",
    padding: 15,
    fontFamily: "Arial"
  },
  card: {
    background: "#0f1f18",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    boxShadow: "0 0 15px rgba(0,255,120,0.08)"
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
    padding: 10,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#1f2d26",
    color: "white"
  },
  btn2: {
    width: "100%",
    padding: 10,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#0b3b2a",
    color: "white"
  },
  collectionCard: {
    background: "#0b1511",
    padding: 10,
    borderRadius: 10,
    marginTop: 8
  }
};