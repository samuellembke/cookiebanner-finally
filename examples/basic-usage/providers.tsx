'use client';

import React from 'react';
import { ConsentProvider } from '../../'; // For testing locally (in a real project it would be from 'cookiebanner-finally')
import { ConsentCategory } from '../../src/types';

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
      {children}
    </ConsentProvider>
  );
}
