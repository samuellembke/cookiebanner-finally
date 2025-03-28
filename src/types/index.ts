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
 * Script definition
 */
export interface Script {
  id: string;
  category: ConsentCategory;
  src?: string;
  content?: string;
  attributes?: Record<string, string>;
}
