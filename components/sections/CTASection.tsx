import Link from "next/link";
import { Phone, Mail, Home } from "lucide-react";
import { agentInfo } from "@/lib/site-config";

export default function CTASection() {
  return (
    <section className="lmhy-section bg-lmhy-coral text-white">
      <div className="lmhy-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let Me Help You Get Started
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Free consultation. No obligation. Hyperlocal Las Vegas expertise from first call
            through closing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="http://drjanduffy.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-lmhy-coral hover:bg-lmhy-cream transition-colors"
            >
              <Home className="h-5 w-5" />
              Browse Properties
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-bold text-white hover:bg-white/10 transition-colors no-underline"
            >
              <Mail className="h-5 w-5" />
              Get In Touch
            </Link>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-bold text-white hover:bg-white/10 transition-colors no-underline"
            >
              <Phone className="h-5 w-5" />
              {agentInfo.phoneFormatted}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <span>Free Consultation</span>
            <span>·</span>
            <span>Dr. Jan Duffy, REALTOR®</span>
            <span>·</span>
            <span>BHHS Nevada Properties</span>
          </div>
        </div>
      </div>
    </section>
  );
}
