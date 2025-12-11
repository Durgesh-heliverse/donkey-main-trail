export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oe8f87xo";

export const token =
  process.env.SANITY_API_READ_TOKEN ||
  "sk1FSj2AAug4DeUgAKwWuhXsq9LbPIFFMSd3rmIrEZ0UVgUir47Np4gQFy3RQdKu2UF5PZM8MeifpWGRKhwAQ984vzwP8aYjt7BhE1ku5acxw16al3p2WY0I52d0i658R8GdHtTAcoHJOzzuBGKm4AQVSbmnJnqgMESpsWHqvbqn8XGDiPPw";

export const previewSecret =
  process.env.SANITY_PREVIEW_SECRET ||
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ||
  "preview-secret-change-in-production";