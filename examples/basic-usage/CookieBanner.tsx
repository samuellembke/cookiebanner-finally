'use client';

import React from 'react';
import { useCookieBanner } from '../../'; // In a real project, this would be '@yunicorn/cookiebanner'

export function CookieBanner() {
  const { isVisible, acceptAll, denyAll, close } = useCookieBanner();
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-semibold">Cookie Consent</h2>
        <p className="my-2">
          We use cookies to enhance your browsing experience, serve personalized 
          ads or content, and analyze our traffic.
        </p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={acceptAll}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Accept All
          </button>
          <button
            onClick={denyAll}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={close}
            className="border px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
