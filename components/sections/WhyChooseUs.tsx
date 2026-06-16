import { Shield, TrendingUp, Users, Award, Clock, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Let Me Help You",
    description:
      "Personal, direct access to Dr. Jan — not a call center. Your goals drive every recommendation.",
  },
  {
    icon: Shield,
    title: "BHHS Trust",
    description:
      "Backed by Berkshire Hathaway HomeServices — ethical standards and global referral network.",
  },
  {
    icon: TrendingUp,
    title: "June 2026 Market Intel",
    description:
      "Pricing, concessions, and inventory data updated for today's balanced Clark County market.",
  },
  {
    icon: Users,
    title: "Hyperlocal Knowledge",
    description:
      "Summerlin to Henderson, Skye Canyon to Southern Highlands — neighborhood-level expertise.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "$127M+ closed · 500+ families · serving Las Vegas since 2008.",
  },
  {
    icon: Clock,
    title: "Responsive",
    description: "I answer my own phone. Quick responses when timelines matter.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="lmhy-section bg-lmhy-cream">
      <div className="lmhy-container">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="lmhy-badge mb-4">Why Dr. Jan</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            Why Let Me Help You?
          </h2>
          <p className="text-lg text-lmhy-charcoal/70">
            In a market with 30,000+ licensed agents, you need someone who combines hyperlocal
            knowledge with the resources to actually help you win.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="lmhy-card text-center">
              <div className="bg-lmhy-sage/15 rounded-full p-4 w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <Icon className="h-7 w-7 text-lmhy-sage" />
              </div>
              <h3 className="font-display font-bold text-lg text-lmhy-charcoal mb-2">{title}</h3>
              <p className="text-sm text-lmhy-charcoal/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
