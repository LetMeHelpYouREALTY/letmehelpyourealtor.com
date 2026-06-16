import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import type { DomainConfig } from "@/lib/domain-config";
import { lmhyBrand } from "@/lib/letmehelpyou-brand";
import { agentInfo } from "@/lib/site-config";

type LMHYHeroProps = {
  config: DomainConfig;
};

export default function LMHYHero({ config }: LMHYHeroProps) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-desert-gradient">
      <div className="absolute inset-0 bg-sunset-glow pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8DCC4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 lmhy-container w-full pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="lmhy-badge bg-white/10 text-lmhy-sand border border-white/20 mb-6 animate-fade-up">
            {config.ctaBadge || lmhyBrand.name}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] animate-fade-up [animation-delay:100ms]">
            {config.heroHeadline}
          </h1>

          <p className="text-lg md:text-xl text-white/85 mb-4 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            {config.heroSubheadline}
          </p>

          <p className="text-base text-lmhy-sand/90 mb-10 font-medium animate-fade-up [animation-delay:250ms]">
            {lmhyBrand.promise}
          </p>

          <div className="mb-10 flex justify-center animate-fade-up [animation-delay:300ms]">
            <div
              className="realscout-wrapper"
              dangerouslySetInnerHTML={{
                __html: `<realscout-simple-search agent-encoded-id="${config.realscoutAgentId}"></realscout-simple-search>`,
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-up [animation-delay:400ms]">
            <Link href="/services" className="lmhy-btn-primary">
              Explore My Services
            </Link>
            <a href={agentInfo.phoneTel} className="lmhy-btn-secondary">
              <Phone className="h-5 w-5 mr-2" />
              {agentInfo.phoneFormatted}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/75 animate-fade-up [animation-delay:500ms]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-lmhy-gold" />
              Las Vegas · Henderson · Summerlin
            </span>
            <span>
              <strong className="text-white">500+</strong> families helped
            </span>
            <span>
              <strong className="text-white">30+</strong> years in the Valley
            </span>
            <span>
              <strong className="text-white">4.9★</strong> client rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
