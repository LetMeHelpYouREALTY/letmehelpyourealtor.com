"use client";

import Link from "next/link";
import { Phone, MessageSquare, Search } from "lucide-react";
import { agentInfo } from "@/lib/site-config";

/** Mobile-only sticky conversion bar — keeps call / message / search one tap away */
export default function MobileStickyCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-lmhy-sand/60 bg-lmhy-cream/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(26,35,50,0.08)] md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 divide-x divide-lmhy-sand/50">
        <a
          href={agentInfo.phoneTel}
          className="flex flex-col items-center justify-center gap-1 py-3 text-lmhy-coral font-semibold text-xs"
        >
          <Phone className="h-5 w-5" aria-hidden />
          Call
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 py-3 text-lmhy-charcoal font-semibold text-xs"
        >
          <MessageSquare className="h-5 w-5 text-lmhy-sage" aria-hidden />
          Message
        </Link>
        <Link
          href="/listings"
          className="flex flex-col items-center justify-center gap-1 py-3 text-lmhy-charcoal font-semibold text-xs"
        >
          <Search className="h-5 w-5 text-lmhy-gold" aria-hidden />
          Search
        </Link>
      </div>
    </div>
  );
}
