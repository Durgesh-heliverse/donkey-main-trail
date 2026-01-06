"use client";
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Download,
  Send,
  CheckCircle,
} from "lucide-react";
import Calendar from "./Calendar";
import { projectId, dataset } from "@/sanity/env";

interface ContactFormProps {
  data: {
    title?: string;
    highlightedText?: string;
    description?: string;
    contactInfo?: {
      title?: string;
      items?: Array<{
        icon: string;
        title: string;
        content: string | Array<string>;
      }>;
    };
    quickActions?: {
      title?: string;
      items?: Array<{
        icon: string;
        title: string;
        description: string;
        buttonText: string;
        buttonLink?: string;
        pdfFile?: {
          asset?: {
            _id?: string;
            url?: string;
            originalFilename?: string;
          };
        };
      }>;
    };
    form?: {
      title?: string;
      fields?: {
        groupSizeOptions?: Array<{
          value: string;
          label: string;
        }>;
        experienceOptions?: Array<{
          value: string;
          label: string;
        }>;
      };
      submitButtonText?: string;
    };
    calendar?: {
      availableDates?: string[];
      fullyBookedDates?: string[];
      helpInfo?: {
        title?: string;
        description?: string;
        phone?: string;
        email?: string;
      };
    };
    successMessage?: {
      title?: string;
      description?: string;
    };
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  mapPin: <MapPin className="h-6 w-6 text-orange-600" />,
  phone: <Phone className="h-6 w-6 text-orange-600" />,
  mail: <Mail className="h-6 w-6 text-orange-600" />,
  clock: <Clock className="h-6 w-6 text-orange-600" />,
  messageCircle: <MessageCircle className="h-5 w-5 text-orange-600" />,
  download: <Download className="h-4 w-4" />,
};

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hikeDate: "",
    hikeDateRaw: "", // Store original YYYY-MM-DD format
    groupSize: "",
    experience: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    title,
    highlightedText,
    description,
    contactInfo,
    quickActions,
    form,
    calendar,
    successMessage,
  } = data;

  // Listen for custom event from Footer to open calendar
  React.useEffect(() => {
    const handleOpenCalendar = () => {
      setIsCalendarOpen(true);
    };

    window.addEventListener("openAvailabilityCalendar", handleOpenCalendar);

    return () => {
      window.removeEventListener(
        "openAvailabilityCalendar",
        handleOpenCalendar
      );
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Format current date for Date of Enquiry
      const dateOfEnquiry = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Format Start Date as a string that Excel won't auto-convert
      // Use the formatted display string (e.g., "December 30, 2025") which Excel treats as text
      let startDateString = formData.hikeDate || "";

      // If we have the raw date but no formatted date, format it as text
      if (!startDateString && formData.hikeDateRaw) {
        const dateObj = new Date(formData.hikeDateRaw);
        startDateString = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Date of Enquiry": dateOfEnquiry,
          "Full Name": formData.name,
          "Email Address": formData.email,
          "Start Date": startDateString, // Send as formatted text string
          "Phone Number": formData.phone,
          "Group Size": formData.groupSize,
          Experience: formData.experience,
          Message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form. Please try again later.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        hikeDate: "",
        hikeDateRaw: "",
        groupSize: "",
        experience: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckAvailability = () => {
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date: string) => {
    // date is already in YYYY-MM-DD format from Calendar
    // Format date for display (e.g., "December 3, 2025")
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setFormData((prev) => ({
      ...prev,
      hikeDate: formattedDate, // Display format
      hikeDateRaw: date, // Store original YYYY-MM-DD format
    }));
    setIsCalendarOpen(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title || "Plan Your"}{" "}
            <span className="text-orange-600">
              {highlightedText || "Adventure"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description ||
              "Ready to experience the legendary Donkey Trail? Get in touch with our team for booking assistance, trail information, and expert advice to make your hike unforgettable."}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Get In Touch */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {contactInfo?.title || "Get In Touch"}
            </h3>

            <div className="space-y-8 mb-12">
              {contactInfo?.items?.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    {iconMap[item.icon] || iconMap.mapPin}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    {Array.isArray(item.content) ? (
                      item.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-600">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            {quickActions && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-6 flex items-center">
                  {/* {iconMap.messageCircle} */}
                  <span className="ml-2">
                    {quickActions.title || "Quick Actions"}
                  </span>
                </h4>
                <div className="space-y-4">
                  {quickActions.items?.map((action, index) => {
                    const handleDownload = async (e: React.MouseEvent) => {
                      e.preventDefault();
                      
                      // If PDF file exists, download it
                      if (action.pdfFile?.asset?.url) {
                        try {
                          const fileUrl = action.pdfFile.asset.url;
                          
                          // Use original filename if available, otherwise use action title
                          const filename = action.pdfFile.asset.originalFilename || 
                            action.title.replace(/\s+/g, "-") + ".pdf";
                          
                          // Add ?dl= parameter to force download with custom filename
                          const downloadUrl = `${fileUrl}?dl=${encodeURIComponent(filename)}`;
                          
                          // Create a temporary anchor element to trigger download
                          const link = document.createElement("a");
                          link.href = downloadUrl;
                          link.download = filename;
                          link.target = "_blank";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        } catch (error) {
                          console.error("Error downloading PDF:", error);
                          // Fallback: try to open in new tab
                          if (action.buttonLink) {
                            window.open(action.buttonLink, "_blank");
                          }
                        }
                      } else if (action.buttonLink) {
                        // Fallback to button link if no PDF
                        window.open(action.buttonLink, "_blank");
                      } else {
                        console.warn("No PDF file or button link available for:", action.title);
                      }
                    };

                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors duration-200 cursor-pointer"
                        onClick={handleDownload}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {iconMap[action.icon] || iconMap.messageCircle}
                            <div>
                              <h5 className="font-medium text-gray-900">
                                {action.title}
                              </h5>
                              <p className="text-sm text-gray-600">
                                {action.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center space-x-1">
                            {iconMap.download}
                            <span>{action.buttonText}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {successMessage?.title || "Message Sent!"}
                </h3>
                <p className="text-gray-600">
                  {successMessage?.description ||
                    "Thank you for reaching out. We&apos;ll respond within 24 hours."}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {form?.title || "Send Us an Inquiry"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Hike Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="+27 xx xxx xxxx"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="hikeDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Preferred Hike Date
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          id="hikeDate"
                          name="hikeDate"
                          readOnly
                          value={formData.hikeDate}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 cursor-pointer"
                          placeholder="Click 'Check Availability' to select a date"
                        />
                        <button
                          type="button"
                          onClick={handleCheckAvailability}
                          className="text-orange-600 hover:text-orange-700 text-sm font-medium underline"
                        >
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Group Size and Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="groupSize"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Group Size
                      </label>
                      <select
                        id="groupSize"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select group size</option>
                        {form?.fields?.groupSizeOptions?.map(
                          (option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Hiking Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      >
                        <option value="">Select experience level</option>
                        {form?.fields?.experienceOptions?.map(
                          (option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your planned hike, any special requirements, dietary restrictions, or questions you have about the trail..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>{form?.submitButtonText || "Send Enquiry"}</span>
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Calendar Popup */}
      <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onDateSelect={handleDateSelect}
        availableDates={calendar?.availableDates || []}
        fullyBookedDates={calendar?.fullyBookedDates || []}
        helpInfo={calendar?.helpInfo}
      />
    </section>
  );
}
