import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatApp",
  description:
    "Start conversations, Connect with your friends on the go, and never miss a moment with ChatApp. Communicate with everyone, from family to friends with the push of a button!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
