import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import Link from "next/link";
import {
  Phone,
  Sun,
  Briefcase,
  Plane,
  Calculator,
  MapPin,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import { withPageCanonical } from "@/lib/page-metadata";
import SchemaScript from "@/components/SchemaScript";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";
import { agentInfo, officeInfo } from "@/lib/site-config";

const PAGE_PATH = "/buyers/california-relocator";
const PAGE_TITLE =
  "California to Las Vegas Relocation Guide | Let Me Help You REALTOR®";
const PAGE_DESCRIPTION =
  "California-to-Las Vegas buyer guide from Let Me Help You REALTOR® Dr. Jan Duffy: equity stretch math, CA metro → Clark County neighborhood matches, residency steps, and remote-work logistics. Call (702) 500-1942.";

const pageMetadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "California to Las Vegas relocation realtor",
    "Let Me Help You California relocator",
    "moving from California to Nevada homes",
    "Bay Area to Summerlin home buyer",
    "Orange County to Las Vegas relocation",
    "San Diego to Henderson homes",
    "Nevada no state income tax relocation",
  ],
};

export const metadata = withPageCanonical(pageMetadata, PAGE_PATH);

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Buyers", url: "/buyers" },
    { name: "California Relocator", url: PAGE_PATH },
  ]),
  generateWebPageSchema({
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl(PAGE_PATH),
    datePublished: "2024-01-13",
    dateModified: "2026-07-11",
  }),
);

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much can I save moving from California to Nevada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nevada has zero state income tax, saving Californians 9.3%-13.3% depending on income bracket. Combined with 40-60% lower home prices, a family earning $200K buying a $600K home could save $150K+ over 5 years compared to staying in California.",
      },
    },
    {
      "@type": "Question",
      name: "What neighborhoods do California relocators prefer in Las Vegas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "California buyers typically gravitate toward Summerlin (similar to Irvine/coastal communities), Henderson (family-friendly like San Diego suburbs), and The Ridges (comparable to Newport Coast luxury). These areas offer the quality and amenities California buyers expect.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to establish Nevada residency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nevada residency can be established immediately upon moving. To benefit from no state income tax, you should update your driver's license, register your vehicles, and register to vote in Nevada. Most people complete this within 30 days of their move.",
      },
    },
    {
      "@type": "Question",
      name: "What does my California home equity buy in Las Vegas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A typical $1.2M California home translates to $500K-$700K in Las Vegas with similar or better features. Many California sellers can buy a larger Las Vegas home AND pocket significant equity for retirement or investment.",
      },
    },
    {
      "@type": "Question",
      name: "Are there direct flights from Las Vegas to California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Las Vegas has extensive flight options to California. Southwest, United, and other carriers offer dozens of daily flights to LAX, SFO, SAN, and other California airports. Flight times are typically 1-1.5 hours.",
      },
    },
    {
      "@type": "Question",
      name: "What about schools compared to California?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compare specific campuses—not statewide averages. Ask for current district data for the Summerlin and Henderson addresses on your shortlist; many California families also evaluate nearby charter and private options. Dr. Jan Duffy shares school-boundary maps with every neighborhood tour packet.",
      },
    },
  ],
};

const realEstateAgentSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${absoluteUrl("/about")}#agent`,
  name: agentInfo.name,
  telephone: agentInfo.phoneTel.replace("tel:", ""),
  url: absoluteUrl(PAGE_PATH),
  address: {
    "@type": "PostalAddress",
    streetAddress: officeInfo.address.street,
    addressLocality: officeInfo.address.city,
    addressRegion: officeInfo.address.state,
    postalCode: officeInfo.address.zip,
  },
  areaServed: ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
  priceRange: "$350,000 - $10,000,000+",
};

