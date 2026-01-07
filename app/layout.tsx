import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { client, previewClient } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PreviewBanner from "@/components/PreviewBanner";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "The Legendary Donkey Trail",
  description: "Calitzdorp's Premier Hiking Experience",
};

const HEADER_QUERY = `*[_type == "header"][0]{
  logo,
  navigation[]{
    name,
    href,
    hasDropdown
  },
  raceDropdownItems[]{
    name,
    href
  }
}`;

const FOOTER_QUERY = `*[_type == "footer"][0]{
  logo {
    asset
  },
  location,
  description,
  socialMedia[] {
      platform,
    url
  },
  trailInformation {
    title,
    links[] {
      label,
      href
    }
  },
  resources {
    title,
    links[] {
      label,
      href,
      isExternal,
      hasAvailabilityTrigger,
      pdfFile {
        asset-> {
          _id,
          url,
          originalFilename
        }
      }
    }
  },
  contactInfo {
    title,
    address {
      line1,
      line2
    },
    phone,
      email
  },
  quickFacts {
    title,
    facts[] {
      label,
      value
    }
  },
  copyright {
    text,
    termsLink {
      text,
      href
    }
  },
  termsAndConditions {
    introduction,
    lastUpdated,
    sections[] {
      title,
      icon,
      items
    },
    questionsSection {
      title,
      description,
      phone,
      email,
      address
    },
    agreementSection {
      title,
      text
    }
  }
}`;

