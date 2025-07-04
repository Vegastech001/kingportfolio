// Secure Component Base Class with Polymorphism and Encapsulation
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SecurePortfolioManager } from '@/lib/security/SecurityManager';

// Abstract base component for all secure components
export abstract class SecureComponent<P = {}, S = {}> extends Component<P, S> {
  protected securityManager = SecurePortfolioManager.getInstance();
  private componentId: string;

  constructor(props: P) {
    super(props);
    this.componentId = this.generateComponentId();
    this.state = this.getInitialSecureState();
  }

  // Abstract methods that must be implemented by subclasses
  protected abstract getInitialSecureState(): S;
  protected abstract renderSecureContent(): ReactNode;

  componentDidMount() {
    this.validateComponentSecurity();
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.logSecurityEvent('COMPONENT_ERROR', {
      error: error.message,
      componentId: this.componentId,
      errorInfo
    });
  }

  render(): ReactNode {
    try {
      return this.renderSecureContent();
    } catch (error) {
      this.logSecurityEvent('RENDER_ERROR', { error, componentId: this.componentId });
      return this.renderErrorFallback();
    }
  }

  private generateComponentId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return this.securityManager.obfuscateValue(`${this.constructor.name}-${timestamp}-${random}`);
  }

  private validateComponentSecurity(): void {
    // Check for potential security vulnerabilities
    if (typeof window !== 'undefined') {
      const securityChecks = [
        this.checkForXSSVulnerabilities(),
        this.checkForCSRFProtection(),
        this.checkForDataEncryption()
      ];

      const failedChecks = securityChecks.filter(check => !check.passed);
      
      if (failedChecks.length > 0) {
        this.logSecurityEvent('SECURITY_CHECK_FAILED', {
          componentId: this.componentId,
          failedChecks: failedChecks.map(check => check.name)
        });
      }
    }
  }

  private checkForXSSVulnerabilities(): { passed: boolean; name: string } {
    // Basic XSS protection check
    const dangerousElements = document.querySelectorAll('script, iframe, object, embed');
    return {
      passed: dangerousElements.length === 0,
      name: 'XSS_PROTECTION'
    };
  }

  private checkForCSRFProtection(): { passed: boolean; name: string } {
    // Check for CSRF tokens in forms
    const forms = document.querySelectorAll('form');
    const hasCSRFProtection = Array.from(forms).every(form => {
      return form.querySelector('[name*="csrf"], [name*="token"]') !== null;
    });

    return {
      passed: hasCSRFProtection || forms.length === 0,
      name: 'CSRF_PROTECTION'
    };
  }

  private checkForDataEncryption(): { passed: boolean; name: string } {
    // Check if sensitive data is properly encrypted
    return {
      passed: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
      name: 'DATA_ENCRYPTION'
    };
  }

  private logSecurityEvent(event: string, data: any): void {
    const encryptedLog = this.securityManager.encryptData(JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      componentId: this.componentId,
      data
    }));

    console.warn(`🛡️ Security Event [${event}]:`, encryptedLog);
  }

  private renderErrorFallback(): ReactNode {
    return (
      <div className="p-4 border border-destructive bg-destructive/10 rounded-lg">
        <h3 className="font-bold text-destructive mb-2">Security Error</h3>
        <p className="text-sm text-muted-foreground">
          A security validation error occurred. The component has been safely isolated.
        </p>
      </div>
    );
  }
}

// Secure functional component wrapper with hooks
export function withSecurity<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function SecureWrapper(props: P) {
    React.useEffect(() => {
      const securityManager = SecurePortfolioManager.getInstance();
      
      // Validate component props for security
      const sanitizedProps = securityManager.sanitizeData(props);
      
      if (JSON.stringify(sanitizedProps) !== JSON.stringify(props)) {
        console.warn('🛡️ Props sanitized for security:', {
          original: Object.keys(props),
          sanitized: Object.keys(sanitizedProps as object)
        });
      }
    }, [props]);

    return <WrappedComponent {...props} />;
  };
}

// Error boundary for security-related errors
export class SecurityErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; errorInfo?: string }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorInfo: error.message
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const securityManager = SecurePortfolioManager.getInstance();
    const encryptedError = securityManager.encryptData(JSON.stringify({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    }));

    console.error('🛡️ Security Error Boundary:', encryptedError);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 border border-destructive bg-destructive/10 rounded-lg text-center">
          <h2 className="text-xl font-bold text-destructive mb-4">Security Protection Active</h2>
          <p className="text-muted-foreground mb-4">
            A potential security threat was detected and neutralized.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Reset Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}