import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { resolvePreviewUrl } from '@/sanity/lib/resolve-preview-url'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Preview secret - IMPORTANT: Use a strong, random secret in production!
// Set SANITY_PREVIEW_SECRET in your .env.local (server-side only, more secure)
// Do NOT use NEXT_PUBLIC_ prefix for better security (keeps secret server-side)
const PREVIEW_SECRET = 
  process.env.SANITY_PREVIEW_SECRET || 
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || 
  'preview-secret-change-in-production'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  let slug = searchParams.get('slug') || '/'
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  // Verify the secret token - only enable draft mode if secret is valid
  if (!secret || secret !== PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Security: Check if we're in production and secret is still default
  if (process.env.NODE_ENV === 'production' && PREVIEW_SECRET === 'preview-secret-change-in-production') {
    console.error('SECURITY WARNING: Using default preview secret in production!');
    return new Response('Preview not configured', { status: 403 })
  }

  // If we have type and id, resolve the preview URL
  if (type && id) {
    const previewUrl = resolvePreviewUrl({ _type: type, _id: id })
    slug = previewUrl
  } else if (slug) {
    // Ensure slug starts with / (remove leading / if duplicate)
    slug = slug.trim()
    if (!slug.startsWith('/')) {
      slug = `/${slug}`
    }
  }

  // Enable draft mode only if secret is valid
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the query string
  redirect(slug)
}
