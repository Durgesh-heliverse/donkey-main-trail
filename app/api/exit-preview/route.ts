import { draftMode } from 'next/headers'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  const draft = await draftMode()
  
  // Disable draft mode
  if (draft.isEnabled) {
    draft.disable()
  }
  
  // Clear all draft mode related cookies
  const cookieStore = await cookies()
  cookieStore.delete('__prerender_bypass')
  cookieStore.delete('__next_preview_data')
  
  // Redirect to home with cache busting
  redirect('/')
}
