"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeControl() {
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const storedVolume = localStorage.getItem("volume");
    const storedMuted = localStorage.getItem("muted");

    if (storedVolume !== null) {
      const parsed = parseFloat(storedVolume);
      setVolume(parsed);
      if (parsed === 0) setMuted(true);
    }

    if (storedMuted !== null) {
      setMuted(JSON.parse(storedMuted));
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("audio, video");
    elements.forEach((el) => {
      if (el instanceof HTMLMediaElement) {
        el.volume = muted ? 0 : volume;
      }
    });

    localStorage.setItem("volume", String(volume));
    localStorage.setItem("muted", JSON.stringify(muted));
  }, [volume, muted]);

  const toggleMute = () => setMuted((prev) => !prev);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && muted) {
      setMuted(false);
    }
  };

  return (
    <div
      className="absolute top-4 left-4 z-50 flex items-center group p-1"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <button
        onClick={toggleMute}
        className="cursor-pointer"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted || volume === 0 ? (
          <VolumeX className="w-8 h-8" />
        ) : (
          <Volume2 className="w-8 h-8" />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={muted ? 0 : volume}
        onChange={handleVolumeChange}
        aria-label="Volume"
        className={`
          absolute left-10 w-32 h-1 rounded-lg outline-none
          transition-opacity duration-200
          appearance-none
          ${showSlider ? "opacity-100" : "opacity-0 pointer-events-none"}

          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-red-600
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:shadow-md
        `}
        style={{
          background: `linear-gradient(to right, #991b1b ${
            volume * 100
          }%, #374151 ${volume * 100}%)`,
        }}
      />
    </div>
  );
}
