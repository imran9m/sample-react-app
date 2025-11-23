import React from 'react';
import type { ValidationErrors } from '../../types';
import { LabelWithInfo } from '../common/LabelWithInfo';

interface BasicInfoSectionProps {
  applicationName: string;
  namespaceName: string;
  namespaceDescription: string;
  onChange: (field: string, value: string) => void;
  errors?: ValidationErrors;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  applicationName,
  namespaceName,
  namespaceDescription,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Basic Information
      </h3>

      <div>
        <LabelWithInfo
          htmlFor="applicationName"
          label="Application Name"
          infoMessage="Unique identifier for your application within the cluster."
        />
        <input
          type="text"
          id="applicationName"
          value={applicationName}
          onChange={(e) => onChange('applicationName', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors.applicationName
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            }
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        />
        {errors.applicationName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.applicationName}
          </p>
        )}
      </div>

      <div>
        <LabelWithInfo
          htmlFor="namespaceName"
          label="Namespace Name"
          infoMessage="The name of the Kubernetes namespace to be created."
        />
        <input
          type="text"
          id="namespaceName"
          value={namespaceName}
          onChange={(e) => onChange('namespaceName', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors.namespaceName
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            }
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        />
        {errors.namespaceName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.namespaceName}
          </p>
        )}
      </div>

      <div>
        <LabelWithInfo
          htmlFor="namespaceDescription"
          label="Namespace Description"
          infoMessage="Brief description of the namespace's purpose and usage."
        />
        <textarea
          id="namespaceDescription"
          value={namespaceDescription}
          onChange={(e) => onChange('namespaceDescription', e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            ${errors.namespaceDescription
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
            } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
        />
        {errors.namespaceDescription && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.namespaceDescription}
          </p>
        )}
      </div>
    </div>
  );
};
