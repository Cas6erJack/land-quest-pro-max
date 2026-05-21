"use client";

import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: 0, background: "#070c0b", color: "#fff" }}>
        <div style={{ paddingBottom: 70 }}>
          {children}
        </div>

        <nav style={nav}>
          <Link href="/">🏡</Link>
          <Link href="/tasks">📋</Link>
          <Link href="/plants">🌱</Link>
          <Link href="/shop">🛒</Link>
        </nav>
      </body>
    </html>
  );
}

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: 60,
  background: "#0f1715",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  fontSize: 22
};