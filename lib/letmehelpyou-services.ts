import type { LucideIcon } from "lucide-react";
import {
  Handshake,
  TrendingUp,
  FileCheck,
  Plane,
  Users,
  Building2,
  Star,
  LineChart,
  Home,
  MapPin,
} from "lucide-react";

export type LMHYService = {
  id: string;
  title: string;
  slug: string;
  href: string;
  description: string;
  june2026Insight: string;
  highlights: string[];
  icon: LucideIcon;
  tier: "core" | "specialized" | "emerging";
};

/** Services prioritized from June 2026 Las Vegas market research */
export const june2026Services: LMHYService[] = [
  {
    id: "buyer-advocacy",
    title: "Buyer Advocacy & Concessions",
    slug: "buyers",
    href: "/buyers",
    description:
      "Negotiate seller concessions, closing credits, and favorable terms in today's balanced market.",
    june2026Insight: "31% of closings include concessions averaging ~$7,800.",
    highlights: ["Concession strategy", "Contract protection", "MLS access", "AB 258 clarity"],
    icon: Handshake,
    tier: "core",
  },
  {
    id: "seller-strategy",
    title: "Seller Marketing & Pricing",
    slug: "sellers",
    href: "/sellers",
    description:
      "Professional staging, photography, and pricing strategy—plus smart concession structures that close faster than price cuts.",
    june2026Insight: "2-1 buydowns and closing credits outperform blind price reductions.",
    highlights: ["Accurate pricing", "Premium marketing", "Concession planning", "Global exposure"],
    icon: TrendingUp,
    tier: "core",
  },
  {
    id: "pre-underwriting",
    title: "Pre-Underwriting & Financing Edge",
    slug: "buyers/first-time-buyers",
    href: "/buyers/first-time-buyers",
    description:
      "Go beyond pre-approval with lender partners who pre-underwrite—critical for homes under $500K where supply is tightest.",
    june2026Insight: "Entry-level inventory: ~2.8 months supply vs. 8.4 for luxury.",
    highlights: ["Local lenders", "Appraisal-gap plans", "FHA & VA guidance", "Fast closings"],
    icon: FileCheck,
    tier: "emerging",
  },
  {
    id: "california-relocation",
    title: "California Relocation Briefings",
    slug: "relocation",
    href: "/buyers/california-relocator",
    description:
      "90-day relocation plans covering submarkets, schools, Nevada tax advantages, and remote buying coordination.",
    june2026Insight: "California remains the #1 inbound relocation pipeline to Las Vegas.",
    highlights: ["Tax comparison", "Neighborhood tours", "Remote buying", "School research"],
    icon: Plane,
    tier: "specialized",
  },
  {
    id: "55-plus",
    title: "55+ Community Specialist",
    slug: "55-plus-communities",
    href: "/55-plus-communities",
    description:
      "Sun City, Anthem, Del Webb, Heritage—HOA review, amenity comparisons, and special-assessment diligence.",
    june2026Insight: "Zero NV state income, estate, and Social Security taxes drive retiree demand.",
    highlights: ["HOA analysis", "Community tours", "Resale insights", "Downsizing paths"],
    icon: Users,
    tier: "specialized",
  },
  {
    id: "new-construction",
    title: "New Construction Advocacy",
    slug: "new-construction",
    href: "/new-construction",
    description:
      "Builder sales reps work for the builder. Register your agent on the first model-home visit—representation is free to you.",
    june2026Insight: "Fastest-growing service demand: buyers who need contract and upgrade negotiation.",
    highlights: ["Free representation", "Upgrade negotiation", "Contract review", "Lot selection"],
    icon: Building2,
    tier: "core",
  },
  {
    id: "luxury",
    title: "Luxury & Trophy Properties",
    slug: "luxury-homes",
    href: "/luxury-homes",
    description:
      "The Ridges, MacDonald Highlands, Southern Highlands—discreet marketing for sellers; leverage for buyers in the $1.5M+ tier.",
    june2026Insight: "Q1 2026 luxury median ~$2.15M (+5.8% YoY) with 8.4 months supply.",
    highlights: ["Private tours", "Discretion", "Trophy marketing", "Global network"],
    icon: Star,
    tier: "specialized",
  },
  {
    id: "investment",
    title: "Investment Property Consulting",
    slug: "investment-properties",
    href: "/investment-properties",
    description:
      "Submarket ROI analysis, rental yield modeling, and builder incentive capture for portfolio builders.",
    june2026Insight: "Single-family rental yields ~5.4–6.1% as investor share normalizes.",
    highlights: ["Yield analysis", "1031 exchange help", "Cap rate modeling", "PM referrals"],
    icon: LineChart,
    tier: "specialized",
  },
  {
    id: "home-valuation",
    title: "Home Valuation & Market Intel",
    slug: "home-valuation",
    href: "/home-valuation",
    description:
      "Free, no-obligation valuations using current MLS comps and June 2026 Clark County market data.",
    june2026Insight: "Median single-family price near $498K · ~38 days on market · 4.6 months supply.",
    highlights: ["MLS comps", "No obligation", "Pricing strategy", "Market trends"],
    icon: Home,
    tier: "core",
  },
  {
    id: "hyperlocal",
    title: "Hyperlocal Neighborhood Guides",
    slug: "neighborhoods",
    href: "/neighborhoods",
    description:
      "Summerlin, Henderson, Skye Canyon, Centennial Hills—neighborhood-specific expertise that portals cannot replicate.",
    june2026Insight: "30,000+ licensed agents compete; hyperlocal content wins local search.",
    highlights: ["Zip-level data", "School zones", "Lifestyle fit", "Commute analysis"],
    icon: MapPin,
    tier: "emerging",
  },
];

export const howIHelpSteps = [
  {
    step: 1,
    title: "Let's Talk",
    description:
      "Free consultation—your goals, timeline, and situation. No pressure. I'll explain exactly how I can help and what services you need.",
  },
  {
    step: 2,
    title: "Custom Plan",
    description:
      "A strategy built for June 2026 market conditions: concessions, pricing, neighborhoods, or relocation timeline—tailored to you.",
  },
  {
    step: 3,
    title: "I Execute",
    description:
      "Showings, negotiations, marketing, paperwork, and coordination. You stay informed; I handle the details.",
  },
  {
    step: 4,
    title: "Keys & Beyond",
    description:
      "Close with confidence. I'm still here for contractor referrals, future moves, and anyone you want to send my way.",
  },
] as const;

export const june2026MarketStats = [
  { value: "$498K", label: "Median Price", sub: "Clark County SFH" },
  { value: "38", label: "Days on Market", sub: "Balanced market" },
  { value: "4.6", label: "Months Supply", sub: "Most balanced since 2018" },
  { value: "31%", label: "With Concessions", sub: "~$7,800 avg credit" },
] as const;
