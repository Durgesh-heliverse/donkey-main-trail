import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description: "Background image for the hero section",
        },
        {
          name: "title",
          title: "Title (White Text)",
          type: "string",
          description: "e.g., 'The Legendary'",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Donkey Trail'",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          description:
            "e.g., 'Join us today and discover the Hidden Heritage of the Swartberg Mountains trails!'",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "promotionalTag",
          title: "Promotional Tag",
          type: "string",
          description: "e.g., 'Calitzdorp's Premier Hiking Experience'",
        },
        {
          name: "trailStats",
          title: "Trail Statistics",
          type: "object",
          fields: [
            {
              name: "totalDistance",
              title: "Total Distance",
              type: "string",
              description: "e.g., '77km'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "duration",
              title: "Duration",
              type: "string",
              description: "e.g., '5 Days'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "difficulty",
              title: "Difficulty",
              type: "string",
              description: "e.g., 'Mod - Difficult'",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: "primaryButton",
          title: "Primary Button (Orange)",
          type: "object",
          fields: [
            {
              name: "text",
              title: "Button Text",
              type: "string",
              description: "e.g., 'Explore the Trail'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Button Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: "secondaryButton",
          title: "Secondary Button (Translucent)",
          type: "object",
          fields: [
            {
              name: "text",
              title: "Button Text",
              type: "string",
              description: "e.g., 'View Trail Map'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "link",
              title: "Button Link",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    // Trail Info Section
    defineField({
      name: "trailInfo",
      title: "Trail Info Section",
      type: "object",
      fields: [
        {
          name: "aboutSection",
          title: "About Section",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              description: "e.g., 'About the'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "highlightedText",
              title: "Highlighted Text (Orange)",
              type: "string",
              description: "e.g., 'Donkey Trail'",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "stats",
              title: "Statistics Cards",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Map", value: "map" },
                          { title: "Clock", value: "clock" },
                          { title: "Trending Up", value: "trendingUp" },
                          { title: "Users", value: "users" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "value",
                      title: "Value",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "trailHighlights",
          title: "Trail Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Award", value: "award" },
                      { title: "Clock", value: "clock" },
                      { title: "Camera", value: "camera" },
                      { title: "Heart", value: "heart" },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
        {
          name: "historicalNote",
          title: "Historical Note",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Content",
              type: "text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: "carousel",
          title: "Image Carousel",
          type: "object",
          fields: [
            {
              name: "images",
              title: "Carousel Images",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "image",
                      title: "Image",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "card",
                      title: "Overlay Card",
                      type: "object",
                      fields: [
                        {
                          name: "icon",
                          title: "Icon",
                          type: "string",
                          options: {
                            list: [
                              { title: "Award", value: "award" },
                              { title: "Clock", value: "clock" },
                              { title: "Camera", value: "camera" },
                              { title: "Heart", value: "heart" },
                            ],
                          },
                        },
                        {
                          name: "title",
                          title: "Title",
                          type: "string",
                        },
                        {
                          name: "subtitle",
                          title: "Subtitle",
                          type: "string",
                        },
                        {
                          name: "description",
                          title: "Description",
                          type: "text",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    // Interactive Trail Map Section
    defineField({
      name: "interactiveMap",
      title: "Interactive Trail Map",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g., 'Interactive'",
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Trail Map'",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "mapUrl",
          title: "Map URL",
          type: "url",
          description:
            "Map iframe URL (e.g., https://tracedetrail.fr/en/iframe/8022)",
        },
        {
          name: "legend",
          title: "Legend Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "type",
                  title: "Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Brown", value: "brown" },
                      { title: "Accommodation", value: "accommodation" },
                      { title: "Viewpoint", value: "viewpoint" },
                      { title: "End Point", value: "end" },
                    ],
                  },
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
                {
                  name: "color",
                  title: "Color (Hex or Tailwind)",
                  type: "string",
                  description: "e.g., '#ea580c' or 'bg-amber-800'",
                },
              ],
            },
          ],
        },
        {
          name: "trailPoints",
          title: "Trail Points",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "id",
                  title: "Point ID",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "day",
                  title: "Day",
                  type: "string",
                  description: "e.g., 'Day 1'",
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "distance",
                  title: "Distance",
                  type: "string",
                  description: "e.g., '0km', '19km'",
                },
                {
                  name: "difficulty",
                  title: "Difficulty",
                  type: "string",
                  options: {
                    list: [
                      { title: "Easy", value: "Easy" },
                      { title: "Moderate", value: "Moderate" },
                      { title: "Challenging", value: "Challenging" },
                    ],
                  },
                },
                {
                  name: "type",
                  title: "Icon Color",
                  type: "string",
                  options: {
                    list: [
                      { title: "Brown", value: "brown" },
                      { title: "Green", value: "green" },
                      { title: "Stone", value: "stone" },
                      { title: "Red", value: "red" },
                      { title: "Orange", value: "orange" },
                    ],
                  },
                  initialValue: "brown",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Map Pin", value: "mapPin" },
                      { title: "Tent", value: "tent" },
                      { title: "Bed", value: "bed" },
                      { title: "Utensils", value: "utensils" },
                      { title: "Mountain", value: "mountain" },
                    ],
                  },
                  description:
                    "Select a predefined icon (used if custom icon is not uploaded)",
                },
                {
                  name: "customIcon",
                  title: "Custom Icon (Optional)",
                  type: "image",
                  description:
                    "Upload a custom icon image. If provided, this will be used instead of the predefined icon above. Recommended: square image (1:1 ratio), max 128x128px for best results.",
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "highlights",
                  title: "Highlights",
                  type: "array",
                  of: [{ type: "string" }],
                },
                {
                  name: "images",
                  title: "Images & Videos",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "image",
                          title: "Image",
                          type: "image",
                          options: {
                            hotspot: true,
                          },
                        },
                        {
                          name: "videoUrl",
                          title: "Video URL",
                          type: "url",
                          description: "YouTube URL or direct video URL",
                        },
                        {
                          name: "isYoutube",
                          title: "Is YouTube Video",
                          type: "boolean",
                          description: "Check if video URL is from YouTube",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    // Practical Information Section
    defineField({
      name: "practicalInfo",
      title: "Practical Information",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g., 'Practical'",
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Information'",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "tabs",
          title: "Tabs",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "id",
                  title: "Tab ID",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Calendar", value: "calendar" },
                      { title: "Dollar Sign", value: "dollarSign" },
                      { title: "Backpack", value: "backpack" },
                      { title: "Alert Triangle", value: "alertTriangle" },
                    ],
                  },
                },
                {
                  name: "shortLabel",
                  title: "Short Label (Mobile)",
                  type: "string",
                  description: "e.g., 'ZAR' for Costs & Fees",
                },
              ],
            },
          ],
        },
        {
          name: "bookingPermits",
          title: "Booking & Permits",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "items",
              title: "Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Calendar", value: "calendar" },
                          { title: "Check Circle", value: "checkCircle" },
                          { title: "Info", value: "info" },
                        ],
                      },
                    },
                    {
                      name: "iconColor",
                      title: "Icon Color",
                      type: "string",
                      options: {
                        list: [
                          { title: "Blue", value: "blue" },
                          { title: "Orange", value: "orange" },
                          { title: "Yellow", value: "yellow" },
                          { title: "Red", value: "red" },
                          { title: "Green", value: "green" },
                        ],
                      },
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              name: "bookingInfo",
              title: "Booking Information",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "contactInfo",
                  title: "Contact Information",
                  type: "object",
                  fields: [
                    {
                      name: "calls",
                      title: "Calls",
                      type: "string",
                    },
                    {
                      name: "whatsapp",
                      title: "WhatsApp",
                      type: "string",
                    },
                    {
                      name: "email",
                      title: "Email",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "costsFees",
          title: "Costs & Fees",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "object",
              fields: [
                {
                  name: "amount",
                  title: "Amount",
                  type: "string",
                },
                {
                  name: "currency",
                  title: "Currency",
                  type: "string",
                  description: "e.g., 'R'",
                },
                {
                  name: "period",
                  title: "Period",
                  type: "string",
                  description: "e.g., 'per person (5-day trail)'",
                },
              ],
            },
            {
              name: "included",
              title: "What's Included",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              name: "additionalCosts",
              title: "Additional Costs",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              name: "specialRequirements",
              title: "Special Requirements",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "email",
                  title: "Email",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "packingList",
          title: "Packing List",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "categories",
              title: "Categories",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Alert Triangle", value: "alertTriangle" },
                          { title: "Backpack", value: "backpack" },
                          { title: "Info", value: "info" },
                        ],
                      },
                    },
                    {
                      name: "items",
                      title: "Items",
                      type: "array",
                      of: [
                        {
                          type: "object",
                          fields: [
                            {
                              name: "title",
                              title: "Title",
                              type: "string",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "safetyTips",
          title: "Safety Tips",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "guidelines",
              title: "Guidelines",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "type",
                      title: "Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Warning", value: "warning" },
                          { title: "Info", value: "info" },
                          { title: "Success", value: "success" },
                        ],
                      },
                    },
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Alert Triangle", value: "alertTriangle" },
                          { title: "Info", value: "info" },
                          { title: "Check Circle", value: "checkCircle" },
                        ],
                      },
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              name: "emergencyContacts",
              title: "Emergency Contacts",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      title: "Label",
                      type: "string",
                    },
                    {
                      name: "number",
                      title: "Number",
                      type: "string",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    // Testimonials Section
    defineField({
      name: "testimonials",
      title: "Voices from the Trail",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g., 'Voices from the'",
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Trail'",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "testimonials",
          title: "Testimonials",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "quote",
                  title: "Quote",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "author",
                  title: "Author",
                  type: "object",
                  fields: [
                    {
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "location",
                      title: "Location",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "year",
                      title: "Year",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "image",
                      title: "Profile Image",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                },
                {
                  name: "rating",
                  title: "Rating",
                  type: "number",
                  description: "Rating out of 5 (defaults to 5)",
                  validation: (Rule) => Rule.min(1).max(5),
                },
              ],
            },
          ],
        },
        {
          name: "shareStory",
          title: "Share Your Story",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "buttonText",
              title: "Button Text",
              type: "string",
            },
            {
              name: "buttonLink",
              title: "Button Link",
              type: "url",
            },
          ],
        },
      ],
    }),
    // Contact Form Section
    defineField({
      name: "contactForm",
      title: "Plan Your Adventure",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g., 'Plan Your'",
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Adventure'",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "contactInfo",
          title: "Contact Information",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "items",
              title: "Contact Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Map Pin", value: "mapPin" },
                          { title: "Phone", value: "phone" },
                          { title: "Mail", value: "mail" },
                          { title: "Clock", value: "clock" },
                        ],
                      },
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "content",
                      title: "Content",
                      type: "array",
                      of: [{ type: "string" }],
                      description:
                        "Each line as a separate item (for multi-line addresses)",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "quickActions",
          title: "Quick Actions",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "items",
              title: "Action Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "icon",
                      title: "Icon",
                      type: "string",
                      options: {
                        list: [
                          { title: "Message Circle", value: "messageCircle" },
                          { title: "Download", value: "download" },
                        ],
                      },
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                    },
                    {
                      name: "buttonText",
                      title: "Button Text",
                      type: "string",
                    },
                    {
                      name: "buttonLink",
                      title: "Button Link (Optional)",
                      type: "url",
                      description: "Use this if you want to link to an external URL",
                    },
                    {
                      name: "pdfFile",
                      title: "PDF File (Optional)",
                      type: "file",
                      description: "Upload a PDF file to download. If both PDF and link are provided, PDF takes priority.",
                      options: {
                        accept: ".pdf",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "form",
          title: "Contact Form",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Form Title",
              type: "string",
            },
            {
              name: "fields",
              title: "Form Fields",
              type: "object",
              fields: [
                {
                  name: "groupSizeOptions",
                  title: "Group Size Options",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "value",
                          title: "Value",
                          type: "string",
                        },
                        {
                          name: "label",
                          title: "Label",
                          type: "string",
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "experienceOptions",
                  title: "Experience Level Options",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "value",
                          title: "Value",
                          type: "string",
                        },
                        {
                          name: "label",
                          title: "Label",
                          type: "string",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "submitButtonText",
              title: "Submit Button Text",
              type: "string",
            },
          ],
        },
        {
          name: "calendar",
          title: "Calendar Availability",
          type: "object",
          fields: [
            {
              name: "availableDateRanges",
              title: "Available Date Ranges (Easier Selection)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "startDate",
                      title: "Start Date",
                      type: "date",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "endDate",
                      title: "End Date",
                      type: "date",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      startDate: "startDate",
                      endDate: "endDate",
                    },
                    prepare({ startDate, endDate }) {
                      return {
                        title: `${startDate || "?"} to ${endDate || "?"}`,
                        subtitle: "Available Date Range",
                      };
                    },
                  },
                },
              ],
              description:
                "Add date ranges to automatically mark all dates in between as available. Past dates are automatically removed.",
            },
            {
              name: "availableDates",
              title: "Available Dates (Individual)",
              type: "array",
              of: [
                {
                  type: "date",
                  validation: (Rule) => Rule.optional(),
                },
              ],
              description:
                "Select individual dates that are available for booking (green color). Past dates cannot be selected. Tip: Use date ranges above for easier bulk selection.",
            },
            {
              name: "fullyBookedDateRanges",
              title: "Fully Booked Date Ranges (Easier Selection)",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "startDate",
                      title: "Start Date",
                      type: "date",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "endDate",
                      title: "End Date",
                      type: "date",
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      startDate: "startDate",
                      endDate: "endDate",
                    },
                    prepare({ startDate, endDate }) {
                      return {
                        title: `${startDate || "?"} to ${endDate || "?"}`,
                        subtitle: "Fully Booked Date Range",
                      };
                    },
                  },
                },
              ],
              description:
                "Add date ranges to automatically mark all dates in between as fully booked. Past dates are automatically removed.",
            },
            {
              name: "fullyBookedDates",
              title: "Fully Booked Dates (Individual)",
              type: "array",
              of: [
                {
                  type: "date",
                  validation: (Rule) => Rule.optional(),
                },
              ],
              description:
                "Select individual dates that are fully booked (red color). Past dates cannot be selected. Tip: Use date ranges above for easier bulk selection.",
            },
            {
              name: "helpInfo",
              title: "Help Information",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  description: "e.g., 'Need Help?'",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  description: "Help text displayed in the calendar popup",
                },
                {
                  name: "phone",
                  title: "Phone Number",
                  type: "string",
                  description: "e.g., '073 593 4007'",
                },
                {
                  name: "email",
                  title: "Email Address",
                  type: "string",
                  description: "e.g., 'info@donkeytrail.com'",
                },
              ],
            },
          ],
        },
        {
          name: "successMessage",
          title: "Success Message",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
              description: "e.g., 'Message Sent!'",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              description:
                "e.g., 'Thank you for reaching out. We'll respond within 24 hours.'",
            },
          ],
        },
      ],
    }),
    // Gallery Section
    defineField({
      name: "gallery",
      title: "Trail Gallery",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "e.g., 'Trail'",
        },
        {
          name: "highlightedText",
          title: "Highlighted Text (Orange)",
          type: "string",
          description: "e.g., 'Gallery'",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "filters",
          title: "Filter Tabs",
          type: "array",
          description:
            "Custom filter tabs (defaults: Videos, Trails, Fauna & Flora, Camping & Accommodation)",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
                {
                  name: "value",
                  title: "Value",
                  type: "string",
                  description:
                    "Lowercase, no spaces (e.g., 'videos', 'trails', 'fauna & flora')",
                },
              ],
            },
          ],
        },
        {
          name: "items",
          title: "Gallery Items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: "videoUrl",
                  title: "Video URL",
                  type: "url",
                  description: "YouTube URL or direct video URL",
                },
                {
                  name: "isYoutube",
                  title: "Is YouTube Video",
                  type: "boolean",
                  description: "Check if video URL is from YouTube",
                },
                {
                  name: "thumbnail",
                  title: "Video Thumbnail (Optional)",
                  type: "image",
                  description: "Custom thumbnail for video (if not YouTube)",
                  options: {
                    hotspot: true,
                  },
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "filter",
                  title: "Filter Category",
                  type: "string",
                  description:
                    "Filter value (e.g., 'videos', 'trails', 'fauna & flora', 'camping & accommodation')",
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