const caMetroMatches = [
  {
    from: "Bay Area / Silicon Valley",
    to: "Summerlin & Henderson tech corridor",
    detail:
      "Keep Bay Area remote pay, cut state income tax to 0%, and trade a 1,600 sq ft condo for a 2,800+ sq ft home near Red Rock and the I-215 employment belt.",
    href: "/neighborhoods/summerlin",
  },
  {
    from: "Orange County / Irvine",
    to: "Summerlin master-planned villages",
    detail:
      "Irvine-style amenities without OC pricing: parks, trails, Downtown Summerlin retail, and commute options toward the Strip and Summerlin Hospital corridor.",
    href: "/neighborhoods/summerlin",
  },
  {
    from: "San Diego County",
    to: "Henderson / Inspirada / Green Valley",
    detail:
      "Family floor plans, newer inventory, and Henderson’s data-center employment base—plus 1–1.5 hour flights back to SAN when you need them.",
    href: "/neighborhoods/henderson",
  },
  {
    from: "LA / Westside / South Bay",
    to: "The Ridges, MacDonald Highlands, Southern Highlands",
    detail:
      "Stretch Westside equity into guard-gated or golf-course living with Strip or mountain views—and still pocket cash for reserves or a second property.",
    href: "/neighborhoods/the-ridges",
  },
];

