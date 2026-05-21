"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const LAND_GOAL = 15000;

  const [saved, setSaved] = useState(0);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("greenland");

    if (data) {
      const parsed = JSON.parse(data);

      setSaved(parsed.saved || 0);
      setXp(parsed.xp || 0);
      setCoins(parsed.coins || 0);
      setLevel(parsed.level || 1);
      setStreak(parsed.streak || 0);
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
        streak
      })
    );
  }, [saved, xp, coins, level, streak]);

  const calculateLevel = (xpValue) => {
    return Math.floor(xpValue / 500) + 1;
  };

  const streakMultiplier = () => {
    if (streak >= 30) return 2;
    if (streak >= 14) return 1.5;
    if (streak >= 7) return 1.25;
    return 1;
  };

  const addSavings = (amount) => {
    const xpGain = Math.floor(
      amount * 10 * streakMultiplier()
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

  const currentLevelXP = xp % 500;

  const xpPercent =
    (currentLevelXP / 500) * 100;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>🌿 Greenland</h1>

        <p
          style={{
            opacity: 0.7,
            marginTop: 4
          }}
        >
          Grow your land fund one step at a time
        </p>
      </div>

      <div style={card}>
        <h2>🏡 Land Fund</h2>

        <p>
          $
          {saved.toLocaleString()} / $
          {LAND_GOAL.toLocaleString()}
        </p>

        <div style={progressWrap}>
          <div
            style={{
              ...landFill,
              width: `${landPercent}%`
            }}
          />
        </div>

        <p>{landPercent.toFixed(1)}% Complete</p>
      </div>

      <div style={card}>
        <h2>⚡ XP</h2>

        <p>{xp}</p>

        <div style={progressWrap}>
          <div
            style={{
              ...xpFill,
              width: `${xpPercent}%`
            }}
          />
        </div>

        <p>
          {currentLevelXP} / 500 XP
        </p>
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
        <h2>🔥 Streak</h2>

        <p>{streak} Days</p>

        <p>
          XP Bonus: {streakMultiplier()}x
        </p>

        <button
          onClick={() =>
            setStreak(streak + 1)
          }
        >
          ✅ Daily Check-In
        </button>
      </div>

      <div style={card}>
        <h3>Add Savings</h3>

        <button
          onClick={() => addSavings(5)}
        >
          + $5
        </button>

        <button
          onClick={() => addSavings(10)}
        >
          + $10
        </button>

        <button
          onClick={() => addSavings(20)}
        >
          + $20
        </button>

        <button
          onClick={() => addSavings(50)}
        >
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
  border:
    "1px solid rgba(255,255,255,0.05)"
};

const progressWrap = {
  width: "100%",
  height: 14,
  background: "#1a2421",
  borderRadius: 999,
  overflow: "hidden",
  marginTop: 10
};

const landFill = {
  height: "100%",
  background: "#7dd3a0",
  transition: "width .4s ease"
};

const xpFill = {
  height: "100%",
  background: "#66b3ff",
  transition: "width .4s ease"
};