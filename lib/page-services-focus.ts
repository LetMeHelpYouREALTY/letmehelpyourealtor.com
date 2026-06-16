import { june2026Services } from "@/lib/letmehelpyou-services";
import { absoluteUrl } from "@/lib/site-url";

/** GSC “duplicate without canonical” URLs — June 2026 service hyperfocus */
export type GscServicePageKey =
  | "mountains-edge"
  | "the-ridges"
  | "centennial-hills"
  | "southern-highlands"
  | "henderson"
  | "first-time-buyers"
  | "luxury-homes-las-vegas"
  | "investment-properties"
  | "relocation"
  | "services";

export type PageServicesFocusConfig = {
  path: string;
  badge: string;
  headline: string;
  intro: string;
  /** june2026Services `id` values */
  serviceIds: string[];
  localInsight: string;
  quickConnect: {
    id: string;
    badge: string;
    title: string;
    description: string;
    bullets: Array<{ icon: "shield" | "trending-up" | "star" | "dollar" | "plane" | "school" | "sun" | "clock" | "zap"; text: string }>;
    formHeading: string;
    formSubtext: string;
    source: string;
    formType: "property-search" | "home-valuation" | "contact";
    defaultTags: string[];
  };
};

export const gscPageServicesFocus: Record<GscServicePageKey, PageServicesFocusConfig> = {
  "mountains-edge": {
    path: "/neighborhoods/mountains-edge",
    badge: "Southwest Las Vegas · June 2026",
    headline: "Mountains Edge buyer & new-build services",
    intro:
      "Mountains Edge delivers master-planned parks and southwest value below Summerlin pricing. In June 2026’s balanced market, buyers here win with concession strategy—not just list price.",
    serviceIds: ["buyer-advocacy", "new-construction", "hyperlocal"],
    localInsight:
      "Exploration Peak Park and I-215 access attract families and California relocators seeking southwest Las Vegas value. Concessions appear on roughly one-third of Valley closings.",
    quickConnect: {
      id: "mountains-edge-consult",
      badge: "Mountains Edge",
      title: "Tour Mountains Edge with a southwest specialist",
      description:
        "Share your budget and timeline—Dr. Jan Duffy maps builder inventory, resale comps, and commute routes from Mountains Edge to the Strip, airport, and Henderson.",
      bullets: [
        { icon: "trending-up", text: "Negotiate seller credits and closing-cost help in today’s buyer-favorable market" },
        { icon: "shield", text: "Free buyer representation on new construction—register before the model-home visit" },
        { icon: "dollar", text: "Southwest Las Vegas value: median near $475K with room for concession leverage" },
      ],
      formHeading: "Request a Mountains Edge buyer briefing",
      formSubtext: "Include target beds/baths and whether you prefer resale or new build.",
      source: "mountains-edge-page",
      formType: "property-search",
      defaultTags: ["website", "mountains-edge", "buyer-intent", "southwest-las-vegas"],
    },
  },
  "the-ridges": {
    path: "/neighborhoods/the-ridges",
    badge: "Summerlin luxury · Guard-gated",
    headline: "The Ridges luxury representation services",
    intro:
      "The Ridges demands discreet showings, guard-gated logistics, and pricing precision on $1.5M+ estates. June 2026 luxury inventory runs higher than entry-level—buyers have leverage if strategy is right.",
    serviceIds: ["luxury", "buyer-advocacy", "california-relocation"],
    localInsight:
      "Ultra-luxury Summerlin estates attract out-of-state executives and California equity buyers who need remote coordination and Berkshire Hathaway’s global referral network.",
    quickConnect: {
      id: "the-ridges-consult",
      badge: "The Ridges · Luxury",
      title: "Confidential Ridges home search",
      description:
        "Off-market awareness, private tours, and negotiation on custom estates—Dr. Jan Duffy represents buyers and sellers in Summerlin’s most exclusive guard-gated community.",
      bullets: [
        { icon: "star", text: "Discreet luxury tours for executives and high-net-worth relocations" },
        { icon: "shield", text: "Guard-gated access coordination and HOA diligence before you write" },
        { icon: "plane", text: "Virtual buying support for California and out-of-state purchasers" },
      ],
      formHeading: "Start a Ridges luxury consultation",
      formSubtext: "Share your price range—$1M+ triggers luxury tagging in Follow Up Boss.",
      source: "the-ridges-page",
      formType: "property-search",
      defaultTags: ["website", "the-ridges", "luxury", "summerlin", "buyer-intent"],
    },
  },
  "centennial-hills": {
    path: "/neighborhoods/centennial-hills",
    badge: "Northwest Las Vegas",
    headline: "Centennial Hills relocation & buyer services",
    intro:
      "Centennial Hills pairs mountain proximity with northwest growth corridors. Families and relocators choose it for parks, newer schools, and relative value versus Summerlin.",
    serviceIds: ["buyer-advocacy", "pre-underwriting", "hyperlocal"],
    localInsight:
      "Northwest Las Vegas continues to absorb relocators priced out of California coastal markets while staying within Clark County’s balanced ~4.6-month supply.",
    quickConnect: {
      id: "centennial-hills-consult",
      badge: "Centennial Hills",
      title: "Northwest Las Vegas neighborhood briefing",
      description:
        "Commute mapping, school zones, and pre-underwritten financing—so your Centennial Hills offer competes in June 2026’s entry-level inventory crunch.",
      bullets: [
        { icon: "school", text: "School district and commute analysis for northwest Valley families" },
        { icon: "trending-up", text: "Pre-underwriting beyond pre-approval for homes under $500K" },
        { icon: "shield", text: "Hyperlocal comps—not portal estimates—for accurate offers" },
      ],
      formHeading: "Plan your Centennial Hills search",
      formSubtext: "Note if you’re relocating from out of state.",
      source: "centennial-hills-page",
      formType: "property-search",
      defaultTags: ["website", "centennial-hills", "buyer-intent", "northwest-las-vegas"],
    },
  },
  "southern-highlands": {
    path: "/neighborhoods/southern-highlands",
    badge: "Luxury golf community",
    headline: "Southern Highlands luxury & seller services",
    intro:
      "Southern Highlands blends championship golf, guard-gated streets, and custom lots minutes from the Strip. Sellers need trophy marketing; buyers need concession strategy even in luxury tiers.",
    serviceIds: ["luxury", "seller-strategy", "hyperlocal"],
    localInsight:
      "Tree-lined streets and Southern Highlands Golf Club anchor one of Las Vegas’s most established luxury master plans—attracting move-up buyers and custom-home investors.",
    quickConnect: {
      id: "southern-highlands-consult",
      badge: "Southern Highlands",
      title: "Luxury homes in Southern Highlands",
      description:
        "Existing estates, new builder inventory, and custom lots—Dr. Jan Duffy coordinates showings, pricing analysis, and Berkshire Hathaway global exposure.",
      bullets: [
        { icon: "star", text: "Luxury marketing and pricing for guard-gated Southern Highlands listings" },
        { icon: "trending-up", text: "2-1 buydowns and credits often beat blind price cuts for sellers" },
        { icon: "dollar", text: "Move-up and custom-lot buyers: negotiate upgrades and lot premiums" },
      ],
      formHeading: "Southern Highlands consultation",
      formSubtext: "Buying or selling? Say which in your message.",
      source: "southern-highlands-page",
      formType: "property-search",
      defaultTags: ["website", "southern-highlands", "luxury", "buyer-intent"],
    },
  },
  henderson: {
    path: "/neighborhoods/henderson",
    badge: "Henderson NV · Family market",
    headline: "Henderson buyer, rental & relocation services",
    intro:
      "Henderson remains a top-performing submarket for families and investors—strong schools, Green Valley maturity, and rental demand above the metro average in 2026.",
    serviceIds: ["investment", "california-relocation", "buyer-advocacy"],
    localInsight:
      "Henderson’s stable tenant base and planned communities support consistent rental income; inbound California relocators still drive buyer demand across Green Valley and Inspirada.",
    quickConnect: {
      id: "henderson-consult",
      badge: "Henderson",
      title: "Henderson homes & investment guidance",
      description:
        "Owner-occupier or rental portfolio—Dr. Jan Duffy models yields, school zones, and concession opportunities across Henderson’s master-planned neighborhoods.",
      bullets: [
        { icon: "plane", text: "California relocation briefings with tax and commute comparisons" },
        { icon: "dollar", text: "Rental yield modeling for Henderson single-family investments" },
        { icon: "shield", text: "Family-focused buyer advocacy with HOA and school diligence" },
      ],
      formHeading: "Henderson buyer or investor consult",
      formSubtext: "Median near $485K · avg DOM lower than metro in strong submarkets.",
      source: "henderson-page",
      formType: "property-search",
      defaultTags: ["website", "henderson", "buyer-intent", "green-valley"],
    },
  },
  "first-time-buyers": {
    path: "/buyers/first-time-buyers",
    badge: "First-time buyers · June 2026",
    headline: "First-time buyer advocacy & financing edge",
    intro:
      "Entry-level inventory is the tightest segment in Clark County (~2.8 months supply vs. luxury). First-time buyers need pre-underwriting, DPA programs, and concession negotiation—not portal alerts alone.",
    serviceIds: ["pre-underwriting", "buyer-advocacy", "new-construction"],
    localInsight:
      "FHA 3.5%, conventional 3%, and Nevada down-payment assistance up to $15K can combine with seller concessions averaging near $7,800 when structured correctly.",
    quickConnect: {
      id: "first-time-buyer-consult",
      badge: "First-time buyer",
      title: "Your first Las Vegas home—step by step",
      description:
        "Lender introductions, neighborhood fit, and offer strategy so you don’t overpay in a market that finally favors prepared buyers.",
      bullets: [
        { icon: "trending-up", text: "Pre-underwriting so your offer competes on homes under $500K" },
        { icon: "dollar", text: "Down-payment assistance and builder incentive navigation" },
        { icon: "shield", text: "Contract protection from inspection through closing" },
      ],
      formHeading: "First-time buyer consultation",
      formSubtext: "No cost to buyers—commission typically paid by seller.",
      source: "first-time-buyers-page",
      formType: "property-search",
      defaultTags: ["website", "first-time-buyer", "buyer-intent"],
    },
  },
  "luxury-homes-las-vegas": {
    path: "/buyers/luxury-homes-las-vegas",
    badge: "Luxury buyers · $1M+",
    headline: "Luxury buyer representation across Las Vegas",
    intro:
      "Luxury buyers in June 2026 see more inventory and longer days on market than entry-level—negotiation and discretion matter as much as square footage.",
    serviceIds: ["luxury", "california-relocation", "buyer-advocacy"],
    localInsight:
      "The Ridges, MacDonald Highlands, and Southern Highlands attract equity relocators who need virtual tours, NDA-level discretion, and Berkshire Hathaway’s global network.",
    quickConnect: {
      id: "luxury-buyer-consult",
      badge: "Luxury buyer",
      title: "Las Vegas luxury home search",
      description:
        "Set your criteria—Dr. Jan Duffy curates trophy inventory and negotiates concessions even on seven-figure listings.",
      bullets: [
        { icon: "star", text: "Private showings across Summerlin, Henderson, and MacDonald Highlands" },
        { icon: "plane", text: "Remote offer strategy for out-of-state luxury purchasers" },
        { icon: "shield", text: "BHHS global referral network for estate-level transactions" },
      ],
      formHeading: "Luxury buyer consultation",
      formSubtext: "Include minimum price—luxury auto-tags in CRM.",
      source: "luxury-homes-las-vegas-page",
      formType: "property-search",
      defaultTags: ["website", "luxury", "buyer-intent", "luxury-homes"],
    },
  },
  "investment-properties": {
    path: "/investment-properties",
    badge: "Investors · June 2026",
    headline: "Las Vegas investment property consulting",
    intro:
      "Las Vegas rental fundamentals stay strong—mid-$1,800s average rent metro-wide, with single-family homes often $2,100–$2,400 depending on submarket. Precision pricing separates winning landlords from vacancies.",
    serviceIds: ["investment", "home-valuation", "buyer-advocacy"],
    localInsight:
      "Henderson and North Las Vegas offer different yield profiles: stability vs. appreciation. Occupancy across the Valley averages 93–95% when units are priced to market.",
    quickConnect: {
      id: "investment-consult",
      badge: "Investment",
      title: "Build or expand your Vegas rental portfolio",
      description:
        "Cap-rate modeling, 1031 exchange coordination, and submarket picks—Dr. Jan Duffy aligns acquisitions with June 2026 cash-flow realities.",
      bullets: [
        { icon: "dollar", text: "Yield analysis for SFR and small multifamily across Clark County" },
        { icon: "trending-up", text: "1031 exchange and portfolio scaling guidance" },
        { icon: "shield", text: "No state income tax—factor Nevada advantages into ROI models" },
      ],
      formHeading: "Investment property consultation",
      formSubtext: "Share target cap rate or monthly cash-flow goal.",
      source: "investment-properties-page",
      formType: "property-search",
      defaultTags: ["website", "investment", "investor-intent"],
    },
  },
  relocation: {
    path: "/relocation",
    badge: "Relocation · CA & beyond",
    headline: "Las Vegas relocation concierge services",
    intro:
      "California remains the #1 inbound pipeline to Las Vegas. Relocation clients need 90-day plans—neighborhoods, schools, Nevada tax advantages, and remote closing coordination.",
    serviceIds: ["california-relocation", "hyperlocal", "buyer-advocacy"],
    localInsight:
      "June 2026’s balanced market gives relocating buyers time to compare Summerlin, Henderson, Skye Canyon, and northwest corridors without frenzy bidding.",
    quickConnect: {
      id: "relocation-consult",
      badge: "Relocation",
      title: "Moving to Las Vegas or Henderson?",
      description:
        "Tell Dr. Jan Duffy your origin city and move date—receive a tailored Valley briefing with virtual tour options.",
      bullets: [
        { icon: "plane", text: "Virtual tours and remote offer strategy" },
        { icon: "school", text: "School district and commute mapping" },
        { icon: "sun", text: "Nevada tax advantage overview for California equity buyers" },
      ],
      formHeading: "Start your relocation plan",
      formSubtext: "Include current city and target move date.",
      source: "relocation-page",
      formType: "property-search",
      defaultTags: ["website", "relocation", "buyer-intent", "california-relocator"],
    },
  },
  services: {
    path: "/services",
    badge: "Full service menu · June 2026",
    headline: "Every Let Me Help You service—one place",
    intro:
      "From concession negotiation to 55+ communities and luxury estates—this is the canonical guide to how Dr. Jan Duffy serves Clark County in a balanced, buyer-favorable June 2026 market.",
    serviceIds: [
      "buyer-advocacy",
      "seller-strategy",
      "pre-underwriting",
      "california-relocation",
      "luxury",
      "investment",
    ],
    localInsight:
      "Median Clark County SFH near $498K · ~38 days on market · 31% of deals include concessions averaging ~$7,800.",
    quickConnect: {
      id: "services-consult",
      badge: "Let Me Help You",
      title: "Not sure which service fits?",
      description:
        "Describe your situation—buying, selling, relocating, or investing—and Dr. Jan Duffy will route you to the right June 2026 strategy.",
      bullets: [
        { icon: "zap", text: "Same-day callback during business hours" },
        { icon: "shield", text: "Berkshire Hathaway HomeServices Nevada Properties" },
        { icon: "trending-up", text: "Hyperlocal expertise across 10+ Valley neighborhoods" },
      ],
      formHeading: "Free consultation request",
      formSubtext: "No obligation—just clarity on next steps.",
      source: "services-page",
      formType: "contact",
      defaultTags: ["website", "services", "consultation"],
    },
  },
};

export function getServicesForPage(pageKey: GscServicePageKey) {
  const config = gscPageServicesFocus[pageKey];
  const services = config.serviceIds
    .map((id) => june2026Services.find((s) => s.id === id))
    .filter((s): s is (typeof june2026Services)[number] => Boolean(s));

  return { config, services };
}

export function buildWebPageSchema(pageKey: GscServicePageKey) {
  const { config } = getServicesForPage(pageKey);
  const url = absoluteUrl(config.path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: config.headline,
    description: config.intro,
    isPartOf: {
      "@type": "WebSite",
      "@id": absoluteUrl("/"),
      url: absoluteUrl("/"),
      name: "Let Me Help You REALTOR",
    },
    mainEntityOfPage: url,
  };
}
