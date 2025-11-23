import React, { useEffect, useState } from 'react';
import type { ValidationErrors, EgressEndpoint } from '../../types';

interface AccessEndpointsSectionProps {
  namespaceAccessAdGroup: string;
  awsIamRole: string;
  egressEndpointsList: EgressEndpoint[];
  onChange: (field: string, value: string | EgressEndpoint[]) => void;
  errors?: ValidationErrors;
}

export const AccessEndpointsSection: React.FC<AccessEndpointsSectionProps> = ({
  namespaceAccessAdGroup,
  awsIamRole,
  egressEndpointsList,
  onChange,
  errors = {},
}) => {
  const [endpoints, setEndpoints] = useState<EgressEndpoint[]>([]);

  // Initialize and sync local endpoints array from prop
  useEffect(() => {
    const items = egressEndpointsList || [];
    setEndpoints(items.length > 0 ? items : [{ domain: '', port: '' }]);
  }, [egressEndpointsList]);

  const emitChange = (values: EgressEndpoint[]) => {
    // Only include endpoints that have at least a domain
    const cleaned = values
      .map((v) => ({
        domain: (v.domain || '').trim(),
        port: (v.port || '').trim(),
      }))
      .filter((v) => v.domain.length > 0);
    onChange('egressEndpointsList', cleaned);
  };

  const handleDomainChange = (index: number, value: string) => {
    const next = [...endpoints];
    next[index] = { ...next[index], domain: value };
    setEndpoints(next);
    emitChange(next);
  };

  const handlePortChange = (index: number, value: string) => {
    const next = [...endpoints];
    next[index] = { ...next[index], port: value };
    setEndpoints(next);
    emitChange(next);
  };

  const handleAddRow = () => {
    const next = [...endpoints, { domain: '', port: '' }];
    setEndpoints(next);
  };

  const handleRemoveRow = (index: number) => {
    const next = endpoints.filter((_, i) => i !== index);
    setEndpoints(next.length > 0 ? next : [{ domain: '', port: '' }]);
    emitChange(next);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Access & Endpoints
      </h3>

      <div>
        <label
          htmlFor="namespaceAccessAdGroup"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Namespace Access AD Group
        </label>
        <input
          type="text"
          id="namespaceAccessAdGroup"
          value={namespaceAccessAdGroup}
          onChange={(e) => onChange('namespaceAccessAdGroup', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.namespaceAccessAdGroup 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
            } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        />
        {errors.namespaceAccessAdGroup && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.namespaceAccessAdGroup}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="awsIamRole"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          AWS IAM Role
        </label>
        <input
          type="text"
          id="awsIamRole"
          value={awsIamRole}
          onChange={(e) => onChange('awsIamRole', e.target.value)}
          placeholder="e.g., arn:aws:iam::123456789012:role/my-role"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.awsIamRole 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
            } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        />
        {errors.awsIamRole && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.awsIamRole}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Egress Endpoints
        </label>
        <div className="space-y-2">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={endpoint.domain || ''}
                onChange={(e) => handleDomainChange(index, e.target.value)}
                placeholder="e.g., api.example.com"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <input
                type="text"
                value={endpoint.port || ''}
                onChange={(e) => handlePortChange(index, e.target.value)}
                placeholder="e.g., 443"
                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => handleRemoveRow(index)}
                className="px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
                aria-label={`Remove endpoint row ${index + 1}`}
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <button
              type="button"
              onClick={handleAddRow}
              className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Add Endpoint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
