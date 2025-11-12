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
    <div className="space-y-3">
      <label
        htmlFor="namespace-selector"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {isCreatingNew ? 'Creating New Namespace' : 'Select Namespace'}
      </label>
      <div className="flex gap-3 items-start">
        <select
          id="namespace-selector"
          value={selectedNamespace || ''}
          onChange={handleChange}
          disabled={disabled || isCreatingNew}
          className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            ${disabled || isCreatingNew ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
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
        <button
          type="button"
          onClick={onCreateNew}
          disabled={disabled}
          className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium whitespace-nowrap
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700 
            text-gray-700 dark:text-gray-200
            hover:bg-gray-50 dark:hover:bg-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isCreatingNew ? 'ring-2 ring-blue-500' : ''}
          `}
          aria-label="Create a new namespace"
        >
          Create New
        </button>
      </div>
      {isCreatingNew && (
        <p className="text-sm text-blue-600 dark:text-blue-400">
          Fill in the form below to create a new namespace configuration
        </p>
      )}
    </div>
  );
};
