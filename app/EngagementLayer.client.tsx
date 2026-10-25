"use client";

import dynamic from "next/dynamic";

const EngagementLayer = dynamic(
  () => import("@/components/layouts/EngagementLayer"),
  { ssr: false },
);

export default EngagementLayer;
