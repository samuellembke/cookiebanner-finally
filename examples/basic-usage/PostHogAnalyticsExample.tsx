'use client'

import React from 'react';
import { useCookiePreferences, ConsentCategory } from 'cookiebanner-finally';

// In a real implementation, you would import from posthog-js/react
// This is a mock implementation for demonstration purposes
const usePostHog = () => {
  // This would be the actual PostHog instance when consent is given
  // or undefined when not initialized
  return {
    capture: (eventName: string, properties?: Record<string, any>) => {
      console.log(`[PostHog] Captured event: ${eventName}`, properties);
    }
  };
};

/**
 * Example component that safely uses PostHog analytics
 */
export function PostHogAnalyticsExample() {
  const { preferences } = useCookiePreferences();
  const posthog = usePostHog();
  
  // Handle button click - track an event if consent is given
  const handleButtonClick = () => {
    // Safe to use - if PostHog isn't available (no consent),
    // the function call is wrapped in a check
    if (preferences.analytics && posthog) {
      posthog.capture('example_button_clicked', {
        page: 'example page',
        button: 'example button'
      });
    }
    
    // Always run this code regardless of consent status
    console.log('Button clicked');
  };
  
  return (
    <div className="p-4 border rounded-md my-4">
      <h3 className="text-lg font-semibold mb-2">PostHog Analytics Example</h3>
      
      <div className="mb-4">
        <p className="mb-2">
          Analytics status: 
          <span className={preferences.analytics ? "text-green-600 font-medium" : "text-red-600"}>
            {preferences.analytics ? " Enabled" : " Disabled"}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          {preferences.analytics 
            ? "Events will be tracked with PostHog" 
            : "No events will be sent to PostHog"}
        </p>
      </div>
      
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Track Example Event
      </button>
      
      <p className="mt-4 text-sm text-gray-600">
        Try enabling/disabling analytics consent in the cookie settings 
        and clicking the button to see how tracking is conditionally applied.
      </p>
    </div>
  );
}
