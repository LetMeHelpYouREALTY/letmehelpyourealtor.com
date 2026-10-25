"use client";

import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(
  () => import("@/components/analytics/GoogleAnalytics"),
  { ssr: false },
);

export default GoogleAnalytics;
