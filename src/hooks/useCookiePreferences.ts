'use client';

import { useState, useEffect } from 'react';
import { useConsentContext } from '../core/ConsentProvider';
import { ConsentCategory } from '../types';
import type { ConsentPreferences } from '../types';

/**
 * Interface for the useCookiePreferences hook
 */
export interface UseCookiePreferencesResult {
  // Preference data
  preferences: ConsentPreferences;
  isLoading: boolean;
  
  // Check specific category
  isEnabled: (category: ConsentCategory) => boolean;
  
  // Update methods
  updatePreferences: (preferences: Partial<ConsentPreferences>) => void;
  updateCategory: (category: ConsentCategory, enabled: boolean) => void;
}

/**
 * Hook for reading and updating cookie preferences
 * 
 * @returns Cookie preferences state and update methods
 * 
 * @example
 * ```tsx
 * const CookieSettings = () => {
 *   const { preferences, isLoading, updateCategory } = useCookiePreferences();
 *   
 *   if (isLoading) return <div>Loading preferences...</div>;
 *   
 *   return (
 *     <div className="cookie-settings">
 *       <h2>Cookie Settings</h2>
 *       
 *       <div className="cookie-setting">
 *         <input
 *           type="checkbox"
 *           id="necessary"
 *           checked={preferences.necessary}
 *           disabled={true}
 *         />
 *         <label htmlFor="necessary">Necessary (Required)</label>
 *       </div>
 *       
 *       <div className="cookie-setting">
 *         <input
 *           type="checkbox"
 *           id="preferences"
 *           checked={preferences.preferences}
 *           onChange={(e) => updateCategory('preferences', e.target.checked)}
 *         />
 *         <label htmlFor="preferences">Preferences</label>
 *       </div>
 *       
 *       <div className="cookie-setting">
 *         <input
 *           type="checkbox"
 *           id="analytics"
 *           checked={preferences.analytics}
 *           onChange={(e) => updateCategory('analytics', e.target.checked)}
 *         />
 *         <label htmlFor="analytics">Analytics</label>
 *       </div>
 *       
 *       <div className="cookie-setting">
 *         <input
 *           type="checkbox"
 *           id="marketing"
 *           checked={preferences.marketing}
 *           onChange={(e) => updateCategory('marketing', e.target.checked)}
 *         />
 *         <label htmlFor="marketing">Marketing</label>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCookiePreferences(): UseCookiePreferencesResult {
  const { preferences, updatePreferences, hasConsentFor } = useConsentContext();
  // Since ConsentProvider already handles the initial loading state,
  // we only need to track if we've received valid preferences from the context
  const isLoading = !preferences || Object.keys(preferences).length === 0;

  // Update a single category
  const updateCategory = (category: ConsentCategory, enabled: boolean) => {
    updatePreferences({ [category]: enabled }, false);
  };

  // Check if a category is enabled
  const isEnabled = (category: ConsentCategory) => {
    return hasConsentFor(category);
  };

  return {
    preferences,
    isLoading,
    isEnabled,
    updatePreferences,
    updateCategory,
  };
}
