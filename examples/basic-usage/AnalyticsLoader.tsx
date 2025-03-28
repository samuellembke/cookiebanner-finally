'use client';

import React, { useEffect } from 'react';
import { useScriptLoader, ConsentCategory } from '../../'; // In a real project, this would be '@yunicorn/cookiebanner'

export function AnalyticsLoader() {
  const { register, load } = useScriptLoader();
  
  useEffect(() => {
    // Register Google Analytics scripts
    register({
      id: 'google-analytics',
      category: ConsentCategory.Analytics,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE',
    });
    
    register({
      id: 'google-analytics-config',
      category: ConsentCategory.Analytics,
      content: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EXAMPLE');
      `,
    });
    
    // Register Facebook Pixel
    register({
      id: 'facebook-pixel',
      category: ConsentCategory.Marketing,
      content: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'EXAMPLE_PIXEL_ID');
        fbq('track', 'PageView');
      `,
    });
    
    // Try to load scripts (only loads if consent is given)
    load('google-analytics').then((loaded) => {
      if (loaded) {
        load('google-analytics-config');
      }
    });
    
    load('facebook-pixel');
    
  }, [register, load]);
  
  // This component doesn't render anything visible
  return null;
}
