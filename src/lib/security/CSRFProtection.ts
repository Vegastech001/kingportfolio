// CSRF Protection with Token Management
export class CSRFProtection {
  private static instance: CSRFProtection;
  private token: string | null = null;
  private tokenExpiry: number = 0;
  private readonly tokenDuration = 3600000; // 1 hour

  static getInstance(): CSRFProtection {
    if (!CSRFProtection.instance) {
      CSRFProtection.instance = new CSRFProtection();
    }
    return CSRFProtection.instance;
  }

  private constructor() {
    this.generateToken();
  }

  getToken(): string {
    if (!this.token || this.isTokenExpired()) {
      this.generateToken();
    }
    return this.token!;
  }

  validateToken(token: string): boolean {
    return token === this.token && !this.isTokenExpired();
  }

  refreshToken(): string {
    this.generateToken();
    return this.token!;
  }

  private generateToken(): void {
    const timestamp = Date.now();
    const random = crypto.getRandomValues(new Uint8Array(32));
    const randomString = Array.from(random, byte => byte.toString(16).padStart(2, '0')).join('');
    
    this.token = btoa(`${timestamp}-${randomString}`);
    this.tokenExpiry = timestamp + this.tokenDuration;
    
    // Store in session storage for persistence across tabs
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('csrf_token', this.token);
      sessionStorage.setItem('csrf_expiry', this.tokenExpiry.toString());
    }
  }

  private isTokenExpired(): boolean {
    return Date.now() > this.tokenExpiry;
  }

  // Initialize from storage on page load
  initializeFromStorage(): void {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('csrf_token');
      const storedExpiry = sessionStorage.getItem('csrf_expiry');
      
      if (storedToken && storedExpiry) {
        const expiry = parseInt(storedExpiry, 10);
        if (Date.now() < expiry) {
          this.token = storedToken;
          this.tokenExpiry = expiry;
          return;
        }
      }
    }
    
    this.generateToken();
  }
}

// CSRF Hook for React components
export function useCSRFProtection() {
  const [token, setToken] = React.useState<string>('');

  React.useEffect(() => {
    const csrf = CSRFProtection.getInstance();
    csrf.initializeFromStorage();
    setToken(csrf.getToken());

    // Refresh token periodically
    const interval = setInterval(() => {
      setToken(csrf.refreshToken());
    }, 1800000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  const validateToken = React.useCallback((tokenToValidate: string): boolean => {
    const csrf = CSRFProtection.getInstance();
    return csrf.validateToken(tokenToValidate);
  }, []);

  return { token, validateToken };
}

import React from 'react';