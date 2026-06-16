"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RealScoutListings() {
  return (
    <section className="lmhy-section bg-lmhy-sand/20">
      <div className="lmhy-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <span className="lmhy-badge mb-3">Live Listings</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-2">
              Featured Las Vegas Properties
            </h2>
            <p className="text-lmhy-charcoal/70 text-lg">
              Search homes across the Valley — updated from MLS daily
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-lmhy-coral text-lmhy-coral hover:bg-lmhy-coral hover:text-white"
          >
            <a
              href="http://drjanduffy.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Properties
            </a>
          </Button>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings 
              agent-encoded-id="QWdlbnQtMjI1MDUw" 
              sort-order="NEWEST" 
              listing-status="For Sale" 
              property-types=",SFR,MF,TC" 
              price-min="350000" 
              price-max="900000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
