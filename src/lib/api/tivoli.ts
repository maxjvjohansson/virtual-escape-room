export async function buyTicket(jwt: string): Promise<void> {
  const res = await fetch("https://api.tivoli.se/transactions", {
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
