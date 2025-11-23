import React, { useState } from 'react';

interface LabelWithInfoProps {
    label: string;
    htmlFor?: string;
    className?: string;
    infoMessage?: string;
}

export const LabelWithInfo: React.FC<LabelWithInfoProps> = ({
    label,
    htmlFor,
    className = '',
    infoMessage = 'This is info message',
}) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleInfoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowInfo(!showInfo);
    };

    return (
        <div className={`flex items-center gap-2 mb-1 ${className}`}>
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <button
                type="button"
                onClick={handleInfoClick}
                className={`transition-colors focus:outline-none ${showInfo ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                aria-label="More information"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
            </button>
            {showInfo && (
                <span className="text-xs text-gray-500 dark:text-gray-400 animate-fadeIn">
                    {infoMessage}
                </span>
            )}
        </div>
    );
};
