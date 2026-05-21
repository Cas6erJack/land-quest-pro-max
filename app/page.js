"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [xp, setXp] = useState(0);
  const [vault, setVault] = useState(0);
  const [log, setLog] = useState([]);

  const [wifeXp, setWifeXp] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const GOAL = 5000;

  const level = useMemo(() => Math.floor(xp / 200) + 1, [xp]);

  const rank = useMemo(() => {
    if (level >= 13) return "🏆 Land Owner";
    if (level >= 9) return "🗺️ Land Seeker";
    if (level >= 6) return "🧱 Builder";
    if (level >= 3) return "⚒️ Grinder";
    return "🌱 Rookie";
  }, [level]);

  useEffect(() => {
    const saved = localStorage.getItem("greenland_mobile");
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setVault(data.vault || 0);
      setLog(data.log || []);
      setWifeXp(data.wifeXp || 0);
      setEnergy(data.energy ?? 100);
      setStreak(data.streak || 0);
      setLastCheckIn(data.lastCheckIn || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland_mobile",
      JSON.stringify({ xp, vault, log, wifeXp, energy, streak, lastCheckIn })
    );
  }, [xp, vault, log, wifeXp, energy, streak, lastCheckIn]);

  const addLog = (text) => setLog((l) => [text, ...l]);

  // 🚗 DoorDash shift
  const doDoorDash = () => {
    if (energy < 20) return;
    setEnergy((e) => e - 20);
    setXp((x) => x + 25);
    addLog("🚗 DoorDash shift completed (+25 XP)");
  };

  // 💰 Save money
  const saveMoney = () => {
    setXp((x) => x + 20);
    setVault((v) => v + 10);
    addLog("💰 Saved $10 (+XP + Vault)");
  };

  // 👩 Wife activity
  const wifeActivity = () => {
    setWifeXp((x) => x + 10);
    setXp((x) => x + 5);
    addLog("👩 Wife activity completed");
  };

  // 🔥 Check-in
  const checkIn = () => {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      setStreak((s) => s + 1);
      setEnergy(100);
      setLastCheckIn(today);
      setXp((x) => x + 10);
      addLog("🔥 Daily check-in completed");
    }
  };

  // 🚫 No spend
  const noSpend = () => {
    setXp((x) => x + 15);
    addLog("🚫 No-spend challenge completed");
  };

  const progress = Math.min((vault / GOAL) * 100, 100);

  return (
    <div style={styles.bg}>

      {/* TOP HUD */}
      <div style={styles.hud}>
        <div>🏷️ {rank}</div>
        <div>🔥 XP: {xp}</div>
        <div>⚡ Energy: {energy}</div>
        <div>💰 Vault: ${vault}</div>
        <div>⚡ Streak: {streak}</div>
      </div>

      {/* PROGRESS */}
      <div style={styles.card}>
        <div>🏁 Land Progress</div>
        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${progress}%` }} />
        </div>
      </div>

      {/* ACTION CARDS */}
      <div style={styles.card}>
        <h3>⚔️ Missions</h3>

        <button style={styles.btn} onClick={doDoorDash}>
          🚗 DoorDash Shift
        </button>

        <button style={styles.btn} onClick={saveMoney}>
          💰 Save Money
        </button>

        <button style={styles.btn} onClick={wifeActivity}>
          👩 Wife Activity
        </button>

        <button style={styles.btn} onClick={checkIn}>
          🔥 Daily Check-In
        </button>

        <button style={styles.btn} onClick={noSpend}>
          🚫 No-Spend Challenge
        </button>
      </div>

      {/* LOG */}
      <div style={styles.card}>
        <h3>📜 Activity Feed</h3>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12, opacity: 0.9 }}>
            • {l}
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "linear-gradient(#0b1220, #05070d)",
    minHeight: "100vh",
    color: "white",
    padding: 15,
    fontFamily: "Arial"
  },

  hud: {
    background: "#111827",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 13,
    display: "grid",
    gap: 4
  },

  card: {
    background: "#111827",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: "0 0 10px rgba(0,255,120,0.08)"
  },

  btn: {
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#1f2937",
    color: "white",
    fontSize: 14,
    cursor: "pointer"
  },

  bar: {
    height: 10,
    background: "#1f2937",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8
  },

  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #16a34a)"
  }
};