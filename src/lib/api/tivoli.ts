export async function buyTicket(jwt: string): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("Mock ticket purchase for dev");
    return;
  }

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

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ticket purchase failed");
  }
}

export async function awardStamp(jwt: string): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("Mock stamp reward for dev");
    return;
  }

  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      amusement_id: 8,
      payout_amount: 0,
      stamp_id: 13,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Stamp reward failed");
  }
}
