# cookiebanner-finally

[![npm version](https://img.shields.io/npm/v/cookiebanner-finally.svg)](https://www.npmjs.com/package/cookiebanner-finally)
[![License](https://img.shields.io/npm/l/cookiebanner-finally.svg)](https://github.com/yunicorn/cookiebanner/blob/main/LICENSE)

A headless cookie consent management library for Next.js, built with the shadcn philosophy.

## Features

- 🔄 **Headless architecture**: Provides the logic while you control the UI
- 🎣 **React Hooks API**: Easy to integrate with your components
- 🌐 **Next.js App Router ready**: Works with server components
- 🚀 **Modern build system**: Built with TanStack Config and Bun for optimal output
- 📜 **Script management**: Conditionally load scripts based on consent
- ⚙️ **GDPR compliant**: Supports necessary, preferences, analytics, and marketing categories
- 🧩 **Primitive components**: Useful building blocks for quick implementation
- 🔍 **Type-safe**: Full TypeScript support

## Installation

```bash
# Using npm
npm install cookiebanner-finally

# Using yarn
yarn add cookiebanner-finally

# Using pnpm
pnpm add cookiebanner-finally

# Using bun
bun add cookiebanner-finally
```

## Basic Setup

First, wrap your application with the `ConsentProvider`:

```tsx
// app/providers.tsx
'use client'

import { ConsentProvider } from 'cookiebanner-finally';

export function Providers({ children }) {
  return (
    <ConsentProvider>
      {children}
    </ConsentProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## Usage Examples

### 1. Creating a Banner

```tsx
// components/CookieBanner.tsx
'use client'

import { useCookieBanner, ConsentCategory } from 'cookiebanner-finally';

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
```

### 2. Managing Cookie Preferences

```tsx
// components/CookieSettings.tsx
'use client'

import { useCookiePreferences, ConsentCategory } from 'cookiebanner-finally';

export function CookieSettings() {
  const { preferences, updateCategory } = useCookiePreferences();
  
  return (
    <div className="cookie-settings">
      <h2 className="text-lg font-semibold mb-4">Cookie Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="necessary"
            checked={preferences.necessary}
            disabled={true}
            className="mt-1"
          />
          <div>
            <label htmlFor="necessary" className="font-medium">Necessary Cookies</label>
            <p className="text-sm text-gray-600">Required for the website to function properly.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="preferences"
            checked={preferences.preferences}
            onChange={(e) => updateCategory(ConsentCategory.Preferences, e.target.checked)}
            className="mt-1"
          />
          <div>
            <label htmlFor="preferences" className="font-medium">Preference Cookies</label>
            <p className="text-sm text-gray-600">Remember your settings and preferences.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="analytics"
            checked={preferences.analytics}
            onChange={(e) => updateCategory(ConsentCategory.Analytics, e.target.checked)}
            className="mt-1"
          />
          <div>
            <label htmlFor="analytics" className="font-medium">Analytics Cookies</label>
            <p className="text-sm text-gray-600">Help us improve by tracking anonymous usage data.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="marketing"
            checked={preferences.marketing}
            onChange={(e) => updateCategory(ConsentCategory.Marketing, e.target.checked)}
            className="mt-1"
          />
          <div>
            <label htmlFor="marketing" className="font-medium">Marketing Cookies</label>
            <p className="text-sm text-gray-600">Track your activity across websites to provide personalized ads.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 3. Conditionally Loading Scripts

```tsx
// components/AnalyticsLoader.tsx
'use client'

import { useEffect } from 'react';
import { useScriptLoader, ConsentCategory } from 'cookiebanner-finally';

export function AnalyticsLoader() {
  const { register, load } = useScriptLoader();
  
  useEffect(() => {
    // Register scripts
    register({
      id: 'google-analytics',
      category: ConsentCategory.Analytics,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
    });
    
    register({
      id: 'ga-config',
      category: ConsentCategory.Analytics,
      content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      `,
    });
    
    // Try to load scripts (only loads if consent is given)
    load('google-analytics').then((loaded) => {
      if (loaded) {
        load('ga-config');
      }
    });
  }, [register, load]);
  
  return null;
}

// In your app/layout.tsx
// <AnalyticsLoader />
```

### 4. Using the Consent Gate Component

```tsx
// components/YouTubeEmbed.tsx
'use client'

import { ConsentGate, ConsentCategory } from 'cookiebanner-finally';

export function YouTubeEmbed({ videoId }: { videoId: string }) {
  return (
    <ConsentGate category={ConsentCategory.Marketing}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ConsentGate>
  );
}
```

## Advanced Usage

### Custom Provider Configuration

```tsx
'use client'

import { ConsentProvider, ConsentCategory } from 'cookiebanner-finally';

export function Providers({ children }) {
  return (
    <ConsentProvider
      cookieName="my-app-consent"
      cookieExpires={180} // Days
      initialPreferences={{
        [ConsentCategory.Analytics]: true, // Pre-select analytics
      }}
      autoShowBanner={true}
    >
      {children}
    </ConsentProvider>
  );
}
```

### Creating a Custom Consent Gate Hook

```tsx
'use client'

import { useEffect, useState } from 'react';
import { useConsentGate, ConsentCategory } from 'cookiebanner-finally';

export function useMapEmbed() {
  const { hasConsent, showConsentPrompt } = useConsentGate(ConsentCategory.Marketing);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    if (hasConsent && !mapLoaded) {
      // Initialize map when consent is given
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY';
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    }
  }, [hasConsent, mapLoaded]);
  
  return {
    canShowMap: hasConsent && mapLoaded,
    requestConsent: showConsentPrompt,
  };
}
```

## TypeScript Support

This library is built with TypeScript and provides full type definitions for all components, hooks, and utility functions.

## License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

```
MIT License

Copyright (c) 2025 Samuel Lembke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
