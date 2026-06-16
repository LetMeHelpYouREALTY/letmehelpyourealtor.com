import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContentSectionProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "sand" | "white";
  id?: string;
};

export default function ContentSection({
  children,
  className,
  variant = "default",
  id,
}: ContentSectionProps) {
  const bg =
    variant === "sand"
      ? "bg-lmhy-sand/20"
      : variant === "white"
        ? "bg-white"
        : "bg-lmhy-cream";

  return (
    <section id={id} className={cn("lmhy-section", bg, className)}>
      <div className="lmhy-container">{children}</div>
    </section>
  );
}

/** Standard inner page body wrapper below hero */
export function PageBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("lmhy-section bg-lmhy-cream", className)}>
      <div className="lmhy-container">{children}</div>
    </div>
  );
}

export function DarkCallout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-lmhy-charcoal text-white p-8 md:p-12 border border-white/10",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StepCard({
  step,
  title,
  description,
  icon: Icon,
}: {
  step: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="lmhy-card flex gap-5 items-start">
      <div className="shrink-0">
        <div className="bg-lmhy-coral/10 rounded-full p-4 w-16 h-16 flex items-center justify-center">
          <Icon className="h-8 w-8 text-lmhy-coral" />
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="bg-lmhy-coral text-white text-sm font-bold px-3 py-1 rounded-full">
            Step {step}
          </span>
          <h3 className="text-xl font-display font-bold text-lmhy-charcoal">{title}</h3>
        </div>
        <p className="text-lmhy-charcoal/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
