import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { siteConfig, agentInfo } from "@/lib/site-config";
import { serverEnv } from "@/lib/server-env";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import dynamic from "next/dynamic";

const GoogleAnalytics = dynamic(
  () => import("@/components/analytics/GoogleAnalytics"),
  { ssr: false },
);

const EngagementLayer = dynamic(
  () => import("@/components/layouts/EngagementLayer"),
  { ssr: false },
);

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  return {
    title: `${config.tagline} | ${agentInfo.name}, REALTOR®`,
    description: config.description,
    keywords: config.keywords,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${dmSans.variable}`}>
      <head>
        <Script
          src="https://em.realscout.com/widgets/simple-search.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://em.realscout.com/widgets/office-listings.js"
          strategy="afterInteractive"
        />
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body className="font-sans pb-16 md:pb-0">
        {children}
        <EngagementLayer />
        {serverEnv.gaMeasurementId ? (
          <GoogleAnalytics measurementId={serverEnv.gaMeasurementId} />
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
