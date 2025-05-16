import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  const gameStarted = cookies.get("game_started")?.value === "true";
  const gameFinished = cookies.get("game_finished")?.value === "true";

  if (pathname.startsWith("/basement") && !gameStarted) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/endgame") && !gameFinished) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/basement", "/basement/:path*", "/endgame", "/endgame/:path*"],
};
