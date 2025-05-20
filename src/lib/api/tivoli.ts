export async function buyTicket(jwt: string): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("[buyTicket] Mock ticket purchase for dev");
    return;
  }

  console.log("[buyTicket] Starting ticket purchase");
  console.log(`[buyTicket] JWT token prefix: ${jwt.substring(0, 10)}...`);

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        amusement_id: 1,
        stake_amount: 3.0,
      }),
    });

    console.log("[buyTicket] Response status:", res.status);

    if (!res.ok) {
      let errorData;
      let errorText;

      try {
        errorText = await res.text();
        console.error("[buyTicket] Error response text:", errorText);

        try {
          errorData = JSON.parse(errorText);
          console.error("[buyTicket] Error data:", errorData);
        } catch (parseErr: unknown) {
          if (parseErr instanceof Error) {
            console.error(
              "[buyTicket] Failed to parse JSON:",
              parseErr.message
            );
          } else {
            console.error("[buyTicket] Failed to parse JSON:", parseErr);
          }
          errorData = { error: "Invalid error response format" };
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(
            "[buyTicket] Failed to read error response:",
            err.message
          );
        } else {
          console.error("[buyTicket] Failed to read error response:", err);
        }
        errorData = { error: "Failed to read error response" };
      }

      throw new Error(
        errorData?.error || errorData?.message || "Ticket purchase failed"
      );
    }

    console.log("[buyTicket] Ticket purchase successful");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("[buyTicket] Fatal error:", err.message);
      throw err;
    } else {
      console.error("[buyTicket] Unknown fatal error:", err);
      throw new Error("Unknown error during ticket purchase");
    }
  }
}

export async function awardStamp(jwt: string): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("[awardStamp] Mock stamp reward for dev");
    return;
  }

  console.log("[awardStamp] Starting stamp award");
  console.log(`[awardStamp] JWT token prefix: ${jwt.substring(0, 10)}...`);

  try {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        amusement_id: 1,
        payout_amount: 0.1,
        stamp_id: 13,
      }),
    });

    console.log("[awardStamp] Response status:", res.status);

    if (!res.ok) {
      let errorData;
      let errorText;

      try {
        errorText = await res.text();
        console.error("[awardStamp] Error response text:", errorText);

        try {
          errorData = JSON.parse(errorText);
          console.error("[awardStamp] Error data:", errorData);
        } catch (parseErr: unknown) {
          if (parseErr instanceof Error) {
            console.error(
              "[awardStamp] Failed to parse JSON:",
              parseErr.message
            );
          } else {
            console.error("[awardStamp] Failed to parse JSON:", parseErr);
          }
          errorData = { error: "Invalid error response format" };
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(
            "[awardStamp] Failed to read error response:",
            err.message
          );
        } else {
          console.error("[awardStamp] Failed to read error response:", err);
        }
        errorData = { error: "Failed to read error response" };
      }

      throw new Error(
        errorData?.error || errorData?.message || "Stamp reward failed"
      );
    }

    console.log("[awardStamp] Stamp award successful");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("[awardStamp] Fatal error:", err.message);
      throw err;
    } else {
      console.error("[awardStamp] Unknown fatal error:", err);
      throw new Error("Unknown error during stamp award");
    }
  }
}
