"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [xp, setXp] = useState(0);
  const [landFund, setLandFund] = useState(0);
  const [log, setLog] = useState([]);

  const [wifeXp, setWifeXp] = useState(0);
  const [energy, setEnergy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState(null);

  const LAND_GOAL = 5000;

  const level = useMemo(() => Math.floor(xp / 200) + 1, [xp]);

  const title = useMemo(() => {
    if (level >= 13) return "Land Owner (Locked In)";
    if (level >= 9) return "Land Seeker";
    if (level >= 6) return "Builder";
    if (level >= 3) return "Grinder";
    return "Rookie Hustler";
  }, [level]);

  useEffect(() => {
    const saved = localStorage.getItem("landQuestRPG");
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setLandFund(data.landFund || 0);
      setLog(data.log || []);
      setWifeXp(data.wifeXp || 0);
      setEnergy(data.energy ?? 100);
      setStreak(data.streak || 0);
      setLastCheckIn(data.lastCheckIn || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "landQuestRPG",
      JSON.stringify({ xp, landFund, log, wifeXp, energy, streak, lastCheckIn })
    );
  }, [xp, landFund, log, wifeXp, energy, streak, lastCheckIn]);

  const addLog = (text) => setLog((l) => [text, ...l]);

  const doDoorDash = () => {
    if (energy < 20) return;
    setEnergy((e) => e - 20);
    setXp((x) => x + 25);
    addLog("🚗 DoorDash completed (+25 XP, -20 Energy)");
  };

  const saveMoney = (amount = 10) => {
    setXp((x) => x + amount * 2);
    setLandFund((f) => f + amount);
    addLog(`💰 Saved $${amount}`);
  };

  const wifeAction = () => {
    setWifeXp((x) => x + 10);
    setXp((x) => x + 5);
    addLog("👩 Wife action completed");
  };

  const checkIn = () => {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
      setStreak((s) => s + 1);
      setEnergy(100);
      setLastCheckIn(today);
      setXp((x) => x + 10);
      addLog("🔥 Daily check-in (+streak + energy refill)");
    }
  };

  const noSpend = () => {
    setXp((x) => x + 15);
    addLog("🚫 No-spend challenge completed");
  };

  const progress = Math.min((landFund / LAND_GOAL) * 100, 100);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto", fontFamily: "Arial" }}>
      <h1>🌲 Land Quest 2.0</h1>

      <p><b>Rank:</b> {title}</p>
      <p><b>Level:</b> {level}</p>

      <div style={{ background: "#111", color: "#fff", padding: 10, borderRadius: 10 }}>
        <p>🔥 XP: {xp}</p>
        <p>👩 Wife XP: {wifeXp}</p>
        <p>⚡ Energy: {energy}/100</p>
        <p>💰 Land Fund: ${landFund}</p>
        <p>⚡ Streak: {streak}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <p>🌲 Land Progress</p>
        <div style={{ background: "#333", height: 20 }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "green" }} />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>⚡ Actions</h3>

        <button onClick={doDoorDash}>🚗 DoorDash</button><br /><br />
        <button onClick={() => saveMoney(10)}>💰 Save $10</button><br /><br />
        <button onClick={wifeAction}>👩 Wife Action</button><br /><br />
        <button onClick={checkIn}>🔥 Daily Check-In</button><br /><br />
        <button onClick={noSpend}>🚫 No-Spend Challenge</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>📜 Log</h3>
        {log.map((l, i) => (
          <div key={i}>• {l}</div>
        ))}
      </div>
    </div>
  );
}