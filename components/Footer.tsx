"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ExternalLink,
  FileText,
  X,
  Calendar,
  CreditCard,
  AlertTriangle,
  Shield,
  Users,
} from "lucide-react";
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
    termsAndConditions?: {
      introduction?: string;
      lastUpdated?: string;
      sections?: Array<{
        title: string;
        icon: string;
        items: string[];
      }>;
      questionsSection?: {
        title?: string;
        description?: string;
        phone?: string;
        email?: string;
        address?: string;
      };
      agreementSection?: {
        title?: string;
        text?: string;
      };
    };
  };
}

const sectionIconMap: { [key: string]: React.ReactNode } = {
  calendar: <Calendar className="h-5 w-5 text-orange-600" />,
  creditCard: <CreditCard className="h-5 w-5 text-orange-600" />,
  alertTriangle: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  shield: <Shield className="h-5 w-5 text-orange-600" />,
  users: <Users className="h-5 w-5 text-orange-600" />,
  mapPin: <MapPin className="h-5 w-5 text-orange-600" />,
  fileText: <FileText className="h-5 w-5 text-orange-600" />,
};

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
    termsAndConditions,
  } = data;

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleAvailabilityClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    // Dispatch custom event to open calendar in ContactForm
    // Small delay to ensure scroll happens first
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("openAvailabilityCalendar"));
    }, 300);
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTermsModalOpen(true);
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isTermsModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTermsModalOpen]);

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
            <h3 className="text-lg font-semibold mb-6">
              {resources?.title || "Resources"}
            </h3>
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
                      <span className="text-orange-400 font-medium">
                        {fact.value}
                      </span>
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
                <button
                  onClick={handleTermsClick}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {copyright.termsLink.text || "Terms & Conditions"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {isTermsModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleCloseTermsModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Terms & Conditions
                </h2>
              </div>
              <button
                onClick={handleCloseTermsModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div>
                {termsAndConditions?.introduction && (
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {termsAndConditions.introduction}
                    </p>
                  </div>
                )}

                {termsAndConditions?.lastUpdated && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-center">
                    <p className="text-orange-800 font-medium">
                      Last Updated: {termsAndConditions.lastUpdated}
                    </p>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Dynamic Sections */}
                  {termsAndConditions?.sections &&
                    termsAndConditions.sections.length > 0 &&
                    termsAndConditions.sections.map((section, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            {sectionIconMap[section.icon] || (
                              <FileText className="h-5 w-5 text-orange-600" />
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {section.title}
                          </h3>
                        </div>
                        {section.items && section.items.length > 0 && (
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                  {item}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                  {/* Questions Section */}
                  {termsAndConditions?.questionsSection && (
                    <div className="bg-gray-50 rounded-xl p-6 mt-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Phone className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {termsAndConditions.questionsSection.title ||
                            "Questions About These Terms?"}
                        </h3>
                      </div>
                      {termsAndConditions.questionsSection.description && (
                        <p className="text-gray-700 mb-3 text-sm">
                          {termsAndConditions.questionsSection.description}
                        </p>
                      )}
                      <div className="space-y-1 text-gray-700 text-sm">
                        {termsAndConditions.questionsSection.phone && (
                          <p>
                            <strong>Phone:</strong>{" "}
                            {termsAndConditions.questionsSection.phone}
                          </p>
                        )}
                        {termsAndConditions.questionsSection.email && (
                          <p>
                            <strong>Email:</strong>{" "}
                            {termsAndConditions.questionsSection.email}
                          </p>
                        )}
                        {termsAndConditions.questionsSection.address && (
                          <p>
                            <strong>Address:</strong>{" "}
                            {termsAndConditions.questionsSection.address}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Agreement Section */}
                  {termsAndConditions?.agreementSection && (
                    <div className="bg-orange-600 text-white rounded-xl p-6 mt-6 text-center">
                      {termsAndConditions.agreementSection.title && (
                        <h4 className="text-lg font-bold mb-3">
                          {termsAndConditions.agreementSection.title}
                        </h4>
                      )}
                      {termsAndConditions.agreementSection.text && (
                        <p className="leading-relaxed text-sm">
                          {termsAndConditions.agreementSection.text}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
