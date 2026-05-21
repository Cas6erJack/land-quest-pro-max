"use client";

import { useEffect, useState } from "react";

const seeds = [
  {
    id: 1,
    name: "🎋 Bamboo Seed",
    rarity: "Common",
    cost: 20,
    unlockXP: 0,
    description: "Fast growing and beginner friendly."
  },
  {
    id: 2,
    name: "💜 Lavender Seed",
    rarity: "Uncommon",
    cost: 50,
    unlockXP: 300,
    description: "A calming plant known for relaxation."
  },
  {
    id: 3,
    name: "🌸 Cherry Blossom Seed",
    rarity: "Rare",
    cost: 100,
    unlockXP: 800,
    description: "Beautiful seasonal blooms."
  },
  {
    id: 4,
    name: "🌳 Oak Seed",
    rarity: "Legendary",
    cost: 200,
    unlockXP: 1500,
    description: "Slow growth. Massive rewards."
  }
];

export default function ShopPage() {
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [owned, setOwned] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("greenland");

    if (data) {
      const parsed = JSON.parse(data);
      setCoins(parsed.coins || 0);
      setXp(parsed.xp || 0);
    }

    const savedOwned =
      localStorage.getItem("greenland_seeds");

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

    const data = JSON.parse(
      localStorage.getItem("greenland")
    );

    localStorage.setItem(
      "greenland",
      JSON.stringify({
        ...data,
        coins: newCoins
      })
    );

    localStorage.setItem(
      "greenland_seeds",
      JSON.stringify(newOwned)
    );

    setMessage(`🌱 Purchased ${seed.name}!`);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20 }}>
        <h1>🛒 Seed Shop</h1>

        <p
          style={{
            opacity: 0.7,
            marginTop: 4
          }}
        >
          Spend coins to unlock new plants.
        </p>
      </div>

      <div style={summaryCard}>
        <h2>🪙 Coin Pouch</h2>
        <p>{coins} Coins</p>

        <h3>⚡ XP</h3>
        <p>{xp}</p>
      </div>

      {message && (
        <div style={successBox}>
          {message}
        </div>
      )}

      {seeds.map((seed) => {
        const ownedSeed = owned.find(
          (s) => s.id === seed.id
        );

        const unlocked =
          xp >= seed.unlockXP;

        return (
          <div
            key={seed.id}
            style={card}
          >
            <h2>{seed.name}</h2>

            <p>
              ⭐ {seed.rarity}
            </p>

            <p>{seed.description}</p>

            <p>
              Cost: {seed.cost} Coins
            </p>

            <p>
              Unlock XP: {seed.unlockXP}
            </p>

            {!unlocked ? (
              <button disabled>
                🔒 Need More XP
              </button>
            ) : ownedSeed ? (
              <button disabled>
                ✅ Owned
              </button>
            ) : (
              <button
                onClick={() =>
                  buySeed(seed)
                }
                disabled={
                  coins < seed.cost
                }
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

const summaryCard = {
  background: "#12201c",
  padding: 16,
  marginBottom: 16,
  borderRadius: 20,
  border:
    "1px solid rgba(255,255,255,.05)"
};

const successBox = {
  background: "#173025",
  padding: 12,
  borderRadius: 12,
  marginBottom: 16
};

const card = {
  background: "#0f1715",
  padding: 16,
  marginBottom: 14,
  borderRadius: 20,
  border:
    "1px solid rgba(255,255,255,.05)"
};