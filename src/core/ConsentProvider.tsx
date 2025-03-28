'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { cookieManager, CookieManager } from './cookies';
import { ConsentCategory, DEFAULT_CONSENT_PREFERENCES } from '../types';
import type { ConsentPreferences } from '../types';

// Define the consent context shape
interface ConsentContextType {
  // Consent state
  preferences: ConsentPreferences;
  isConsentGiven: boolean;
  showBanner: boolean;
  
  // Consent management methods
  acceptAll: () => void;
  denyAll: () => void;
  updatePreferences: (preferences: Partial<ConsentPreferences>) => void;
  closeBanner: () => void;
  resetBanner: () => void;
  hasConsentFor: (category: ConsentCategory) => boolean;
}

// Create context with default values
const ConsentContext = createContext<ConsentContextType>({
  preferences: DEFAULT_CONSENT_PREFERENCES,
  isConsentGiven: false,
  showBanner: false,
  acceptAll: () => {},
  denyAll: () => {},
  updatePreferences: () => {},
  closeBanner: () => {},
  resetBanner: () => {},
  hasConsentFor: () => false,
});

// Provider props
interface ConsentProviderProps {
  children: ReactNode;
  cookieName?: string;
  cookieExpires?: number;
  initialPreferences?: Partial<ConsentPreferences>;
  autoShowBanner?: boolean;
}

/**
 * Provider component for cookie consent management
 */
export const ConsentProvider: React.FC<ConsentProviderProps> = ({
  children,
  cookieName,
  cookieExpires,
  initialPreferences,
  autoShowBanner = true,
}) => {
  // Initialize cookie manager if custom options are provided
  const [manager] = useState(() => {
    if (cookieName || cookieExpires) {
      return new CookieManager(
        cookieName,
        cookieExpires ? { expires: cookieExpires, path: '/', sameSite: 'strict' } : undefined
      );
    }
    return cookieManager;
  });

  // State
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_CONSENT_PREFERENCES);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // State management

  // Initialize on mount (client-side only)
  useEffect(() => {
    const hasGivenConsent = manager.hasConsentBeenGiven();
    
    // Only apply initialPreferences if user hasn't given consent yet
    if (initialPreferences && !hasGivenConsent) {
      manager.saveConsentPreferences(initialPreferences);
    }
    
    const currentPreferences = manager.getConsentPreferences();
    setPreferences(currentPreferences);
    setIsConsentGiven(hasGivenConsent);
    
    // Show banner if consent not given and autoShowBanner is true
    setShowBanner(autoShowBanner && !hasGivenConsent);
    
    // Mark as mounted
    setIsMounted(true);
  }, [manager, initialPreferences, autoShowBanner]);

  // Update functions
  const acceptAll = () => {
    const updated = manager.acceptAll();
    setPreferences(updated);
    setIsConsentGiven(true);
    setShowBanner(false);
    // Update state
  };

  const denyAll = () => {
    const updated = manager.denyAll();
    setPreferences(updated);
    setIsConsentGiven(true);
    setShowBanner(false);
    // Update state
  };

  const updatePreferences = (newPreferences: Partial<ConsentPreferences>) => {
    const updated = manager.saveConsentPreferences(newPreferences);
    setPreferences(updated);
    setIsConsentGiven(true);
    setShowBanner(false);
    // Update state
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  const resetBanner = () => {
    setShowBanner(true);
  };

  const hasConsentFor = (category: ConsentCategory): boolean => {
    return manager.hasConsent(category);
  };

  // Skip rendering until mounted (hydration safety)
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        isConsentGiven,
        showBanner,
        acceptAll,
        denyAll,
        updatePreferences,
        closeBanner,
        resetBanner,
        hasConsentFor,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

/**
 * Hook for using consent context
 */
export const useConsentContext = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsentContext must be used within a ConsentProvider');
  }
  return context;
};
