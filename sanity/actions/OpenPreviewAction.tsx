// actions/OpenPreviewAction.tsx
import { DocumentActionComponent } from "sanity";

// Preview secret - must match app/api/preview/route.ts
// Since this runs client-side in Sanity Studio, we need to use NEXT_PUBLIC_ prefix
// or a hardcoded value that matches the server-side default
// For production, set NEXT_PUBLIC_SANITY_PREVIEW_SECRET in your .env.local
const PREVIEW_SECRET = 'preview-secret-change-in-production';

export const OpenPreviewAction: DocumentActionComponent = (props) => {
  const { type, id } = props;
  
  // Build preview URL with document type, id, and secret token
  const getPreviewUrl = () => {
    const baseUrl = window.location.origin;
    // Use the preview secret - must match the one in app/api/preview/route.ts
    const previewUrl = `${baseUrl}/api/preview?type=${type}&id=${id}&secret=${PREVIEW_SECRET}`;
    return previewUrl;
  };

  return {
    label: "Open Preview",
    tone: "primary",
    onHandle: () => {
      const previewUrl = getPreviewUrl();
      window.open(previewUrl, "_blank");
    },
  };
};
