
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: 10, padding: 10 }}>
      <Link href="/">Home</Link>
      <Link href="/tasks">Tasks</Link>
      <Link href="/shop">Shop</Link>
      <Link href="/plants">Plants</Link>
      <Link href="/stats">Stats</Link>
    </div>
  );
}