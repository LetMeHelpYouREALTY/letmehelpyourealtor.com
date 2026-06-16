"use client";

import { useEffect, useState } from "react";
import AIChatWidget from "@/components/chat/AIChatWidget";
import CalendlyBadge from "@/components/calendly/CalendlyBadge";
import MobileStickyCTA from "@/components/layouts/MobileStickyCTA";
import { lmhyColors } from "@/lib/letmehelpyou-brand";

/**
 * Site-wide engagement widgets: AI chat, scheduling, mobile sticky CTAs.
 * Loaded once from root layout (client-only).
 */
export default function EngagementLayer() {
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setShowCalendly(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <>
      <AIChatWidget />
      {showCalendly ? (
        <CalendlyBadge
          color={lmhyColors.coral}
          textColor="#ffffff"
          text="Book a Consultation"
          branding={false}
        />
      ) : null}
      <MobileStickyCTA />
    </>
  );
}
