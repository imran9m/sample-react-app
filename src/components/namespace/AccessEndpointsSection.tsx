import React from 'react';
import type { ValidationErrors } from '../../types';

interface AccessEndpointsSectionProps {
  namespaceAccessAdGroup: string;
  awsIamRole: string;
  egressEndpointsList: string;
  onChange: (field: string, value: string) => void;
  errors?: ValidationErrors;
}

export const AccessEndpointsSection: React.FC<AccessEndpointsSectionProps> = ({
  namespaceAccessAdGroup,
  awsIamRole,
  egressEndpointsList,
  onChange,
  errors = {},
}) => {
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
        <label
          htmlFor="egressEndpointsList"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Egress Endpoints List
        </label>
        <textarea
          id="egressEndpointsList"
          value={egressEndpointsList}
          onChange={(e) => onChange('egressEndpointsList', e.target.value)}
          rows={4}
          placeholder="Enter endpoints separated by commas or new lines&#10;e.g., api.example.com, db.example.com"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
    </div>
  );
};
