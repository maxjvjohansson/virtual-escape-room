"use client";

import { useEffect } from "react";

export default function JwtListener() {
  useEffect(() => {
    console.log("[JwtListener] Mounted");

    if (window.parent !== window) {
      console.log("[JwtListener] Sending GAME_READY to parent");
      window.parent.postMessage({ type: "GAME_READY" }, "*");
    }

    const handleMessage = (event: MessageEvent) => {
      console.log(
        "[JwtListener] Raw message received:",
        event.origin,
        event.data
      );

      const jwt =
        event.data?.jwt ||
        event.data?.token ||
        (typeof event.data === "string" ? event.data : null);

      if (typeof jwt === "string" && jwt.startsWith("eyJ")) {
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
