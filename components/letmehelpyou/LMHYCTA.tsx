import Link from "next/link";
import { Phone } from "lucide-react";
import type { DomainConfig } from "@/lib/domain-config";
import { agentInfo, officeInfo } from "@/lib/site-config";

type LMHYCTAProps = {
  config: DomainConfig;
};

export default function LMHYCTA({ config }: LMHYCTAProps) {
  return (
    <section className="lmhy-section bg-lmhy-coral text-white">
      <div className="lmhy-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {config.ctaHeadline}
          </h2>
          <p className="text-lg text-white/90 mb-8">{config.ctaSubheadline}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-bold text-lmhy-coral hover:bg-lmhy-cream transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call {agentInfo.phoneFormatted}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 font-bold text-white hover:bg-white/10 transition-colors"
            >
              Send a Message
            </Link>
          </div>

          <p className="text-sm text-white/80">
            {agentInfo.name}, {agentInfo.title} · License {agentInfo.license}
          </p>
          <p className="text-xs text-white/60 mt-2">
            {officeInfo.address.full} · {agentInfo.brokerage}
          </p>
        </div>
      </div>
    </section>
  );
}
