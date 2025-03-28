'use client';

import { useState, useEffect } from 'react';
import { useConsentContext } from '../core/ConsentProvider';
import { scriptManager } from '../scripts/ScriptManager';
import { ConsentCategory, Script } from '../types';

/**
 * Interface for the useScriptLoader hook
 */
export interface UseScriptLoaderResult {
  register: (script: Script) => void;
  registerBatch: (scripts: Script[]) => void;
  load: (id: string) => Promise<boolean>;
  loadCategory: (category: ConsentCategory) => Promise<boolean[]>;
  isLoaded: (id: string) => boolean;
}

/**
 * Hook for loading scripts based on consent
 * 
 * @returns Methods for registering and loading scripts
 * 
 * @example
 * ```tsx
 * // In your layout or setup component
 * const MyAnalyticsSetup = () => {
 *   const { register, load } = useScriptLoader();
 *   
 *   useEffect(() => {
 *     // Register analytics scripts
 *     register({
 *       id: 'google-analytics',
 *       category: ConsentCategory.Analytics,
 *       src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
 *     });
 *     
 *     register({
 *       id: 'ga-config',
 *       category: ConsentCategory.Analytics,
 *       content: `
 *         window.dataLayer = window.dataLayer || [];
 *         function gtag(){dataLayer.push(arguments);}
 *         gtag('js', new Date());
 *         gtag('config', 'G-XXXXXXXXXX');
 *       `,
 *     });
 *     
 *     // Attempt to load (will only load if user has given consent)
 *     load('google-analytics').then(() => {
 *       load('ga-config');
 *     });
 *   }, [register, load]);
 *   
 *   return null; // This is a utility component with no UI
 * };
 * ```
 */
export function useScriptLoader(): UseScriptLoaderResult {
  const { hasConsentFor } = useConsentContext();
  const [isMounted, setIsMounted] = useState(false);
  
  // Handle server-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Register a script
  const register = (script: Script) => {
    if (isMounted) {
      scriptManager.register(script);
    }
  };
  
  // Register multiple scripts
  const registerBatch = (scripts: Script[]) => {
    if (isMounted) {
      scriptManager.registerBatch(scripts);
    }
  };
  
  // Load a script by ID if consent is given
  const load = async (id: string): Promise<boolean> => {
    if (!isMounted) return false;
    
    const script = scriptManager.getAllScripts().find(s => s.id === id);
    
    if (!script) {
      console.error(`Script with ID ${id} not found`);
      return false;
    }
    
    const consent = hasConsentFor(script.category);
    return scriptManager.loadScript(id, consent);
  };
  
  // Load scripts by category if consent is given
  const loadCategory = (category: ConsentCategory): Promise<boolean[]> => {
    if (!isMounted) return Promise.resolve([]);
    
    const consent = hasConsentFor(category);
    return scriptManager.loadScriptsByCategory(category, consent);
  };
  
  // Check if a script is loaded
  const isLoaded = (id: string): boolean => {
    if (!isMounted) return false;
    return scriptManager.isLoaded(id);
  };
  
  return {
    register,
    registerBatch,
    load,
    loadCategory,
    isLoaded,
  };
}
