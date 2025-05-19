export async function buyTicket(jwt: string): Promise<void> {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    console.log("Mock ticket purchase for dev");
    return;
  }

  const res = await fetch("https://yrgobanken.vip/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      amusement_id: "8",
      stake_amount: 3,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Ticket purchase failed");
  }
}
