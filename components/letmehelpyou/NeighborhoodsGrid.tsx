import Link from "next/link";
import { neighborhoods } from "@/lib/site-config";

export default function NeighborhoodsGrid() {
  const featured = neighborhoods.slice(0, 8);

  return (
    <section className="lmhy-section bg-white">
      <div className="lmhy-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="lmhy-badge mb-4">Hyperlocal Expertise</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            Neighborhoods I Know Inside Out
          </h2>
          <p className="text-lg text-lmhy-charcoal/70">
            Portals show listings. I show you where to live — schools, commutes, HOA culture,
            and which blocks hold value in June 2026.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {featured.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="lmhy-card group p-5"
            >
              <h3 className="font-display font-bold text-lmhy-charcoal group-hover:text-lmhy-coral transition-colors mb-1">
                {n.name}
              </h3>
              <p className="text-lmhy-sage text-sm font-semibold mb-2">{n.medianPrice}</p>
              <p className="text-xs text-lmhy-charcoal/60 line-clamp-2">{n.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/neighborhoods"
            className="text-lmhy-coral font-semibold hover:text-lmhy-coral-dark underline-offset-4 hover:underline"
          >
            Browse all Las Vegas Valley neighborhoods →
          </Link>
        </div>
      </div>
    </section>
  );
}
