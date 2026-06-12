import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James T.",
    location: "Plano, TX",
    rating: 5,
    date: "March 2024",
    text: "Dallas Siding Experts completely transformed our home. We hired them for James Hardie installation after hail damage and the crew was absolutely professional from start to finish. The project was done in 3 days, perfectly matching our trim color. Our neighbors keep asking who did the work!",
    service: "James Hardie Siding",
  },
  {
    name: "Maria S.",
    location: "Frisco, TX",
    rating: 5,
    date: "January 2024",
    text: "After the major storm in December, we had significant siding damage. Dallas Siding Experts responded within 2 hours, helped document everything for our insurance claim, and completed the repairs faster than we expected. They took all the stress out of a very stressful situation.",
    service: "Storm Damage Repair",
  },
  {
    name: "Robert & Linda K.",
    location: "Garland, TX",
    rating: 5,
    date: "November 2023",
    text: "We replaced all the original 1980s wood siding on our ranch-style home with vinyl siding. The team was meticulous, cleaned up every day, and the finished product looks incredible. The energy savings on our first winter electric bill were noticeable immediately!",
    service: "Vinyl Siding Replacement",
  },
  {
    name: "David H.",
    location: "McKinney, TX",
    rating: 5,
    date: "August 2023",
    text: "I got four quotes for our siding replacement. Dallas Siding Experts wasn't the cheapest, but they were the only contractor who provided a detailed written estimate and actually explained what they were doing and why. Worth every penny — exceptional quality.",
    service: "Full Siding Replacement",
  },
  {
    name: "Angela W.",
    location: "Irving, TX",
    rating: 5,
    date: "June 2023",
    text: "Had them repair some rotting sections on the north side of our house. The repair blends seamlessly with the existing siding — you can't even tell where the new boards are. Quick, professional, and fairly priced. This is my go-to company for all future siding needs.",
    service: "Siding Repair",
  },
  {
    name: "Michael & Tanya B.",
    location: "Richardson, TX",
    rating: 5,
    date: "April 2023",
    text: "Our entire neighborhood was hit by hail last spring. Several neighbors chose cheaper contractors and ended up with problems. We chose Dallas Siding Experts and couldn't be happier. The crew was respectful, the fiber cement siding looks gorgeous, and the warranty gives us total peace of mind.",
    service: "Fiber Cement Siding",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-orange font-bold text-sm tracking-widest uppercase mb-3">
            Customer Reviews
          </span>
          <h2 id="testimonials-heading" className="section-heading mb-4">
            What Dallas Homeowners{" "}
            <span className="text-brand-orange">Say About Us</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real homeowners across Dallas
            and DFW have to say about their experience with Dallas Siding Experts.
          </p>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 mt-6 bg-brand-gray rounded-2xl px-6 py-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
            </div>
            <div>
              <span className="font-extrabold text-brand-blue text-xl">4.9</span>
              <span className="text-gray-500 text-sm ml-1">/ 5 — Based on 247 Google Reviews</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <article
              key={review.name}
              className="group bg-white border border-gray-100 rounded-2xl p-6 card-hover shadow-sm relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors">
                <Quote className="w-16 h-16 fill-current" />
              </div>

              {/* Service badge */}
              <div className="inline-block bg-blue-50 text-brand-blue-light text-xs font-bold px-3 py-1 rounded-full mb-4">
                {review.service}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Text */}
              <blockquote
                className="text-gray-700 text-sm leading-relaxed mb-5 italic"
                itemProp="reviewBody"
              >
                &ldquo;{review.text}&rdquo;
              </blockquote>

              {/* Reviewer */}
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div>
                  <div
                    className="font-bold text-brand-blue text-sm"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span itemProp="name">{review.name}</span>
                  </div>
                  <div className="text-gray-500 text-xs">{review.location}</div>
                </div>
                <div className="text-gray-400 text-xs">{review.date}</div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4 text-base">
            Ready to join our 500+ satisfied Dallas homeowners?
          </p>
          <a
            href="#contact"
            id="reviews-cta-btn"
            className="btn-orange text-base py-4 px-10 shadow-lg shadow-orange-500/25"
          >
            Get Your Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
