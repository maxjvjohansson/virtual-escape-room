"use client";

import { useEffect } from "react";

export default function JwtListener() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      localStorage.removeItem("jwt");
    }

    if (window.parent !== window) {
      try {
        window.parent.postMessage({ type: "GAME_READY" }, "*");
      } catch (err) {
        console.error("[JwtListener] Failed to send GAME_READY:", err);
      }
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      let jwt: string | null = null;

      if (typeof data === "object") {
        if (data.jwt) jwt = data.jwt;
        else if (data.token) jwt = data.token;
        else if (data.type === "JWT_TOKEN" && data.token) jwt = data.token;
      } else if (typeof data === "string" && data.startsWith("eyJ")) {
        jwt = data;
      }

      if (jwt && typeof jwt === "string" && jwt.startsWith("eyJ")) {
        localStorage.setItem("jwt", jwt);
        window.dispatchEvent(new CustomEvent("jwt_received", { detail: jwt }));
      }
    };

    window.addEventListener("message", handleMessage);

    const timeout = setTimeout(() => {
      if (!localStorage.getItem("jwt") && window.parent !== window) {
        try {
          window.parent.postMessage({ type: "GAME_READY" }, "*");
        } catch (err) {
          console.error("[JwtListener] Failed to resend GAME_READY:", err);
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
