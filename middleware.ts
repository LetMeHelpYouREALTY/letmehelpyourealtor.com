import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const APEX_HOST = "letmehelpyourealtor.com";
const WWW_HOST = "www.letmehelpyourealtor.com";

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  // GSC fix: apex must 308 to www so Google sees one user-selected canonical
  if (hostname === APEX_HOST) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = WWW_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();
  response.headers.set("x-domain", hostname);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|images|videos|robots|sitemap).*)"],
};
