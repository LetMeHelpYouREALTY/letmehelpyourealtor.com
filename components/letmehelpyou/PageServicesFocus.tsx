import Link from "next/link";
import QuickConnectSection from "@/components/letmehelpyou/QuickConnectSection";
import {
  buildWebPageSchema,
  getServicesForPage,
  type GscServicePageKey,
} from "@/lib/page-services-focus";
import { ArrowRight } from "lucide-react";

type PageServicesFocusProps = {
  pageKey: GscServicePageKey;
  /** Show lead capture block (default true) */
  showQuickConnect?: boolean;
};

export default function PageServicesFocus({
  pageKey,
  showQuickConnect = true,
}: PageServicesFocusProps) {
  const { config, services } = getServicesForPage(pageKey);
  const webPageSchema = buildWebPageSchema(pageKey);
  const qc = config.quickConnect;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <section
        className="lmhy-container py-16 md:py-20 border-t border-lmhy-sand/40"
        aria-labelledby={`services-focus-${pageKey}`}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="lmhy-badge mb-4">{config.badge}</span>
          <h2
            id={`services-focus-${pageKey}`}
            className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4"
          >
            {config.headline}
          </h2>
          <p className="text-lg text-lmhy-charcoal/75 leading-relaxed">{config.intro}</p>
          <p className="mt-4 text-sm text-lmhy-coral font-medium">{config.localInsight}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="rounded-xl border border-lmhy-sand/60 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-lmhy-coral/10 text-lmhy-coral">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display font-bold text-lmhy-charcoal text-lg leading-tight">
                    {service.title}
                  </h3>
                </div>
                <p className="text-lmhy-charcoal/70 text-sm mb-3">{service.description}</p>
                <p className="text-xs font-medium text-lmhy-coral mb-4">{service.june2026Insight}</p>
                <ul className="text-sm text-lmhy-charcoal/65 space-y-1 mb-4">
                  {service.highlights.slice(0, 3).map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center text-sm font-semibold text-lmhy-coral hover:underline"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md bg-lmhy-charcoal px-6 py-3 text-white font-semibold hover:bg-lmhy-charcoal/90 transition-colors"
          >
            View all June 2026 services
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {showQuickConnect ? (
        <QuickConnectSection
          id={qc.id}
          badge={qc.badge}
          title={qc.title}
          description={qc.description}
          bullets={qc.bullets}
          formHeading={qc.formHeading}
          formSubtext={qc.formSubtext}
          source={qc.source}
          formType={qc.formType}
          defaultTags={qc.defaultTags}
        />
      ) : null}
    </>
  );
}
