import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ReviewsSection from "@/components/sections/ReviewsSection";
import FAQSection from "@/components/sections/FAQSection";
import LMHYHero from "@/components/letmehelpyou/LMHYHero";
import ServicesGridJune2026 from "@/components/letmehelpyou/ServicesGridJune2026";
import MarketSnapshotJune2026 from "@/components/letmehelpyou/MarketSnapshotJune2026";
import NeighborhoodsGrid from "@/components/letmehelpyou/NeighborhoodsGrid";
import HowIHelpProcess from "@/components/letmehelpyou/HowIHelpProcess";
import LMHYCTA from "@/components/letmehelpyou/LMHYCTA";
import QuickConnectSection from "@/components/letmehelpyou/QuickConnectSection";
import { getPageDomainConfig } from "@/lib/get-domain-config";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/page-metadata";
import { CANONICAL_HOME_URL } from "@/lib/site-url";

export const metadata = buildPageMetadata({
  title: `${siteConfig.name} | Hyperlocal Las Vegas Real Estate`,
  description: siteConfig.description,
  path: "/",
});

export default async function Home() {
  const config = await getPageDomainConfig();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${CANONICAL_HOME_URL}#agent`,
    name: `${agentInfo.name} — ${siteConfig.name}`,
    url: CANONICAL_HOME_URL,
    telephone: agentInfo.phoneTel.replace("tel:", ""),
    email: agentInfo.email,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: officeInfo.coordinates.lat,
      longitude: officeInfo.coordinates.lng,
    },
    areaServed: {
      "@type": "City",
      name: "Las Vegas",
      containedInPlace: { "@type": "State", name: "Nevada" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
    },
    memberOf: {
      "@type": "Organization",
      name: agentInfo.brokerage,
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CANONICAL_HOME_URL}#website`,
    url: CANONICAL_HOME_URL,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${CANONICAL_HOME_URL}#agent`,
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <main>
        <LMHYHero config={config} />
        <ServicesGridJune2026 limit={6} />
        <MarketSnapshotJune2026 />
        <NeighborhoodsGrid />
        <HowIHelpProcess />
        <RealScoutListings />
        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection />
        <QuickConnectSection />
        <LMHYCTA config={config} />
      </main>
      <Footer />
    </>
  );
}
