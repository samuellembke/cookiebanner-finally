'use client';

import React, { useEffect } from 'react';
import { useScriptLoader } from '../hooks/useScriptLoader';
import { Script } from '../types';

export interface ScriptLoaderProps {
  /**
   * Script to load
   */
  script: Script;
  
  /**
   * Callback when script is loaded
   */
  onLoad?: () => void;
  
  /**
   * Whether to auto-load the script
   * @default true
   */
  autoLoad?: boolean;
}

/**
 * Component that loads a script based on consent
 */
export const ScriptLoader: React.FC<ScriptLoaderProps> = ({
  script,
  onLoad,
  autoLoad = true,
}) => {
  const { register, load, isLoaded } = useScriptLoader();
  
  // Register the script
  useEffect(() => {
    register(script);
  }, [register, script]);
  
  // Load the script if autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      load(script.id).then(success => {
        if (success && onLoad) {
          onLoad();
        }
      });
    }
  }, [load, script.id, autoLoad, onLoad]);
  
  // This component doesn't render anything
  return null;
};

export interface ScriptBatchLoaderProps {
  /**
   * Scripts to load
   */
  scripts: Script[];
  
  /**
   * Callback when all scripts are loaded
   */
  onLoad?: () => void;
  
  /**
   * Whether to auto-load the scripts
   * @default true
   */
  autoLoad?: boolean;
}

/**
 * Component that loads multiple scripts based on consent
 */
export const ScriptBatchLoader: React.FC<ScriptBatchLoaderProps> = ({
  scripts,
  onLoad,
  autoLoad = true,
}) => {
  const { registerBatch, load } = useScriptLoader();
  
  // Register all scripts
  useEffect(() => {
    registerBatch(scripts);
  }, [registerBatch, scripts]);
  
  // Load all scripts if autoLoad is true
  useEffect(() => {
    if (autoLoad) {
      Promise.all(scripts.map(script => load(script.id)))
        .then(results => {
          if (results.every(Boolean) && onLoad) {
            onLoad();
          }
        });
    }
  }, [load, scripts, autoLoad, onLoad]);
  
  // This component doesn't render anything
  return null;
};
