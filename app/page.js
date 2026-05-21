"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [momentum, setMomentum] = useState(0);
  const [vault, setVault] = useState(0);
  const [chronicle, setChronicle] = useState([]);

  const [coOpSync, setCoOpSync] = useState(0);
  const [drive, setDrive] = useState(100);
  const [streak, setStreak] = useState(0);
  const [lastFocus, setLastFocus] = useState(null);

  const GOAL = 5000;

  const level = useMemo(() => Math.floor(momentum / 200) + 1, [momentum]);

  const rank = useMemo(() => {
    if (level >= 13) return "🏆 Land Sovereign";
    if (level >= 9) return "🗺️ Territory Seeker";
    if (level >= 6) return "🧱 Builder";
    if (level >= 3) return "⚒️ Grinder";
    return "🌱 Starter";
  }, [level]);

  useEffect(() => {
    const saved = localStorage.getItem("greenland_save");
    if (saved) {
      const data = JSON.parse(saved);
      setMomentum(data.momentum || 0);
      setVault(data.vault || 0);
      setChronicle(data.chronicle || []);
      setCoOpSync(data.coOpSync || 0);
      setDrive(data.drive ?? 100);
      setStreak(data.streak || 0);
      setLastFocus(data.lastFocus || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland_save",
      JSON.stringify({ momentum, vault, chronicle, coOpSync, drive, streak, lastFocus })
    );
  }, [momentum, vault, chronicle, coOpSync, drive, streak, lastFocus]);

  const addChronicle = (text) => setChronicle((c) => [text, ...c]);

  const grindRun = () => {
    if (drive < 20) return;
    setDrive((d) => d - 20);
    setMomentum((m) => m + 25);
    addChronicle("🚗 Grind Run completed (+Momentum, -Drive)");
  };

  const vaultDeposit = (amount = 10) => {
    setMomentum((m) => m + amount * 2);
    setVault((v) => v + amount);
    addChronicle(`💰 Vault Deposit +$${amount}`);
  };

  const coOpAction = () => {
    setCoOpSync((c) => c + 10);
    setMomentum((m) => m + 5);
    addChronicle("👥 Co-op Sync boosted");
  };

  const dailyFocus = () => {
    const today = new Date().toDateString();
    if (lastFocus !== today) {
      setStreak((s) => s + 1);
      setDrive(100);
      setLastFocus(today);
      setMomentum((m) => m + 10);
      addChronicle("🔥 Daily Focus Ritual completed");
    }
  };

  const freezeChallenge = () => {
    setMomentum((m) => m + 15);
    addChronicle("❄️ Freeze Challenge completed");
  };

  const progress = Math.min((vault / GOAL) * 100, 100);

  return (
    <div style={styles.bg}>

      <h1 style={styles.title}>🌲 GREENLAND</h1>
      <p style={styles.sub}>The Land Builder Game</p>

      {/* STATS PANEL */}
      <div style={styles.panel}>
        <p>🏷️ Rank: {rank}</p>
        <p>📈 Level: {level}</p>
        <p>⚡ Drive: {drive}/100</p>
        <p>🔥 Momentum: {momentum}</p>
        <p>👥 Co-op Sync: {coOpSync}</p>
        <p>💰 Land Vault: ${vault}</p>
        <p>⚡ Streak: {streak}</p>
      </div>

      {/* PROGRESS BAR */}
      <div style={styles.barWrap}>
        <div style={styles.barLabel}>🏁 Land Progress</div>
        <div style={styles.bar}>
          <div style={{ ...styles.fill, width: `${progress}%` }} />
        </div>
      </div>

      {/* ACTIONS */}
      <div style={styles.panel}>
        <h3>⚔️ Actions</h3>

        <button style={styles.btn} onClick={grindRun}>🚗 Grind Run</button>
        <button style={styles.btn} onClick={() => vaultDeposit(10)}>💰 Vault Deposit</button>
        <button style={styles.btn} onClick={coOpAction}>👥 Co-op Sync</button>
        <button style={styles.btn} onClick={dailyFocus}>🔥 Daily Focus Ritual</button>
        <button style={styles.btn} onClick={freezeChallenge}>❄️ Freeze Challenge</button>
      </div>

      {/* CHRONICLE */}
      <div style={styles.panel}>
        <h3>📜 Chronicle</h3>
        {chronicle.map((c, i) => (
          <div key={i} style={{ fontSize: 12, opacity: 0.9 }}>• {c}</div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  bg: {
    background: "linear-gradient(#0b1220, #05070d)",
    color: "white",
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Arial"
  },
  title: {
    fontSize: 28,
    marginBottom: 0
  },
  sub: {
    opacity: 0.7,
    marginBottom: 20
  },
  panel: {
    background: "#111827",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    boxShadow: "0 0 10px rgba(0,255,100,0.1)"
  },
  btn: {
    display: "block",
    width: "100%",
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#1f2937",
    color: "white",
    cursor: "pointer"
  },
  barWrap: {
    marginBottom: 15
  },
  barLabel: {
    marginBottom: 5
  },
  bar: {
    height: 12,
    background: "#1f2937",
    borderRadius: 10,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #22c55e, #16a34a)"
  }
};