// Map Sanity document types to Next.js routes
export function resolvePreviewUrl(doc: { _type?: string; _id?: string; slug?: { current?: string } }): string {
  // Map document types to routes
  const routeMap: Record<string, string> = {
    homepage: '/',
    header: '/',
    footer: '/',
  }

  // Use route map for document types
  const route = routeMap[doc._type || '']
  if (route) {
    return route
  }

  // Default fallback
  return '/'
}
