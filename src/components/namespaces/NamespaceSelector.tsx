import React from 'react';

export interface NamespaceNameItem {
  id: string;
  name: string;
}

interface NamespaceSelectorProps {
  namespaceNames: NamespaceNameItem[];
  selectedNamespace: string | null;
  onSelect: (namespaceId: string) => void;
  onCreateNew: () => void;
  isCreatingNew: boolean;
  disabled?: boolean;
}

import { LabelWithInfo } from '../common/LabelWithInfo';

export const NamespaceSelector: React.FC<NamespaceSelectorProps> = ({
  namespaceNames,
  selectedNamespace,
  onSelect,
  onCreateNew,
  isCreatingNew,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      onSelect(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <LabelWithInfo
          htmlFor="namespace-selector"
          label={isCreatingNew ? 'Creating New Namespace' : 'Select Namespace'}
          infoMessage="Choose an existing namespace to edit or create a new one."
        />
        {isCreatingNew && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            New Configuration
          </span>
        )}
      </div>
      <div className="flex gap-4 items-stretch">
        <div className="relative flex-1">
          <select
            id="namespace-selector"
            value={selectedNamespace || ''}
            onChange={handleChange}
            disabled={disabled || isCreatingNew}
            className={`w-full px-4 py-3 rounded-xl border appearance-none transition-all duration-200
              ${disabled || isCreatingNew
                ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 cursor-pointer shadow-sm'
              }
              text-gray-900 dark:text-white
            `}
            aria-label="Select a namespace to view and edit"
          >
            <option value="" disabled>
              {namespaceNames.length === 0 ? 'No namespaces available' : 'Choose a namespace...'}
            </option>
            {namespaceNames.map((namespace) => (
              <option key={namespace.id} value={namespace.id}>
                {namespace.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="button"
          onClick={onCreateNew}
          disabled={disabled}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2
            ${isCreatingNew
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          aria-label="Create a new namespace"
        >
          <span className="text-xl leading-none">+</span>
          Create New
        </button>
      </div>
      {isCreatingNew && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
          <div className="text-blue-500 mt-0.5">ℹ️</div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Fill in the form below to create a new namespace configuration. The form is pre-filled with default values.
          </p>
        </div>
      )}
    </div>
  );
};
