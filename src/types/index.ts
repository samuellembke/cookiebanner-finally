/**
 * Cookie consent categories
 */
export enum ConsentCategory {
  Necessary = 'necessary',
  Preferences = 'preferences',
  Analytics = 'analytics',
  Marketing = 'marketing'
}

/**
 * Cookie consent preferences
 */
export interface ConsentPreferences {
  [ConsentCategory.Necessary]: boolean; // Always true
  [ConsentCategory.Preferences]: boolean;
  [ConsentCategory.Analytics]: boolean;
  [ConsentCategory.Marketing]: boolean;
  lastUpdated?: string;
}

/**
 * Default consent preferences
 */
export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  [ConsentCategory.Necessary]: true, // Necessary cookies are always allowed
  [ConsentCategory.Preferences]: false,
  [ConsentCategory.Analytics]: false,
  [ConsentCategory.Marketing]: false
};

/**
 * Custom messages for consent gate
 */
export interface ConsentGateMessages {
  /**
   * Message shown when content requires consent
   * Can include {category} placeholder for the consent category
   */
  consentRequired?: string;
  
  /**
   * Button text for managing preferences
   */
  managePreferences?: string;
  
  /**
   * Loading message
   */
  loading?: string;
}

/**
 * Default messages for consent gate
 */
export const DEFAULT_CONSENT_GATE_MESSAGES: ConsentGateMessages = {
  consentRequired: 'This content requires consent for {category} cookies.',
  managePreferences: 'Manage Cookie Preferences',
  loading: 'Loading...'
};

/**
 * Script definition
 */
export interface Script {
  id: string;
  category: ConsentCategory;
  src?: string;
  content?: string;
  attributes?: Record<string, string>;
}
