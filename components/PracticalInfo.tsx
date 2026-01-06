"use client";
import React, { useState } from "react";
import {
  Calendar,
  DollarSign,
  Backpack,
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
} from "lucide-react";

interface PracticalInfoProps {
  data: {
    title?: string;
    highlightedText?: string;
    description?: string;
    tabs?: Array<{
      id: string;
      label: string;
      icon?: string;
      shortLabel?: string;
    }>;
    bookingPermits?: {
      title?: string;
      items?: Array<{
        icon: string;
        iconColor: string;
        title: string;
        description: string;
      }>;
      bookingInfo?: {
        title: string;
        description: string;
        contactInfo?: {
          calls?: string;
          whatsapp?: string;
          email?: string;
        };
      };
    };
    costsFees?: {
      title?: string;
      price?: {
        amount: string;
        currency?: string;
        period?: string;
      };
      included?: Array<{
        title: string;
      }>;
      additionalCosts?: Array<{
        title: string;
      }>;
      specialRequirements?: {
        title: string;
        description: string;
        email?: string;
      };
    };
    packingList?: {
      title?: string;
      categories?: Array<{
        title: string;
        icon?: string;
        items: Array<{
          title: string;
        }>;
      }>;
    };
    safetyTips?: {
      title?: string;
      guidelines?: Array<{
        type: string; // warning, info, success
        icon: string;
        title: string;
        description: string;
      }>;
      emergencyContacts?: Array<{
        label: string;
        number: string;
      }>;
    };
  };
}

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <Calendar className="h-5 w-5" />,
  dollarSign: <DollarSign className="h-5 w-5" />,
  backpack: <Backpack className="h-5 w-5" />,
  alertTriangle: <AlertTriangle className="h-5 w-5" />,
  checkCircle: <CheckCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

const iconColorMap: { [key: string]: string } = {
  blue: "bg-blue-100 text-blue-600",
  orange: "bg-orange-100 text-orange-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
};

const typeColorMap: {
  [key: string]: { bg: string; text: string; icon: string };
} = {
  warning: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: "text-red-600",
  },
  info: {
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-gray-900",
    icon: "text-yellow-600",
  },
  success: {
    bg: "bg-yellow-50 border-yellow-200",
    text: "text-gray-900",
    icon: "text-green-600",
  },
};

