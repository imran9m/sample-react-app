import React, { useState, useEffect } from 'react';
import type { NamespaceConfig, ValidationErrors } from '../../types';
import { validateNamespaceConfig, hasValidationErrors } from '../../utils/namespaceValidation';
import { BasicInfoSection } from './BasicInfoSection';
import { KubernetesQuotasSection } from './KubernetesQuotasSection';
import { ArchitectureReviewsSection } from './ArchitectureReviewsSection';
import { AccessEndpointsSection } from './AccessEndpointsSection';

interface NamespaceFormProps {
  namespace: NamespaceConfig | null;
  isCreatingNew?: boolean;
  onSubmit: (data: NamespaceConfig) => void;
}

export const NamespaceForm: React.FC<NamespaceFormProps> = ({ namespace, isCreatingNew = false, onSubmit }) => {
  const [formData, setFormData] = useState<NamespaceConfig | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string>('');

  // Initialize form data when namespace prop changes
  useEffect(() => {
    if (namespace) {
      setFormData(namespace);
      setValidationErrors({});
      setShowSuccess(false);
      setGeneratedJson('');
    }
  }, [namespace]);

  // Handle field changes with support for nested fields
  const handleFieldChange = (field: string, value: string | number | boolean | string[]) => {
    if (!formData) return;

    setFormData((prevData) => {
      if (!prevData) return prevData;

      const newData = { ...prevData };
      const fieldParts = field.split('.');

      if (fieldParts.length === 1) {
        // Top-level field
        (newData as any)[field] = value;
      } else if (fieldParts.length === 2) {
        // Nested field (e.g., kubernetesQuotas.services or solutionArchReview.approved)
        const [parent, child] = fieldParts;
        (newData as any)[parent] = {
          ...(newData as any)[parent],
          [child]: value,
        };
      }

      return newData;
    });

    // Clear validation error for this field when user starts editing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    setIsSubmitting(true);
    setShowSuccess(false);

    // Validate form data
    const errors = validateNamespaceConfig(formData);

    if (hasValidationErrors(errors)) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Clear any previous errors
    setValidationErrors({});

    // Generate JSON output
    const jsonOutput = JSON.stringify(formData, null, 2);
    setGeneratedJson(jsonOutput);

    // Call onSubmit callback
    onSubmit(formData);

    // Show success feedback
    setShowSuccess(true);
    setIsSubmitting(false);

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  if (!formData) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {isCreatingNew 
          ? 'Loading form for new namespace...' 
          : 'Please select a namespace to view and edit its configuration.'}
      </div>
    );
  }

  return (
    <form id="namespace-form" onSubmit={handleSubmit} className="space-y-8">
      {/* Form Title */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {isCreatingNew ? 'Create New Namespace' : 'Edit Namespace Configuration'}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {isCreatingNew 
            ? 'Fill in the details below to create a new namespace configuration.' 
            : 'Update the configuration details for the selected namespace.'}
        </p>
      </div>

      {/* Error Summary */}
      {hasValidationErrors(validationErrors) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
            Please fix the following errors:
          </h4>
          <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
            {Object.entries(validationErrors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
          <p className="text-sm font-semibold text-green-800 dark:text-green-200">
            ✓ {isCreatingNew ? 'Namespace created successfully!' : 'Configuration updated successfully!'}
          </p>
        </div>
      )}

      {/* Form Sections */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <BasicInfoSection
          applicationName={formData.applicationName}
          namespaceName={formData.namespaceName}
          namespaceDescription={formData.namespaceDescription}
          onChange={handleFieldChange}
          errors={validationErrors}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <KubernetesQuotasSection
          quotas={formData.kubernetesQuotas}
          onChange={handleFieldChange}
          errors={validationErrors}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <ArchitectureReviewsSection
          solutionArchReview={formData.solutionArchReview}
          techArchReview={formData.techArchReview}
          securityArchReview={formData.securityArchReview}
          onChange={handleFieldChange}
          errors={validationErrors}
        />
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <AccessEndpointsSection
          namespaceAccessAdGroup={formData.namespaceAccessAdGroup}
          awsIamRole={formData.awsIamRole}
          egressEndpointsList={formData.egressEndpointsList}
          onChange={handleFieldChange}
          errors={validationErrors}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-md font-medium text-white transition-colors
            ${
              isSubmitting
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
        >
          {isSubmitting 
            ? (isCreatingNew ? 'Creating...' : 'Submitting...') 
            : (isCreatingNew ? 'Create Namespace' : 'Submit Configuration')}
        </button>
      </div>

      {/* Generated JSON Output */}
      {generatedJson && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Generated JSON Configuration
          </h3>
          <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md p-4 overflow-x-auto text-sm">
            <code className="text-gray-800 dark:text-gray-200">{generatedJson}</code>
          </pre>
        </div>
      )}
    </form>
  );
};
