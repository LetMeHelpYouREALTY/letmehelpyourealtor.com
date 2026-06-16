import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ServicesGridJune2026 from "@/components/letmehelpyou/ServicesGridJune2026";
import HowIHelpProcess from "@/components/letmehelpyou/HowIHelpProcess";
import MarketSnapshotJune2026 from "@/components/letmehelpyou/MarketSnapshotJune2026";
import PageServicesFocus from "@/components/letmehelpyou/PageServicesFocus";
import QuickConnectSection from "@/components/letmehelpyou/QuickConnectSection";
import LMHYCTA from "@/components/letmehelpyou/LMHYCTA";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { june2026Services } from "@/lib/letmehelpyou-services";
import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/page-metadata";

const pageMetadata: Metadata = {
  title: `Las Vegas Realtor Services — June 2026 | ${siteConfig.name}`,
  description:
    "June 2026 Las Vegas realtor services: buyer advocacy, seller concession strategy, California relocation, 55+ communities, new construction advocacy, luxury, and investment consulting. Dr. Jan Duffy, BHHS Nevada.",
  keywords: [
    "Las Vegas realtor services June 2026",
    "buyer agent Las Vegas",
    "seller concessions Las Vegas",
    "Let Me Help You realtor",
    "Dr Jan Duffy services",
  ],
};

export const metadata = withPageCanonical(pageMetadata, "/services");

export default async function ServicesPage() {
  const config = await getPageDomainConfig();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Las Vegas Real Estate Services — June 2026",
    description: siteConfig.description,
    numberOfItems: june2026Services.length,
    itemListElement: june2026Services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        url: `${siteConfig.url}${s.href}`,
        provider: {
          "@type": "RealEstateAgent",
          name: agentInfo.name,
          telephone: agentInfo.phoneTel.replace("tel:", ""),
        },
        areaServed: "Las Vegas, Henderson, Summerlin, Clark County NV",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-16 bg-desert-gradient text-white overflow-hidden">
          <div className="absolute inset-0 bg-sunset-glow pointer-events-none" />
          <div className="lmhy-container relative z-10 text-center max-w-3xl mx-auto">
            <span className="lmhy-badge bg-white/10 text-lmhy-sand border border-white/20 mb-6">
              June 2026 Service Guide
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Las Vegas Realtor Services
            </h1>
            <p className="text-lg text-white/85 leading-relaxed">
              The market shifted. Homeowners need different help in June 2026 — concession
              negotiation, buyer-broker clarity, relocation briefings, and hyperlocal neighborhood
              expertise. Here is exactly how{" "}
              <strong className="text-lmhy-sand">Let Me Help You</strong> serves the Valley.
            </p>
          </div>
        </section>

        <ServicesGridJune2026 showAll />
        <MarketSnapshotJune2026 />
        <HowIHelpProcess />

        <section className="lmhy-section bg-white">
          <div className="lmhy-container max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lmhy-charcoal mb-6 text-center">
              Buyer vs. Seller in June 2026
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="lmhy-card border-l-4 border-l-lmhy-coral">
                <h3 className="font-display font-bold text-xl text-lmhy-charcoal mb-3">
                  If You&apos;re Buying
                </h3>
                <ul className="space-y-2 text-sm text-lmhy-charcoal/80">
                  <li>· Demand concession strategy — 31% of deals include seller credits</li>
                  <li>· Sign a clear buyer-broker agreement (Nevada AB 258)</li>
                  <li>· Get pre-underwritten, not just pre-approved</li>
                  <li>· Register your agent before any new-build model home visit</li>
                </ul>
              </div>
              <div className="lmhy-card border-l-4 border-l-lmhy-sage">
                <h3 className="font-display font-bold text-xl text-lmhy-charcoal mb-3">
                  If You&apos;re Selling
                </h3>
                <ul className="space-y-2 text-sm text-lmhy-charcoal/80">
                  <li>· Price accurately from day one — overpricing costs weeks</li>
                  <li>· Structure 2-1 buydowns or closing credits vs. blind price cuts</li>
                  <li>· Invest in staging and photography for faster DOM</li>
                  <li>· Compare full-service vs. discount commission models honestly</li>
                </ul>
              </div>
            </div>
            <p className="text-center text-xs text-lmhy-charcoal/50 mt-8">
              Last updated: June 2026 · Sources: Clark County MLS trends, Nevada AB 258, June 2026
              market research
            </p>
          </div>
        </section>

        <PageServicesFocus pageKey="services" showQuickConnect={false} />
        <RealScoutListings />
        <QuickConnectSection
          id="services-consultation"
          badge="Let Me Help You REALTOR"
          title="Not sure which service fits you?"
          description="Whether you're buying, selling, relocating from California, exploring 55+ communities, or investing — one conversation maps the right June 2026 strategy for your situation."
          formHeading="Tell me what you need"
          formSubtext="Dr. Jan Duffy reviews every submission personally."
          source="services-page"
          formType="contact"
          defaultTags={["website", "services", "consultation"]}
        />
        <LMHYCTA config={config} />
      </main>
      <Footer />
    </>
  );
}
