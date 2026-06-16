import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { june2026Services } from "@/lib/letmehelpyou-services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lmhy-charcoal text-white">
      <div className="lmhy-container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display font-bold text-xl mb-1">Let Me Help You</h3>
            <p className="text-lmhy-sand text-sm mb-4">REALTOR® · Hyperlocal Las Vegas</p>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-xs text-white/50">
              {agentInfo.brokerage}
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-lmhy-sand">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/services", label: "All Services" },
                { href: "/neighborhoods", label: "Neighborhoods" },
                { href: "/market-report", label: "Market Report" },
                { href: "/home-valuation", label: "Free Home Valuation" },
                { href: "/about", label: "About Dr. Jan" },
                { href: "/contact", label: "Contact" },
                { href: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-lmhy-sand transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-lmhy-sand">
              June 2026 Services
            </h3>
            <ul className="space-y-2 text-sm">
              {june2026Services.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    className="text-white/70 hover:text-lmhy-sand transition-colors no-underline"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-lmhy-sand">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-lmhy-gold shrink-0 mt-0.5" />
                <span className="text-white/70">{officeInfo.address.full}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-lmhy-gold shrink-0" />
                <a
                  href={agentInfo.phoneTel}
                  className="text-white/70 hover:text-lmhy-sand no-underline"
                >
                  {agentInfo.phoneFormatted}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-lmhy-gold shrink-0" />
                <a
                  href={`mailto:${agentInfo.email}`}
                  className="text-white/70 hover:text-lmhy-sand no-underline"
                >
                  {agentInfo.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=9406+W+Lake+Mead+Blvd+Suite+100+Las+Vegas+NV+89134"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-lmhy-gold hover:text-lmhy-sand no-underline"
              >
                Directions
              </a>
              <Link
                href="/google-business"
                className="text-xs font-semibold text-lmhy-gold hover:text-lmhy-sand no-underline"
              >
                Google Reviews
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <Link
              href="/sitemap.xml"
              className="text-white/50 text-sm hover:text-lmhy-sand no-underline"
            >
              Sitemap
            </Link>
          </div>
          <p className="text-white/40 text-xs mt-4 text-center">
            {agentInfo.name}, {agentInfo.title} · License {agentInfo.license} ·{" "}
            {agentInfo.brokerage}
          </p>
        </div>
      </div>
    </footer>
  );
}
