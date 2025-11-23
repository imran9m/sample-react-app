/**
 * Theme type definition
 */
export type Theme = 'dark' | 'light';

/**
 * Theme Context Interface
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Kubernetes Quotas Interface
 * Defines resource limits and requests for Kubernetes namespace resources
 */
export interface KubernetesQuotas {
  services: number;
  pods: number;
  requestsCpu: string;
  requestsMemory: string;
  limitsMemory: string;
  requestsEphemeralStorage: string;
  persistentVolumeClaims: number;
}

/**
 * Architecture Review Interface
 * Represents approval status and optional explanation for architecture reviews
 */
export interface ArchitectureReview {
  approved: boolean;
  explanation?: string;
}

/**
 * Egress Endpoint Interface
 * Represents an egress endpoint with domain and port
 */
export interface EgressEndpoint {
  domain: string;
  port?: string;
}

/**
 * TLS Mode for Exposed Domains
 */
export type TlsMode = 'SIMPLE' | 'PASSTHROUGH';

/**
 * Exposed Domain Interface
 * Represents a domain to be exposed with port and TLS mode
 */
export interface ExposedDomain {
  domain: string;
  port: string;
  tlsMode: TlsMode;
}

/**
 * Namespace Configuration Interface
 * Complete configuration for a Kubernetes namespace
 */
export interface NamespaceConfig {
  id: string;
  applicationName: string;
  namespaceName: string;
  namespaceDescription: string;
  kubernetesQuotas: KubernetesQuotas;
  namespaceAccessAdGroup: string;
  solutionArchReview: ArchitectureReview;
  techArchReview: ArchitectureReview;
  securityArchReview: ArchitectureReview;
  awsIamRole: string;
  splunkHecToken: string;
  egressEndpointsList: EgressEndpoint[];
  exposedDomainsList: ExposedDomain[];
}

/**
 * Validation Error Map
 * Maps field names to their validation error messages
 */
export type ValidationErrors = Record<string, string>;

/**
 * Form State Interface
 * Manages the state of the namespace form including data and validation
 */
export interface NamespaceFormState {
  formData: NamespaceConfig;
  validationErrors: ValidationErrors;
  isDirty: boolean;
}
