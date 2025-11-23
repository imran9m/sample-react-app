import React from 'react';
import type { ValidationErrors } from '../../types';
import { LabelWithInfo } from '../common/LabelWithInfo';

interface MiscellaneousSectionProps {
    namespaceAccessAdGroup: string;
    awsIamRole: string;
    splunkHecToken: string;
    onChange: (field: string, value: string) => void;
    errors?: ValidationErrors;
}

export const MiscellaneousSection: React.FC<MiscellaneousSectionProps> = ({
    namespaceAccessAdGroup,
    awsIamRole,
    splunkHecToken,
    onChange,
    errors = {},
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Miscellaneous
            </h3>

            <div>
                <LabelWithInfo
                    htmlFor="namespaceAccessAdGroup"
                    label="Namespace Access AD Group"
                    infoMessage="AD group granted access to manage this namespace."
                />
                <input
                    type="text"
                    id="namespaceAccessAdGroup"
                    value={namespaceAccessAdGroup}
                    onChange={(e) => onChange('namespaceAccessAdGroup', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.namespaceAccessAdGroup
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                        } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors.namespaceAccessAdGroup && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.namespaceAccessAdGroup}
                    </p>
                )}
            </div>

            <div>
                <LabelWithInfo
                    htmlFor="awsIamRole"
                    label="AWS IAM Role"
                    infoMessage="IAM role associated with resources in this namespace."
                />
                <input
                    type="text"
                    id="awsIamRole"
                    value={awsIamRole}
                    onChange={(e) => onChange('awsIamRole', e.target.value)}
                    placeholder="e.g., arn:aws:iam::123456789012:role/my-role"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.awsIamRole
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                        } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors.awsIamRole && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.awsIamRole}
                    </p>
                )}
            </div>

            <div>
                <LabelWithInfo
                    htmlFor="splunkHecToken"
                    label="Splunk HEC Token"
                    infoMessage="Token for sending logs to Splunk HTTP Event Collector."
                />
                <input
                    type="text"
                    id="splunkHecToken"
                    value={splunkHecToken}
                    onChange={(e) => onChange('splunkHecToken', e.target.value)}
                    placeholder="e.g., 12345678-1234-1234-1234-1234567890ab"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
            ${errors.splunkHecToken
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                        } 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                />
                {errors.splunkHecToken && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.splunkHecToken}
                    </p>
                )}
            </div>
        </div>
    );
};
