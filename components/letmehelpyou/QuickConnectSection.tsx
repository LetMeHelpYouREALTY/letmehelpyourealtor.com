"use client";

import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm";
import type { LeadCaptureFormProps } from "@/components/forms/LeadCaptureForm";
import { agentInfo } from "@/lib/site-config";
import {
  Clock,
  DollarSign,
  Plane,
  School,
  Shield,
  Star,
  Sun,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Serializable icon keys — safe to pass from Server Components */
export type BulletIcon =
  | "zap"
  | "clock"
  | "shield"
  | "trending-up"
  | "plane"
  | "school"
  | "sun"
  | "star"
  | "dollar";

const BULLET_ICONS: Record<BulletIcon, LucideIcon> = {
  zap: Zap,
  clock: Clock,
  shield: Shield,
  "trending-up": TrendingUp,
  plane: Plane,
  school: School,
  sun: Sun,
  star: Star,
  dollar: DollarSign,
};

type Bullet = {
  icon: BulletIcon;
  text: string;
};

type QuickConnectSectionProps = {
  id?: string;
  badge?: string;
  title?: string;
  description?: string;
  bullets?: Bullet[];
  formHeading?: string;
  formSubtext?: string;
  source?: string;
  formType?: LeadCaptureFormProps["formType"];
  defaultTags?: string[];
  stage?: string;
};

const defaultBullets: Bullet[] = [
  {
    icon: "zap",
    text: "RealScout-powered search plus off-market insight across Clark County",
  },
  {
    icon: "clock",
    text: `Same-day callback on business days — call ${agentInfo.phoneFormatted}`,
  },
  {
    icon: "shield",
    text: `Berkshire Hathaway HomeServices Nevada Properties · License ${agentInfo.license}`,
  },
];

export default function QuickConnectSection({
  id = "get-started",
  badge = "Free · No obligation",
  title = "Let Me Help You — tell me what you need",
  description = "Buyers who hear back within 5 minutes are far more likely to choose their agent. Share your goals and Dr. Jan Duffy will respond with a hyperlocal plan for Las Vegas, Henderson, or Summerlin.",
  bullets = defaultBullets,
  formHeading = "Start your home search",
  formSubtext = "Goes straight to Dr. Jan Duffy's CRM — no generic call center.",
  source = "homepage-quick-connect",
  formType = "property-search",
  defaultTags = ["website", "homepage", "buyer-intent"],
  stage = "New Lead",
}: QuickConnectSectionProps) {
  return (
    <section className="lmhy-section bg-white" id={id}>
      <div className="lmhy-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="lmhy-badge mb-4">{badge}</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
              {title}
            </h2>
            <p className="text-lg text-lmhy-charcoal/80 mb-8">{description}</p>

            <ul className="space-y-4">
              {bullets.map((item) => {
                const Icon = BULLET_ICONS[item.icon];
                return (
                  <li key={item.text} className="flex gap-3">
                    <Icon className="h-5 w-5 text-lmhy-coral shrink-0 mt-0.5" />
                    <span className="text-lmhy-charcoal/85">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-lmhy-sand/60 bg-lmhy-cream p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-display font-bold text-lmhy-charcoal mb-2">
              {formHeading}
            </h3>
            <p className="text-sm text-lmhy-charcoal/70 mb-6">{formSubtext}</p>
            <LeadCaptureForm
              source={source}
              formType={formType}
              defaultTags={defaultTags}
              stage={stage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
