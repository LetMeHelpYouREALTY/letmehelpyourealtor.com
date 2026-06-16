import type { ReactNode } from "react";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/letmehelpyou/Breadcrumbs";

type InnerPageHeroProps = {
  badge?: string;
  title: string;
  description: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export default function InnerPageHero({
  badge = "Let Me Help You REALTOR · Las Vegas Valley",
  title,
  description,
  breadcrumbs,
  children,
}: InnerPageHeroProps) {
  return (
    <section className="relative pt-28 pb-14 bg-desert-gradient text-white overflow-hidden">
      <div className="absolute inset-0 bg-sunset-glow pointer-events-none" />
      <div className="lmhy-container relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-4 [&_nav]:text-white/60 [&_a]:text-white/80 [&_a:hover]:text-lmhy-sand [&_span]:text-white">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className="max-w-4xl mx-auto text-center">
          <span className="lmhy-badge bg-white/10 text-lmhy-sand border border-white/20 mb-6">
            {badge}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 leading-tight">
            {title}
          </h1>
          <div className="text-lg text-white/85 leading-relaxed max-w-3xl mx-auto">
            {description}
          </div>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
