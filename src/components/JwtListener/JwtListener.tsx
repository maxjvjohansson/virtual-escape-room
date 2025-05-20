"use client";

import { useEffect } from "react";

export default function JwtListener() {
  useEffect(() => {
    console.log("[JwtListener] Mounted");

    const handleMessage = (event: MessageEvent) => {
      console.log(
        "[JwtListener] Raw message received:",
        event.origin,
        event.data
      );

      // if (event.origin !== "https://tivoli.yrgobanken.vip") return;

      const jwt = event.data?.jwt || event.data?.token || event.data;

      if (typeof jwt === "string") {
        localStorage.setItem("jwt", jwt);
        console.log("[JwtListener] JWT received and saved:", jwt);
      } else {
        console.log("[JwtListener] No valid JWT in message");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
