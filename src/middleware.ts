import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth gate for the private /certificate generator.
// Defaults to admin / certificate. Override in Vercel with CERT_USER / CERT_PASS
// for stronger protection (recommended — the repo defaults are visible in source).
export function middleware(req: NextRequest) {
  const USER = process.env.CERT_USER || "admin";
  const PASS = process.env.CERT_PASS || "certificate";

  const header = req.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(":");
      const user = decoded.slice(0, i);
      const pass = decoded.slice(i + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    } catch {
      /* fall through to 401 */
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="DFA Certificate", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/certificate", "/certificate/:path*"],
};
