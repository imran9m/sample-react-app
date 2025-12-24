import React, { useEffect, useState } from 'react';
import type { ValidationErrors, StorageRequirement, StorageType } from '../../types';
import { LabelWithInfo } from '../common/LabelWithInfo';

interface StorageRequirementSectionProps {
  storageRequirements: StorageRequirement[];
  onChange: (field: string, value: StorageRequirement[]) => void;
  errors?: ValidationErrors;
}

export const StorageRequirementSection: React.FC<StorageRequirementSectionProps> = ({
  storageRequirements,
  onChange,
  errors = {},
}) => {
  const [storageReqs, setStorageReqs] = useState<StorageRequirement[]>([]);

  // Initialize Storage Requirements State
  useEffect(() => {
    const items = storageRequirements || [];
    setStorageReqs(items.length > 0 ? items : [{ storageType: 'EFS', storageSize: 0 }]);
  }, [storageRequirements]);

  const emitStorageChange = (values: StorageRequirement[]) => {
    const cleaned = values
      .map((v) => ({
        storageType: v.storageType,
        storageSize: v.storageSize || 0,
        efsAccessPointId: v.efsAccessPointId?.trim() || undefined,
        islonSharePath: v.islonSharePath?.trim() || undefined,
      }));
    // Don't filter out items with size 0 - allow users to add and fill in new rows
    // Validation will handle empty/invalid entries
    onChange('storageRequirements', cleaned);
  };

  const handleStorageFieldChange = (index: number, field: keyof StorageRequirement, value: string | number) => {
    const next = [...storageReqs];
    const updatedItem = { ...next[index], [field]: value };
    
    // Clear conditional fields when storage type changes
    if (field === 'storageType') {
      if (value === 'EFS') {
        updatedItem.efsAccessPointId = '';
        delete updatedItem.islonSharePath;
      } else if (value === 'Islon') {
        updatedItem.islonSharePath = '';
        delete updatedItem.efsAccessPointId;
      }
    }
    
    next[index] = updatedItem;
    setStorageReqs(next);
    emitStorageChange(next);
  };

  const handleAddStorageRow = () => {
    const next = [...storageReqs, { storageType: 'EFS', storageSize: 0 }];
    setStorageReqs(next);
    emitStorageChange(next);
  };

  const handleRemoveStorageRow = (index: number) => {
    const next = storageReqs.filter((_, i) => i !== index);
    setStorageReqs(next.length > 0 ? next : [{ storageType: 'EFS', storageSize: 0 }]);
    emitStorageChange(next);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Storage Requirement
      </h3>

      <LabelWithInfo
        label="Storage Requirements"
        className="mb-2 text-base font-medium"
        infoMessage="Define storage requirements for this namespace. You can add multiple storage requirements."
      />

      <div className="space-y-4">
        {storageReqs.map((storage, index) => (
          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Storage Requirement {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => handleRemoveStorageRow(index)}
                className="px-3 py-1 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
                aria-label={`Remove storage requirement ${index + 1}`}
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <LabelWithInfo
                  htmlFor={`storageType-${index}`}
                  label="Storage Type"
                  infoMessage="Select the type of storage: EFS (Elastic File System) or Islon."
                />
                <select
                  id={`storageType-${index}`}
                  value={storage.storageType}
                  onChange={(e) => handleStorageFieldChange(index, 'storageType', e.target.value as StorageType)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${errors[`storageRequirements.${index}.storageType`]
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                    } 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                >
                  <option value="EFS">EFS</option>
                  <option value="Islon">Islon</option>
                </select>
                {errors[`storageRequirements.${index}.storageType`] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[`storageRequirements.${index}.storageType`]}
                  </p>
                )}
              </div>

              <div>
                <LabelWithInfo
                  htmlFor={`storageSize-${index}`}
                  label="Storage Size (in GB)"
                  infoMessage="Size of storage required in gigabytes."
                />
                <input
                  type="number"
                  id={`storageSize-${index}`}
                  value={storage.storageSize || ''}
                  onChange={(e) => handleStorageFieldChange(index, 'storageSize', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 100"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${errors[`storageRequirements.${index}.storageSize`]
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                    } 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors[`storageRequirements.${index}.storageSize`] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[`storageRequirements.${index}.storageSize`]}
                  </p>
                )}
              </div>
            </div>

            {storage.storageType === 'EFS' && (
              <div>
                <LabelWithInfo
                  htmlFor={`efsAccessPointId-${index}`}
                  label="EFS Access Point ID"
                  infoMessage="The EFS Access Point ID for this storage requirement."
                />
                <input
                  type="text"
                  id={`efsAccessPointId-${index}`}
                  value={storage.efsAccessPointId || ''}
                  onChange={(e) => handleStorageFieldChange(index, 'efsAccessPointId', e.target.value)}
                  placeholder="e.g., fsap-0123456789abcdef0"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${errors[`storageRequirements.${index}.efsAccessPointId`]
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                    } 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors[`storageRequirements.${index}.efsAccessPointId`] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[`storageRequirements.${index}.efsAccessPointId`]}
                  </p>
                )}
              </div>
            )}

            {storage.storageType === 'Islon' && (
              <div>
                <LabelWithInfo
                  htmlFor={`islonSharePath-${index}`}
                  label="Islon Share Path"
                  infoMessage="The Islon share path for this storage requirement."
                />
                <input
                  type="text"
                  id={`islonSharePath-${index}`}
                  value={storage.islonSharePath || ''}
                  onChange={(e) => handleStorageFieldChange(index, 'islonSharePath', e.target.value)}
                  placeholder="e.g., /ifs/data/applications/myapp"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${errors[`storageRequirements.${index}.islonSharePath`]
                      ? 'border-red-500 dark:border-red-400'
                      : 'border-gray-300 dark:border-gray-600'
                    } 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors[`storageRequirements.${index}.islonSharePath`] && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors[`storageRequirements.${index}.islonSharePath`]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={handleAddStorageRow}
            className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Add Storage Requirement
          </button>
        </div>
      </div>
    </div>
  );
};
