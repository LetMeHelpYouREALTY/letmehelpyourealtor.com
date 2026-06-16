"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Link from "next/link";
import { agentInfo } from "@/lib/site-config";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const images = [
    "/Image/hero_bg_1.jpg",
    "/Image/hero_bg_2.jpg",
    "/Image/hero_bg_3.jpg",
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion, images.length]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-lmhy-charcoal">
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 ${
              prefersReducedMotion ? "" : "transition-opacity duration-1000"
            } ${index === currentImage ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={src}
              alt={`Las Vegas real estate ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-lmhy-charcoal/55" />
          </div>
        ))}
        <div className="absolute inset-0 bg-sunset-glow pointer-events-none" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-24 pb-16">
        <span className="lmhy-badge bg-white/10 text-lmhy-sand border border-white/20 mb-6">
          Let Me Help You REALTOR
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">
          Find Your Place in the{" "}
          <span className="text-lmhy-gold">Las Vegas Valley</span>
        </h1>
        <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl">
          Hyperlocal buyer and seller services from Dr. Jan Duffy — 30+ years serving
          Southern Nevada.
        </p>

        <div className="realscout-wrapper mb-6">
          <div
            dangerouslySetInnerHTML={{
              __html: `<realscout-simple-search agent-encoded-id="QWdlbnQtMjI1MDUw"></realscout-simple-search>`,
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link href="/services" className="lmhy-btn-primary">
            View Services
          </Link>
          <a href={agentInfo.phoneTel} className="lmhy-btn-secondary">
            Call {agentInfo.phoneFormatted}
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <span>
            <strong className="text-white">500+</strong> families helped
          </span>
          <span>
            <strong className="text-white">4.9★</strong> rating
          </span>
          <span>Las Vegas · Henderson · Summerlin</span>
        </div>
      </div>
    </div>
  );
}
