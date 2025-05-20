"use client";

import { useEffect } from "react";

export default function JwtListener() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://tivoli.yrgobanken.vip") return;

      const { jwt } = event.data;
      if (jwt) {
        localStorage.setItem("jwt", jwt);
        console.log("[JwtListener] JWT received and saved");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
