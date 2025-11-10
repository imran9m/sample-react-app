import React from 'react';
import type { ArchitectureReview, ValidationErrors } from '../../types';

interface ArchitectureReviewsSectionProps {
  solutionArchReview: ArchitectureReview;
  techArchReview: ArchitectureReview;
  securityArchReview: ArchitectureReview;
  onChange: (field: string, value: boolean | string) => void;
  errors?: ValidationErrors;
}

export const ArchitectureReviewsSection: React.FC<ArchitectureReviewsSectionProps> = ({
  solutionArchReview,
  techArchReview,
  securityArchReview,
  onChange,
  errors = {},
}) => {
  const renderReviewField = (
    label: string,
    fieldPrefix: string,
    review: ArchitectureReview,
    errorKey: string
  ) => (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={fieldPrefix}
              checked={review.approved === true}
              onChange={() => onChange(`${fieldPrefix}.approved`, true)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Yes</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={fieldPrefix}
              checked={review.approved === false}
              onChange={() => onChange(`${fieldPrefix}.approved`, false)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
          </label>
        </div>
      </div>

      {review.approved === false && (
        <div>
          <label
            htmlFor={`${fieldPrefix}-explanation`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Explanation (required)
          </label>
          <textarea
            id={`${fieldPrefix}-explanation`}
            value={review.explanation || ''}
            onChange={(e) => onChange(`${fieldPrefix}.explanation`, e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${errors[errorKey] 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
              } 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
            placeholder="Please explain why this review was not approved"
          />
          {errors[errorKey] && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors[errorKey]}
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Architecture Reviews
      </h3>

      {renderReviewField(
        'Solution Architecture Review',
        'solutionArchReview',
        solutionArchReview,
        'solutionArchReview.explanation'
      )}

      {renderReviewField(
        'Technology Architecture Review',
        'techArchReview',
        techArchReview,
        'techArchReview.explanation'
      )}

      {renderReviewField(
        'Security Architecture Review',
        'securityArchReview',
        securityArchReview,
        'securityArchReview.explanation'
      )}
    </div>
  );
};
