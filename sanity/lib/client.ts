import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token, // Add token for authenticated requests
});

// Preview client with token for draft documents
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'previewDrafts',
});

// Helper to get the right client based on preview mode
export function getClient(preview?: { token?: string }) {
  if (preview?.token) {
    return previewClient.withConfig({ token: preview.token });
  }
  return client;
}
