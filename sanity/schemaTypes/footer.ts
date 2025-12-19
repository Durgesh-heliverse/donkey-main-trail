import { defineType, defineField } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., 'Calitzdorp, Western Cape South Africa'",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "About the trail description",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "trailInformation",
      title: "Trail Information",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "links",
          title: "Links",
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
                  name: "href",
                  title: "Link",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "links",
          title: "Links",
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
                  name: "href",
                  title: "Link",
                  type: "string",
                },
                {
                  name: "isExternal",
                  title: "External Link",
                  type: "boolean",
                  description: "Show external link icon",
                },
                {
                  name: "hasAvailabilityTrigger",
                  title: "Availability Trigger",
                  type: "boolean",
                  description: "Scrolls to contact form when clicked",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
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
          name: "address",
          title: "Address",
          type: "object",
          fields: [
            {
              name: "line1",
              title: "Line 1",
              type: "string",
            },
            {
              name: "line2",
              title: "Line 2",
              type: "string",
            },
          ],
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "quickFacts",
      title: "Trail Quick Facts",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "facts",
          title: "Facts",
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
                  name: "value",
                  title: "Value",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "copyright",
      title: "Copyright",
      type: "object",
      fields: [
        {
          name: "text",
          title: "Copyright Text",
          type: "string",
        },
        {
          name: "termsLink",
          title: "Terms & Conditions Link",
          type: "object",
          fields: [
            {
              name: "text",
              title: "Link Text",
              type: "string",
            },
            {
              name: "href",
              title: "Link URL",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "termsAndConditions",
      title: "Terms & Conditions",
      type: "object",
      fields: [
        {
          name: "introduction",
          title: "Introduction Text",
          type: "text",
          description: "Text shown at the top of the terms modal",
        },
        {
          name: "lastUpdated",
          title: "Last Updated Date",
          type: "string",
          description: "e.g., 'January 2025'",
        },
        {
          name: "sections",
          title: "Terms Sections",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Section Title",
                  type: "string",
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Calendar", value: "calendar" },
                      { title: "Credit Card", value: "creditCard" },
                      { title: "Alert Triangle", value: "alertTriangle" },
                      { title: "Shield", value: "shield" },
                      { title: "Users", value: "users" },
                      { title: "Map Pin", value: "mapPin" },
                      { title: "File Text", value: "fileText" },
                    ],
                  },
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "items",
                  title: "Section Items",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
        },
        {
          name: "questionsSection",
          title: "Questions Section",
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
              name: "phone",
              title: "Phone",
              type: "string",
            },
            {
              name: "email",
              title: "Email",
              type: "string",
            },
            {
              name: "address",
              title: "Address",
              type: "string",
            },
          ],
        },
        {
          name: "agreementSection",
          title: "Agreement Section",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "text",
              title: "Agreement Text",
              type: "text",
            },
          ],
        },
      ],
    }),
  ],
});
