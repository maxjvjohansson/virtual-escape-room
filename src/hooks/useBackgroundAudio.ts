"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INSIDE_TRACKS = [
  "/sounds/music_box_inside.mp3",
  "/sounds/rain_window_inside.mp3",
];

const OUTSIDE_TRACKS = [
  "/sounds/music_box_outside.mp3",
  "/sounds/rain_thunder_outside.mp3",
];

export function useBackgroundAudio() {
  const pathname = usePathname();
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      audio.pause();
      audio.remove();
    });

    const isBasement = pathname.startsWith("/basement");
    const sources = isBasement ? INSIDE_TRACKS : OUTSIDE_TRACKS;
    audioRefs.current = sources.map((src) => {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 1;
      audio.play().catch((err) => console.error("Audio error", err));
      document.body.appendChild(audio);
      return audio;
    });

    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.remove();
      });
    };
  }, [pathname]);
}
