import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/lib/context/GameContext";
import VolumeControl from "@/elements/VolumeControl";
import AudioManager from "@/components/AudioManager/AudioManager";
import JwtListener from "@/components/JwtListener/JwtListener";

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
      <head>
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <GameProvider>
          <JwtListener />
          <VolumeControl />
          <AudioManager />
          <main>{children}</main>
        </GameProvider>
      </body>
    </html>
  );
}
