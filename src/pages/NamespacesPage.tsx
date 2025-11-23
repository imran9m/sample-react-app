import { useState, useEffect, useMemo } from 'react';
import type { NamespaceConfig } from '../types';
import { NamespaceSelector } from '../components/namespaces/NamespaceSelector';
import { NamespaceForm } from '../components/namespaces/NamespaceForm';
import { createDefaultNamespaceConfig } from '../utils/namespaceValidation';
import { fetchNamespaceNames, fetchNamespaceById, type NamespaceNameItem } from '../api/namespaceApi';

export function NamespacesPage() {
  const [namespaceNames, setNamespaceNames] = useState<NamespaceNameItem[]>([]);
  const [selectedNamespaceId, setSelectedNamespaceId] = useState<string | null>(null);
  const [selectedNamespaceData, setSelectedNamespaceData] = useState<NamespaceConfig | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load namespace names list on component mount
  useEffect(() => {
    loadNamespaceNames();
  }, []);

  const loadNamespaceNames = async () => {
    setIsLoadingList(true);
    setError(null);

    try {
      const response = await fetchNamespaceNames();
      setNamespaceNames(response.namespaces);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error loading namespace names:', err);
    } finally {
      setIsLoadingList(false);
    }
  };

  // Load full namespace details when a namespace is selected
  const loadNamespaceDetails = async (namespaceId: string) => {
    setIsLoadingDetails(true);
    setError(null);

    try {
      const namespaceData = await fetchNamespaceById(namespaceId);
      setSelectedNamespaceData(namespaceData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error loading namespace details:', err);
      setSelectedNamespaceData(null);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle namespace selection
  const handleNamespaceSelect = (namespaceId: string) => {
    setSelectedNamespaceId(namespaceId);
    setIsCreatingNew(false); // Exit create mode when selecting an existing namespace
    loadNamespaceDetails(namespaceId); // Fetch full details for selected namespace
  };

  // Handle create new namespace
  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setSelectedNamespaceId(null); // Clear selected namespace when entering create mode
    setSelectedNamespaceData(null); // Clear selected namespace data
  };

  // Handle form submission
  const handleFormSubmit = (data: NamespaceConfig) => {
    if (isCreatingNew) {
      // Log message for new namespace creation
      console.log('New Namespace Created:', JSON.stringify(data, null, 2));

      // In a real application, this would make an API POST call to create the namespace
      // For now, we just log it as specified in the requirements

      // Allow switching back to select mode after submission
      setIsCreatingNew(false);
    } else {
      // Log message for existing namespace update
      console.log('Namespace Configuration Updated:', JSON.stringify(data, null, 2));

      // In a real application, this would make an API PUT call to update the namespace
      // For now, we just log it as specified in the requirements
    }
  };

  // Memoize the default namespace config based on isCreatingNew state
  // This ensures we get a fresh config when entering create mode, but it stays stable while in create mode
  const defaultNamespace = useMemo(() => {
    return isCreatingNew ? createDefaultNamespaceConfig() : null;
  }, [isCreatingNew]);

  // Get the namespace to display in the form
  // If creating new, use memoized default namespace; otherwise use selected namespace data
  const namespaceForForm = isCreatingNew ? defaultNamespace : selectedNamespaceData;

  // Loading state for namespace list
  if (isLoadingList) {
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
            onClick={loadNamespaceNames}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Kubernetes Namespaces
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Manage your namespace configurations, quotas, and access controls.
        </p>
      </div>

      {/* Namespace Selector */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8">
        <NamespaceSelector
          namespaceNames={namespaceNames}
          selectedNamespace={selectedNamespaceId}
          onSelect={handleNamespaceSelect}
          onCreateNew={handleCreateNew}
          isCreatingNew={isCreatingNew}
          disabled={isLoadingList}
        />
      </div>

      {/* Top Submit Button (submits the form below) - shown when a namespace is selected or creating new */}
      {(selectedNamespaceId || isCreatingNew) && (
        <div className="flex justify-end">
          <button
            type="submit"
            form="namespace-form"
            className="px-6 py-3 rounded-md font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            {isCreatingNew ? 'Create Namespace' : 'Submit Configuration'}
          </button>
        </div>
      )}

      {/* Namespace Form */}
      {isLoadingDetails ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 dark:border-blue-400 mb-3"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading namespace details...</p>
            </div>
          </div>
        </div>
      ) : (
        <NamespaceForm
          namespace={namespaceForForm}
          isCreatingNew={isCreatingNew}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
