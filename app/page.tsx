import { client, previewClient } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import Hero from "@/components/Hero";
import TrailInfo from "@/components/TrailInfo";
import InteractiveMap from "@/components/InteractiveMap";
import PracticalInfo from "@/components/PracticalInfo";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  hero {
    backgroundImage {
      asset
    },
    title,
    highlightedText,
    description,
    promotionalTag,
    trailStats {
      totalDistance,
      duration,
      difficulty
    },
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    }
  },
  trailInfo {
    aboutSection {
      title,
      highlightedText,
      description,
      stats[] {
        icon,
        value,
        label
      }
    },
    trailHighlights[] {
      icon,
      title,
      description
    },
    historicalNote {
      title,
      content
    },
    carousel {
      images[] {
        image {
          asset
        },
        card {
          icon,
          title,
          subtitle,
          description
        }
      }
    }
  },
  interactiveMap {
    title,
    highlightedText,
    description,
    mapUrl,
    legend[] {
      type,
      label,
      color
    },
    trailPoints[] {
      id,
      day,
      title,
      distance,
      difficulty,
      type,
      icon,
      description,
      highlights,
      images[] {
        image {
          asset
        },
        videoUrl,
        isYoutube
      }
    }
  },
  practicalInfo {
    title,
    highlightedText,
    description,
    tabs[] {
      id,
      label,
      icon,
      shortLabel
    },
    bookingPermits {
      title,
      items[] {
        icon,
        iconColor,
        title,
        description
      },
      bookingInfo {
        title,
        description,
        contactInfo {
          calls,
          whatsapp,
          email
        }
      }
    },
    costsFees {
      title,
      price {
        amount,
        currency,
        period
      },
      included[] {
        title
      },
      additionalCosts[] {
        title
      },
      specialRequirements {
        title,
        description,
        email
      }
    },
    packingList {
      title,
      categories[] {
        title,
        icon,
        items[] {
          title
        }
      }
    },
    safetyTips {
      title,
      guidelines[] {
        type,
        icon,
        title,
        description
      },
      emergencyContacts[] {
        label,
        number
      }
    }
  },
  testimonials {
    title,
    highlightedText,
    description,
    testimonials[] {
      quote,
      author {
        name,
        location,
        year,
        image {
          asset
        }
      },
      rating
    },
    shareStory {
      title,
      description,
      buttonText,
      buttonLink
    }
  },
  contactForm {
    title,
    highlightedText,
    description,
    contactInfo {
      title,
      items[] {
        icon,
        title,
        content
      }
    },
    quickActions {
      title,
      items[] {
        icon,
        title,
        description,
        buttonText,
        buttonLink
      }
    },
    form {
      title,
      fields {
        groupSizeOptions[] {
          value,
          label
        },
        experienceOptions[] {
          value,
          label
        }
      },
      submitButtonText
    },
    calendar {
      availableDates,
      fullyBookedDates,
      helpInfo {
        title,
        description,
        phone,
        email
      }
    }
  },
  gallery {
    title,
    highlightedText,
    description,
    filters[] {
      label,
      value
    },
    items[] {
      image {
        asset
      },
      videoUrl,
      isYoutube,
      thumbnail {
        asset
      },
      title,
      description,
      filter
    }
  }
}`;

// Default fallback data
const DEFAULT_HERO_DATA = {
  title: "The Legendary",
  highlightedText: "Donkey Trail",
  description: "Join us today and discover the Hidden Heritage of the Swartberg Mountains trails!",
  promotionalTag: "Calitzdorp's Premier Hiking Experience",
  trailStats: {
    totalDistance: "77km",
    duration: "5 Days",
    difficulty: "Mod - Difficult",
  },
  primaryButton: {
    text: "Explore the Trail",
    link: "#",
  },
  secondaryButton: {
    text: "View Trail Map",
    link: "#",
  },
};

const DEFAULT_TRAIL_INFO = {
  aboutSection: {
    title: "About the",
    highlightedText: "Donkey Trail",
    description: "Long ago, before modern roads, the daring 'Donkey Trail' over the majestic Swartberg Mountain connected Calitzdorp to Die Hel—the sole lifeline linking this remote region to the outside world. Join us on a memorable hike along this historic route, and step back in time to experience the rugged beauty and storied past of the trail that once carried hope and connection through challenging terrains.",
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
      description: "Experience walking through the breathtaking Swartberg Mountains, recognized globally for their outstanding natural beauty and geological significance.",
    },
    {
      icon: "clock",
      title: "Historical Gamkaskloof",
      description: "Explore the legendary 'Die Hel,' a remote and rugged area rich in history and untouched wilderness, the Donkey Trail was once a vital trade route for this community.",
    },
    {
      icon: "camera",
      title: "Scenic Bosch Luys Kloof",
      description: "Conclude your journey at the stunning Bosch Luys Kloof, a pristine nature reserve renowned for its dramatic cliffs, clear streams and landscapes.",
    },
    {
      icon: "heart",
      title: "Cultural and Natural Heritage",
      description: "Traverse a trail steeped in history, from ancient pathways used by early explorers to vibrant flora and fauna thriving in this protected landscape. Along the way, experience the warmth of Karoo hospitality, and uncover the fascinating cultures that make this region truly special while supporting local communities.",
    },
  ],
  historicalNote: {
    title: "Historical Note",
    content: "Between the years 1830 and 1962 the inhabitants of the isolated valley of Gamkaskloof (Die Hel) had no road access into the valley. Access was only possible via a few footpaths which crossed the mountains and connected the valley to Calitzdorp and Prince Albert. These paths were used for transporting their produce from the valley to the markets and for bringing supplies to the area. Donkeys were utilized to carry the items from the valley to Calitzdorp via the Wyenek route.",
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
          description: "The Swartberg Mountains were declared part of the Cape Floral Region World Heritage Site in June 2004. This declaration was made by UNESCO in recognition of the region's exceptional biodiversity and the unique fynbos vegetation found there.",
        },
      },
    ],
  },
};

const DEFAULT_INTERACTIVE_MAP = {
  title: "Interactive",
  highlightedText: "Trail Map",
  description: "Explore the complete Donkey Trail route with detailed information about each section, accommodation points, and key highlights along the way.",
  mapUrl: "https://tracedetrail.fr/en/iframe/8022",
  legend: [
    { type: "start", label: "Start Point", color: "#92400e" },
    { type: "accommodation", label: "Accommodation", color: "#166534" },
    { type: "viewpoint", label: "Viewpoint", color: "#44403c" },
    { type: "end", label: "End Point", color: "#7f1d1d" },
  ],
  trailPoints: [
    {
      id: "1",
      day: "Day 1",
      title: "Day 1: Living Waters/The Retreat at Groenfontein",
      distance: "0km",
      difficulty: "Moderate",
      type: "start",
      icon: "mapPin",
      description: "Trail starting point with retreat facilities and mountain views",
      highlights: ["Retreat facilities", "Mountain views", "Starting point"],
      images: [],
    },
    {
      id: "2",
      day: "Day 2",
      title: "Day 2: Wyenek Camp/Donkey Trail campsite",
      distance: "19km",
      difficulty: "Challenging",
      type: "accommodation",
      icon: "tent",
      images: [],
    },
    {
      id: "3",
      day: "Day 3",
      title: "DAY 3 - Fonteinplaas",
      distance: "35km",
      difficulty: "Moderate",
      type: "accommodation",
      icon: "bed",
      images: [],
    },
    {
      id: "4",
      day: "Day 4",
      title: "DAY 4 - Boplaas",
      distance: "47km",
      difficulty: "Easy",
      type: "accommodation",
      icon: "bed",
      images: [],
    },
    {
      id: "5",
      day: "Day 5",
      title: "DAY 5 - Bosch luys kloof",
      distance: "70km",
      difficulty: "Moderate",
      type: "end",
      icon: "utensils",
      images: [],
    },
  ],
};

const DEFAULT_PRACTICAL_INFO = {
  title: "Practical",
  highlightedText: "Information",
  description: "Everything you need to know to plan and prepare for your Donkey Trail adventure. From booking procedures to essential gear, we've got you covered.",
  tabs: [
    { id: "booking", label: "Booking & Permits", icon: "calendar", shortLabel: "" },
    { id: "costs", label: "Costs & Fees", icon: "dollarSign", shortLabel: "ZAR" },
    { id: "packing", label: "Packing List", icon: "backpack", shortLabel: "" },
    { id: "safety", label: "Safety Tips", icon: "alertTriangle", shortLabel: "" },
  ],
  bookingPermits: {
    title: "Booking & Permits",
    items: [
      {
        icon: "calendar",
        iconColor: "blue",
        title: "Advance Booking Required",
        description: "Please enquire about availability in advance. We do not accept walk-ins",
      },
      {
        icon: "checkCircle",
        iconColor: "orange",
        title: "Permit System",
        description: "All hikers must have permits, which are obtained by the Donkey trail operator, please inform the operator whether you are a Wild Card holder or not",
      },
      {
        icon: "info",
        iconColor: "yellow",
        title: "Cancellation Policy",
        description: "An alternate date will be agreed on should bad weather impact the hike",
      },
    ],
    bookingInfo: {
      title: "How to Book",
      description: "Contact Erika Calitz to check availability or complete the form and we will get back to you within 48hours.",
      contactInfo: {
        calls: "073 593 4007",
        whatsapp: "083 628 9394",
        email: "info@donkeytrail.com",
      },
    },
  },
  costsFees: {
    title: "Costs & Fees",
    price: {
      amount: "14,500",
      currency: "R",
      period: "per person (5-day trail)",
    },
    included: [
      { title: "5-day hiking permit" },
      { title: "Luxury accommodation (2 nights)" },
      { title: "Trail maps and route information" },
      { title: "Basic first aid kit access" },
      { title: "Qualified Guides" },
      { title: "Pre-hike briefing and safety information" },
      { title: "Basic tented camp (1 night)" },
      { title: "Accommodation Gamkaskloof (2 nights)" },
      { title: "Emergency contact support" },
      { title: "Trail maintenance and upkeep" },
      { title: "Fully catered meals" },
    ],
    additionalCosts: [
      { title: "Drinks (This is an additional charge)" },
      { title: "Personal hiking gear and equipment" },
      { title: "Transport to/from trail start and end points" },
      { title: "Travel insurance (highly recommended)" },
      { title: "Personal items and toiletries" },
    ],
    specialRequirements: {
      title: "Special Requirements",
      description: "For special dietary requirements, accessibility needs, or any other special arrangements, please contact us directly.",
      email: "info@donkeytrail.com",
    },
  },
  packingList: {
    title: "Essential Packing List",
    categories: [
      {
        title: "Essential Items",
        icon: "alertTriangle",
        items: [
          { title: "Waterproof hiking boots" },
          { title: "Rain jacket and pants" },
          { title: "Sleeping bag (rated to 5°C)" },
          { title: "Headlamp with extra batteries" },
          { title: "First aid kit" },
          { title: "Water purification tablets" },
        ],
      },
      {
        title: "Clothing",
        icon: "backpack",
        items: [
          { title: "Quick-dry hiking pants" },
          { title: "Moisture-wicking base layers" },
          { title: "Warm fleece or down jacket" },
          { title: "Sun hat and warm beanie" },
          { title: "Hiking socks (wool blend)" },
          { title: "Gaiters for river crossings" },
        ],
      },
      {
        title: "Gear & Equipment",
        icon: "backpack",
        items: [
          { title: "Lightweight backpack (40-50L)" },
          { title: "Trekking poles" },
          { title: "Dry bags for electronics" },
          { title: "Portable stove and fuel" },
          { title: "Lightweight cookware" },
          { title: "Emergency whistle" },
        ],
      },
    ],
  },
  safetyTips: {
    title: "Safety Guidelines",
    guidelines: [
      {
        type: "warning",
        icon: "alertTriangle",
        title: "River Crossings",
        description: "Rivers can rise rapidly after rain. Never attempt crossings in flood conditions.",
      },
      {
        type: "info",
        icon: "info",
        title: "Weather Awareness",
        description: "Coastal weather changes quickly. Check forecasts and be prepared for rain.",
      },
      {
        type: "info",
        icon: "checkCircle",
        title: "Wildlife Encounters",
        description: "Keep food secured. Baboons are present - never feed or approach them.",
      },
      {
        type: "warning",
        icon: "alertTriangle",
        title: "Emergency Procedures",
        description: "Carry emergency contacts. Cell coverage is limited - inform others of your plans.",
      },
    ],
    emergencyContacts: [
      { label: "Trail Emergency", number: "+27 44 877 1197" },
      { label: "Local Emergency Services", number: "10177" },
      { label: "Mountain Rescue", number: "+27 21 937 0300" },
    ],
  },
};

const DEFAULT_TESTIMONIALS = {
  title: "Voices from the",
  highlightedText: "Trail",
  description: "Hear from fellow adventurers who have walked the legendary Donkey Trail and discovered the transformative power of this extraordinary journey.",
  testimonials: [
    {
      quote: "Standing at the viewpoint overlooking Die Hel, I understood why this place captured the hearts of early settlers. The trail doesn't just show you beautiful landscapes—it tells the story of human resilience and the enduring power of nature.",
      author: {
        name: "Lisa Rodriguez",
        location: "Barcelona, Spain",
        year: "2023",
      },
      rating: 5,
    },
    {
      quote: "The Donkey Trail is a masterpiece of natural architecture. Each day reveals new wonders—from the dramatic mountain passes to the gentle valleys. It's a trail that stays with you long after you've returned home.",
      author: {
        name: "David Johannsen",
        location: "Oslo, Norway",
        year: "2022",
      },
      rating: 5,
    },
    {
      quote: "This trail challenged me in ways I never expected, but the sense of accomplishment and the breathtaking views made every step worth it. The guides were knowledgeable and the accommodations were surprisingly comfortable.",
      author: {
        name: "Sarah Mitchell",
        location: "Melbourne, Australia",
        year: "2023",
      },
      rating: 5,
    },
    {
      quote: "Walking the Donkey Trail was like stepping back in time. The history, the nature, and the people we met along the way created an unforgettable experience. Highly recommend for anyone seeking adventure.",
      author: {
        name: "James Thompson",
        location: "London, UK",
        year: "2022",
      },
      rating: 5,
    },
    {
      quote: "The Swartberg Mountains are truly spectacular, and this trail showcases them perfectly. From sunrise to sunset, every moment was magical. This is a journey I'll treasure forever.",
      author: {
        name: "Maria Santos",
        location: "São Paulo, Brazil",
        year: "2023",
      },
      rating: 5,
    },
    {
      quote: "As someone who has hiked trails around the world, the Donkey Trail stands out for its unique combination of natural beauty, historical significance, and genuine hospitality. An absolute must-do.",
      author: {
        name: "Robert Chen",
        location: "Singapore",
        year: "2022",
      },
      rating: 5,
    },
  ],
  shareStory: {
    title: "Share Your Story",
    description: "Have you experienced the magic of the Donkey Trail? We'd love to hear about your journey and share your story with future adventurers.",
    buttonText: "Share Your Experience",
    buttonLink: "https://www.facebook.com/thedonkeytrail",
  },
};

const DEFAULT_CONTACT_FORM = {
  title: "Plan Your",
  highlightedText: "Adventure",
  description: "Ready to experience the legendary Donkey Trail? Get in touch with our team for booking assistance, trail information, and expert advice to make your hike unforgettable.",
  contactInfo: {
    title: "Get In Touch",
    items: [
      {
        icon: "mapPin",
        title: "Trail Information Center",
        content: [
          "Living Waters Mountain Estate, Groenfontein",
          "Calitzdorp, Western Cape South Africa",
        ],
      },
      {
        icon: "phone",
        title: "Telephonic Enquiries",
        content: ["Call or Whatsapp Erika on 073 593 4007"],
      },
      {
        icon: "mail",
        title: "Email Inquiries",
        content: ["info@donkeytrail.com"],
      },
      {
        icon: "clock",
        title: "Operating Hours",
        content: ["Mon - Fri: 9:00 - 16:00"],
      },
    ],
  },
  quickActions: {
    title: "Quick Actions",
    items: [
      {
        icon: "messageCircle",
        title: "Download Trail Guide",
        description: "Download the full 5 day itinerary and packing list.",
        buttonText: "Download PDF",
        buttonLink: "#",
      },
    ],
  },
  form: {
    title: "Send Us an Inquiry",
    fields: {
      groupSizeOptions: [
        { value: "1", label: "Solo hiker" },
        { value: "2", label: "2 people" },
        { value: "3-4", label: "3-4 people" },
        { value: "5-8", label: "5-8 people" },
        { value: "9-10", label: "9-10 people" },
      ],
      experienceOptions: [
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "experienced", label: "Experienced" },
        { value: "expert", label: "Expert" },
      ],
    },
    submitButtonText: "Send Enquiry",
  },
  calendar: {
    availableDates: [
      // Generate some default available dates for the next 3 months
      ...Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 3); // Start from 3 days from now
        return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      }),
    ],
    fullyBookedDates: [
      // Some example fully booked dates
      ...Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 5);
        return date.toISOString().split("T")[0];
      }),
    ],
    helpInfo: {
      title: "Need Help?",
      description: "Contact us directly for availability confirmation and booking assistance.",
      phone: "073 593 4007",
      email: "info@donkeytrail.com",
    },
  },
};

const DEFAULT_GALLERY = {
  title: "Trail",
  highlightedText: "Gallery",
  description:
    "Immerse yourself in the breathtaking beauty of the Donkey Trail through our collection of stunning photography and videos captured along the route.",
  filters: [
    { label: "Videos", value: "videos" },
    { label: "Trails", value: "trails" },
    { label: "Fauna & Flora", value: "fauna & flora" },
    { label: "Camping & Accommodation", value: "camping & accommodation" },
  ],
  items: [
    {
      title: "Trail Scenery",
      description: "Beautiful views along the Donkey Trail",
      filter: "trails",
    },
    {
      title: "Trail Adventure Video",
      description: "Experience the excitement of hiking the Donkey Trail",
      filter: "videos",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isYoutube: true,
    },
    {
      title: "Mountain Landscape",
      description: "Stunning mountain landscapes on the trail",
      filter: "trails",
    },
  ],
};

// Helper function to merge Sanity data with defaults
function mergeWithDefaults<T>(sanityData: T | null | undefined, defaultData: T): T {
  if (!sanityData) return defaultData;
  
  // If it's an object, merge recursively
  if (typeof sanityData === 'object' && typeof defaultData === 'object' && !Array.isArray(sanityData) && !Array.isArray(defaultData)) {
    return { ...defaultData, ...sanityData } as T;
  }
  
  return sanityData;
}

export default async function Home() {
  let heroData = DEFAULT_HERO_DATA;
  let trailInfoData = DEFAULT_TRAIL_INFO;
  let interactiveMapData = DEFAULT_INTERACTIVE_MAP;
  let practicalInfoData = DEFAULT_PRACTICAL_INFO;
  let galleryData = DEFAULT_GALLERY;
  let testimonialsData = DEFAULT_TESTIMONIALS;
  let contactFormData = DEFAULT_CONTACT_FORM;

  // Check if we're in draft mode (preview)
  const { isEnabled } = await draftMode();
  const sanityClient = isEnabled ? previewClient : client;

  try {
    const data = await sanityClient.fetch(HOMEPAGE_QUERY);
    console.log("Fetched homepage data:", JSON.stringify(data, null, 2));
    console.log("Draft mode enabled:", isEnabled);
    
    // Merge Sanity data with defaults, ensuring all fields are present
    if (data?.hero) {
      heroData = {
        ...DEFAULT_HERO_DATA,
        ...data.hero,
        trailStats: data.hero.trailStats || DEFAULT_HERO_DATA.trailStats,
        primaryButton: data.hero.primaryButton || DEFAULT_HERO_DATA.primaryButton,
        secondaryButton: data.hero.secondaryButton || DEFAULT_HERO_DATA.secondaryButton,
      };
    }

    if (data?.trailInfo) {
      trailInfoData = {
        aboutSection: data.trailInfo.aboutSection || DEFAULT_TRAIL_INFO.aboutSection,
        trailHighlights: data.trailInfo.trailHighlights && data.trailInfo.trailHighlights.length > 0 
          ? data.trailInfo.trailHighlights 
          : DEFAULT_TRAIL_INFO.trailHighlights,
        historicalNote: data.trailInfo.historicalNote || DEFAULT_TRAIL_INFO.historicalNote,
        carousel: {
          // Use Sanity images if they exist (any number), otherwise use default placeholder
          images: data.trailInfo.carousel?.images && data.trailInfo.carousel.images.length > 0
            ? data.trailInfo.carousel.images  // Use whatever number of images from Sanity
            : DEFAULT_TRAIL_INFO.carousel.images,  // Only use default if Sanity has no images
        },
      };
    }

    if (data?.interactiveMap) {
      interactiveMapData = {
        ...DEFAULT_INTERACTIVE_MAP,
        ...data.interactiveMap,
        mapUrl: data.interactiveMap.mapUrl || DEFAULT_INTERACTIVE_MAP.mapUrl,
        legend: data.interactiveMap.legend && data.interactiveMap.legend.length > 0
          ? data.interactiveMap.legend
          : DEFAULT_INTERACTIVE_MAP.legend,
        trailPoints: data.interactiveMap.trailPoints && data.interactiveMap.trailPoints.length > 0
          ? data.interactiveMap.trailPoints
          : DEFAULT_INTERACTIVE_MAP.trailPoints,
      };
    }

    if (data?.practicalInfo) {
      practicalInfoData = {
        ...DEFAULT_PRACTICAL_INFO,
        ...data.practicalInfo,
        tabs: data.practicalInfo.tabs && data.practicalInfo.tabs.length > 0
          ? data.practicalInfo.tabs
          : DEFAULT_PRACTICAL_INFO.tabs,
        bookingPermits: data.practicalInfo.bookingPermits || DEFAULT_PRACTICAL_INFO.bookingPermits,
        costsFees: data.practicalInfo.costsFees || DEFAULT_PRACTICAL_INFO.costsFees,
        packingList: data.practicalInfo.packingList || DEFAULT_PRACTICAL_INFO.packingList,
        safetyTips: data.practicalInfo.safetyTips || DEFAULT_PRACTICAL_INFO.safetyTips,
      };
    }

    if (data?.gallery) {
      galleryData = {
        ...DEFAULT_GALLERY,
        ...data.gallery,
        filters: data.gallery.filters && data.gallery.filters.length > 0
          ? data.gallery.filters
          : DEFAULT_GALLERY.filters,
        items: data.gallery.items && data.gallery.items.length > 0
          ? data.gallery.items
          : DEFAULT_GALLERY.items,
      };
    }

    if (data?.testimonials) {
      testimonialsData = {
        ...DEFAULT_TESTIMONIALS,
        ...data.testimonials,
        testimonials: data.testimonials.testimonials && data.testimonials.testimonials.length > 0
          ? data.testimonials.testimonials
          : DEFAULT_TESTIMONIALS.testimonials,
        shareStory: data.testimonials.shareStory || DEFAULT_TESTIMONIALS.shareStory,
      };
    }

    if (data?.contactForm) {
      // Format dates from Sanity (ISO strings) to YYYY-MM-DD format
      const formatDate = (dateStr: string | undefined): string | undefined => {
        if (!dateStr) return undefined;
        try {
          const date = new Date(dateStr);
          return date.toISOString().split("T")[0];
        } catch {
          return undefined;
        }
      };

      const formatDates = (dates: string[] | undefined): string[] => {
        if (!dates || !Array.isArray(dates)) return [];
        return dates.map(formatDate).filter((d): d is string => !!d);
      };

      contactFormData = {
        ...DEFAULT_CONTACT_FORM,
        ...data.contactForm,
        contactInfo: data.contactForm.contactInfo || DEFAULT_CONTACT_FORM.contactInfo,
        quickActions: data.contactForm.quickActions || DEFAULT_CONTACT_FORM.quickActions,
        form: data.contactForm.form || DEFAULT_CONTACT_FORM.form,
        calendar: {
          availableDates:
            data.contactForm.calendar?.availableDates && data.contactForm.calendar.availableDates.length > 0
              ? formatDates(data.contactForm.calendar.availableDates)
              : DEFAULT_CONTACT_FORM.calendar.availableDates,
          fullyBookedDates:
            data.contactForm.calendar?.fullyBookedDates && data.contactForm.calendar.fullyBookedDates.length > 0
              ? formatDates(data.contactForm.calendar.fullyBookedDates)
              : DEFAULT_CONTACT_FORM.calendar.fullyBookedDates,
          helpInfo: data.contactForm.calendar?.helpInfo || DEFAULT_CONTACT_FORM.calendar.helpInfo,
        },
      };
    }

    // Footer is now fetched separately in layout.tsx

    console.log("Hero data being used:", JSON.stringify(heroData, null, 2));
    console.log("Trail Info data being used:", JSON.stringify(trailInfoData, null, 2));
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    console.log("Using default/mock data due to error");
  }

  return (
    <>
      <Hero data={heroData} />
      <TrailInfo data={trailInfoData} />
      <InteractiveMap data={interactiveMapData} />
      <PracticalInfo data={practicalInfoData} />
      <Gallery data={galleryData} />
      <Testimonials data={testimonialsData} />
      <ContactForm data={contactFormData} />
      {/* Footer is rendered in layout.tsx */}
    </>
  );
}

