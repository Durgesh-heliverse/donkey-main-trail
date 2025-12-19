"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Map,
  Clock,
  TrendingUp,
  Users,
  Award,
  Camera,
  Heart,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface TrailInfoProps {
  data: {
    aboutSection?: {
      title: string;
      highlightedText: string;
      description: string;
      stats?: Array<{
        icon: string;
        value: string;
        label: string;
      }>;
    };
    trailHighlights?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    historicalNote?: {
      title: string;
      content: string;
    };
    carousel?: {
      images?: Array<{
        image: {
          asset: any;
        };
        card?: {
          icon: string;
          title: string;
          subtitle: string;
          description: string;
        };
      }>;
    };
  };
}

// Default mock data for component
const DEFAULT_DATA = {
  aboutSection: {
    title: "About the",
    highlightedText: "Donkey Trail",
    description:
      "Long ago, before modern roads, the daring 'Donkey Trail' over the majestic Swartberg Mountain connected Calitzdorp to Die Hel—the sole lifeline linking this remote region to the outside world. Join us on a memorable hike along this historic route, and step back in time to experience the rugged beauty and storied past of the trail that once carried hope and connection through challenging terrains.",
    stats: [
      { icon: "map", value: "77km", label: "Total Distance" },
      { icon: "clock", value: "5 Days", label: "Duration" },
      { icon: "trendingUp", value: "Mod - Difficult", label: "Difficulty" },
      { icon: "users", value: "10 People", label: "Max Group Size" },
    ],
  },
  trailHighlights: [
    {
      icon: "award",
      title: "UNESCO World Heritage Site",
      description:
        "Experience walking through the breathtaking Swartberg Mountains, recognized globally for their outstanding natural beauty and geological significance.",
    },
    {
      icon: "clock",
      title: "Historical Gamkaskloof",
      description:
        "Explore the legendary 'Die Hel,' a remote and rugged area rich in history and untouched wilderness, the Donkey Trail was once a vital trade route for this community.",
    },
    {
      icon: "camera",
      title: "Scenic Bosch Luys Kloof",
      description:
        "Conclude your journey at the stunning Bosch Luys Kloof, a pristine nature reserve renowned for its dramatic cliffs, clear streams and landscapes.",
    },
    {
      icon: "heart",
      title: "Cultural and Natural Heritage",
      description:
        "Traverse a trail steeped in history, from ancient pathways used by early explorers to vibrant flora and fauna thriving in this protected landscape. Along the way, experience the warmth of Karoo hospitality, and uncover the fascinating cultures that make this region truly special while supporting local communities.",
    },
  ],
  historicalNote: {
    title: "Historical Note",
    content:
      "Between the years 1830 and 1962 the inhabitants of the isolated valley of Gamkaskloof (Die Hel) had no road access into the valley. Access was only possible via a few footpaths which crossed the mountains and connected the valley to Calitzdorp and Prince Albert. These paths were used for transporting their produce from the valley to the markets and for bringing supplies to the area. Donkeys were utilized to carry the items from the valley to Calitzdorp via the Wyenek route.",
  },
  carousel: {
    images: [
      {
        image: {
          asset: null, // Placeholder - only used when Sanity has no images
        },
        card: {
          icon: "award",
          title: "UNESCO World Heritage Site",
          subtitle: "Cape Floral Region",
          description:
            "The Swartberg Mountains were declared part of the Cape Floral Region World Heritage Site in June 2004. This declaration was made by UNESCO in recognition of the region's exceptional biodiversity and the unique fynbos vegetation found there.",
        },
      },
    ],
  },
};

