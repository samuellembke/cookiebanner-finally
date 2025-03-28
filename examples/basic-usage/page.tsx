'use client';

import React from 'react';
import { CookieSettings } from './CookieSettings';
import { YouTubeEmbed } from './YouTubeEmbed';
import { PostHogAnalyticsExample } from './PostHogAnalyticsExample';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cookie Consent Example</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Cookie Settings</h2>
        <CookieSettings />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Analytics Integration</h2>
        <p className="mb-4">
          This example shows how to integrate PostHog analytics with the cookie banner.
          Analytics will only be initialized when the user has given consent.
        </p>
        <PostHogAnalyticsExample />
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Content that requires consent</h2>
        <p className="mb-4">
          The YouTube video below requires marketing cookie consent. If you haven't provided consent, 
          you'll see a placeholder instead.
        </p>
        <YouTubeEmbed videoId="dQw4w9WgXcQ" />
      </section>
      
      <section className="text-gray-700 text-sm border-t pt-4 mt-10">
        <p>
          This example demonstrates the use of the @yunicorn/cookiebanner library.
          Check out the source code to see how it works.
        </p>
      </section>
    </main>
  );
}
