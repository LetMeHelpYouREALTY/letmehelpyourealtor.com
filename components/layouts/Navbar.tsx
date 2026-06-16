"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { agentInfo } from "@/lib/site-config";
import { june2026Services } from "@/lib/letmehelpyou-services";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/neighborhoods", label: "Neighborhoods" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const serviceLinks = june2026Services.slice(0, 8).map((s) => ({
    href: s.href,
    label: s.title.replace(" & ", " · ").split(" — ")[0],
  }));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-lmhy-cream/95 backdrop-blur-md shadow-sm py-2 border-b border-lmhy-sand/50"
          : "bg-lmhy-charcoal/90 backdrop-blur-sm py-3"
      }`}
    >
      <div className="lmhy-container">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col group">
            <span
              className={`text-lg md:text-xl font-display font-bold leading-tight transition-colors ${
                isScrolled ? "text-lmhy-charcoal group-hover:text-lmhy-coral" : "text-white group-hover:text-lmhy-sand"
              }`}
            >
              Let Me Help You
            </span>
            <span
              className={`text-xs font-medium ${
                isScrolled ? "text-lmhy-sage" : "text-lmhy-sand/80"
              }`}
            >
              REALTOR® · Las Vegas Valley
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-lmhy-charcoal/80 hover:text-lmhy-coral"
                    : "text-white/90 hover:text-lmhy-sand"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                className={`flex items-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmhy-coral rounded-md px-2 py-1 ${
                  isScrolled
                    ? "text-lmhy-charcoal/80 hover:text-lmhy-coral"
                    : "text-white/90 hover:text-lmhy-sand"
                }`}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsServicesOpen(!isServicesOpen);
                  } else if (e.key === "Escape") {
                    setIsServicesOpen(false);
                  }
                }}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                More Services
                <ChevronDown className="h-4 w-4 ml-1" aria-hidden="true" />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-lmhy-sand/50 py-2 z-50 max-h-80 overflow-y-auto"
                  onMouseLeave={() => setIsServicesOpen(false)}
                  role="menu"
                >
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-lmhy-charcoal hover:bg-lmhy-coral/5 hover:text-lmhy-coral"
                      onClick={() => setIsServicesOpen(false)}
                      role="menuitem"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="block px-4 py-2.5 text-sm font-semibold text-lmhy-coral border-t border-lmhy-sand/50 mt-1"
                    onClick={() => setIsServicesOpen(false)}
                    role="menuitem"
                  >
                    View all services →
                  </Link>
                </div>
              )}
            </div>

            <a href={agentInfo.phoneTel} className="lmhy-btn-primary text-sm py-2.5 px-4">
              <Phone className="h-4 w-4 mr-1.5" />
              {agentInfo.phoneFormatted}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <a href={agentInfo.phoneTel} className="lmhy-btn-primary text-sm py-2 px-3">
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              className={`p-2 rounded-md ${
                isScrolled ? "text-lmhy-charcoal" : "text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-lmhy-sand/30">
            <div className="flex flex-col pt-4 gap-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lmhy-charcoal hover:text-lmhy-coral font-medium py-2.5 px-3 rounded-lg hover:bg-lmhy-sand/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-lmhy-sand/40 pt-3 mt-2">
                <span className="text-xs font-semibold text-lmhy-sage px-3 uppercase tracking-wide">
                  Services
                </span>
                {june2026Services.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    className="block text-lmhy-charcoal/80 hover:text-lmhy-coral py-2 px-3 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
