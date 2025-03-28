'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { useConsentGate } from '../hooks/useConsentGate';
import { ConsentCategory } from '../types';

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
}) => {
  const { hasConsent, isLoading, showConsentPrompt } = useConsentGate(category);
  
  // Show loading state
  if (isLoading) {
    return loading ? <>{loading}</> : <div>Loading...</div>;
  }
  
  // Show content if consent is given
  if (hasConsent) {
    return <>{children}</>;
  }
  
  // Show fallback or default fallback
  return fallback ? (
    <>{fallback}</>
  ) : (
    <div 
      className="consent-gate-fallback"
      style={{
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '0.25rem',
        backgroundColor: '#f8f9fa',
        margin: '0.5rem 0',
      }}
    >
      <p>This content requires consent for {category} cookies.</p>
      {showPromptOnClick && (
        <button
          onClick={showConsentPrompt}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
          }}
        >
          Manage Cookie Preferences
        </button>
      )}
    </div>
  );
};
