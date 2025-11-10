import React from 'react';
import type { NamespaceConfig } from '../../types';

interface NamespaceSelectorProps {
  namespaces: NamespaceConfig[];
  selectedNamespace: string | null;
  onSelect: (namespaceId: string) => void;
  disabled?: boolean;
}

export const NamespaceSelector: React.FC<NamespaceSelectorProps> = ({
  namespaces,
  selectedNamespace,
  onSelect,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value) {
      onSelect(value);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="namespace-selector"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Select Namespace
      </label>
      <select
        id="namespace-selector"
        value={selectedNamespace || ''}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
          border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label="Select a namespace to view and edit"
      >
        <option value="" disabled>
          {namespaces.length === 0 ? 'No namespaces available' : 'Choose a namespace...'}
        </option>
        {namespaces.map((namespace) => (
          <option key={namespace.id} value={namespace.id}>
            {namespace.namespaceName} - {namespace.applicationName}
          </option>
        ))}
      </select>
    </div>
  );
};
