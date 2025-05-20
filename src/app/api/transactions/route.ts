import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const jwtHeader = req.headers.get("authorization");
  const apiKey = process.env.TIVOLI_API_KEY;

  if (!jwtHeader || !apiKey) {
    return NextResponse.json({ error: "Missing auth info" }, { status: 401 });
  }

  const token = jwtHeader.replace(/^Bearer\s+/i, "");

  const payload = await req.json();

  const upstreamRes = await fetch("https://yrgobanken.vip/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "x-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const data = await upstreamRes.json();

  if (!upstreamRes.ok) {
    return NextResponse.json(
      { error: data.error || "Failed" },
      { status: upstreamRes.status }
    );
  }

  return NextResponse.json(data);
}
