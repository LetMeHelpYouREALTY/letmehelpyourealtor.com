/**
 * 29 priority URLs for Google Search Console launch.
 * Core + services + buyer/seller personas + 55+ communities (no neighborhood long-tail yet).
 */
import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-url";

export type GscIndexPage = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export const GSC_INDEX_PAGES: GscIndexPage[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/listings", priority: 0.9, changeFrequency: "daily" },
  { path: "/why-berkshire-hathaway", priority: 0.9, changeFrequency: "monthly" },
  { path: "/market-report", priority: 0.9, changeFrequency: "weekly" },
  { path: "/market-update", priority: 0.9, changeFrequency: "weekly" },
  { path: "/market-insights", priority: 0.9, changeFrequency: "monthly" },
  { path: "/google-business", priority: 0.9, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/buyers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sellers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/luxury-homes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/new-construction", priority: 0.8, changeFrequency: "weekly" },
  { path: "/investment-properties", priority: 0.8, changeFrequency: "weekly" },
  { path: "/relocation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/home-valuation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/55-plus-communities", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.7, changeFrequency: "monthly" },
  { path: "/buyers/california-relocator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/buyers/first-time-buyers", priority: 0.8, changeFrequency: "monthly" },
  { path: "/buyers/luxury-homes-las-vegas", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sellers/move-up", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sellers/downsizing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sellers/divorce-probate", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sellers/relocation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/55-plus-communities/sun-city-summerlin", priority: 0.8, changeFrequency: "monthly" },
  { path: "/55-plus-communities/sun-city-anthem", priority: 0.8, changeFrequency: "monthly" },
  { path: "/55-plus-communities/del-webb-lake-las-vegas", priority: 0.8, changeFrequency: "monthly" },
];

export function gscIndexPageUrls(): string[] {
  return GSC_INDEX_PAGES.map((page) => absoluteUrl(page.path));
}

export function toSitemapEntries(
  pages: GscIndexPage[],
  lastModified = new Date(),
): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
