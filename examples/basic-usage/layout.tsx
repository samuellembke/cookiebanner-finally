import React from 'react';
import { Providers } from './providers';
import { CookieBanner } from './CookieBanner';
import { AnalyticsLoader } from './AnalyticsLoader';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <CookieBanner />
          <AnalyticsLoader />
        </Providers>
      </body>
    </html>
  );
}
