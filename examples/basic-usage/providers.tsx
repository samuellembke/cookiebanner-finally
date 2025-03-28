'use client';

import React from 'react';
import { ConsentProvider } from '../../'; // For testing locally (in a real project it would be from 'cookiebanner-finally')
import { ConsentCategory } from '../../src/types';
import { PostHogGateProvider } from './PostHogGateProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConsentProvider
      cookieName="cookie-consent-example"
      cookieExpires={365}
      initialPreferences={{
        [ConsentCategory.Necessary]: true,
        [ConsentCategory.Preferences]: false,
        [ConsentCategory.Analytics]: false,
        [ConsentCategory.Marketing]: false
      }}
      autoShowBanner={true}
    >
      <PostHogGateProvider
        apiKey="YOUR_API_KEY"
        apiHost="https://app.posthog.com"
      >
        {children}
      </PostHogGateProvider>
    </ConsentProvider>
  );
}
