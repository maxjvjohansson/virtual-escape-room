"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const OUTSIDE_TRACKS = [
  "/sounds/music_box_outside.mp3",
  "/sounds/rain_thunder_outside.mp3",
];

const INSIDE_TRACKS = [
  "/sounds/music_box_inside.mp3",
  "/sounds/rain_window_inside.mp3",
];

const OUTSIDE_PATHS = ["/", "/lobby", "/endgame"];
const INSIDE_PATHS = ["/basement"];

export function useBackgroundAudio() {
  const pathname = usePathname();
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const currentScene = useRef<"outside" | "inside" | null>(null);

  useEffect(() => {
    const scene = OUTSIDE_PATHS.includes(pathname)
      ? "outside"
      : INSIDE_PATHS.includes(pathname)
      ? "inside"
      : null;

    if (scene === currentScene.current) return;

    audioRefs.current.forEach((audio) => {
      audio.pause();
      audio.remove();
    });

    const sources =
      scene === "inside"
        ? INSIDE_TRACKS
        : scene === "outside"
        ? OUTSIDE_TRACKS
        : [];

    const newAudios = sources.map((src) => {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 1;
      return audio;
    });

    const handlePlay = () => {
      newAudios.forEach((audio) => {
        audio.play().catch((err) => console.warn("Autoplay blocked:", err));
        document.body.appendChild(audio);
      });

      window.removeEventListener("click", handlePlay);
    };

    window.addEventListener("click", handlePlay);

    audioRefs.current = newAudios;
    currentScene.current = scene;

    return () => {
      window.removeEventListener("click", handlePlay);
    };
  }, [pathname]);
}
