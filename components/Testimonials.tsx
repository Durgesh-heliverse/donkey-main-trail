"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface TestimonialsProps {
  data: {
    title?: string;
    highlightedText?: string;
    description?: string;
    testimonials?: Array<{
      quote: string;
      author: {
        name: string;
        location: string;
        year: string;
        image?: {
          asset: any;
        };
      };
      rating?: number;
    }>;
    shareStory?: {
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
    };
  };
}

export default function Testimonials({ data }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title, highlightedText, description, testimonials, shareStory } = data;

  const safeTestimonials = testimonials && testimonials.length > 0 ? testimonials : [];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % safeTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = safeTestimonials[currentIndex];

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title || "Voices from the"}{" "}
            <span className="text-orange-600">{highlightedText || "Trail"}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description || "Hear from fellow adventurers who have walked the legendary Donkey Trail and discovered the transformative power of this extraordinary journey."}
          </p>
        </div>

        {/* Testimonials Carousel */}
        {safeTestimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative Quote Icon */}
              <Quote className="absolute top-8 right-8 h-24 w-24 text-orange-100 transform rotate-12" />

              <div className="relative z-10">
                {/* Stars Rating */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 text-center italic font-light">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  {currentTestimonial.author.image?.asset ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-orange-100">
                      <Image
                        src={urlFor(currentTestimonial.author.image).url()}
                        alt={currentTestimonial.author.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-orange-100 flex items-center justify-center">
                      <span className="text-gray-400 text-xl font-bold">
                        {currentTestimonial.author.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {currentTestimonial.author.name}
                    </h4>
                    <p className="text-gray-600">{currentTestimonial.author.location}</p>
                    <p className="text-orange-600 font-semibold">
                      {currentTestimonial.author.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {safeTestimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 z-20"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination Dots */}
        {safeTestimonials.length > 1 && (
          <div className="flex justify-center space-x-3 mt-12">
            {safeTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-600 w-8 h-2"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Share Your Story Section */}
        {shareStory && (
          <div className="text-center mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-orange-100">
              <Quote className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {shareStory.title || "Share Your Story"}
              </h3>
              <p className="text-gray-600 mb-6">
                {shareStory.description || "Have you experienced the magic of the Donkey Trail? We'd love to hear about your journey and share your story with future adventurers."}
              </p>
              <a
                href={shareStory.buttonLink || "#"}
                target={shareStory.buttonLink?.startsWith("http") ? "_blank" : undefined}
                rel={shareStory.buttonLink?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200"
              >
                {shareStory.buttonText || "Share Your Experience"}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

