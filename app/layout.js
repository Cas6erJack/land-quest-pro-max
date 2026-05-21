export const metadata = {
  title: "Land Quest Pro Max",
  description: "Turn your money into land through gamified savings"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#0f172a", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
