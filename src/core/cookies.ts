import Cookies from 'js-cookie';
import { ConsentCategory, ConsentPreferences, DEFAULT_CONSENT_PREFERENCES } from '../types';

// Default cookie name for storing consent preferences
const DEFAULT_COOKIE_NAME = 'cookie-consent';

// Default cookie options
const DEFAULT_COOKIE_OPTIONS = {
  expires: 365, // 1 year
  path: '/',
  sameSite: 'strict' as const
};

/**
 * Cookie manager for handling consent preferences
 */
export class CookieManager {
  private cookieName: string;
  private cookieOptions: Cookies.CookieAttributes;
  
  constructor(
    cookieName: string = DEFAULT_COOKIE_NAME,
    cookieOptions: Cookies.CookieAttributes = DEFAULT_COOKIE_OPTIONS
  ) {
    this.cookieName = cookieName;
    this.cookieOptions = cookieOptions;
  }

  /**
   * Get current consent preferences
   */
  getConsentPreferences(): ConsentPreferences {
    try {
      const cookieValue = this.getCookieValue();
      if (!cookieValue) {
        return { ...DEFAULT_CONSENT_PREFERENCES };
      }
      
      const parsed = JSON.parse(cookieValue) as Partial<ConsentPreferences>;
      
      // Always ensure necessary cookies are accepted
      return {
        ...DEFAULT_CONSENT_PREFERENCES,
        ...parsed,
        [ConsentCategory.Necessary]: true
      };
    } catch (error) {
      console.error('Error parsing consent preferences', error);
      return { ...DEFAULT_CONSENT_PREFERENCES };
    }
  }

  /**
   * Save consent preferences
   */
  saveConsentPreferences(preferences: Partial<ConsentPreferences>): ConsentPreferences {
    const currentPreferences = this.getConsentPreferences();
    const updatedPreferences: ConsentPreferences = {
      ...currentPreferences,
      ...preferences,
      [ConsentCategory.Necessary]: true, // Always ensure necessary cookies are accepted
      lastUpdated: new Date().toISOString()
    };

    try {
      this.setCookieValue(JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Error saving consent preferences', error);
    }

    return updatedPreferences;
  }

  /**
   * Check if consent is given for a specific category
   */
  hasConsent(category: ConsentCategory): boolean {
    const preferences = this.getConsentPreferences();
    return preferences[category] === true;
  }

  /**
   * Accept all cookie categories
   */
  acceptAll(): ConsentPreferences {
    return this.saveConsentPreferences({
      [ConsentCategory.Necessary]: true,
      [ConsentCategory.Preferences]: true,
      [ConsentCategory.Analytics]: true,
      [ConsentCategory.Marketing]: true
    });
  }

  /**
   * Deny all non-necessary cookie categories
   */
  denyAll(): ConsentPreferences {
    return this.saveConsentPreferences({
      [ConsentCategory.Necessary]: true,
      [ConsentCategory.Preferences]: false,
      [ConsentCategory.Analytics]: false,
      [ConsentCategory.Marketing]: false
    });
  }

  /**
   * Check if consent has been given (for any category besides necessary)
   */
  hasConsentBeenGiven(): boolean {
    try {
      return this.getCookieValue() !== null;
    } catch {
      return false;
    }
  }

  /**
   * Get cookie value
   */
  private getCookieValue(): string | null {
    // For client-side usage
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      return Cookies.get(this.cookieName) || null;
    }
    
    // For server-side usage, return null since we can't access cookies directly
    return null;
  }

  /**
   * Set cookie value
   */
  private setCookieValue(value: string): void {
    // Only set cookies on the client-side
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      Cookies.set(this.cookieName, value, this.cookieOptions);
    }
  }
}

// Export a default instance
export const cookieManager = new CookieManager();
