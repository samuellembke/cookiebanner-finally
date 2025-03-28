'use client';

import React from 'react';
import { useCookiePreferences, ConsentCategory } from '../../'; // In a real project, this would be '@yunicorn/cookiebanner'

export function CookieSettings() {
  const { preferences, updateCategory } = useCookiePreferences();
  
  return (
    <div className="p-6 bg-white rounded shadow max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cookie Preferences</h2>
      
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
            <p className="text-sm text-gray-600">Track your activity to provide personalized ads.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
