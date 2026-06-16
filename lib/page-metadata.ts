import type { Metadata } from "next";
import { siteConfig, agentInfo } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

type PageMetaInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
};

/** Consistent SEO metadata for inner pages (GSC-ready: canonical + index). */
export function buildPageMetadata({
  title,
  description,
  keywords = [],
  path = "",
}: PageMetaInput): Metadata {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  const canonical = absoluteUrl(path || "/");
  const descriptionWithPhone = description.includes(agentInfo.phoneFormatted)
    ? description
    : `${description} Call ${agentInfo.phoneFormatted}.`;

  return {
    title: fullTitle,
    description: descriptionWithPhone,
    keywords: [
      ...keywords,
      "Let Me Help You realtor",
      "Las Vegas real estate",
      "Dr Jan Duffy",
      "Clark County NV",
    ],
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description: descriptionWithPhone,
      type: "website",
      siteName: siteConfig.name,
      url: canonical,
    },
  };
}

/** Add www canonical + index hints to existing static metadata exports. */
export function withPageCanonical(metadata: Metadata, path: string): Metadata {
  const canonical = absoluteUrl(path);

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical,
    },
    robots: metadata.robots ?? { index: true, follow: true },
    openGraph: {
      ...metadata.openGraph,
      url: canonical,
    },
  };
}
