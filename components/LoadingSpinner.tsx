"use client";

import React from "react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-magi-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-magi-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-magi-cyan text-lg animate-pulse">INITIALIZING MAGI SYSTEM...</p>
        <p className="text-magi-text-dim text-sm mt-2">Loading interface components</p>
      </div>
    </div>
  );
}
