"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Tent,
  Bed,
  Utensils,
  Mountain,
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface InteractiveMapProps {
  data: {
    title?: string;
    highlightedText?: string;
    description?: string;
    mapUrl?: string;
    legend?: Array<{
      type: string;
      label: string;
      color: string;
    }>;
    trailPoints?: Array<{
      id: string;
      day: string;
      title: string;
      distance: string;
      difficulty: string;
      type: string; // start, accommodation, viewpoint, end
      icon?: string;
      customIcon?: {
        asset: any;
      };
      description?: string;
      highlights?: string[];
      images?: Array<{
        image?: {
          asset: any;
        };
        videoUrl?: string;
        isYoutube?: boolean;
      }>;
    }>;
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  mapPin: <MapPin className="h-5 w-5 text-white" />,
  tent: <Tent className="h-5 w-5 text-white" />,
  bed: <Bed className="h-5 w-5 text-white" />,
  utensils: <Utensils className="h-5 w-5 text-white" />,
  mountain: <Mountain className="h-2 w-2 text-white" />,
};

const typeColorMap: { [key: string]: string } = {
  brown: "bg-amber-800",
  green: "bg-green-700",
  stone: "bg-stone-700",
  red: "bg-red-900",
  orange: "bg-orange-500",
};

export default function InteractiveMap({ data }: InteractiveMapProps) {
  const { title, highlightedText, description, mapUrl, legend, trailPoints } =
    data;
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<
    Array<{
      image?: { asset: any };
      videoUrl?: string;
      isYoutube?: boolean;
    }>
  >([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handlePointToggle = useCallback((pointId: string) => {
    setExpandedPoint((prev) => (prev === pointId ? null : pointId));
  }, []);

  const handleImageClick = useCallback(
    (
      images: Array<{
        image?: { asset: any };
        videoUrl?: string;
        isYoutube?: boolean;
      }>,
      startIndex: number = 0
    ) => {
      setSelectedImages(images);
      setCurrentImageIndex(startIndex);
      setImageModalOpen(true);
    },
    []
  );

  const handleCloseImageModal = useCallback(() => {
    setImageModalOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  }, []);

  const handleNextImage = useCallback(() => {
    if (selectedImages.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  }, [selectedImages]);

  const handlePrevImage = useCallback(() => {
    if (selectedImages.length === 0) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  }, [selectedImages]);

  // Keyboard navigation and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && imageModalOpen) {
        handleCloseImageModal();
      }
    };

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (!imageModalOpen) return;
      if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    };

    if (imageModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "unset";
    };
  }, [imageModalOpen, handleCloseImageModal, handlePrevImage, handleNextImage]);

  // Scroll thumbnail into view when current index changes
  useEffect(() => {
    if (thumbnailRef.current && imageModalOpen) {
      const thumbnail = thumbnailRef.current.children[
        currentImageIndex
      ] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentImageIndex, imageModalOpen]);

  return (
    <section
      id="interactive-map"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title && <span className="text-grey-900">{title} </span>}
            {highlightedText && (
              <span className="text-orange-500">{highlightedText}</span>
            )}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-green-100 to-blue-100 rounded-xl overflow-hidden">
                {mapUrl ? (
                  <iframe
                    src={mapUrl}
                    allowFullScreen
                    style={{ border: "0", width: "100%", height: "100%" }}
                    scrolling="no"
                    title="Interactive Trail Map"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Map URL not configured
                  </div>
                )}
              </div>

              {/* Legend */}
              {/* {legend && legend.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  {legend.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>

          {/* Trail Points List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Trail Points
              </h3>
              {trailPoints && trailPoints.length > 0 ? (
                <div className="space-y-3">
                  {trailPoints.map((point) => {
                    const IconComponent =
                      iconMap[point.icon || "mapPin"] || iconMap.mapPin;
                    const bgColor = typeColorMap[point.type] || "bg-gray-600";
                    const isExpanded = expandedPoint === point.id;
                    const difficultyColors: { [key: string]: string } = {
                      Easy: "bg-orange-100 text-orange-800",
                      Moderate: "bg-yellow-100 text-yellow-800",
                      Challenging: "bg-red-100 text-red-800",
                    };
                    const difficultyColor =
                      difficultyColors[point.difficulty] ||
                      "bg-gray-100 text-gray-800";

                    // Check if custom icon exists, otherwise use predefined icon
                    const hasCustomIcon = point.customIcon?.asset;

                    return (
                      <div
                        key={point.id}
                        className={`w-full rounded-lg border-2 transition-all duration-200 ${
                          isExpanded
                            ? "border-orange-500 bg-white"
                            : "border-gray-200 hover:border-orange-300 hover:bg-gray-50"
                        }`}
                      >
                        <button
                          onClick={() => handlePointToggle(point.id)}
                          className="w-full text-left p-4"
                        >
                          <div className="flex items-start gap-3">
                            {hasCustomIcon ? (
                              <div className="flex-shrink-0 relative">
                                <div className="relative w-9 h-9">
                                  <Image
                                    src={urlFor(point.customIcon!)
                                      .width(40)
                                      .height(40)
                                      .url()}
                                    alt={`${point.title} icon`}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="40px"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`${bgColor} p-2 rounded-lg flex-shrink-0`}
                              >
                                {IconComponent}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-500">
                                  {point.day}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded">
                                    {point.distance}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4 text-gray-600" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 text-gray-600" />
                                  )}
                                </div>
                              </div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {point.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs">
                                <span
                                  className={`px-2 py-1 rounded capitalize ${difficultyColor}`}
                                >
                                  {point.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0 border-t border-orange-200 mt-2">
                            {point.description && (
                              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                {point.description}
                              </p>
                            )}

                            {/* Images Grid */}
                            {point.images && point.images.length > 0 && (
                              <div className="mb-4 ">
                                <div className="grid grid-cols-4 gap-2">
                                  {point.images
                                    .slice(0, 4)
                                    .map((imageItem, imgIndex) => (
                                      <button
                                        key={imgIndex}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleImageClick(
                                            point.images || [],
                                            imgIndex
                                          );
                                        }}
                                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity group"
                                      >
                                        {imageItem.videoUrl ? (
                                          <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                              <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                                <Play className="h-6 w-6 text-gray-900 ml-1" />
                                              </div>
                                            </div>
                                            {imageItem.image?.asset && (
                                              <Image
                                                src={urlFor(
                                                  imageItem.image
                                                ).url()}
                                                alt={`${point.title} - Video thumbnail`}
                                                fill
                                                className="object-cover opacity-50 cursor-pointer"
                                                sizes="(max-width: 768px) 25vw, 25vw"
                                              />
                                            )}
                                          </div>
                                        ) : imageItem.image?.asset ? (
                                          <Image
                                            src={urlFor(imageItem.image).url()}
                                            alt={`${point.title} - Image ${
                                              imgIndex + 1
                                            }`}
                                            fill
                                            className="object-cover cursor-pointer"
                                            sizes="(max-width: 768px) 25vw, 25vw"
                                          />
                                        ) : null}
                                      </button>
                                    ))}
                                </div>
                              </div>
                            )}

                            {/* Highlights */}
                            {point.highlights &&
                              point.highlights.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-900 mb-2">
                                    Highlights:
                                  </h5>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                    {point.highlights.map(
                                      (highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No trail points configured
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Image Modal - Only shows images */}
        {imageModalOpen && selectedImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleCloseImageModal}
          >
            <div
              className="relative bg-black rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image/Video Container */}
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                {/* Close Button - positioned relative to image container */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseImageModal();
                  }}
                  className="absolute top-4 right-4 z-30 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                {/* Navigation Arrows - positioned relative to image container, centered on actual image */}
                {selectedImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center transition-all duration-200 group"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-8 w-8 text-white cursor-pointer drop-shadow-lg group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center transition-all duration-200 group"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-8 w-8 text-white cursor-pointer drop-shadow-lg group-hover:scale-110 transition-transform" />
                    </button>
                  </>
                )}

                <div className="relative w-full h-full max-w-full max-h-full">
                  {selectedImages[currentImageIndex]?.videoUrl ? (
                    <div className="relative w-full h-full">
                      {selectedImages[currentImageIndex].isYoutube ? (
                        <iframe
                          className="w-full h-full"
                          src={selectedImages[currentImageIndex].videoUrl}
                          title="Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={selectedImages[currentImageIndex].videoUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  ) : selectedImages[currentImageIndex]?.image?.asset ? (
                    <Image
                      src={urlFor(
                        selectedImages[currentImageIndex].image!
                      ).url()}
                      alt={`Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      priority={currentImageIndex === 0}
                    />
                  ) : null}
                </div>
              </div>

              {/* Bottom Thumbnail Bar */}
              {selectedImages.length > 1 && (
                <div className="bg-gray-900 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white text-lg font-semibold">
                      Trail Images
                    </h4>
                    <span className="text-white/70 text-sm">
                      {currentImageIndex + 1} of {selectedImages.length}
                    </span>
                  </div>

                  {/* Thumbnail Strip */}
                  <div
                    className="flex gap-2 overflow-x-scroll p-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#eb5a3b #1f2937",
                      WebkitOverflowScrolling: "touch",
                      scrollbarGutter: "stable",
                    }}
                  >
                    <div ref={thumbnailRef} className="flex gap-2 min-w-max">
                      {selectedImages.map((imageItem, index) => {
                        const isActive = index === currentImageIndex;

                        return (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                              isActive
                                ? "border-orange-500 scale-110"
                                : "border-white/30 hover:border-white/60"
                            }`}
                          >
                            {imageItem.videoUrl ? (
                              <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                  <Play className="h-4 w-4 text-white ml-0.5" />
                                </div>
                                {imageItem.image?.asset && (
                                  <Image
                                    src={urlFor(imageItem.image)
                                      .width(64)
                                      .height(48)
                                      .url()}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover opacity-50"
                                    sizes="64px"
                                  />
                                )}
                              </div>
                            ) : imageItem.image?.asset ? (
                              <Image
                                src={urlFor(imageItem.image)
                                  .width(64)
                                  .height(48)
                                  .url()}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
