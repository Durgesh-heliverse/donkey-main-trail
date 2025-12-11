"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Instagram, ExternalLink } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface FooterProps {
  data: {
    logo?: {
      asset: any;
    };
    location?: string;
    description?: string;
    socialMedia?: Array<{
      platform: string;
      url: string;
    }>;
    trailInformation?: {
      title?: string;
      links?: Array<{
        label: string;
        href: string;
      }>;
    };
    resources?: {
      title?: string;
      links?: Array<{
        label: string;
        href: string;
        isExternal?: boolean;
        hasAvailabilityTrigger?: boolean;
      }>;
    };
    contactInfo?: {
      title?: string;
      address?: {
        line1: string;
        line2: string;
      };
      phone?: string;
      email?: string;
    };
    quickFacts?: {
      title?: string;
      facts?: Array<{
        label: string;
        value: string;
      }>;
    };
    copyright?: {
      text?: string;
      termsLink?: {
        text: string;
        href: string;
      };
    };
  };
}

export default function Footer({ data }: FooterProps) {
  const {
    logo,
    location,
    description,
    socialMedia,
    trailInformation,
    resources,
    contactInfo,
    quickFacts,
    copyright,
  } = data;

  const handleAvailabilityClick = () => {
    // This would typically trigger a modal or scroll to availability section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About the Trail */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {logo?.asset ? (
                <div className="relative h-16 w-auto mb-4">
                  <Image
                    src={urlFor(logo).url()}
                    alt="Donkey Trail Logo"
                    width={64}
                    height={64}
                    className="object-contain filter invert brightness-0 invert"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm font-bold">DT</span>
                </div>
              )}
              <div className="text-sm text-gray-400">
                {location || "Calitzdorp, Western Cape South Africa"}
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {description ||
                "Experience one of South Africa's most spectacular hiking trails in the Klein Karoo, Western Cape. Kilometers of pristine wilderness, rock-pools, kloofs, rivers and breathtaking mountain views."}
            </p>
            <div className="flex space-x-4">
              {socialMedia?.map((social, index) => {
                if (social.platform === "facebook") {
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  );
                }
                if (social.platform === "instagram") {
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Column 2: Trail Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {trailInformation?.title || "Trail Information"}
            </h3>
            <ul className="space-y-3">
              {trailInformation?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href || "#"}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-left block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{resources?.title || "Resources"}</h3>
            <ul className="space-y-3">
              {resources?.links?.map((link, index) => (
                <li key={index}>
                  {link.hasAvailabilityTrigger ? (
                    <button
                      onClick={handleAvailabilityClick}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <a
                      href={link.href || "#"}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <span>{link.label}</span>
                      {link.isExternal && <ExternalLink className="h-3 w-3" />}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information & Quick Facts */}
          <div>
            <h3 className="text-lg font-semibold mb-6">
              {contactInfo?.title || "Contact Information"}
            </h3>
            <div className="space-y-4">
              {contactInfo?.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 text-sm">
                    <p>{contactInfo.address.line1}</p>
                    <p>{contactInfo.address.line2}</p>
                  </div>
                </div>
              )}
              {contactInfo?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              {contactInfo?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}
            </div>

            {/* Trail Quick Facts */}
            {quickFacts && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h4 className="font-medium text-white mb-3">
                  {quickFacts.title || "Trail Quick Facts"}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {quickFacts.facts?.map((fact, index) => (
                    <div key={index}>
                      <span className="text-orange-400 font-medium">{fact.value}</span>
                      <p className="text-gray-400">{fact.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {copyright?.text ||
                "© 2025 Donkey Trail Information Portal. Trail managed by Erika Calitz."}
            </p>
            {copyright?.termsLink && (
              <div className="flex space-x-6 text-sm">
                <Link
                  href={copyright.termsLink.href || "#"}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {copyright.termsLink.text || "Terms & Conditions"}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
