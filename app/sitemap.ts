import { MetadataRoute } from "next";

import { GSC_INDEX_PAGES, toSitemapEntries } from "@/lib/gsc-index-pages";
import { absoluteUrl } from "@/lib/site-url";

const neighborhoodPages = [
  { path: "/neighborhoods", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/summerlin", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/henderson", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/green-valley", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/the-ridges", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/southern-highlands", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/north-las-vegas", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/skye-canyon", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/centennial-hills", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/inspirada", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/neighborhoods/mountains-edge", priority: 0.7, changeFrequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const priorityPages = toSitemapEntries(GSC_INDEX_PAGES, lastModified);
  const neighborhoodEntries = neighborhoodPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  return [...priorityPages, ...neighborhoodEntries];
}
