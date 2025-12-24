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
    { key: 'splunkHecToken', label: 'Splunk HEC Token' },
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

  const serviceMeshError = validateArchitectureReview(
    config.isPartOfServiceMesh.approved,
    config.isPartOfServiceMesh.explanation,
    'Service Mesh'
  );
  if (serviceMeshError) {
    errors['isPartOfServiceMesh.explanation'] = serviceMeshError;
  }

  // Validate storage requirements
  if (config.storageRequirements && config.storageRequirements.length > 0) {
    config.storageRequirements.forEach((storage, index) => {
      if (storage.storageSize <= 0) {
        errors[`storageRequirements.${index}.storageSize`] = 'Storage size must be greater than 0';
      }
      if (storage.storageType === 'EFS' && (!storage.efsAccessPointId || storage.efsAccessPointId.trim() === '')) {
        errors[`storageRequirements.${index}.efsAccessPointId`] = 'EFS Access Point ID is required when storage type is EFS';
      }
      if (storage.storageType === 'Islon' && (!storage.islonSharePath || storage.islonSharePath.trim() === '')) {
        errors[`storageRequirements.${index}.islonSharePath`] = 'Islon Share Path is required when storage type is Islon';
      }
    });
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

/**
 * Generates a unique namespace ID using timestamp format
 * Format: ns-{timestamp}
 */
export const generateNamespaceId = (): string => {
  return `ns-${Date.now()}`;
};

/**
 * Creates a default namespace configuration with reasonable default values
 * Used when creating a new namespace entry
 */
export const createDefaultNamespaceConfig = (): NamespaceConfig => {
  return {
    id: generateNamespaceId(),
    applicationName: '',
    namespaceName: '',
    namespaceDescription: '',
    kubernetesQuotas: {
      services: 5,
      pods: 20,
      requestsCpu: '2',
      requestsMemory: '4Gi',
      limitsMemory: '8Gi',
      requestsEphemeralStorage: '5Gi',
      persistentVolumeClaims: 2,
    },
    namespaceAccessAdGroup: '',
    solutionArchReview: {
      approved: false,
      explanation: '',
    },
    techArchReview: {
      approved: false,
      explanation: '',
    },
    securityArchReview: {
      approved: false,
      explanation: '',
    },
    isPartOfServiceMesh: {
      approved: false,
      explanation: '',
    },
    awsIamRole: '',
    splunkHecToken: '',
    egressEndpointsList: [],
    exposedDomainsList: [],
    storageRequirements: [],
  };
};

/**
 * Migrates old string[] format to new EgressEndpoint[] format
 * Used for backward compatibility when loading old data
 */
export const migrateEgressEndpoints = (endpoints: any[]): any[] => {
  if (!endpoints || endpoints.length === 0) {
    return [];
  }

  // Check if already in new format
  if (typeof endpoints[0] === 'object' && 'domain' in endpoints[0]) {
    return endpoints;
  }

  // Migrate from old string format
  return (endpoints as string[]).map((endpoint) => {
    const trimmed = String(endpoint).trim();
    // Try to parse "domain:port" format or just domain
    const parts = trimmed.split(':');
    if (parts.length === 2) {
      return { domain: parts[0].trim(), port: parts[1].trim() };
    }
    return { domain: trimmed };
  });
};
