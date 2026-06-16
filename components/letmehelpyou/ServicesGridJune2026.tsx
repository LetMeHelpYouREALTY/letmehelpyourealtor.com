import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { june2026Services } from "@/lib/letmehelpyou-services";
import { lmhyBrand } from "@/lib/letmehelpyou-brand";

type ServicesGridJune2026Props = {
  showAll?: boolean;
  limit?: number;
};

export default function ServicesGridJune2026({
  showAll = false,
  limit = 6,
}: ServicesGridJune2026Props) {
  const services = showAll ? june2026Services : june2026Services.slice(0, limit);

  return (
    <section className="lmhy-section bg-lmhy-cream">
      <div className="lmhy-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="lmhy-badge mb-4">{lmhyBrand.marketLabel}</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            Realtor Services You Need Right Now
          </h2>
          <p className="text-lg text-lmhy-charcoal/70">
            Las Vegas entered a balanced market in 2026. These are the services homeowners
            are asking for — from concession strategy to 55+ community guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="lmhy-card group flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="rounded-xl bg-lmhy-sage/15 p-3 group-hover:bg-lmhy-coral/15 transition-colors shrink-0">
                    <Icon className="h-6 w-6 text-lmhy-sage group-hover:text-lmhy-coral transition-colors" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-lmhy-sage">
                      {service.tier}
                    </span>
                    <h3 className="text-lg font-display font-bold text-lmhy-charcoal group-hover:text-lmhy-coral transition-colors mt-0.5">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-lmhy-charcoal/70 mb-3 flex-1">{service.description}</p>
                <p className="text-xs font-medium text-lmhy-coral bg-lmhy-coral/5 rounded-lg px-3 py-2 mb-4">
                  {service.june2026Insight}
                </p>
                <span className="text-sm font-semibold text-lmhy-sage group-hover:text-lmhy-coral flex items-center mt-auto">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            );
          })}
        </div>

        {!showAll && (
          <div className="text-center mt-10">
            <Link href="/services" className="lmhy-btn-primary">
              View All {june2026Services.length} Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
