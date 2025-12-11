"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Camera, Play, Heart, Download, ChevronLeft, ChevronRight, X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface GalleryProps {
  data: {
    title?: string;
    highlightedText?: string;
    description?: string;
    filters?: Array<{
      label: string;
      value: string;
    }>;
    items?: Array<{
      image?: {
        asset: any;
      };
      videoUrl?: string;
      isYoutube?: boolean;
      thumbnail?: {
        asset: any;
      };
      title: string;
      description: string;
      filter: string; // e.g., "videos", "trails", "fauna & flora", "camping & accommodation"
    }>;
  };
}

export default function Gallery({ data }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("all photos");
  const [sliderOpen, setSliderOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title, highlightedText, description, filters, items = [] } = data || {};

  // Normalize filter value for comparison
  const normalizeFilter = (filter: string) => {
    return filter.toLowerCase().trim().replace(/\s+/g, " ");
  };

  // Get unique filters from items
  const availableFilters = useMemo(() => {
    const defaultFilters = [
      { label: "All Photos", value: "all photos" },
      { label: "Videos", value: "videos" },
      { label: "Trails", value: "trails" },
      { label: "Fauna & Flora", value: "fauna & flora" },
      { label: "Camping & Accommodation", value: "camping & accommodation" },
    ];

    if (filters && filters.length > 0) {
      return [{ label: "All Photos", value: "all photos" }, ...filters];
    }

    return defaultFilters;
  }, [filters]);

  // Filter items based on active filter
  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    if (normalizeFilter(activeFilter) === "all photos") {
      return items;
    }

    return items.filter((item) => {
      const itemFilter = normalizeFilter(item.filter || "");
      const activeFilterNormalized = normalizeFilter(activeFilter);
      return itemFilter === activeFilterNormalized;
    });
  }, [items, activeFilter]);

  const openSlider = useCallback((index: number) => {
    setCurrentIndex(index);
    setSliderOpen(true);
  }, []);

  const closeSlider = () => {
    setSliderOpen(false);
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const currentItem = filteredItems[currentIndex];

  // Extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    if (url.includes("youtube.com/watch?v=")) {
      return url.split("v=")[1]?.split("&")[0];
    }
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    return url.split("/").pop();
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title || "Trail"}{" "}
              <span className="text-orange-600">{highlightedText || "Gallery"}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description ||
                "Immerse yourself in the breathtaking beauty of the Donkey Trail through our collection of stunning photography and videos captured along the route."}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {availableFilters.map((filter, index) => {
              const isActive = normalizeFilter(activeFilter) === normalizeFilter(filter.value);
              return (
                <button
                  key={index}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => {
              const isVideo = !!item.videoUrl;
              const imageUrl = item.image?.asset
                ? urlFor(item.image).url()
                : item.thumbnail?.asset
                ? urlFor(item.thumbnail).url()
                : null;
              const youtubeId = isVideo && item.isYoutube ? getYouTubeVideoId(item.videoUrl || "") : null;
              const thumbnailUrl = youtubeId
                ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                : imageUrl;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer bg-gray-100"
                  onClick={() => openSlider(index)}
                  style={{ willChange: 'transform' }}
                >
                  {/* Image/Thumbnail */}
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                  )}

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-200 text-sm">{item.description}</p>
                    </div>
                  </div>

                  {/* Camera/Play Icon (Top Right) */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`bg-black/50 backdrop-blur-sm rounded-full p-2 ${
                        isVideo ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      }`}
                    >
                      {isVideo ? (
                        <Play className="h-5 w-5 text-white" />
                      ) : (
                        <Camera className="h-5 w-5 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Heart and Download Buttons (Top Left) */}
                  <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle favorite action
                      }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                      aria-label="Favorite"
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download action
                        if (imageUrl) {
                          const link = document.createElement("a");
                          link.href = imageUrl;
                          link.download = item.title;
                          link.click();
                        }
                      }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Slider Modal */}
      {sliderOpen && filteredItems.length > 0 && currentItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeSlider}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation Buttons */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={prevItem}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentIndex + 1} of {filteredItems.length}
              </div>
            </>
          )}

          {/* Content */}
          <div className="max-w-5xl w-full h-full flex items-center justify-center">
            {currentItem.videoUrl ? (
              <div className="w-full h-full flex items-center justify-center">
                {currentItem.isYoutube && getYouTubeVideoId(currentItem.videoUrl) ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentItem.videoUrl)}`}
                    title={currentItem.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="max-w-5xl max-h-[80vh] rounded-lg"
                    loading="eager"
                  />
                ) : (
                  <video
                    src={currentItem.videoUrl}
                    controls
                    autoPlay
                    preload="auto"
                    className="max-w-full max-h-[80vh] rounded-lg"
                  />
                )}
              </div>
            ) : currentItem.image?.asset ? (
              <div className="relative w-full h-full max-h-[80vh]">
                <Image
                  src={urlFor(currentItem.image).url()}
                  alt={currentItem.title}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            ) : null}
          </div>

          {/* Item Info */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center max-w-2xl px-4">
            <h3 className="text-white text-xl font-semibold mb-2">{currentItem.title}</h3>
            <p className="text-gray-300 text-sm">{currentItem.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

