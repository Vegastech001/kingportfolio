// Secure Form Handler with Advanced Validation and Encryption
import { SecurityManager, SecurityInputType, SecurityValidationResult } from './SecurityManager';

export interface SecureFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SecureSubmissionResult {
  success: boolean;
  errors: string[];
  encryptedData?: string;
  securityScore: number;
}

// Abstract form handler for polymorphism
abstract class BaseFormHandler {
  protected securityManager: SecurityManager;

  constructor(securityManager: SecurityManager) {
    this.securityManager = securityManager;
  }

  abstract validateForm(data: SecureFormData): Promise<SecurityValidationResult[]>;
  abstract submitForm(data: SecureFormData): Promise<SecureSubmissionResult>;
}

// Secure Contact Form Handler
export class SecureContactFormHandler extends BaseFormHandler {
  private readonly endpoint: string;
  private readonly csrfToken: string;

  constructor(securityManager: SecurityManager, endpoint: string = '') {
    super(securityManager);
    this.endpoint = endpoint;
    this.csrfToken = this.generateCSRFToken();
  }

  async validateForm(data: SecureFormData): Promise<SecurityValidationResult[]> {
    const validationPromises = [
      this.validateField(data.name, SecurityInputType.NAME),
      this.validateField(data.email, SecurityInputType.EMAIL),
      this.validateField(data.subject, SecurityInputType.SUBJECT),
      this.validateField(data.message, SecurityInputType.MESSAGE)
    ];

    return Promise.all(validationPromises);
  }

  async submitForm(data: SecureFormData): Promise<SecureSubmissionResult> {
    // Rate limiting check
    const clientId = this.generateClientId();
    if (!this.securityManager.checkRateLimit(clientId)) {
      return {
        success: false,
        errors: ['Rate limit exceeded. Please wait before submitting again.'],
        securityScore: 0
      };
    }

    // Validate all fields
    const validationResults = await this.validateForm(data);
    const allErrors = validationResults.flatMap(result => result.errors);
    
    if (allErrors.length > 0) {
      return {
        success: false,
        errors: allErrors,
        securityScore: this.calculateOverallScore(validationResults)
      };
    }

    // Sanitize and encrypt data
    const sanitizedData = this.sanitizeFormData(data);
    const encryptedData = this.encryptFormData(sanitizedData);

    try {
      const response = await this.sendSecureRequest(encryptedData, sanitizedData);
      
      return {
        success: response.ok,
        errors: response.ok ? [] : ['Failed to send message securely'],
        encryptedData: encryptedData,
        securityScore: this.calculateOverallScore(validationResults)
      };
    } catch (error) {
      return {
        success: false,
        errors: ['Network error occurred during secure transmission'],
        securityScore: this.calculateOverallScore(validationResults)
      };
    }
  }

  private async validateField(value: string, type: SecurityInputType): Promise<SecurityValidationResult> {
    return this.securityManager.validateInput(value, type);
  }

  private sanitizeFormData(data: SecureFormData): SecureFormData {
    return {
      name: this.securityManager.sanitizeData(data.name) as string,
      email: this.securityManager.sanitizeData(data.email) as string,
      subject: this.securityManager.sanitizeData(data.subject) as string,
      message: this.securityManager.sanitizeData(data.message) as string
    };
  }

  private encryptFormData(data: SecureFormData): string {
    const jsonData = JSON.stringify(data);
    return this.securityManager.encryptData(jsonData);
  }

  private async sendSecureRequest(encryptedData: string, sanitizedData: SecureFormData): Promise<Response> {
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.csrfToken,
      'X-Security-Level': 'high',
      'X-Timestamp': Date.now().toString()
    };

    // Use Formspree or similar service for actual sending
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
    
    const payload = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      _replyto: sanitizedData.email,
      _subject: `Secure Portfolio Contact: ${sanitizedData.subject}`,
      _security_encrypted: encryptedData,
      _security_timestamp: Date.now(),
      _honeypot: '' // Anti-spam honeypot
    };

    return fetch(formspreeEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
  }

  private generateCSRFToken(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return btoa(`${timestamp}-${random}`);
  }

  private generateClientId(): string {
    // Generate a unique client identifier for rate limiting
    const userAgent = navigator.userAgent;
    const timestamp = Math.floor(Date.now() / 60000); // 1-minute buckets
    return btoa(`${userAgent}-${timestamp}`);
  }

  private calculateOverallScore(results: SecurityValidationResult[]): number {
    if (results.length === 0) return 0;
    
    const totalScore = results.reduce((sum, result) => sum + result.securityScore, 0);
    return Math.round(totalScore / results.length);
  }
}

// Factory pattern for creating secure form handlers
export class SecureFormFactory {
  private static securityManager: SecurityManager;

  static createContactFormHandler(endpoint?: string): SecureContactFormHandler {
    if (!this.securityManager) {
      this.securityManager = new SecurityManager();
    }
    
    return new SecureContactFormHandler(this.securityManager, endpoint);
  }

  // Future form types can be added here
  static createNewsletterFormHandler(): BaseFormHandler {
    // Implementation for newsletter forms
    throw new Error('Newsletter form handler not implemented yet');
  }

  static createFeedbackFormHandler(): BaseFormHandler {
    // Implementation for feedback forms
    throw new Error('Feedback form handler not implemented yet');
  }
}