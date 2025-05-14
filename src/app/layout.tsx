import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/lib/context/GameContext";
import VolumeControl from "@/elements/VolumeControl";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "The Haunted Escape",
  description: "A virtual horror escape room game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <GameProvider>
          <main>
            <VolumeControl />
            {children}
          </main>
        </GameProvider>
      </body>
    </html>
  );
}
