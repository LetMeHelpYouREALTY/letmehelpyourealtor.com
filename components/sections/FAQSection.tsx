"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

// Default FAQs for the section
export const defaultFaqs: FAQ[] = [
  {
    question: "What realtor services do Las Vegas homeowners need in June 2026?",
    answer:
      "In today's balanced market (~4.6 months supply), buyers need concession negotiation and pre-underwriting; sellers need smart pricing plus structured concessions like 2-1 buydowns. Relocation briefings, 55+ HOA review, and new-construction buyer advocacy are also in high demand across Clark County.",
  },
  {
    question: "Do I need a written buyer-broker agreement in Nevada?",
    answer:
      "Yes. Nevada Assembly Bill 258 requires a written buyer-broker agreement before representation begins. Dr. Jan explains service tiers and compensation clearly — full-service, limited, or consultation-only — so you know exactly what you're getting.",
  },
  {
    question: "What areas does Let Me Help You REALTOR serve?",
    answer:
      "Dr. Jan Duffy serves the full Las Vegas Valley — Las Vegas, Henderson, Summerlin, North Las Vegas, Skye Canyon, Centennial Hills, Green Valley, Southern Highlands, and 55+ communities including Sun City Summerlin and Anthem.",
  },
  {
    question: "Can you help with seller concessions and buyer credits?",
    answer:
      "Absolutely. About 31% of Las Vegas closings now include seller concessions averaging around $7,800. Whether you're buying or selling, structuring credits strategically often beats blind price cuts.",
  },
  {
    question: "Do I need my own agent for new construction?",
    answer:
      "Yes. Builder sales representatives work for the builder. Register your agent on your first model-home visit — buyer representation costs you nothing and can save thousands in upgrades and contract terms.",
  },
  {
    question: "How do I get started?",
    answer:
      "Call or text Dr. Jan at (702) 500-1942 for a free consultation. No pressure — just an honest conversation about your goals and which services fit your situation.",
  },
];

interface FAQSectionProps {
  /** Custom FAQs to display (defaults to defaultFaqs) */
  faqs?: FAQ[];
  /** Custom title for the section */
  title?: string;
  /** Custom subtitle for the section */
  subtitle?: string;
  /** Whether to include JSON-LD schema (handled separately by FAQSchema component) */
  className?: string;
}

export default function FAQSection({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Answers for Las Vegas buyers and sellers — June 2026 market",
  className = "",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`lmhy-section bg-lmhy-sand/20 ${className}`}>
      <div className="lmhy-container">
        <div className="text-center mb-12">
          <span className="lmhy-badge mb-4">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            {title}
          </h2>
          <p className="text-lg text-lmhy-charcoal/70 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-lmhy-sand rounded-xl mb-3 overflow-hidden bg-white"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-lmhy-cream transition-colors"
              >
                <span className="font-semibold text-lmhy-charcoal pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-lmhy-coral flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-lmhy-sage flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-lmhy-cream border-t border-lmhy-sand">
                  <p className="text-lmhy-charcoal/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Helper to generate FAQ schema data from FAQ array
 * Use with FAQSchema component: <FAQSchema faqs={getFAQSchemaData(faqs)} />
 */
export function getFAQSchemaData(faqs: FAQ[]) {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}
