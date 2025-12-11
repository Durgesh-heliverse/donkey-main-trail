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
      hasAvailabilityTrigger
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
      { label: "Practical Info", href: "#practical" },
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
          socialMedia: footerResult.socialMedia && footerResult.socialMedia.length > 0
            ? footerResult.socialMedia
            : DEFAULT_FOOTER.socialMedia,
          trailInformation: footerResult.trailInformation || DEFAULT_FOOTER.trailInformation,
          resources: footerResult.resources || DEFAULT_FOOTER.resources,
          contactInfo: footerResult.contactInfo || DEFAULT_FOOTER.contactInfo,
          quickFacts: footerResult.quickFacts || DEFAULT_FOOTER.quickFacts,
          copyright: footerResult.copyright || DEFAULT_FOOTER.copyright,
        };
        console.log("Footer data from Sanity:", JSON.stringify(footerData, null, 2));
      } else {
        console.log("No footer data found in Sanity, using defaults");
      }
    } catch (error) {
      console.error("Error fetching header/footer data:", error);
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
