import { CANONICAL_SITE_URL } from "@/lib/site-config";

/** Homepage URL — trailing slash matches GSC preferred format. */
export const CANONICAL_HOME_URL = `${CANONICAL_SITE_URL}/`;

/** Build absolute production URL for a path (GSC / schema / sitemap). */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") {
    return CANONICAL_HOME_URL;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_SITE_URL}${normalized}`;
}
