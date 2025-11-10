import React from 'react';
import type { ValidationErrors } from '../../types';

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
        <label
          htmlFor="applicationName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Application Name
        </label>
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
        <label
          htmlFor="namespaceName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Namespace Name
        </label>
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
        <label
          htmlFor="namespaceDescription"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Namespace Description
        </label>
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
