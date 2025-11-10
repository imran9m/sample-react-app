import React from 'react';
import type { KubernetesQuotas, ValidationErrors } from '../../types';

interface KubernetesQuotasSectionProps {
  quotas: KubernetesQuotas;
  onChange: (field: string, value: string | number) => void;
  errors?: ValidationErrors;
}

export const KubernetesQuotasSection: React.FC<KubernetesQuotasSectionProps> = ({
  quotas,
  onChange,
  errors = {},
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Kubernetes Quotas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="services"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Services
          </label>
          <input
            type="number"
            id="services"
            value={quotas.services}
            onChange={(e) => onChange('kubernetesQuotas.services', parseInt(e.target.value) || 0)}
            min="1"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors['kubernetesQuotas.services'] 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
              } 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
          />
          {errors['kubernetesQuotas.services'] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors['kubernetesQuotas.services']}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="pods"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Pods
          </label>
          <input
            type="number"
            id="pods"
            value={quotas.pods}
            onChange={(e) => onChange('kubernetesQuotas.pods', parseInt(e.target.value) || 0)}
            min="1"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors['kubernetesQuotas.pods'] 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
              } 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
          />
          {errors['kubernetesQuotas.pods'] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors['kubernetesQuotas.pods']}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="requestsCpu"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Requests CPU
          </label>
          <input
            type="text"
            id="requestsCpu"
            value={quotas.requestsCpu}
            onChange={(e) => onChange('kubernetesQuotas.requestsCpu', e.target.value)}
            placeholder="e.g., 4"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="requestsMemory"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Requests Memory
          </label>
          <input
            type="text"
            id="requestsMemory"
            value={quotas.requestsMemory}
            onChange={(e) => onChange('kubernetesQuotas.requestsMemory', e.target.value)}
            placeholder="e.g., 8Gi"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="limitsMemory"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Limits Memory
          </label>
          <input
            type="text"
            id="limitsMemory"
            value={quotas.limitsMemory}
            onChange={(e) => onChange('kubernetesQuotas.limitsMemory', e.target.value)}
            placeholder="e.g., 16Gi"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="requestsEphemeralStorage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Requests Ephemeral Storage
          </label>
          <input
            type="text"
            id="requestsEphemeralStorage"
            value={quotas.requestsEphemeralStorage}
            onChange={(e) => onChange('kubernetesQuotas.requestsEphemeralStorage', e.target.value)}
            placeholder="e.g., 10Gi"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="persistentVolumeClaims"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Persistent Volume Claims
          </label>
          <input
            type="number"
            id="persistentVolumeClaims"
            value={quotas.persistentVolumeClaims}
            onChange={(e) => onChange('kubernetesQuotas.persistentVolumeClaims', parseInt(e.target.value) || 0)}
            min="1"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors['kubernetesQuotas.persistentVolumeClaims'] 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
              } 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
          />
          {errors['kubernetesQuotas.persistentVolumeClaims'] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors['kubernetesQuotas.persistentVolumeClaims']}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
