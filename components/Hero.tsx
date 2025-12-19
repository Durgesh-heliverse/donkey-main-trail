"use client";
import React from "react";
import { Map, ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

interface HeroProps {
  data: {
    backgroundImage?: {
      asset: any;
    };
    title: string;
    highlightedText: string;
    description: string;
    promotionalTag?: string;
    trailStats: {
      totalDistance: string;
      duration: string;
      difficulty: string;
    };
    primaryButton: {
      text: string;
      link: string;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
}

export default function Hero({ data }: HeroProps) {
  const {
    backgroundImage,
    title,
    highlightedText,
    description,
    promotionalTag,
    trailStats,
    primaryButton,
    secondaryButton,
  } = data;

  // Get background image URL
  const getBackgroundImageUrl = () => {
    if (backgroundImage?.asset) {
      try {
        const url = urlFor(backgroundImage).url();
        return url;
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const imageUrl = getBackgroundImageUrl();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${imageUrl}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
        </div>
      )}

      {/* Content - Centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Title - Exact size matching image */}
          <h1 className="text-white font-bold text-[32px] sm:text-[56px] mb-6 leading-[1.1]">
            <span className="text-white">{title}</span>{" "}
            <span className="text-accent-orange">{highlightedText}</span>
          </h1>

          {/* Description - Exact size */}
          <p className="text-white text-[18px] sm:text-[24px] mb-8 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          {/* Promotional Tag - Exact size */}
          {promotionalTag && (
            <div className="mb-10 flex justify-center">
              <span className="bg-accent-darkOrange text-white px-6 py-2.5 rounded-full text-[14px] font-medium inline-block">
                {promotionalTag}
              </span>
            </div>
          )}

          {/* Trail Statistics Box - Exact matching */}
          {trailStats && (
            <div className="bg-white/10 backdrop-blur-[10px] rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {/* Total Distance */}
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <svg
                      className="w-7 h-7 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <div className="text-[16px] sm:text-[24px] font-bold text-accent-orange mb-1.5">
                    {trailStats.totalDistance}
                  </div>
                  <div className="text-[12px] sm:text-[14px] text-gray-300 font-semibold">
                    Total Distance
                  </div>
                </div>

                {/* Duration */}
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <svg
                      className="w-7 h-7 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-[16px] sm:text-[24px] font-bold text-accent-orange mb-1.5">
                    {trailStats.duration}
                  </div>
                  <div className="text-[12px] sm:text-[14px] text-gray-300 font-semibold">
                    Duration
                  </div>
                </div>

                {/* Difficulty */}
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    <svg
                      className="w-7 h-7 text-accent-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="text-[16px] sm:text-[24px] font-bold text-accent-orange mb-1.5 whitespace-nowrap">
                    {trailStats.difficulty}
                  </div>
                  <div className="text-[12px] sm:text-[14px] text-gray-300 font-semibold">
                    Difficulty
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action Buttons - Exact matching */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary Button - Orange */}
            {primaryButton && (
              <Link href={primaryButton.link || "#"}>
                <button className=" cursor-pointer bg-accent-darkOrange hover:bg-accent-darkOrange/90 text-white px-7 py-3 rounded-full font-semibold text-[15px] sm:text-[16px] transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center gap-2">
                  {primaryButton.text}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}

            {/* Secondary Button - White/Translucent with dark text */}
            {secondaryButton && (
              <Link href={secondaryButton.link || "#"}>
                <button className=" cursor-pointer bg-white/20 backdrop-blur-sm border-2 border-white/50 hover:bg-white/30 text-white hover:text-gray-900 px-7 py-3 rounded-full font-semibold text-[15px] sm:text-[16px] transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  {secondaryButton.text}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
