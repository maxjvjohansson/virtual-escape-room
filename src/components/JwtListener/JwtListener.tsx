"use client";

import { useEffect } from "react";

export default function JwtListener() {
  useEffect(() => {
    console.log("[JwtListener] Mounted");

    localStorage.removeItem("jwt");

    if (window.parent !== window) {
      console.log(
        "[JwtListener] Running in iframe, sending GAME_READY to parent"
      );
      try {
        window.parent.postMessage({ type: "GAME_READY" }, "*");
        console.log("[JwtListener] GAME_READY message sent");
      } catch (err) {
        console.error("[JwtListener] Error sending GAME_READY:", err);
      }
    } else {
      console.log(
        "[JwtListener] Running in top-level window, no parent to send to"
      );
    }

    const handleMessage = (event: MessageEvent) => {
      console.log("[JwtListener] Message received from origin:", event.origin);
      console.log("[JwtListener] Message data type:", typeof event.data);

      if (typeof event.data === "object") {
        console.log(
          "[JwtListener] Message data keys:",
          Object.keys(event.data)
        );
      }

      let jwt = null;

      if (event.data?.jwt) {
        jwt = event.data.jwt;
        console.log("[JwtListener] Found JWT in event.data.jwt");
      } else if (event.data?.token) {
        jwt = event.data.token;
        console.log("[JwtListener] Found JWT in event.data.token");
      } else if (event.data?.type === "JWT_TOKEN" && event.data?.token) {
        jwt = event.data.token;
        console.log("[JwtListener] Found JWT in event.data.type=JWT_TOKEN");
      } else if (
        typeof event.data === "string" &&
        event.data.startsWith("eyJ")
      ) {
        jwt = event.data;
        console.log("[JwtListener] Found JWT as direct string");
      }

      if (jwt && typeof jwt === "string") {
        if (jwt.startsWith("eyJ")) {
          localStorage.setItem("jwt", jwt);
          console.log("[JwtListener] Valid JWT saved to localStorage");
          console.log(`[JwtListener] JWT prefix: ${jwt.substring(0, 10)}...`);

          window.dispatchEvent(
            new CustomEvent("jwt_received", { detail: jwt })
          );
        } else {
          console.log("[JwtListener] Received invalid JWT format");
        }
      } else {
        console.log("[JwtListener] No valid JWT found in message");
      }
    };

    window.addEventListener("message", handleMessage);

    const timeout = setTimeout(() => {
      if (!localStorage.getItem("jwt") && window.parent !== window) {
        console.log(
          "[JwtListener] No JWT received after timeout, sending GAME_READY again"
        );
        try {
          window.parent.postMessage({ type: "GAME_READY" }, "*");
        } catch (err) {
          console.error("[JwtListener] Error sending repeat GAME_READY:", err);
        }
      }
    }, 5000);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
