"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [xp, setXp] = useState(0);
  const [vault, setVault] = useState(0);
  const [log, setLog] = useState([]);

  const [streak, setStreak] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const [done, setDone] = useState({
    doordash: false,
    save: false,
    checkin: false
  });

  const GOAL = 5000;

  const level = useMemo(() => Math.floor(xp / 200) + 1, [xp]);

  useEffect(() => {
    const saved = localStorage.getItem("greenland_duocash");
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setVault(data.vault || 0);
      setLog(data.log || []);
      setStreak(data.streak || 0);
      setEnergy(data.energy ?? 100);
      setLastCheckIn(data.lastCheckIn || null);
      setDone(data.done || { doordash: false, save: false, checkin: false });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland_duocash",
      JSON.stringify({ xp, vault, log, streak, energy, lastCheckIn, done })
    );
  }, [xp, vault, log, streak, energy, lastCheckIn, done]);

  const addLog = (text) => setLog((l) => [text, ...l]);

  // 🚗 DOORDASH TASK
  const completeDoorDash = () => {
    if (done.doordash) return;
    if (energy < 20) return;

    setEnergy((e) => e - 20);
    setXp((x) => x + 50);
    setDone((d) => ({ ...d, doordash: true }));
    addLog("🚗 DoorDash completed (+50 XP)");
  };

  // 💰 SAVE MONEY TASK
  const completeSave = () => {
    if (done.save) return;

    setVault((v) => v + 10);
    setXp((x) => x + 20);
    setDone((d) => ({ ...d, save: true }));
    addLog("💰 Saved $10 (+Vault +XP)");
  };

  // 🔥 CHECK IN TASK
  const completeCheckIn = () => {
    const today = new Date().toDateString();
    if (done.checkin) return;

    if (lastCheckIn !== today) {
      setStreak((s) => s + 1);
      setEnergy(100);
      setXp((x) => x + 15);
      setLastCheckIn(today);
      setDone((d) => ({ ...d, checkin: true }));
      addLog("🔥 Daily check-in completed (+streak)");
    }
  };

  const resetDay = () => {
    setDone({ doordash: false, save: false, checkin: false });
  };

  const progress = Math.min((vault / GOAL) * 100, 100);

  return (
    <div style={styles.bg}>

      {/* TOP - DUOLINGO STYLE */}
      <div style={styles.top}>
        <h2>🌲 Greenland</h2>
        <p>Level {level} • Streak {streak} 🔥</p>
        <p>Energy: {energy}/100</p>
      </div>

      {/* DAILY TASKS */}
      <div style={styles.card}>
        <h3>📅 Today’s Tasks</h3>

        <button
          style={{ ...styles.btn, background: done.doordash ? "#14532d" : "#1f2937" }}
          onClick={completeDoorDash}
        >
          🚗 DoorDash Completed {done.doordash ? "✔" : "+50 XP"}
        </button>

        <button
          style={{ ...styles.btn, background: done.save ? "#14532d" : "#1f2937" }}
          onClick={completeSave}
        >
          💰 Save Money {done.save ? "✔" : "+Vault"}
        </button>

        <button
          style={{ ...styles.btn, background: done.checkin ? "#14532d" : "#1f2937" }}
          onClick={completeCheckIn}
        >
          🔥 Daily Check-In {done.checkin ? "✔" : "+Streak"}
        </button>