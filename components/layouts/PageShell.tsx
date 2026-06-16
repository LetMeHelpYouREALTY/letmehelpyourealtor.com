import type { ReactNode } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LMHYCTA from "@/components/letmehelpyou/LMHYCTA";
import { getPageDomainConfig } from "@/lib/get-domain-config";

type PageShellProps = {
  children: ReactNode;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  showCta?: boolean;
  showListings?: boolean;
};

export async function PageShell({
  children,
  schema,
  showCta = true,
}: PageShellProps) {
  const config = await getPageDomainConfig();
  const schemaArray = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <>
      {schemaArray.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
      <Navbar />
      <main>{children}</main>
      {showCta && <LMHYCTA config={config} />}
      <Footer />
    </>
  );
}
