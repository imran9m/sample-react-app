import type { NamespaceConfig, EgressEndpoint } from '../types';

// Helper function to migrate old string[] format to new EgressEndpoint[] format
const migrateEndpoints = (endpoints: string[] | EgressEndpoint[]): EgressEndpoint[] => {
  if (!endpoints || endpoints.length === 0) {
    return [];
  }

  // Check if already in new format
  if (typeof endpoints[0] === 'object' && 'domain' in endpoints[0]) {
    return endpoints as EgressEndpoint[];
  }

  // Migrate from old string format
  return (endpoints as string[]).map((endpoint) => {
    const trimmed = endpoint.trim();
    // Try to parse "domain:port" format or just domain
    const parts = trimmed.split(':');
    if (parts.length === 2) {
      return { domain: parts[0].trim(), port: parts[1].trim() };
    }
    return { domain: trimmed };
  });
};

// Mock data - in production, this would come from actual API endpoints
const MOCK_NAMESPACES_DATA: NamespaceConfig[] = [
  {
    id: "ns-001",
    applicationName: "Customer Portal",
    namespaceName: "customer-portal-prod",
    namespaceDescription: "Production environment for the customer-facing web portal application",
    kubernetesQuotas: {
      services: 10,
      pods: 50,
      requestsCpu: "4",
      requestsMemory: "8Gi",
      limitsMemory: "16Gi",
      requestsEphemeralStorage: "10Gi",
      persistentVolumeClaims: 5
    },
    namespaceAccessAdGroup: "customer-portal-team-prod",
    solutionArchReview: {
      approved: true
    },
    techArchReview: {
      approved: true
    },
    securityArchReview: {
      approved: true
    },
    awsIamRole: "arn:aws:iam::123456789012:role/customer-portal-prod-role",
    splunkHecToken: "11111111-1111-1111-1111-111111111111",
    egressEndpointsList: migrateEndpoints(["api.payment-gateway.com", "api.analytics.example.com", "db.customer-data.internal"]),
    exposedDomainsList: [
      { domain: "portal.example.com", port: "443", tlsMode: "SIMPLE" },
      { domain: "api.portal.example.com", port: "443", tlsMode: "PASSTHROUGH" }
    ]
  },
  {
    id: "ns-002",
    applicationName: "Analytics Service",
    namespaceName: "analytics-service-staging",
    namespaceDescription: "Staging environment for the analytics and reporting service",
    kubernetesQuotas: {
      services: 5,
      pods: 20,
      requestsCpu: "2",
      requestsMemory: "4Gi",
      limitsMemory: "8Gi",
      requestsEphemeralStorage: "5Gi",
      persistentVolumeClaims: 3
    },
    namespaceAccessAdGroup: "analytics-team-staging",
    solutionArchReview: {
      approved: true
    },
    techArchReview: {
      approved: false,
      explanation: "Needs optimization for resource usage and caching strategy review"
    },
    securityArchReview: {
      approved: true
    },
    awsIamRole: "arn:aws:iam::123456789012:role/analytics-staging-role",
    splunkHecToken: "22222222-2222-2222-2222-222222222222",
    egressEndpointsList: migrateEndpoints(["s3.amazonaws.com", "api.data-warehouse.internal"]),
    exposedDomainsList: [
      { domain: "analytics.staging.example.com", port: "8080", tlsMode: "SIMPLE" }
    ]
  },
  {
    id: "ns-003",
    applicationName: "Internal Tools",
    namespaceName: "internal-tools-dev",
    namespaceDescription: "Development environment for internal tooling and automation scripts",
    kubernetesQuotas: {
      services: 3,
      pods: 10,
      requestsCpu: "1",
      requestsMemory: "2Gi",
      limitsMemory: "4Gi",
      requestsEphemeralStorage: "2Gi",
      persistentVolumeClaims: 1
    },
    namespaceAccessAdGroup: "platform-engineering-dev",
    solutionArchReview: {
      approved: false,
      explanation: "Architecture design document pending review by solution architecture team"
    },
    techArchReview: {
      approved: false,
      explanation: "Technical implementation needs review for scalability concerns"
    },
    securityArchReview: {
      approved: true
    },
    awsIamRole: "arn:aws:iam::123456789012:role/internal-tools-dev-role",
    splunkHecToken: "33333333-3333-3333-3333-333333333333",
    egressEndpointsList: migrateEndpoints(["github.com", "api.slack.com", "api.jira.internal"]),
    exposedDomainsList: []
  }
];

// Type for namespace name list response
export interface NamespaceNameItem {
  id: string;
  name: string;
}

export interface NamespaceNamesResponse {
  namespaces: NamespaceNameItem[];
}

/**
 * Mock API: Fetch list of namespace names
 * In production, this would call: GET /api/namespaces
 */
export async function fetchNamespaceNames(): Promise<NamespaceNamesResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Extract only id and name from full namespace data
  const namespaceNames = MOCK_NAMESPACES_DATA.map(ns => ({
    id: ns.id,
    name: ns.namespaceName
  }));

  return { namespaces: namespaceNames };
}

/**
 * Mock API: Fetch full configuration for a specific namespace
 * In production, this would call: GET /api/namespaces/:id
 */
export async function fetchNamespaceById(id: string): Promise<NamespaceConfig> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));

  const namespace = MOCK_NAMESPACES_DATA.find(ns => ns.id === id);

  if (!namespace) {
    throw new Error(`Namespace with id "${id}" not found`);
  }

  return namespace;
}
