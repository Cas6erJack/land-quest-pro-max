"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [xp, setXp] = useState(0);
  const [wifeXp, setWifeXp] = useState(0);
  const [landFund, setLandFund] = useState(0);
  const [log, setLog] = useState([]);
  const goal = 5000;

  useEffect(() => {
    const saved = localStorage.getItem("landQuest");
    if (saved) {
      const data = JSON.parse(saved);
      setXp(data.xp || 0);
      setWifeXp(data.wifeXp || 0);
      setLandFund(data.landFund || 0);
      setLog(data.log || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "landQuest",
      JSON.stringify({ xp, wifeXp, landFund, log })
    );
  }, [xp, wifeXp, landFund, log]);

  const addLog = (text) => setLog((l) => [text, ...l]);

  const progress = Math.min((landFund / goal) * 100, 100);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>

      <h1>🌲 Land Quest PRO MAX</h1>

      <div style={{ background: "#1e293b", padding: 15, borderRadius: 10 }}>
        <p>🔥 You XP: {xp}</p>
        <p>👩 Wife XP: {wifeXp}</p>
        <p>💰 Land Fund: ${landFund}</p>
        <p>🎯 Goal: ${goal}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <p>📊 Progress</p>
        <div style={{ background: "#334155", height: 20, borderRadius: 10 }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "green",
              borderRadius: 10
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>⚡ Actions</h3>

        <button onClick={() => { setXp(xp + 10); addLog("DoorDash shift +10 XP"); }}>
          🚗 DoorDash Shift
        </button>

        <br /><br />

        <button onClick={() => { setLandFund(landFund + 20); addLog("Saved $20"); }}>
          💰 Save $20
        </button>

        <br /><br />

        <button onClick={() => { setWifeXp(wifeXp + 10); addLog("Wife action +10 XP"); }}>
          👩 Wife Action
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h3>📜 Log</h3>
        {log.map((l, i) => (
          <p key={i} style={{ fontSize: 12 }}>{l}</p>
        ))}
      </div>

    </div>
  );
  }
