// Advanced Security Manager with Polymorphism and Encapsulation
interface ISecurityManager {
  validateInput(input: string, type: SecurityInputType): SecurityValidationResult;
  sanitizeData(data: unknown): unknown;
  encryptData(data: string): string;
  obfuscateValue(value: string): string;
}

interface ISecurityPolicy {
  enforce(data: unknown): boolean;
  getViolations(): string[];
}

export enum SecurityInputType {
  NAME = 'name',
  EMAIL = 'email',
  SUBJECT = 'subject',
  MESSAGE = 'message',
  GENERIC = 'generic'
}

export interface SecurityValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue: string;
  securityScore: number;
}

// Abstract base class for security policies (Polymorphism)
abstract class BaseSecurityPolicy implements ISecurityPolicy {
  protected violations: string[] = [];

  abstract enforce(data: unknown): boolean;
  
  getViolations(): string[] {
    return [...this.violations];
  }

  protected clearViolations(): void {
    this.violations = [];
  }
}

// Content Security Policy Implementation
class ContentSecurityPolicy extends BaseSecurityPolicy {
  private readonly dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>.*?<\/embed>/gi,
    /<link[^>]*>.*?<\/link>/gi,
    /<meta[^>]*>.*?<\/meta>/gi,
    /data:(?!image\/)/gi,
    /vbscript:/gi,
    /expression\s*\(/gi
  ];

  enforce(data: unknown): boolean {
    this.clearViolations();
    
    if (typeof data !== 'string') return true;
    
    for (const pattern of this.dangerousPatterns) {
      if (pattern.test(data)) {
        this.violations.push(`Detected potentially malicious content: ${pattern.source}`);
      }
    }
    
    return this.violations.length === 0;
  }
}

// Input Length Policy
class InputLengthPolicy extends BaseSecurityPolicy {
  private readonly maxLengths: Record<string, number> = {
    [SecurityInputType.NAME]: 100,
    [SecurityInputType.EMAIL]: 254,
    [SecurityInputType.SUBJECT]: 200,
    [SecurityInputType.MESSAGE]: 5000,
    [SecurityInputType.GENERIC]: 1000
  };

  enforce(data: unknown, type: SecurityInputType = SecurityInputType.GENERIC): boolean {
    this.clearViolations();
    
    if (typeof data !== 'string') return true;
    
    const maxLength = this.maxLengths[type];
    if (data.length > maxLength) {
      this.violations.push(`Input exceeds maximum length of ${maxLength} characters`);
      return false;
    }
    
    return true;
  }
}

// Rate Limiting Policy (Simple implementation for frontend)
class RateLimitPolicy extends BaseSecurityPolicy {
  private static attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly maxAttempts = 5;
  private readonly timeWindow = 60000; // 1 minute

  enforce(identifier: string): boolean {
    this.clearViolations();
    
    const now = Date.now();
    const key = this.obfuscateIdentifier(identifier);
    const current = RateLimitPolicy.attempts.get(key);
    
    if (!current) {
      RateLimitPolicy.attempts.set(key, { count: 1, timestamp: now });
      return true;
    }
    
    if (now - current.timestamp > this.timeWindow) {
      RateLimitPolicy.attempts.set(key, { count: 1, timestamp: now });
      return true;
    }
    
    if (current.count >= this.maxAttempts) {
      this.violations.push('Rate limit exceeded. Please wait before trying again.');
      return false;
    }
    
    current.count++;
    return true;
  }

  private obfuscateIdentifier(identifier: string): string {
    // Simple hash function for obfuscation
    let hash = 0;
    for (let i = 0; i < identifier.length; i++) {
      const char = identifier.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }
}

// Main Security Manager Implementation (Encapsulation)
export class SecurityManager implements ISecurityManager {
  private readonly contentPolicy: ContentSecurityPolicy;
  private readonly lengthPolicy: InputLengthPolicy;
  private readonly ratePolicy: RateLimitPolicy;
  private readonly encryptionKey: string;

  constructor() {
    this.contentPolicy = new ContentSecurityPolicy();
    this.lengthPolicy = new InputLengthPolicy();
    this.ratePolicy = new RateLimitPolicy();
    this.encryptionKey = this.generateSecureKey();
  }

  validateInput(input: string, type: SecurityInputType): SecurityValidationResult {
    const errors: string[] = [];
    let securityScore = 100;

    // Content validation
    if (!this.contentPolicy.enforce(input)) {
      errors.push(...this.contentPolicy.getViolations());
      securityScore -= 30;
    }

    // Length validation
    if (!this.lengthPolicy.enforce(input, type)) {
      errors.push(...this.lengthPolicy.getViolations());
      securityScore -= 20;
    }

    // Additional type-specific validations
    const typeSpecificErrors = this.validateByType(input, type);
    errors.push(...typeSpecificErrors);
    securityScore -= typeSpecificErrors.length * 10;

    // Sanitize the input
    const sanitizedValue = this.sanitizeInput(input);

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue,
      securityScore: Math.max(0, securityScore)
    };
  }

  sanitizeData(data: unknown): unknown {
    if (typeof data === 'string') {
      return this.sanitizeInput(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }
    
    if (data && typeof data === 'object') {
      const sanitized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[this.sanitizeInput(key)] = this.sanitizeData(value);
      }
      return sanitized;
    }
    
    return data;
  }

  encryptData(data: string): string {
    // Simple XOR encryption (for demonstration - use proper encryption in production)
    const key = this.encryptionKey;
    let encrypted = '';
    
    for (let i = 0; i < data.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const dataChar = data.charCodeAt(i);
      encrypted += String.fromCharCode(dataChar ^ keyChar);
    }
    
    return btoa(encrypted); // Base64 encode
  }

  obfuscateValue(value: string): string {
    if (value.length <= 4) return '*'.repeat(value.length);
    
    const start = value.substring(0, 2);
    const end = value.substring(value.length - 2);
    const middle = '*'.repeat(value.length - 4);
    
    return start + middle + end;
  }

  checkRateLimit(identifier: string): boolean {
    return this.ratePolicy.enforce(identifier);
  }

  private generateSecureKey(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36);
    const combined = timestamp + random;
    
    // Simple hash for key generation
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return hash.toString(16).padStart(16, '0');
  }

  private sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript protocols
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/data:(?!image\/)/gi, '') // Remove data URLs except images
      .trim();
  }

  private validateByType(input: string, type: SecurityInputType): string[] {
    const errors: string[] = [];

    switch (type) {
      case SecurityInputType.EMAIL:
        if (!this.isValidEmail(input)) {
          errors.push('Invalid email format');
        }
        break;
      
      case SecurityInputType.NAME:
        if (!/^[a-zA-Z\s\-'\.]+$/.test(input)) {
          errors.push('Name contains invalid characters');
        }
        break;
      
      case SecurityInputType.SUBJECT:
        if (input.length < 3) {
          errors.push('Subject too short');
        }
        break;
      
      case SecurityInputType.MESSAGE:
        if (input.length < 10) {
          errors.push('Message too short');
        }
        break;
    }

    return errors;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}

// Singleton pattern for global security manager
export class SecurePortfolioManager {
  private static instance: SecurityManager;

  static getInstance(): SecurityManager {
    if (!SecurePortfolioManager.instance) {
      SecurePortfolioManager.instance = new SecurityManager();
    }
    return SecurePortfolioManager.instance;
  }

  private constructor() {} // Prevent instantiation
}