// Default fallback footer data
const DEFAULT_FOOTER = {
  location: "Calitzdorp, Western Cape South Africa",
  description:
    "Experience one of South Africa's most spectacular hiking trails in the Klein Karoo, Western Cape. Kilometers of pristine wilderness, rock-pools, kloofs, rivers and breathtaking mountain views.",
  socialMedia: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/thedonkeytrail",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/thedonkeytrail/",
    },
  ],
  trailInformation: {
    title: "Trail Information",
    links: [
      { label: "Trail Information", href: "#trail-info" },
      { label: "Interactive Map", href: "#interactive-map" },
      { label: "Practical Info", href: "#practical-info" },
      { label: "Gallery", href: "#gallery" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      {
        label: "Check Availability",
        href: "#contact",
        hasAvailabilityTrigger: true,
      },
      {
        label: "Weather Forecast",
        href: "#",
        isExternal: true,
      },
      {
        label: "Gear Checklist",
        href: "#",
        isExternal: true,
      },
    ],
  },
  contactInfo: {
    title: "Contact Information",
    address: {
      line1: "Living Waters Mountain Estate, Groenfontein",
      line2: "Calitzdorp, Western Cape South Africa",
    },
    phone: "073 593 4007",
    email: "info@donkeytrail.com",
  },
  quickFacts: {
    title: "Trail Quick Facts",
    facts: [
      { label: "Distance", value: "77km" },
      { label: "Duration", value: "5 Days" },
      { label: "Difficulty", value: "Mod - Difficult" },
      { label: "Group Size", value: "10 Max" },
    ],
  },
  copyright: {
    text: "© 2025 Donkey Trail Information Portal. Trail managed by Erika Calitz.",
    termsLink: {
      text: "Terms & Conditions",
      href: "#",
    },
  },
  termsAndConditions: {
    introduction:
      "Please read these terms and conditions carefully before booking your Donkey Trail experience. By making a booking, you agree to be bound by these terms.",
    lastUpdated: "January 2025",
    sections: [
      {
        title: "Booking & Reservations",
        icon: "calendar",
        items: [
          "All bookings must be made in advance through our authorized booking channels.",
          "A deposit may be required to secure your reservation.",
          "Bookings are subject to availability and weather conditions.",
          "We reserve the right to cancel or reschedule trips due to safety concerns or adverse weather conditions.",
          "Alternative dates will be offered in case of cancellations due to circumstances beyond our control.",
        ],
      },
      {
        title: "Payment Terms",
        icon: "creditCard",
        items: [
          "Full payment is required before the commencement of the trail.",
          "Payments can be made via bank transfer, credit card, or other approved methods.",
          "All prices are quoted in South African Rand (ZAR) and are subject to change.",
          "Additional costs such as drinks and personal items are not included in the trail fee.",
          "Refunds will be processed according to our cancellation policy.",
        ],
      },
      {
        title: "Cancellation Policy",
        icon: "alertTriangle",
        items: [
          "Cancellations made more than 30 days before the trail date: Full refund minus administrative fee.",
          "Cancellations made 15-30 days before: 50% refund of total amount paid.",
          "Cancellations made less than 15 days before: No refund unless exceptional circumstances apply.",
          "Weather-related cancellations initiated by us will result in a full refund or alternative date.",
          "Medical emergencies may be considered for partial refunds with appropriate documentation.",
        ],
      },
      {
        title: "Safety & Liability",
        icon: "shield",
        items: [
          "Participants engage in hiking activities at their own risk.",
          "All participants must be in good physical condition and able to complete the trail requirements.",
          "Medical conditions must be disclosed during booking.",
          "Participants must follow all safety instructions provided by guides.",
          "We recommend comprehensive travel and medical insurance for all participants.",
          "The operator is not liable for personal injury, loss, or damage to personal property.",
          "Emergency evacuation costs are the responsibility of the participant.",
        ],
      },
      {
        title: "Participant Conduct",
        icon: "users",
        items: [
          "Participants must respect the natural environment and leave no trace.",
          "Alcohol and illegal substances are strictly prohibited on the trail.",
          "Participants must follow the guidance of trail guides at all times.",
          "Disruptive behavior may result in removal from the trail without refund.",
          "Respect for local communities and cultural sites is mandatory.",
          "Photography of other participants requires consent.",
        ],
      },
      {
        title: "Equipment & Personal Items",
        icon: "mapPin",
        items: [
          "Participants are responsible for bringing appropriate personal hiking equipment.",
          "A detailed packing list will be provided upon booking confirmation.",
          "The operator is not responsible for lost, stolen, or damaged personal items.",
          "Basic safety equipment and first aid supplies are provided by the operator.",
          "Participants may be refused entry if they do not have essential safety equipment.",
        ],
      },
    ],
    questionsSection: {
      title: "Questions About These Terms?",
      description:
        "If you have any questions about these terms and conditions, please don't hesitate to contact us:",
      phone: "073 593 4007",
      email: "info@donkeytrail.com",
      address:
        "Living Waters Mountain Estate, Groenfontein, Calitzdorp, Western Cape South Africa",
    },
    agreementSection: {
      title: "Agreement to Terms",
      text: "By booking and participating in the Donkey Trail experience, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. These terms constitute a legally binding agreement between you and the Donkey Trail operators.",
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Check if we're in the Studio route
  const headersList = await headers();
  const isStudioRoute = headersList.get("x-is-studio-route") === "true";

  // Check if we're in draft mode (preview)
  const { isEnabled: isDraftMode } = await draftMode();
  const sanityClient = isDraftMode ? previewClient : client;

  // Only fetch header and footer if not in Studio route
  let headerData = null;
  let footerData = DEFAULT_FOOTER;

  if (!isStudioRoute) {
    try {
      const [headerResult, footerResult] = await Promise.all([
        sanityClient.fetch(HEADER_QUERY).catch(() => null),
        sanityClient.fetch(FOOTER_QUERY).catch(() => null),
      ]);

      headerData = headerResult;

      if (footerResult) {
        footerData = {
          ...DEFAULT_FOOTER,
          ...footerResult,
          socialMedia:
            footerResult.socialMedia && footerResult.socialMedia.length > 0
              ? footerResult.socialMedia
              : DEFAULT_FOOTER.socialMedia,
          trailInformation:
            footerResult.trailInformation || DEFAULT_FOOTER.trailInformation,
          resources: footerResult.resources || DEFAULT_FOOTER.resources,
          contactInfo: footerResult.contactInfo || DEFAULT_FOOTER.contactInfo,
          quickFacts: footerResult.quickFacts || DEFAULT_FOOTER.quickFacts,
          copyright: footerResult.copyright || DEFAULT_FOOTER.copyright,
          termsAndConditions:
            footerResult.termsAndConditions ||
            DEFAULT_FOOTER.termsAndConditions,
        };
      } else {
      }
    } catch (error) {
    }
  }

  return (
    <html lang="en">
      <body>
        {isDraftMode && <PreviewBanner />}
        {!isStudioRoute && headerData && <Header data={headerData} />}
        <main>{children}</main>
        {!isStudioRoute && <Footer data={footerData} />}
      </body>
    </html>
  );
}