export default function TrailInfo({ data }: TrailInfoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Merge with defaults to ensure all data is present
  const aboutSection = data?.aboutSection || DEFAULT_DATA.aboutSection;
  const trailHighlights =
    data?.trailHighlights && data.trailHighlights.length > 0
      ? data.trailHighlights
      : DEFAULT_DATA.trailHighlights;
  const historicalNote = data?.historicalNote || DEFAULT_DATA.historicalNote;
  const carousel = data?.carousel || DEFAULT_DATA.carousel;

  const iconMap: { [key: string]: React.ReactNode } = {
    map: <Map className="h-6 w-6 text-accent-orange" />,
    clock: <Clock className="h-6 w-6 text-accent-orange" />,
    trendingUp: <TrendingUp className="h-6 w-6 text-accent-orange" />,
    users: <Users className="h-6 w-6 text-accent-orange" />,
    award: <Award className="h-6 w-6 text-accent-orange" />,
    camera: <Camera className="h-6 w-6 text-accent-orange" />,
    heart: <Heart className="h-6 w-6 text-accent-orange" />,
    quote: <Quote className="h-6 w-6 text-accent-orange" />,
  };

  // Use Sanity images if available, otherwise use default placeholder
  // This ensures the carousel shows exactly the number of images uploaded in Sanity
  const carouselImages =
    carousel?.images && carousel.images.length > 0
      ? carousel.images
      : DEFAULT_DATA.carousel.images;

  const nextImage = () => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }
  };

  const prevImage = () => {
    if (carouselImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );
    }
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < carouselImages.length) {
      setCurrentImageIndex(index);
    }
  };

  // Reset index if it's out of bounds
  const safeIndex =
    currentImageIndex >= carouselImages.length ? 0 : currentImageIndex;
  const currentImage = carouselImages[safeIndex];
  const currentCard =
    currentImage?.card || DEFAULT_DATA.carousel.images[0]?.card;

  return (
    <section id="trail-info" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        {aboutSection && (
          <>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {aboutSection.title}{" "}
                <span className="text-accent-orange">
                  {aboutSection.highlightedText}
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {aboutSection.description}
              </p>
            </div>

            {/* Stats Cards */}
            {aboutSection.stats && aboutSection.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {aboutSection.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-2xl p-6 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                      {iconMap[stat.icon] || (
                        <Map className="h-6 w-6 text-accent-orange" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Trail Highlights and Carousel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Trail Highlights - Always Show */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Trail Highlights
            </h3>
            <div className="space-y-6">
              {trailHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {iconMap[highlight.icon] || (
                      <Award className="h-6 w-6 text-accent-orange" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Historical Note - Always Show */}
            {historicalNote && (
              <div className="mt-8 p-8 bg-gray-50 rounded-2xl border-l-8 border-accent-orange shadow-lg">
                <h4 className="font-semibold text-accent-orange mb-4 flex items-center">
                  <Quote className="h-6 w-6 text-accent-orange mr-3" />
                  {historicalNote.title}
                </h4>
                <p className="text-gray-800 text-lg leading-relaxed italic">
                  {historicalNote.content}
                </p>
              </div>
            )}
          </div>

          {/* Image Carousel - Always Show */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl relative group">
              {currentImage?.image?.asset ? (
                <div className="relative w-full h-96 lg:h-[500px]">
                  <Image
                    src={urlFor(currentImage.image).url()}
                    alt="Donkey Trail adventure scenery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Award className="h-16 w-16 mx-auto mb-4 text-accent-orange opacity-50" />
                    <p className="text-lg font-medium">Trail Image</p>
                  </div>
                </div>
              )}
              {carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 z-10"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    {safeIndex + 1} / {carouselImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Carousel Indicators - Always Show if more than 1 image */}
            {carouselImages.length > 1 && (
              <div className="flex justify-center space-x-1 mt-6">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`h-1 transition-all duration-500 ease-out cursor-pointer ${
                      index === safeIndex
                        ? "bg-accent-orange w-8"
                        : "bg-gray-300 w-4 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Overlay Card - Always Show */}
            {currentCard && (
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-lg p-6 max-w-xs hidden lg:block z-10">
                <div className="flex items-center space-x-3 mb-3">
                  {iconMap[currentCard.icon] && (
                    <div className="flex-shrink-0 w-8 h-8">
                      {iconMap[currentCard.icon]}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {currentCard.title}
                    </h4>
                    {currentCard.subtitle && (
                      <p className="text-sm text-gray-600">
                        {currentCard.subtitle}
                      </p>
                    )}
                  </div>
                </div>
                {currentCard.description && (
                  <p className="text-sm text-gray-600">
                    {currentCard.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
