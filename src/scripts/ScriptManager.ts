import { ConsentCategory, Script } from '../types';

/**
 * Script manager for loading scripts based on consent
 */
export class ScriptManager {
  private scripts: Map<string, Script> = new Map();
  private loadedScripts: Set<string> = new Set();

  /**
   * Register a script
   */
  register(script: Script): void {
    if (!script.id) {
      throw new Error('Script ID is required');
    }
    
    if (!script.category) {
      throw new Error('Script category is required');
    }
    
    if (!script.src && !script.content) {
      throw new Error('Either src or content is required');
    }
    
    this.scripts.set(script.id, script);
  }

  /**
   * Register multiple scripts
   */
  registerBatch(scripts: Script[]): void {
    scripts.forEach(script => this.register(script));
  }

  /**
   * Load a script by ID if consent is given
   */
  loadScript(id: string, hasConsent: boolean): Promise<boolean> {
    const script = this.scripts.get(id);
    
    if (!script) {
      console.error(`Script with ID ${id} not found`);
      return Promise.resolve(false);
    }
    
    // Skip if already loaded
    if (this.loadedScripts.has(id)) {
      return Promise.resolve(true);
    }
    
    // Only load if consent is given
    if (!hasConsent) {
      return Promise.resolve(false);
    }
    
    return new Promise((resolve) => {
      // External script
      if (script.src) {
        this.loadExternalScript(script, () => {
          this.loadedScripts.add(id);
          resolve(true);
        });
      } 
      // Inline script
      else if (script.content) {
        this.loadInlineScript(script);
        this.loadedScripts.add(id);
        resolve(true);
      }
    });
  }

  /**
   * Load scripts by category if consent is given
   */
  loadScriptsByCategory(category: ConsentCategory, hasConsent: boolean): Promise<boolean[]> {
    const categoryScripts = Array.from(this.scripts.values())
      .filter(script => script.category === category);
    
    return Promise.all(
      categoryScripts.map(script => this.loadScript(script.id, hasConsent))
    );
  }

  /**
   * Check if a script is loaded
   */
  isLoaded(id: string): boolean {
    return this.loadedScripts.has(id);
  }

  /**
   * Get all registered scripts
   */
  getAllScripts(): Script[] {
    return Array.from(this.scripts.values());
  }

  /**
   * Get scripts by category
   */
  getScriptsByCategory(category: ConsentCategory): Script[] {
    return Array.from(this.scripts.values())
      .filter(script => script.category === category);
  }

  /**
   * Load an external script
   */
  private loadExternalScript(script: Script, callback: () => void): void {
    if (typeof document === 'undefined') return;
    
    const scriptElement = document.createElement('script');
    
    // Add src attribute
    if (script.src) {
      scriptElement.src = script.src;
    }
    
    // Add custom attributes
    if (script.attributes) {
      Object.entries(script.attributes).forEach(([key, value]) => {
        scriptElement.setAttribute(key, value);
      });
    }
    
    // Set callback
    scriptElement.onload = callback;
    
    // Add to document
    document.head.appendChild(scriptElement);
  }

  /**
   * Load an inline script
   */
  private loadInlineScript(script: Script): void {
    if (typeof document === 'undefined' || !script.content) return;
    
    const scriptElement = document.createElement('script');
    
    // Set content
    scriptElement.text = script.content;
    
    // Add custom attributes
    if (script.attributes) {
      Object.entries(script.attributes).forEach(([key, value]) => {
        scriptElement.setAttribute(key, value);
      });
    }
    
    // Add to document
    document.head.appendChild(scriptElement);
  }
}

// Create a default instance
export const scriptManager = new ScriptManager();
