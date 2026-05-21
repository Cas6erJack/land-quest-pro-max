export const metadata = {
  title: "Land Quest 2.0",
  description: "Gamified savings system for building land ownership"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}