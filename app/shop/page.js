"use client";

import { useEffect, useState } from "react";

const seeds = [
  { id: 1, name: "Bamboo Seed", cost: 20, unlockXP: 0 },
  { id: 2, name: "Lavender Seed", cost: 50, unlockXP: 300 },
  { id: 3, name: "Cherry Seed", cost: 100, unlockXP: 800 },
  { id: 4, name: "Oak Seed", cost: 200, unlockXP: 1500 }
];

export default function ShopPage() {
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("greenland");
    if (data) {
      const parsed = JSON.parse(data);
      setCoins(parsed.coins || 0);
      setXp(parsed.xp || 0);
    }

    const savedOwned = localStorage.getItem("greenland_seeds");
    if (savedOwned) {
      setOwned(JSON.parse(savedOwned));
    }
  }, []);

  const buySeed = (seed) => {
    if (coins < seed.cost) return;

    const newCoins = coins - seed.cost;
    const newOwned = [...owned, seed];

    setCoins(newCoins);
    setOwned(newOwned);

    // update main save
    const data = JSON.parse(localStorage.getItem("greenland"));
    localStorage.setItem(
      "greenland",
      JSON.stringify({ ...data, coins: newCoins })
    );

    localStorage.setItem("greenland_seeds", JSON.stringify(newOwned));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Seed Shop</h1>

      <p>🪙 Coins: {coins}</p>
      <p>⚡ XP: {xp}</p>

      {seeds.map((seed) => {
        const ownedSeed = owned.find((s) => s.id === seed.id);

        return (
          <div key={seed.id} style={card}>
            <h2>{seed.name}</h2>
            <p>Cost: {seed.cost} coins</p>
            <p>Unlock XP: {seed.unlockXP}</p>

            {ownedSeed ? (
              <button disabled>Owned 🌱</button>
            ) : (
              <button
                onClick={() => buySeed(seed)}
                disabled={coins < seed.cost}
              >
                Buy Seed
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

const card = {
  background: "#111",
  padding: 16,
  marginBottom: 12,
  borderRadius: 12
};