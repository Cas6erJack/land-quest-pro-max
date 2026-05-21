"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [saved, setSaved] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setSaved(parsed.saved || 0);
      setStreak(parsed.streak || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greenland",
      JSON.stringify({ saved, streak })
    );
  }, [saved, streak]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Greenland</h1>

      <p>Saved: ${saved}</p>
      <p>Streak: {streak}</p>

      <button onClick={() => setSaved(saved + 10)}>
        +10 Save
      </button>

      <button onClick={() => setStreak(streak + 1)}>
        +1 Streak
      </button>
    </div>
  );
}