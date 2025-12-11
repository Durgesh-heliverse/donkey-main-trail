"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function PreviewBanner() {
  useEffect(() => {
    // Set CSS variable for header positioning
    const banner = document.getElementById("preview-banner");
    if (banner) {
      const height = banner.offsetHeight;
      document.documentElement.style.setProperty("--preview-banner-height", `${height}px`);
    }
  }, []);

  return (
    <div 
      id="preview-banner"
      className="fixed top-0 left-0 right-0 z-[100] bg-yellow-400 text-black px-4 py-2 flex items-center justify-between shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">Preview Mode</span>
        <span className="text-sm">You are viewing draft content</span>
      </div>
      <a
        href="/api/exit-preview"
        className="flex items-center gap-1 px-3 py-1 bg-black text-yellow-400 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
        onClick={(e) => {
          // Ensure the link works and clears draft mode
          e.preventDefault();
          window.location.href = '/api/exit-preview';
        }}
      >
        <X className="h-4 w-4" />
        Exit Preview
      </a>
    </div>
  );
}

