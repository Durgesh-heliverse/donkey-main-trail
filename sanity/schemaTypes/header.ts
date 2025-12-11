import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "The logo image to display in the header",
    }),
    defineField({
      name: "navigation",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "href",
              title: "Link URL",
              type: "string",
            },
            {
              name: "hasDropdown",
              title: "Has Dropdown Menu",
              type: "boolean",
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "raceDropdownItems",
      title: "Race Dropdown Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
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
  ],
  preview: {
    prepare() {
      return {
        title: "Header Navigation",
      };
    },
  },
});

