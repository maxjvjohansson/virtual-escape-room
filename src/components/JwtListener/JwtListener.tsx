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

      let jwt = null;

      if (
        event.data?.type === "JWT_TOKEN" &&
        typeof event.data.token === "string"
      ) {
        jwt = event.data.token;
      } else if (typeof event.data?.jwt === "string") {
        jwt = event.data.jwt;
      } else if (
        typeof event.data === "string" &&
        event.data.startsWith("eyJ")
      ) {
        jwt = event.data;
      }

      if (jwt) {
        localStorage.setItem("jwt", jwt);
        console.log("[JwtListener] JWT received and saved:", jwt);
      } else {
        console.log(
          "[JwtListener] No valid JWT format in message:",
          event.data
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}
