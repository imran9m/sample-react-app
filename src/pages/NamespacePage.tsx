import { useState, useEffect } from 'react';
import type { NamespaceConfig } from '../types';
import { NamespaceSelector } from '../components/namespace/NamespaceSelector';
import { NamespaceForm } from '../components/namespace/NamespaceForm';

interface NamespaceData {
  namespaces: NamespaceConfig[];
}

export function NamespacePage() {
  const [namespaces, setNamespaces] = useState<NamespaceConfig[]>([]);
  const [selectedNamespaceId, setSelectedNamespaceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load namespace data on component mount
  useEffect(() => {
    loadNamespaces();
  }, []);

  const loadNamespaces = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/data/namespaces.json');
      
      if (!response.ok) {
        throw new Error(`Failed to load namespaces: ${response.statusText}`);
      }

      const data: NamespaceData = await response.json();
      setNamespaces(data.namespaces || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error loading namespaces:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle namespace selection
  const handleNamespaceSelect = (namespaceId: string) => {
    setSelectedNamespaceId(namespaceId);
  };

  // Handle form submission
  const handleFormSubmit = (data: NamespaceConfig) => {
    // Log the generated JSON to console
    console.log('Namespace Configuration Submitted:', JSON.stringify(data, null, 2));
    
    // In a real application, this would make an API call to save the data
    // For now, we just log it as specified in the requirements
  };

  // Get the selected namespace object
  const selectedNamespace = selectedNamespaceId
    ? namespaces.find((ns) => ns.id === selectedNamespaceId) || null
    : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading namespaces...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error Loading Namespaces
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={loadNamespaces}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Namespace Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a namespace to view and edit its configuration
        </p>
      </div>

      {/* Namespace Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <NamespaceSelector
          namespaces={namespaces}
          selectedNamespace={selectedNamespaceId}
          onSelect={handleNamespaceSelect}
          disabled={isLoading}
        />
      </div>

      {/* Namespace Form */}
      <NamespaceForm namespace={selectedNamespace} onSubmit={handleFormSubmit} />
    </div>
  );
}
