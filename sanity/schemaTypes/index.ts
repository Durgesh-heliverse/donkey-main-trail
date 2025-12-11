import { type SchemaTypeDefinition } from "sanity";
import homepage from "./homepage";
import header from "./header";
import footer from "./footer";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage,
    header,
    footer,
  ],
};
