import { CANONICAL_SITE_URL } from "@/lib/site-config";

/** Build absolute production URL for a path (GSC / schema / sitemap). */
export function absoluteUrl(path = ""): string {
  if (!path || path === "/") {
    return CANONICAL_SITE_URL;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_SITE_URL}${normalized}`;
}
