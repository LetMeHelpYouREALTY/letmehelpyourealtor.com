import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Details | Las Vegas & Henderson Real Estate",
  description: "View detailed information about this property listing in Las Vegas or Henderson, NV.",
};

// This would typically fetch from RealScout API
async function getProperty(id: string) {
  // Placeholder - replace with RealScout API call
  return {
    id,
    name: "Modern Luxury Home",
    location: "Summerlin, Las Vegas, NV",
    price: "$850,000",
    image: "/Image/hero_bg_1.jpg",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 2018,
    description:
      "Stunning modern home in desirable Summerlin community. Features open floor plan, updated kitchen, and beautiful backyard. Close to schools, shopping, and entertainment.",
  };
}

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="lmhy-container">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-lmhy-charcoal/70">
              <li>
                <a href="/" className="hover:text-lmhy-coral">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="http://drjanduffy.realscout.com/" target="_blank" rel="noopener noreferrer" className="hover:text-lmhy-coral">
                  Properties
                </a>
              </li>
              <li>/</li>
              <li className="text-lmhy-charcoal">{property.name}</li>
            </ol>
          </nav>

          {/* Property Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-lmhy-charcoal mb-2">
              {property.name}
            </h1>
            <div className="flex items-center text-lmhy-charcoal/70 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {property.location}
            </div>
            <div className="text-3xl font-bold text-lmhy-coral">{property.price}</div>
          </div>

          {/* Main Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Property Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-lmhy-charcoal mb-4">Property Details</h2>
              <p className="text-lmhy-charcoal/80 mb-6">{property.description}</p>

              <div className="bg-lmhy-sand/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-lmhy-charcoal mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-lmhy-coral mr-2" />
                    <span className="text-lmhy-charcoal/80">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-lmhy-coral mr-2" />
                    <span className="text-lmhy-charcoal/80">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-lmhy-coral mr-2" />
                    <span className="text-lmhy-charcoal/80">
                      {property.squareFeet.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-lmhy-coral mr-2" />
                    <span className="text-lmhy-charcoal/80">Built {property.yearBuilt}</span>
                  </div>
                </div>
              </div>

              {/* RealScout Widget Integration Point */}
              <div className="bg-lmhy-coral/5 rounded-lg p-6">
                <h3 className="text-xl font-bold text-lmhy-charcoal mb-2">Schedule a Showing</h3>
                <p className="text-lmhy-charcoal/80 mb-4">
                  Contact us to schedule a private viewing of this property.
                </p>
                <Button asChild className="bg-lmhy-coral hover:bg-lmhy-coral-dark">
                  <a href="/contact">Contact Agent</a>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white border border-lmhy-sand/60 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-lmhy-charcoal mb-4">Contact Agent</h3>
                <p className="text-lmhy-charcoal/70 mb-4">Dr. Jan Duffy</p>
                <p className="text-sm text-lmhy-charcoal/70 mb-6">
                  Berkshire Hathaway HomeServices Nevada Properties
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-lmhy-coral hover:bg-lmhy-coral-dark">
                    <a href="tel:+17025001942">Call (702) 500-1942</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/contact">Send Message</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
