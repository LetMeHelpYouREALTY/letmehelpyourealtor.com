"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr: false must live in a Client Component (Next 15+).
export const GoogleAnalytics = dynamic(
  () => import("@/components/analytics/GoogleAnalytics"),
  { ssr: false },
);

export const EngagementLayer = dynamic(
  () => import("@/components/layouts/EngagementLayer"),
  { ssr: false },
);