export default function PracticalInfo({ data }: PracticalInfoProps) {
  const [activeTab, setActiveTab] = useState("booking");

  const {
    title,
    highlightedText,
    description,
    tabs,
    bookingPermits,
    costsFees,
    packingList,
    safetyTips,
  } = data;

  const defaultTabs = [
    {
      id: "booking",
      label: "Booking & Permits",
      icon: "calendar",
      shortLabel: "",
    },
    {
      id: "costs",
      label: "Costs & Fees",
      icon: "dollarSign",
      shortLabel: "ZAR",
    },
    { id: "packing", label: "Packing List", icon: "backpack", shortLabel: "" },
    {
      id: "safety",
      label: "Safety Tips",
      icon: "alertTriangle",
      shortLabel: "",
    },
  ];

  const activeTabs = tabs && tabs.length > 0 ? tabs : defaultTabs;

  const renderTabContent = () => {
    switch (activeTab) {
      case "booking":
        return renderBookingPermits();
      case "costs":
        return renderCostsFees();
      case "packing":
        return renderPackingList();
      case "safety":
        return renderSafetyTips();
      default:
        return renderBookingPermits();
    }
  };

  const renderBookingPermits = () => {
    if (!bookingPermits) return null;

    return (
      <div >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {bookingPermits.title || "Booking & Permits"}
        </h3>
        <div className="space-y-6">
          {bookingPermits.items?.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-xl border border-gray-200"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  iconColorMap[item.iconColor] || iconColorMap.blue
                }`}
              >
                {iconMap[item.icon] || iconMap.calendar}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}

          {bookingPermits.bookingInfo && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-orange-800 mb-3">
                {bookingPermits.bookingInfo.title}
              </h4>
              <div className="space-y-4 text-orange-700">
                <div>
                  <h5 className="font-semibold mb-2">
                    {bookingPermits.bookingInfo.description}
                  </h5>
                  {bookingPermits.bookingInfo.contactInfo && (
                    <div className="space-y-1 text-sm">
                      {bookingPermits.bookingInfo.contactInfo.calls && (
                        <p>
                          <strong>Calls:</strong>{" "}
                          {bookingPermits.bookingInfo.contactInfo.calls}
                        </p>
                      )}
                      {bookingPermits.bookingInfo.contactInfo.whatsapp && (
                        <p>
                          <strong>WhatsApp:</strong>{" "}
                          {bookingPermits.bookingInfo.contactInfo.whatsapp}
                        </p>
                      )}
                      {bookingPermits.bookingInfo.contactInfo.email && (
                        <p>
                          <strong>Email:</strong>{" "}
                          {bookingPermits.bookingInfo.contactInfo.email}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCostsFees = () => {
    if (!costsFees) return null;

    return (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {costsFees.title || "Costs & Fees"}
        </h3>

        {costsFees.price && (
          <div className="bg-orange-50 border-2 border-orange-200 text-center  rounded-xl p-8 mb-8">
            <div className="text-gray-900 font-medium text-lg mb-2">
              Complete Trail Experience
            </div>
            <div className="text-orange-600 text-5xl font-bold mb-2">
              {costsFees.price.currency || "R"}
              {costsFees.price.amount}
            </div>
            <div className="text-gray-600">
              {costsFees.price.period || "per person (5-day trail)"}
            </div>
          </div>
        )}

        {costsFees.included && costsFees.included.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              What&apos;s Included in the Price
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {costsFees.included.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 flex items-start space-x-3"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-gray-700">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {costsFees.additionalCosts && costsFees.additionalCosts.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Additional Costs (Not Included)
            </h4>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <ul className="space-y-2">
                {costsFees.additionalCosts.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <span className="text-orange-600 font-bold">•</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {costsFees.specialRequirements && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              {costsFees.specialRequirements.title}
            </h4>
            <p className="text-gray-700 mb-3">
              {costsFees.specialRequirements.description}
            </p>
            {costsFees.specialRequirements.email && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Mail className="h-5 w-5" />
                <a
                  href={`mailto:${costsFees.specialRequirements.email}`}
                  className="hover:underline"
                >
                  {costsFees.specialRequirements.email}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPackingList = () => {
    if (!packingList) return null;

    return (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {packingList.title || "Essential Packing List"}
        </h3>
        {packingList.categories && packingList.categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packingList.categories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center space-x-2 mb-4">
                  {category.icon && (
                    <div
                      className={`${
                        category.icon === "alertTriangle" ? "text-red-600" : ""
                      }`}
                    >
                      {iconMap[category.icon] || iconMap.backpack}
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-gray-900">
                    {category.title}
                  </h4>
                </div>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-5 w-5 text-orange-600" />
                      </div>
                      <span className="text-gray-700">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSafetyTips = () => {
    if (!safetyTips) return null;

    return (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {safetyTips.title || "Safety Guidelines"}
        </h3>

        {safetyTips.guidelines && safetyTips.guidelines.length > 0 && (
          <div className="space-y-4">
            {safetyTips.guidelines.map((guideline, index) => {
              const isWarning = guideline.type === "warning";
              const cardClass = isWarning
                ? "p-4 rounded-xl border-2 border-red-200 bg-red-50 text-red-800"
                : "p-4 rounded-xl border-2 border-yellow-200 bg-yellow-50 text-yellow-800";
              const iconClass = isWarning ? "text-red-800" : "text-yellow-800";

              // Get the icon component and render with correct size
              const IconComponent = (() => {
                const icon = iconMap[guideline.icon] || iconMap.info;
                if (React.isValidElement(icon)) {
                  return React.cloneElement(icon as React.ReactElement<any>, {
                    className: "h-6 w-6",
                  });
                }
                return icon;
              })();

              return (
                <div key={index} className={cardClass}>
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${iconClass} mt-0.5`}>
                      {IconComponent}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{guideline.title}</h4>
                      <p>{guideline.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {safetyTips.emergencyContacts &&
          safetyTips.emergencyContacts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-red-800 mb-3">
                Emergency Contacts
              </h4>
              <div className="space-y-2 text-red-700">
                {safetyTips.emergencyContacts.map((contact, index) => (
                  <p key={index}>
                    <strong>{contact.label}:</strong> {contact.number}
                  </p>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <section id="practical-info" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title || "Practical"}{" "}
            <span className="text-orange-600">
              {highlightedText || "Information"}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description ||
              "Everything you need to know to plan and prepare for your Donkey Trail adventure. From booking procedures to essential gear, we've got you covered."}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
          {activeTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                {tab.shortLabel && tab.shortLabel.trim() !== "" ? (
                  <span className="text-sm font-bold">{tab.shortLabel}</span>
                ) : (
                  tab.icon && iconMap[tab.icon]
                )}
                <span className="hidden sm:inline ml-2">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
}
