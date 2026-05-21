"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [coins, setCoins] = useState(0);
  const [vault, setVault] = useState(0);
  const [log, setLog] = useState([]);

  const [plants, setPlants] = useState({
    moneyTree: 30,
    hustleSprout: 20,
    disciplineFern: 10
  });

  const addLog = (t) => setLog((l) => [t, ...l]);

  // 🌿 LOAD
  useEffect(() => {
    const saved = localStorage.getItem("greenland_shop");
    if (saved) {
      const d = JSON.parse(saved);
      setCoins(d.coins || 0);
      setVault(d.vault || 0);
      setLog(d.log || []);
      setPlants(d.plants || plants);
    }
  }, []);

  // 🌿 SAVE
  useEffect(() => {
    localStorage.setItem(
      "greenland_shop",
      JSON.stringify({ coins, vault, log, plants })
    );
  }, [coins, vault, log, plants]);

  // 🌱 GROW SYSTEM
  const growAll = (amount) => {
    setPlants((p) => ({
      moneyTree: Math.min(p.moneyTree + amount, 100),
      hustleSprout: Math.min(p.hustleSprout + amount, 100),
      disciplineFern: Math.min(p.disciplineFern + amount, 100)
    }));
  };

  // 🚗 WORK
  const doWork = () => {
    setCoins((c) => c + 20);
    setVault((v) => v + 10);
    growAll(15);
    addLog("🚗 Work Shift completed (+coins + growth)");
  };

  // 💰 SAVE OPTIONS
  const saveSmall = () => {
    setCoins((c) => c + 10);
    setVault((v) => v + 5);
    growAll(8);
    addLog("🪙 Small save");
  };

  const saveStrong = () => {
    setCoins((c) => c + 40);
    setVault((v) => v + 20);
    growAll(25);
    addLog("🏦 Strong save");
  };

  // 🏪 SHOP ITEMS
  const buyRain = () => {
    if (coins < 30) return;
    setCoins((c) => c - 30);
    growAll(40);
    addLog("🌧️ Bought Rain Cloud (big growth boost)");
  };

  const buySun = () => {
    if (coins < 20) return;
    setCoins((c) => c - 20);
    growAll(20);
    addLog("🌞 Bought Sun Boost");
  };

  const buySeeds = () => {
    if (coins < 50) return;
    setCoins((c) => c - 50);
    const seeds = ["Focus Vine", "Wealth Orchid", "Emergency Lily"];
    const seed = seeds[Math.floor(Math.random() * seeds.length)];
    addLog(`🌰 Bought Seed Pack → ${seed}`);
  };

  return (
    <div style={styles.bg}>

      {/* HEADER */}
      <div style={styles.card}>
        <h2>🌿 Garden Shop</h2>
        <p>🪙 Coins: {coins}</p>
        <p>💰 Vault: ${vault}</p>
      </div>

      {/* PLANTS */}
      <div style={styles.card}>
        <h3>🌱 Garden</h3>

        <Plant name="💰 Money Tree" value={plants.moneyTree} />
        <Plant name="🚗 Hustle Sprout" value={plants.hustleSprout} />
        <Plant name="🔥 Discipline Fern" value={plants.disciplineFern} />
      </div>

      {/* ACTIONS */}
      <div style={styles.card}>
        <h3>⚔️ Actions</h3>

        <button style={styles.btn} onClick={doWork}>🚗 Work Shift (+Coins)</button>
        <button style={styles.btn} onClick={saveSmall}>🪙 Small Save</button>
        <button style={styles.btn} onClick={saveStrong}>🏦 Strong Save</button>
      </div>

      {/* SHOP */}
      <div style={styles.card}>
        <h3>🏪 Shop</h3>

        <button style={styles.shopBtn} onClick={buyRain}>
          🌧️ Rain Cloud (30 coins)
        </button>

        <button style={styles.shopBtn} onClick={buySun}>
          🌞 Sun Boost (20 coins)
        </button>

        <button style={styles.shopBtn} onClick={buySeeds}>
          🌰 Seed Pack (50 coins)
        </button>
      </div>

      {/* LOG */}
      <div style={styles.card}>
        <h3>📜 Activity</h3>
        {log.map((l, i) => (
          <div key={i} style={{ fontSize: 12 }}>• {l}</div>
        ))}
      </div>

    </div>
  );
}

const Plant = ({ name, value }) => (
  <div style={{ marginBottom: 10 }}>
    <p>{name}</p>
    <div style={styles.bar}>
      <div style={{ ...styles.fill, width: `${value}%` }} />
    </div>
  </div>
);

const styles = {
  bg: {
    background: "#07130f",
    minHeight: "100vh",
    color: "white",
    padding: 15,
    fontFamily: "Arial"
  },
  card: {
    background: "#0f1f18",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12
  },
  btn: {
    width: "100%",
    padding: 10,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#1f2d26",
    color: "white"
  },
  shopBtn: {
    width: "100%",
    padding: 10,
    marginTop: 8,
    borderRadius: 10,
    border: "none",
    background: "#0b3b2a",
    color: "white"
  },
  bar: {
    height: 10,
    background: "#1b2a23",
    borderRadius: 10,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    background: "linear-gradient(90deg, #34d399, #16a34a)"
  }
};