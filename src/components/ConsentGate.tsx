'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { useConsentGate } from '../hooks/useConsentGate';
import { ConsentCategory, ConsentGateMessages, DEFAULT_CONSENT_GATE_MESSAGES } from '../types';

export interface ConsentGateProps {
  /**
   * The content to render when consent is given
   */
  children: ReactNode;
  
  /**
   * The consent category required
   */
  category: ConsentCategory;
  
  /**
   * Custom component to render when consent is not given
   */
  fallback?: ReactNode;
  
  /**
   * Custom loading component
   */
  loading?: ReactNode;
  
  /**
   * Whether to show the consent banner when clicked
   */
  showPromptOnClick?: boolean;
  
  /**
   * Custom messages for the consent gate
   */
  messages?: ConsentGateMessages;
}

/**
 * Component that conditionally renders content based on consent
 */
export const ConsentGate: React.FC<ConsentGateProps> = ({
  children,
  category,
  fallback,
  loading,
  showPromptOnClick = true,
  messages = {},
}) => {
  const { hasConsent, isLoading, showConsentPrompt } = useConsentGate(category);
  
  // Merge custom messages with defaults
  const finalMessages = { ...DEFAULT_CONSENT_GATE_MESSAGES, ...messages };
  
  // Show loading state
  if (isLoading) {
    return loading ? <>{loading}</> : <div>{finalMessages.loading}</div>;
  }
  
  // Show content if consent is given
  if (hasConsent) {
    return <>{children}</>;
  }
  
  // Show fallback or default fallback
  return fallback ? (
    <>{fallback}</>
  ) : (
    <div className="cookie-consent-gate-fallback">
      <p>{finalMessages.consentRequired?.replace('{category}', category)}</p>
      {showPromptOnClick && (
        <button
          onClick={showConsentPrompt}
          className="cookie-consent-gate-button"
        >
          {finalMessages.managePreferences}
        </button>
      )}
      {/* 
        CSS classes to be defined in consumer application:
        
        .cookie-consent-gate-fallback {
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          background-color: #f8f9fa;
          margin: 0.5rem 0;
        }
        
        .cookie-consent-gate-button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .cookie-consent-gate-button:hover {
          background-color: #0051a8;
        }
      */}
    </div>
  );
};
