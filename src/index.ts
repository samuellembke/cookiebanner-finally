// Export types
export * from './types';

// Export core
export { ConsentProvider, useConsentContext } from './core/ConsentProvider';
export { cookieManager, CookieManager } from './core/cookies';

// Export hooks
export { useCookieBanner } from './hooks/useCookieBanner';
export { useCookiePreferences } from './hooks/useCookiePreferences';
export { useConsentGate } from './hooks/useConsentGate';
export { useScriptLoader } from './hooks/useScriptLoader';

// Export components
export { ConsentGate } from './components/ConsentGate';
export { ScriptLoader, ScriptBatchLoader } from './components/ScriptLoader';

// Export script management
export { scriptManager, ScriptManager } from './scripts/ScriptManager';
