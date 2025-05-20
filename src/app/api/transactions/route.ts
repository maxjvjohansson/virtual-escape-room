import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("[/api/transactions] Handling request");

    const jwtHeader = req.headers.get("authorization");
    const apiKey = process.env.TIVOLI_API_KEY;

    console.log("[/api/transactions] Auth check:", {
      hasJwtHeader: !!jwtHeader,
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
    });

    if (!jwtHeader || !apiKey) {
      console.error("[/api/transactions] Missing auth info:", {
        hasJwtHeader: !!jwtHeader,
        hasApiKey: !!apiKey,
      });
      return NextResponse.json({ error: "Missing auth info" }, { status: 401 });
    }

    const token = jwtHeader.replace(/^Bearer\\s+/i, "");
    let payload;

    try {
      payload = await req.json();
      console.log(
        "[/api/transactions] Request payload:",
        JSON.stringify(payload)
      );
    } catch (payloadErr) {
      console.error("[/api/transactions] Payload parse error:", payloadErr);
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    console.log("[/api/transactions] Sending request to Tivoli API");
    console.log(
      `[/api/transactions] Token prefix: ${token.substring(0, 10)}...`
    );

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

      console.log("[/api/transactions] API response status:", response.status);
      console.log(
        "[/api/transactions] API response status text:",
        response.statusText
      );

      let responseText;
      try {
        responseText = await response.text();
        console.log("[/api/transactions] Raw response:", responseText);
      } catch (textErr) {
        console.error(
          "[/api/transactions] Failed to get response text:",
          textErr
        );
        return NextResponse.json(
          { error: "Failed to read response from Tivoli API" },
          { status: 502 }
        );
      }

      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
        console.log("[/api/transactions] Parsed response data:", data);
      } catch (parseErr) {
        console.error("[/api/transactions] JSON parse error:", parseErr);
        return NextResponse.json(
          { error: "Invalid JSON response from Tivoli API", raw: responseText },
          { status: 502 }
        );
      }

      if (!response.ok) {
        console.error("[/api/transactions] Upstream error:", data);
        return NextResponse.json(
          { error: data.error || "Transaction failed", details: data },
          { status: response.status }
        );
      }

      console.log("[/api/transactions] Successfully processed transaction");
      return NextResponse.json(data);
    } catch (fetchErr) {
      console.error("[/api/transactions] Fetch error:", fetchErr);
      return NextResponse.json(
        { error: "Failed to connect to Tivoli API" },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error("[/api/transactions] Unexpected server error:", err);
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
