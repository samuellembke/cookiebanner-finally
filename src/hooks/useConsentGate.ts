'use client';

import { useState, useEffect } from 'react';
import { useConsentContext } from '../core/ConsentProvider';
import { ConsentCategory } from '../types';

/**
 * Interface for the useConsentGate hook
 */
export interface UseConsentGateResult {
  // State
  hasConsent: boolean;
  isLoading: boolean;
  
  // Show prompt
  showConsentPrompt: () => void;
}

/**
 * Hook for conditionally rendering content based on consent
 * 
 * @param category - The consent category to check
 * @returns State indicating if content can be displayed
 * 
 * @example
 * ```tsx
 * const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
 *   const { hasConsent, isLoading, showConsentPrompt } = useConsentGate(
 *     ConsentCategory.Marketing
 *   );
 *   
 *   if (isLoading) {
 *     return <div>Loading...</div>;
 *   }
 *   
 *   if (!hasConsent) {
 *     return (
 *       <div className="consent-placeholder">
 *         <p>This content requires marketing cookies consent.</p>
 *         <button onClick={showConsentPrompt}>Manage Cookie Preferences</button>
 *       </div>
 *     );
 *   }
 *   
 *   return (
 *     <iframe
 *       src={`https://www.youtube.com/embed/${videoId}`}
 *       frameBorder="0"
 *       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 *       allowFullScreen
 *     />
 *   );
 * }
 * ```
 */
export function useConsentGate(category: ConsentCategory): UseConsentGateResult {
  const { hasConsentFor, resetBanner } = useConsentContext();
  const [isClient, setIsClient] = useState(false);
  
  // Handle server-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Check for consent (only client-side)
  const hasConsent = isClient ? hasConsentFor(category) : false;
  
  // Show the consent banner
  const showConsentPrompt = () => {
    resetBanner();
  };
  
  return {
    hasConsent,
    isLoading: !isClient,
    showConsentPrompt,
  };
}
