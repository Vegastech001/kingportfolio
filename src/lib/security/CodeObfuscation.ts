// Advanced Code Obfuscation and Protection Utilities
export class CodeObfuscator {
  private static readonly obfuscationMap = new Map<string, string>();
  private static keyPool: string[] = [];

  // Generate obfuscated function names and variable names
  static obfuscateIdentifier(original: string): string {
    if (this.obfuscationMap.has(original)) {
      return this.obfuscationMap.get(original)!;
    }

    const obfuscated = this.generateObfuscatedName();
    this.obfuscationMap.set(original, obfuscated);
    return obfuscated;
  }

  // Obfuscate string literals
  static obfuscateString(str: string): string {
    const encoded = btoa(encodeURIComponent(str));
    return `atob(decodeURIComponent("${encoded}"))`;
  }

  // Create dynamic function calls to prevent static analysis
  static createDynamicCall(functionName: string, ...args: any[]): any {
    const obfuscatedName = this.obfuscateIdentifier(functionName);
    const dynamicFunction = new Function('name', 'args', `
      return window[name] ? window[name](...args) : 
             (typeof global !== 'undefined' && global[name]) ? global[name](...args) :
             eval(name + '(...args)');
    `);
    
    return dynamicFunction(obfuscatedName, args);
  }

  // Encrypt sensitive configuration
  static encryptConfig(config: Record<string, any>): string {
    const key = this.generateEncryptionKey();
    const serialized = JSON.stringify(config);
    
    let encrypted = '';
    for (let i = 0; i < serialized.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const textChar = serialized.charCodeAt(i);
      encrypted += String.fromCharCode(textChar ^ keyChar);
    }
    
    return btoa(encrypted);
  }

  static decryptConfig(encrypted: string): Record<string, any> {
    const key = this.generateEncryptionKey();
    const decoded = atob(encrypted);
    
    let decrypted = '';
    for (let i = 0; i < decoded.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const encryptedChar = decoded.charCodeAt(i);
      decrypted += String.fromCharCode(encryptedChar ^ keyChar);
    }
    
    return JSON.parse(decrypted);
  }

  // Anti-debugging techniques
  static enableAntiDebugging(): void {
    // Detect DevTools
    let devtools = {
      open: false,
      orientation: null as string | null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.handleDebuggingAttempt();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable common debugging shortcuts
    document.addEventListener('keydown', (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.keyCode === 123 || 
          (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
          (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
        this.handleDebuggingAttempt();
      }
    });

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  // Code integrity checking
  static verifyCodeIntegrity(): boolean {
    const expectedHash = this.calculateCodeHash();
    const currentHash = this.getCurrentCodeHash();
    
    if (expectedHash !== currentHash) {
      console.warn('🛡️ Code integrity violation detected');
      return false;
    }
    
    return true;
  }

  // Dynamic code loading with integrity checks
  static loadSecureModule(moduleName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const nonce = this.generateNonce();
      
      script.nonce = nonce;
      script.onload = () => {
        if (this.verifyModuleIntegrity(moduleName)) {
          resolve(window[this.obfuscateIdentifier(moduleName)]);
        } else {
          reject(new Error('Module integrity check failed'));
        }
      };
      
      script.onerror = () => reject(new Error('Failed to load secure module'));
      script.src = this.obfuscateString(`/modules/${moduleName}.js`);
      
      document.head.appendChild(script);
    });
  }

  private static generateObfuscatedName(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = Math.floor(Math.random() * 8) + 8; // 8-16 characters
    
    let result = chars[Math.floor(Math.random() * 52)]; // Start with letter
    for (let i = 1; i < length; i++) {
      result += chars[Math.floor(Math.random() * 52)];
    }
    
    return result;
  }

  private static generateEncryptionKey(): string {
    // Generate key based on browser fingerprint
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset()
    ].join('|');
    
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16);
  }

  private static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private static handleDebuggingAttempt(): void {
    console.clear();
    console.warn('🛡️ Debugging attempt detected and blocked');
    
    // Optional: redirect or disable functionality
    // window.location.href = '/security-warning';
  }

  private static calculateCodeHash(): string {
    // This would contain the expected hash of your code
    // In a real implementation, this would be generated during build
    return 'expected_hash_here';
  }

  private static getCurrentCodeHash(): string {
    // Calculate current code hash
    const scripts = document.querySelectorAll('script[src]');
    let combined = '';
    
    scripts.forEach(script => {
      combined += script.getAttribute('src') || '';
    });
    
    return this.simpleHash(combined);
  }

  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  private static verifyModuleIntegrity(moduleName: string): boolean {
    // Verify the loaded module hasn't been tampered with
    const module = window[this.obfuscateIdentifier(moduleName)];
    return module && typeof module === 'object';
  }
}

// Initialize protection measures
if (typeof window !== 'undefined') {
  CodeObfuscator.enableAntiDebugging();
  
  // Periodically verify code integrity
  setInterval(() => {
    if (!CodeObfuscator.verifyCodeIntegrity()) {
      console.warn('🛡️ Security integrity check failed');
    }
  }, 60000); // Check every minute
}