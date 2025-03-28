'use client'

import React from 'react';
import { ConsentGate, ConsentCategory } from 'cookiebanner-finally';
// Import from @posthog/nextjs/react in a real implementation
// This is just for demonstration purposes
type PostHogProviderProps = {
  children: React.ReactNode;
  apiKey: string;
  options?: Record<string, any>;
};
const PostHogProvider: React.FC<PostHogProviderProps> = ({ children }) => <>{children}</>;

interface PostHogGateProviderProps {
  children: React.ReactNode;
  apiKey?: string;
  apiHost?: string;
}

/**
 * A wrapper component that only renders PostHog when the user has given
 * consent for analytics cookies. When consent is not given, it renders
 * children directly without PostHog, ensuring no analytics code runs.
 */
export function PostHogGateProvider({
  children,
  apiKey = 'YOUR_API_KEY',
  apiHost = 'https://app.posthog.com'
}: PostHogGateProviderProps) {
  return (
    <ConsentGate 
      category={ConsentCategory.Analytics}
      fallback={<>{children}</>}  // Just render children without PostHog
    >
      {/* Only rendered when analytics consent is given */}
      <PostHogProvider
        apiKey={apiKey}
        options={{
          api_host: apiHost,
        }}
      >
        {children}
      </PostHogProvider>
    </ConsentGate>
  );
}
