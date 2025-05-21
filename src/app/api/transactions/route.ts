import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const jwtHeader = req.headers.get("authorization");
    const apiKey = process.env.TIVOLI_API_KEY;

    if (!jwtHeader || !apiKey) {
      return NextResponse.json({ error: "Missing auth info" }, { status: 401 });
    }

    const token = jwtHeader.replace(/^Bearer\s+/i, "");

    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    try {
      const response = await fetch("https://yrgobanken.vip/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "x-api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let data: unknown;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        return NextResponse.json(
          {
            error: "Invalid JSON response from Tivoli API",
            raw: responseText,
          },
          { status: 502 }
        );
      }

      if (!response.ok) {
        const errorData = data as { error?: string; [key: string]: unknown };
        return NextResponse.json(
          {
            error: errorData.error || "Transaction failed",
            details: errorData,
          },
          { status: response.status }
        );
      }

      return NextResponse.json(data);
    } catch {
      return NextResponse.json(
        { error: "Failed to connect to Tivoli API" },
        { status: 503 }
      );
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected transaction error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
