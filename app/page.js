"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const LAND_GOAL = 15000;

  const [saved, setSaved] = useState(0);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);

  const [streak, setStreak] = useState(0);
  const [lastActive, setLastActive] = useState(null);

  const getToday = () => new Date().toDateString();

  useEffect(() => {
    const data = localStorage.getItem("greenland");

    if (data) {
      const parsed = JSON.parse(data);

      setSaved(parsed.saved || 0);
      setXp(parsed.xp || 0);
      setCoins(parsed.coins || 0);
      setLevel(parsed.level || 1);
      setStreak(parsed.streak || 0);
      setLastActive(parsed.lastActive || null);

      const today = getToday();

      if (parsed.lastActive) {
        const diff =
          new Date(today) - new Date(parsed.lastActive);

        const days = diff / (1000 * 60 * 60 * 24);

        if (days === 1) {
          setStreak(parsed.streak + 1);
        } else if (days > 1) {
          setStreak(0);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland",
      JSON.stringify({
        saved,
        xp,
        coins,
        level,
        streak,
        lastActive: getToday()
      })
    );
  }, [saved, xp, coins, level, streak]);

  const calculateLevel = (xpValue) =>
    Math.floor(xpValue / 500) + 1;

  const addSavings = (amount) => {
    const xpGain = Math.floor(
      amount * 10 * (1 + streak * 0.05)
    );

    const newSaved = saved + amount;
    const newXp = xp + xpGain;
    const newCoins = coins + amount;
    const newLevel = calculateLevel(newXp);

    setSaved(newSaved);
    setXp(newXp);
    setCoins(newCoins);
    setLevel(newLevel);
  };

  const landPercent = Math.min(
    (saved / LAND_GOAL) * 100,
    100
  );

  const currentXP = xp % 500;

  const xpPercent = (currentXP / 500) * 100;

  return (
  <div className="page-home" style={{ padding: 20 }}>
    <h1>🌿 Greenland</h1>

    {/* LAND FUND */}
    <div className="card card-primary card-animate">
      <h2>🏡 Land Fund</h2>

      <p>
        ${saved} / ${LAND_GOAL}
      </p>

      <div className="barWrap">
        <div
          className="barGreen"
          style={{ width: `${landPercent}%` }}
        />
      </div>
    </div>

    {/* XP */}
    <div className="card card-animate">
      <h2>⚡ XP</h2>

      <p>{xp}</p>

      <div className="barWrap">
        <div
          className="barBlue"
          style={{ width: `${xpPercent}%` }}
        />
      </div>
    </div>
      <div style={card}>
        <h2>⚡ XP</h2>
        <p>{xp}</p>

        <div style={barWrap}>
          <div
            style={{
              ...xpFill,
              width: `${xpPercent}%`
            }}
          />
        </div>
      </div>

      <div style={card}>
        <h2>🔥 Streak</h2>
        <p>{streak} days</p>
      </div>

      <div style={card}>
        <h2>🪙 Coins</h2>
        <p>{coins}</p>
      </div>

      <div style={card}>
        <h2>📈 Level</h2>
        <p>{level}</p>
      </div>

      <div style={card}>
        <h3>Add Savings</h3>

        <button onClick={() => addSavings(5)}>
          + $5
        </button>
        <button onClick={() => addSavings(10)}>
          + $10
        </button>
        <button onClick={() => addSavings(20)}>
          + $20
        </button>
        <button onClick={() => addSavings(50)}>
          + $50
        </button>
      </div>
    </div>
  );
}

const card = {
  background: "#0f1715",
  padding: 16,
  marginBottom: 12,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.05)"
};

const barWrap = {
  height: 12,
  background: "#1a2421",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 10
};

const landFill = {
  height: "100%",
  background: "#7dd3a0",
  transition: "width 0.5s ease"
};

const xpFill = {
  height: "100%",
  background: "#66b3ff",
  transition: "width 0.5s ease"
};