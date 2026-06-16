"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

export interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  date?: string;
}

// Default reviews
export const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Tom Sanders",
    location: "Las Vegas, NV",
    rating: 5,
    text: "Dr. Duffy made our home buying experience seamless. Her knowledge of the Las Vegas market is unmatched, and she guided us through every step with professionalism and care.",
    image: "/Image/person1.jpeg",
    date: "2025-11-15",
  },
  {
    id: 2,
    name: "Vitor Palmer",
    location: "Henderson, NV",
    rating: 5,
    text: "We couldn't be happier with our new home! The entire process was smooth, and Dr. Duffy's attention to detail and negotiation skills saved us thousands. Highly recommend!",
    image: "/Image/person_2-min.jpg",
    date: "2025-10-22",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Summerlin, NV",
    rating: 5,
    text: "As first-time homebuyers, we were nervous about the process. Dr. Duffy patiently explained everything and helped us find the perfect home in our budget. Thank you!",
    image: "/Image/person_4-min.jpg",
    date: "2025-09-08",
  },
];

// Aggregate rating stats
export const aggregateRating = {
  ratingValue: 4.9,
  reviewCount: 500,
  bestRating: 5,
  worstRating: 1,
};

interface ReviewsSectionProps {
  /** Custom reviews to display */
  reviews?: Review[];
  /** Custom title */
  title?: string;
  /** Custom subtitle */
  subtitle?: string;
  /** Google Business Profile URL */
  googleReviewsUrl?: string;
  /** Custom class name */
  className?: string;
}

export default function ReviewsSection({
  reviews = defaultReviews,
  title = "What Clients Say",
  subtitle = "Real reviews from Las Vegas Valley buyers and sellers",
  googleReviewsUrl = "/google-business",
  className = "",
}: ReviewsSectionProps) {
  return (
    <section className={`lmhy-section bg-white ${className}`}>
      <div className="lmhy-container">
        <div className="text-center mb-12">
          <span className="lmhy-badge mb-4">Client Reviews</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lmhy-charcoal mb-4">
            {title}
          </h2>
          <p className="text-lg text-lmhy-charcoal/70 max-w-3xl mx-auto">{subtitle}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(aggregateRating.ratingValue)
                      ? "text-lmhy-gold fill-lmhy-gold"
                      : "text-lmhy-sand"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-lmhy-charcoal">
              {aggregateRating.ratingValue}
            </span>
            <span className="text-lmhy-charcoal/60">
              ({aggregateRating.reviewCount}+ reviews)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="lmhy-card"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  {review.image ? (
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-lmhy-charcoal/50 text-sm">{review.name[0]}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lmhy-charcoal" itemProp="author">
                    {review.name}
                  </h3>
                  <p className="text-sm text-lmhy-charcoal/60">{review.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-4" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                <meta itemProp="ratingValue" content={review.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-lmhy-gold fill-lmhy-gold" : "text-lmhy-sand"
                    }`}
                  />
                ))}
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-lmhy-sand" />
                <p className="text-lmhy-charcoal/80 relative z-10 pl-4 text-sm" itemProp="reviewBody">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lmhy-coral hover:text-lmhy-coral-dark font-semibold no-underline"
          >
            View Google Reviews
            <Star className="h-5 w-5 fill-lmhy-gold text-lmhy-gold" />
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Helper to convert reviews to schema format for ReviewSchema component
 * Use with: <ReviewSchema reviews={getReviewSchemaData(reviews)} aggregateRating={aggregateRating} />
 */
export function getReviewSchemaData(reviews: Review[]) {
  return reviews.map((review) => ({
    author: review.name,
    rating: review.rating,
    text: review.text,
    date: review.date,
  }));
}
