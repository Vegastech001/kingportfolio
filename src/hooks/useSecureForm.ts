// Custom hook for secure form handling with encryption
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SecureFormFactory, SecureFormData, SecureSubmissionResult } from '@/lib/security/SecureFormHandler';

interface UseSecureFormOptions {
  endpoint?: string;
  onSuccess?: (result: SecureSubmissionResult) => void;
  onError?: (errors: string[]) => void;
}

interface UseSecureFormReturn {
  formData: SecureFormData;
  isSubmitting: boolean;
  securityScore: number;
  updateField: (field: keyof SecureFormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
  getObfuscatedEmail: () => string;
}

const initialFormData: SecureFormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

export const useSecureForm = (options: UseSecureFormOptions = {}): UseSecureFormReturn => {
  const [formData, setFormData] = useState<SecureFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityScore, setSecurityScore] = useState(100);
  const { toast } = useToast();

  const updateField = useCallback((field: keyof SecureFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const submitForm = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formHandler = SecureFormFactory.createContactFormHandler(options.endpoint);
      const result = await formHandler.submitForm(formData);

      setSecurityScore(result.securityScore);

      if (result.success) {
        toast({
          title: "🔒 Message Sent Securely!",
          description: `Your encrypted message was transmitted safely. Security Score: ${result.securityScore}%`,
        });

        setFormData(initialFormData);
        options.onSuccess?.(result);
      } else {
        toast({
          title: "⚠️ Security Validation Failed",
          description: result.errors.join(', '),
          variant: "destructive",
        });

        options.onError?.(result.errors);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown security error occurred';
      
      toast({
        title: "🛡️ Security Error",
        description: `Failed to process secure submission: ${errorMessage}`,
        variant: "destructive",
      });

      options.onError?.([errorMessage]);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, options, toast]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setSecurityScore(100);
  }, []);

  const getObfuscatedEmail = useCallback(() => {
    if (!formData.email) return '';
    
    const formHandler = SecureFormFactory.createContactFormHandler();
    return formHandler['securityManager']?.obfuscateValue(formData.email) || formData.email;
  }, [formData.email]);

  return {
    formData,
    isSubmitting,
    securityScore,
    updateField,
    submitForm,
    resetForm,
    getObfuscatedEmail
  };
};