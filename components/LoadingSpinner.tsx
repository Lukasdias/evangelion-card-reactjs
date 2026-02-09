"use client";

import React from "react";

export function LoadingSpinner() {
  return (
    <div className="bg-magi-bg flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-magi-cyan mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-magi-cyan animate-pulse text-lg">INITIALIZING MAGI SYSTEM...</p>
        <p className="text-magi-text-dim mt-2 text-sm">Loading interface components</p>
      </div>
    </div>
  );
}
