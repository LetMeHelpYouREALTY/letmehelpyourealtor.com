import Link from "next/link";
import { june2026MarketStats } from "@/lib/letmehelpyou-services";
import { lmhyBrand } from "@/lib/letmehelpyou-brand";

export default function MarketSnapshotJune2026() {
  return (
    <section className="lmhy-section bg-lmhy-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-sunset-glow opacity-60 pointer-events-none" />
      <div className="lmhy-container relative z-10">
        <div className="text-center mb-12">
          <span className="text-lmhy-gold text-sm font-semibold uppercase tracking-widest">
            {lmhyBrand.marketLabel}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-3">
            Las Vegas Market Snapshot
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The most balanced Clark County market since 2018 — buyers have negotiation power;
            sellers need smart concession strategy, not panic price cuts.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
          {june2026MarketStats.map(({ value, label, sub }) => (
            <div
              key={label}
              className="text-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-lmhy-gold mb-1">
                {value}
              </div>
              <div className="text-white/90 text-sm font-medium">{label}</div>
              {sub && <div className="text-white/50 text-xs mt-1">{sub}</div>}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/market-report"
            className="inline-flex items-center rounded-lg border border-lmhy-gold/50 px-6 py-3 text-sm font-semibold text-lmhy-gold hover:bg-lmhy-gold/10 transition-colors"
          >
            Full Market Report
          </Link>
        </div>
      </div>
    </section>
  );
}