export default function CaliforniaRelocatorPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="california-relocator-webpage-schema" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="lmhy-container">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-lmhy-charcoal/60" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-lmhy-coral">Home</Link>
              {" / "}
              <Link href="/buyers" className="hover:text-lmhy-coral">Buyers</Link>
              {" / "}
              <span className="text-lmhy-charcoal">California Relocator</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sun className="h-4 w-4 mr-2" />
              Let Me Help You · California Buyer Desk
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-lmhy-charcoal mb-6">
              California to Las Vegas Relocation Guide
            </h1>
            <p className="text-xl md:text-2xl text-lmhy-charcoal/70 mb-4">
              Zero state income tax. 40–60% more home for the equity. Same sunshine—
              with a Let Me Help You REALTOR® who coordinates the CA sale and NV purchase.
            </p>
            <p className="text-sm text-lmhy-charcoal/60 mb-8 max-w-2xl mx-auto">
              This page is for California-origin buyers. For general out-of-state moves, see our{" "}
              <Link href="/relocation" className="text-lmhy-coral hover:underline">
                Las Vegas relocation services
              </Link>
              .
            </p>
            <a
              href="tel:+17025001942"
              className="inline-flex items-center bg-lmhy-coral text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-lmhy-coral-dark transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Start Your Tax-Free Life → (702) 500-1942
            </a>
          </div>

          {/* Tax Savings Comparison */}
          <section className="mb-16 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">California vs. Nevada: The Numbers</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center bg-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">0%</div>
                <div className="text-green-100">Nevada State Income Tax</div>
                <div className="text-sm text-green-200 mt-2">vs. CA 9.3%-13.3%</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">40-60%</div>
                <div className="text-green-100">Lower Home Prices</div>
                <div className="text-sm text-green-200 mt-2">Similar quality homes</div>
              </div>
              <div className="text-center bg-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">$150K+</div>
                <div className="text-green-100">5-Year Savings</div>
                <div className="text-sm text-green-200 mt-2">$200K income example</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-green-100 text-lg">
                A California family earning $250,000/year saves <strong>$25,000+ annually</strong> in state income tax alone by moving to Nevada.
              </p>
            </div>
          </section>

          {/* What Your CA Equity Buys */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-lmhy-charcoal mb-8 text-center">
              What Your California Equity Buys in Las Vegas
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-red-600 mr-2" />
                  <h3 className="font-bold text-lg text-red-900">In California</h3>
                </div>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$1.2M:</span>
                    <span>3BR/2BA 1,800 sq ft in decent suburb</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$800K:</span>
                    <span>2BR condo or older townhome</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$600K:</span>
                    <span>Fixer-upper or long commute</span>
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="font-bold text-lg text-green-900">In Las Vegas</h3>
                </div>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$700K:</span>
                    <span>4BR/3BA 3,000 sq ft in Summerlin + $500K pocket</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$550K:</span>
                    <span>Beautiful 4BR in Henderson + cash left over</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">$450K:</span>
                    <span>Brand new construction, turnkey ready</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* CA metro → LV match — unique indexable content */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-lmhy-charcoal mb-4 text-center">
              California Metro → Las Vegas Neighborhood Match
            </h2>
            <p className="text-center text-lmhy-charcoal/70 mb-8 max-w-3xl mx-auto">
              Let Me Help You REALTOR® maps where you are coming from—not just a generic
              “move to Vegas” brief. Use this as a starting shortlist before your first tour day.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {caMetroMatches.map((match) => (
                <div
                  key={match.from}
                  className="rounded-xl border border-lmhy-sand/60 bg-white p-6"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-lmhy-coral mb-2">
                    From {match.from}
                  </p>
                  <h3 className="font-bold text-lg text-lmhy-charcoal mb-2">{match.to}</h3>
                  <p className="text-lmhy-charcoal/70 text-sm mb-4">{match.detail}</p>
                  <Link
                    href={match.href}
                    className="text-lmhy-coral font-semibold text-sm hover:text-lmhy-coral-dark"
                  >
                    View neighborhood guide →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Top Neighborhoods for CA Relocators */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-lmhy-charcoal mb-8 text-center">
              Top 3 Neighborhoods for California Relocators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-lmhy-sand/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-lmhy-coral text-white p-4">
                  <h3 className="font-bold text-xl">Summerlin</h3>
                  <p className="text-white/85 text-sm">Median: $726K</p>
                </div>
                <div className="p-6">
                  <p className="text-lmhy-charcoal/70 mb-4">
                    "The Irvine of Las Vegas" — master-planned villages with Downtown Summerlin
                    shopping, Red Rock Canyon access, and short drives to employment centers along
                    the 215.
                  </p>
                  <div className="text-sm text-lmhy-charcoal/60 mb-4">
                    <strong>Best for:</strong> Families from Orange County, coastal CA
                  </div>
                  <ul className="text-sm space-y-1 text-lmhy-charcoal/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      CCSD / charter options nearby
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      150+ parks & trails
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Upscale dining & shopping
                    </li>
                  </ul>
                  <Link
                    href="/neighborhoods/summerlin"
                    className="block mt-4 text-lmhy-coral font-semibold hover:text-lmhy-coral-dark"
                  >
                    Explore Summerlin →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-lmhy-sand/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-green-600 text-white p-4">
                  <h3 className="font-bold text-xl">Henderson / Inspirada</h3>
                  <p className="text-green-100 text-sm">Median: $530K</p>
                </div>
                <div className="p-6">
                  <p className="text-lmhy-charcoal/70 mb-4">
                    Henderson = San Diego-suburb floor plans plus a growing tech corridor. Google’s
                    data center campus, newer inventory in Inspirada, and ~20–30 minute drives to
                    the airport and Strip employment.
                  </p>
                  <div className="text-sm text-lmhy-charcoal/60 mb-4">
                    <strong>Best for:</strong> Tech workers, young families, San Diego relocators
                  </div>
                  <ul className="text-sm space-y-1 text-lmhy-charcoal/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Tech job growth
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Newer master-planned inventory
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      New construction options
                    </li>
                  </ul>
                  <Link
                    href="/neighborhoods/henderson"
                    className="block mt-4 text-lmhy-coral font-semibold hover:text-lmhy-coral-dark"
                  >
                    Explore Henderson →
                  </Link>
                </div>
              </div>

              <div className="bg-white border border-lmhy-sand/60 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-purple-600 text-white p-4">
                  <h3 className="font-bold text-xl">The Ridges</h3>
                  <p className="text-purple-100 text-sm">$1.5M - $10M+</p>
                </div>
                <div className="p-6">
                  <p className="text-lmhy-charcoal/70 mb-4">
                    Newport Coast quality, Vegas prices. Guard-gated luxury with Strip views,
                    celebrity neighbors, and custom estates.
                  </p>
                  <div className="text-sm text-lmhy-charcoal/60 mb-4">
                    <strong>Best for:</strong> Beverly Hills/Newport Beach luxury buyers
                  </div>
                  <ul className="text-sm space-y-1 text-lmhy-charcoal/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Guard-gated privacy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Custom home sites
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Red Rock Canyon access
                    </li>
                  </ul>
                  <Link
                    href="/neighborhoods/the-ridges"
                    className="block mt-4 text-lmhy-coral font-semibold hover:text-lmhy-coral-dark"
                  >
                    Explore The Ridges →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* 5-step CA → NV process */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-lmhy-charcoal mb-4 text-center">
              How Let Me Help You Runs a California → Nevada Move
            </h2>
            <p className="text-center text-lmhy-charcoal/70 mb-8 max-w-3xl mx-auto">
              Most CA buyers need a coordinated sale and purchase—not just a Vegas listing tour.
            </p>
            <ol className="space-y-4">
              {[
                {
                  title: "Equity & payment briefing",
                  text: "We model what your California sale proceeds buy in Summerlin, Henderson, and luxury pockets—including HOA, insurance, and Nevada property-tax ranges.",
                },
                {
                  title: "Metro-matched shortlist",
                  text: "Bay Area, OC, San Diego, or LA origins get different first-tour maps. You get 6–10 addresses before you book flights.",
                },
                {
                  title: "BHHS California handoff",
                  text: "Berkshire Hathaway’s California network helps list or close your current home while we lock Nevada inventory and builder registration if needed.",
                },
                {
                  title: "Tour + remote offer desk",
                  text: "Two-day tour blocks or video walkthroughs; we write offers with CA timeline contingencies so you are not forced into a bridge-loan surprise.",
                },
                {
                  title: "Residency checklist",
                  text: "After closing: DMV, vehicle registration, voter registration, and utility setup so Nevada residency is documented for tax purposes.",
                },
              ].map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-lmhy-sand/60 bg-lmhy-sand/10 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lmhy-coral text-white font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-lmhy-charcoal mb-1">{step.title}</h3>
                    <p className="text-sm text-lmhy-charcoal/70 mb-0">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Remote Work Lifestyle */}
          <section className="mb-16 bg-lmhy-sand/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
              <Briefcase className="h-8 w-8 text-lmhy-coral mr-3" />
              <h2 className="text-3xl font-bold text-lmhy-charcoal">Remote Work, Vegas Lifestyle</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lmhy-charcoal/80 mb-4">
                  Keep your California salary, lose the California taxes. Thousands of tech workers,
                  executives, and entrepreneurs have discovered that Las Vegas offers the perfect
                  remote work base:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Same income, lower costs:</strong> Keep your Bay Area salary while paying Nevada prices</span>
                  </li>
                  <li className="flex items-start">
                    <Plane className="h-5 w-5 text-lmhy-coral mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Easy travel:</strong> Direct flights to SFO, LAX, SJC for when you need to be in-office</span>
                  </li>
                  <li className="flex items-start">
                    <Sun className="h-5 w-5 text-amber-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Work-life balance:</strong> Golf at 2pm, hike Red Rock after work, world-class dining</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border border-lmhy-sand/60">
                <h3 className="font-bold text-lmhy-charcoal mb-4">Henderson Tech Corridor</h3>
                <p className="text-lmhy-charcoal/70 mb-4">
                  Google's $600M data center. Amazon Web Services. Switch Supernap. Henderson is
                  becoming a legitimate tech hub, with companies attracted by zero corporate
                  income tax and quality of life.
                </p>
                <p className="text-sm text-lmhy-charcoal/60">
                  Many California tech workers find themselves with <em>more</em> local job options
                  after moving to Vegas than they expected.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-lmhy-charcoal mb-8 text-center">
              California Relocator FAQs
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6">
                <h3 className="font-bold text-lmhy-charcoal mb-2">
                  How much can I save moving from California to Nevada?
                </h3>
                <p className="text-lmhy-charcoal/70">
                  Nevada has zero state income tax, saving Californians 9.3%-13.3% depending on
                  income bracket. Combined with 40-60% lower home prices, a family earning $200K
                  buying a $600K home could save $150K+ over 5 years compared to staying in California.
                </p>
              </div>
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6">
                <h3 className="font-bold text-lmhy-charcoal mb-2">
                  What neighborhoods do California relocators prefer?
                </h3>
                <p className="text-lmhy-charcoal/70">
                  California buyers typically gravitate toward Summerlin (similar to Irvine/coastal
                  communities), Henderson (family-friendly like San Diego suburbs), and The Ridges
                  (comparable to Newport Coast luxury). These areas offer the quality and amenities
                  California buyers expect.
                </p>
              </div>
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6">
                <h3 className="font-bold text-lmhy-charcoal mb-2">
                  How long does it take to establish Nevada residency?
                </h3>
                <p className="text-lmhy-charcoal/70">
                  Nevada residency can be established immediately upon moving. To benefit from no
                  state income tax, update your driver's license, register your vehicles, and
                  register to vote in Nevada. Most people complete this within 30 days.
                </p>
              </div>
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6">
                <h3 className="font-bold text-lmhy-charcoal mb-2">
                  Are there direct flights from Las Vegas to California?
                </h3>
                <p className="text-lmhy-charcoal/70">
                  Yes! Las Vegas has extensive flight options to California. Southwest, United, and
                  other carriers offer dozens of daily flights to LAX, SFO, SAN, and other California
                  airports. Flight times are typically 1-1.5 hours.
                </p>
              </div>
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6">
                <h3 className="font-bold text-lmhy-charcoal mb-2">
                  What about schools compared to California?
                </h3>
                <p className="text-lmhy-charcoal/70">
                  Compare specific campuses—not statewide averages. Ask for current GreatSchools
                  or district data for the Summerlin and Henderson addresses on your shortlist;
                  many California families also evaluate nearby charter and private options.
                  Dr. Jan shares school-boundary maps with every neighborhood tour packet.
                </p>
              </div>
            </div>
          </section>

          {/* Expert Quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-lmhy-coral/5 border-l-4 border-lmhy-coral rounded-r-xl p-8">
              <blockquote className="text-lg text-lmhy-charcoal/80 italic mb-4">
                "I've helped hundreds of California families make the move to Las Vegas. The most
                common reaction? 'Why didn't we do this sooner?' Between the tax savings, the space,
                and the lifestyle, most clients can't believe what their California equity buys here.
                As a <strong>Let Me Help You REALTOR®</strong> with Berkshire Hathaway HomeServices,
                I coordinate with California offices so the sale and purchase stay on one timeline."
              </blockquote>
              <cite className="text-lmhy-charcoal font-semibold">
                — Dr. Jan Duffy, Let Me Help You REALTOR® · Berkshire Hathaway HomeServices Nevada Properties
              </cite>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-lmhy-coral text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Tax-Free Life?
            </h2>
            <p className="text-xl text-white/85 mb-8">
              Get a personalized California relocation consultation with Dr. Jan Duffy. She'll show
              you exactly what your California equity buys in Las Vegas and map the right first-tour day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+17025001942"
                className="inline-flex items-center justify-center bg-white text-lmhy-coral px-8 py-4 rounded-md font-bold text-lg hover:bg-lmhy-cream transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call/Text (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-lmhy-coral text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-lmhy-coral-dark transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              Let Me Help You REALTOR® · Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>
        <div className="text-center text-sm text-lmhy-charcoal/60 mt-8">Last Updated: July 2026</div>
      </main>
      <RealScoutListings />
      <Footer />
    </>
  );
}
