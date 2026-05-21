
import "./../styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Greenland",
  description: "Calm savings + plant growth tracker"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 16 }}>
          {children}
        </div>
      </body>
    </html>
  );
}