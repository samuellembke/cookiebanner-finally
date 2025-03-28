'use client';

import { useConsentContext } from '../core/ConsentProvider';

/**
 * Interface for the useCookieBanner hook
 */
export interface UseCookieBannerResult {
  // Banner state
  isVisible: boolean;
  isConsentGiven: boolean;
  
  // User actions
  acceptAll: () => void;
  denyAll: () => void;
  close: () => void;
  show: () => void;
}

/**
 * Hook for managing the cookie consent banner
 * 
 * @returns Banner state and methods
 * 
 * @example
 * ```tsx
 * const CookieBanner = () => {
 *   const { isVisible, acceptAll, denyAll, close } = useCookieBanner();
 *   
 *   if (!isVisible) return null;
 *   
 *   return (
 *     <div className="cookie-banner">
 *       <p>We use cookies to improve your experience.</p>
 *       <div className="cookie-banner-buttons">
 *         <button onClick={acceptAll}>Accept All</button>
 *         <button onClick={denyAll}>Reject All</button>
 *         <button onClick={close}>Close</button>
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useCookieBanner(): UseCookieBannerResult {
  const {
    showBanner,
    isConsentGiven,
    acceptAll,
    denyAll,
    closeBanner,
    resetBanner,
  } = useConsentContext();

  return {
    isVisible: showBanner,
    isConsentGiven,
    acceptAll,
    denyAll,
    close: closeBanner,
    show: resetBanner,
  };
}
