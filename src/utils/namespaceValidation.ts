import type { NamespaceConfig, ValidationErrors } from '../types';

/**
 * Validates that a string field is not empty
 */
export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validates that a numeric field is a positive integer
 */
export const validatePositiveInteger = (value: number, fieldName: string): string | null => {
  if (isNaN(value) || value < 0) {
    return `${fieldName} must be a positive number`;
  }
  if (!Number.isInteger(value)) {
    return `${fieldName} must be a whole number`;
  }
  return null;
};

/**
 * Validates architecture review - explanation is required when approved is false
 */
export const validateArchitectureReview = (
  approved: boolean,
  explanation: string | undefined,
  reviewName: string
): string | null => {
  if (!approved && (!explanation || explanation.trim() === '')) {
    return `Explanation is required when ${reviewName} is not approved`;
  }
  return null;
};

/**
 * Validates all required fields in the namespace configuration
 */
export const validateNamespaceConfig = (config: NamespaceConfig): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate required string fields
  const requiredStringFields: Array<{ key: keyof NamespaceConfig; label: string }> = [
    { key: 'applicationName', label: 'Application Name' },
    { key: 'namespaceName', label: 'Namespace Name' },
    { key: 'namespaceDescription', label: 'Namespace Description' },
    { key: 'namespaceAccessAdGroup', label: 'Namespace Access AD Group' },
    { key: 'awsIamRole', label: 'AWS IAM Role' },
  ];

  requiredStringFields.forEach(({ key, label }) => {
    const error = validateRequired(config[key] as string, label);
    if (error) {
      errors[key] = error;
    }
  });

  // Validate Kubernetes Quotas numeric fields
  const numericQuotaFields: Array<{ key: keyof typeof config.kubernetesQuotas; label: string }> = [
    { key: 'services', label: 'Services' },
    { key: 'pods', label: 'Pods' },
    { key: 'persistentVolumeClaims', label: 'Persistent Volume Claims' },
  ];

  numericQuotaFields.forEach(({ key, label }) => {
    const error = validatePositiveInteger(config.kubernetesQuotas[key] as number, label);
    if (error) {
      errors[`kubernetesQuotas.${key}`] = error;
    }
  });

  // Validate resource string fields are not empty
  const resourceStringFields: Array<{ key: keyof typeof config.kubernetesQuotas; label: string }> = [
    { key: 'requestsCpu', label: 'Requests CPU' },
    { key: 'requestsMemory', label: 'Requests Memory' },
    { key: 'limitsMemory', label: 'Limits Memory' },
    { key: 'requestsEphemeralStorage', label: 'Requests Ephemeral Storage' },
  ];

  resourceStringFields.forEach(({ key, label }) => {
    const error = validateRequired(config.kubernetesQuotas[key] as string, label);
    if (error) {
      errors[`kubernetesQuotas.${key}`] = error;
    }
  });

  // Validate architecture reviews
  const solutionArchError = validateArchitectureReview(
    config.solutionArchReview.approved,
    config.solutionArchReview.explanation,
    'Solution Architecture Review'
  );
  if (solutionArchError) {
    errors['solutionArchReview.explanation'] = solutionArchError;
  }

  const techArchError = validateArchitectureReview(
    config.techArchReview.approved,
    config.techArchReview.explanation,
    'Technical Architecture Review'
  );
  if (techArchError) {
    errors['techArchReview.explanation'] = techArchError;
  }

  const securityArchError = validateArchitectureReview(
    config.securityArchReview.approved,
    config.securityArchReview.explanation,
    'Security Architecture Review'
  );
  if (securityArchError) {
    errors['securityArchReview.explanation'] = securityArchError;
  }

  return errors;
};

/**
 * Checks if there are any validation errors
 */
export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * Generates a user-friendly error message for a specific field
 */
export const getFieldError = (errors: ValidationErrors, fieldPath: string): string | undefined => {
  return errors[fieldPath];
};

/**
 * Clears a specific field error
 */
export const clearFieldError = (errors: ValidationErrors, fieldPath: string): ValidationErrors => {
  const newErrors = { ...errors };
  delete newErrors[fieldPath];
  return newErrors;
};

/**
 * Validates a single field and returns the error if any
 */
export const validateField = (
  config: NamespaceConfig,
  fieldPath: string
): string | null => {
  const allErrors = validateNamespaceConfig(config);
  return allErrors[fieldPath] || null;
};
