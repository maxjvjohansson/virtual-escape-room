import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const jwtHeader = req.headers.get("authorization");
    const apiKey = process.env.TIVOLI_API_KEY;

    if (!jwtHeader || !apiKey) {
      console.error("Missing auth info:", { jwtHeader, apiKey });
      return NextResponse.json({ error: "Missing auth info" }, { status: 401 });
    }

    const token = jwtHeader.replace(/^Bearer\s+/i, "");
    const payload = await req.json();

    console.log("[/api/transactions] Payload:", payload);

    const response = await fetch("https://yrgobanken.vip/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;

    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      console.error("JSON parse error:", err);
      return NextResponse.json(
        { error: "Invalid JSON response", raw: text },
        { status: 502 }
      );
    }

    if (!response.ok) {
      console.error("Upstream error:", data);
      return NextResponse.json(
        { error: data.error || "Transaction failed", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Unexpected server error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Server error during transaction processing",
      },
      { status: 500 }
    );
  }
}
