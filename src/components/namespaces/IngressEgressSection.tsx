import React, { useEffect, useState } from 'react';
import type { ValidationErrors, ExposedDomain, EgressEndpoint, TlsMode } from '../../types';
import { LabelWithInfo } from '../common/LabelWithInfo';

interface IngressEgressSectionProps {
    exposedDomainsList: ExposedDomain[];
    egressEndpointsList: EgressEndpoint[];
    onChange: (field: string, value: ExposedDomain[] | EgressEndpoint[]) => void;
    errors?: ValidationErrors;
}

export const IngressEgressSection: React.FC<IngressEgressSectionProps> = ({
    exposedDomainsList,
    egressEndpointsList,
    onChange,
    errors = {},
}) => {
    // Ingress (Exposed Domains) State
    const [ingressDomains, setIngressDomains] = useState<ExposedDomain[]>([]);

    // Egress Endpoints State
    const [egressEndpoints, setEgressEndpoints] = useState<EgressEndpoint[]>([]);

    // Initialize Ingress State
    useEffect(() => {
        const items = exposedDomainsList || [];
        setIngressDomains(items.length > 0 ? items : [{ domain: '', port: '', tlsMode: 'SIMPLE' as TlsMode }]);
    }, [exposedDomainsList]);

    // Initialize Egress State
    useEffect(() => {
        const items = egressEndpointsList || [];
        setEgressEndpoints(items.length > 0 ? items : [{ domain: '', port: '' }]);
    }, [egressEndpointsList]);

    // --- Ingress Handlers ---

    const emitIngressChange = (values: ExposedDomain[]) => {
        const cleaned = values
            .map((v) => ({
                domain: (v.domain || '').trim(),
                port: (v.port || '').trim(),
                tlsMode: v.tlsMode,
            }))
            .filter((v) => v.domain.length > 0);
        onChange('exposedDomainsList', cleaned);
    };

    const handleIngressFieldChange = (index: number, field: keyof ExposedDomain, value: string) => {
        const next = [...ingressDomains];
        next[index] = { ...next[index], [field]: value };
        setIngressDomains(next);
        emitIngressChange(next);
    };

    const handleAddIngressRow = () => {
        const next = [...ingressDomains, { domain: '', port: '', tlsMode: 'SIMPLE' as TlsMode }];
        setIngressDomains(next);
    };

    const handleRemoveIngressRow = (index: number) => {
        const next = ingressDomains.filter((_, i) => i !== index);
        setIngressDomains(next.length > 0 ? next : [{ domain: '', port: '', tlsMode: 'SIMPLE' as TlsMode }]);
        emitIngressChange(next);
    };

    // --- Egress Handlers ---

    const emitEgressChange = (values: EgressEndpoint[]) => {
        const cleaned = values
            .map((v) => ({
                domain: (v.domain || '').trim(),
                port: (v.port || '').trim(),
            }))
            .filter((v) => v.domain.length > 0);
        onChange('egressEndpointsList', cleaned);
    };

    const handleEgressDomainChange = (index: number, value: string) => {
        const next = [...egressEndpoints];
        next[index] = { ...next[index], domain: value };
        setEgressEndpoints(next);
        emitEgressChange(next);
    };

    const handleEgressPortChange = (index: number, value: string) => {
        const next = [...egressEndpoints];
        next[index] = { ...next[index], port: value };
        setEgressEndpoints(next);
        emitEgressChange(next);
    };

    const handleAddEgressRow = () => {
        const next = [...egressEndpoints, { domain: '', port: '' }];
        setEgressEndpoints(next);
    };

    const handleRemoveEgressRow = (index: number) => {
        const next = egressEndpoints.filter((_, i) => i !== index);
        setEgressEndpoints(next.length > 0 ? next : [{ domain: '', port: '' }]);
        emitEgressChange(next);
    };

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">
                Ingress & Egress
            </h3>

            {/* Ingress Section */}
            <div className="space-y-4">
                <LabelWithInfo
                    label="Exposed Domains (Ingress)"
                    className="mb-2 text-base font-medium"
                    infoMessage="List of domains to be exposed by this namespace with their ports and TLS modes. By default, the TLS mode is set to PASSTHROUGH."
                />
                <div className="space-y-2">
                    {ingressDomains.map((domain, index) => (
                        <div key={index} className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                            <div className="flex-1 min-w-[200px]">
                                <input
                                    type="text"
                                    value={domain.domain || ''}
                                    onChange={(e) => handleIngressFieldChange(index, 'domain', e.target.value)}
                                    placeholder="e.g., app.example.com"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="w-24">
                                <input
                                    type="text"
                                    value={domain.port || ''}
                                    onChange={(e) => handleIngressFieldChange(index, 'port', e.target.value)}
                                    placeholder="Port"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div className="w-40">
                                <select
                                    value={domain.tlsMode}
                                    onChange={(e) => handleIngressFieldChange(index, 'tlsMode', e.target.value as TlsMode)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                >
                                    <option value="SIMPLE">SIMPLE</option>
                                    <option value="PASSTHROUGH">PASSTHROUGH</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveIngressRow(index)}
                                className="px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
                                aria-label={`Remove ingress row ${index + 1}`}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={handleAddIngressRow}
                            className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                        >
                            Add Domain
                        </button>
                    </div>
                </div>
            </div>

            {/* Egress Section */}
            <div className="space-y-4">
                <LabelWithInfo
                    label="Egress Endpoints"
                    className="mb-2 text-base font-medium"
                    infoMessage="External domains and ports this namespace can access."
                />
                <div className="space-y-2">
                    {egressEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={endpoint.domain || ''}
                                onChange={(e) => handleEgressDomainChange(index, e.target.value)}
                                placeholder="e.g., api.example.com"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                            <input
                                type="text"
                                value={endpoint.port || ''}
                                onChange={(e) => handleEgressPortChange(index, e.target.value)}
                                placeholder="e.g., 443"
                                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveEgressRow(index)}
                                className="px-3 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
                                aria-label={`Remove egress row ${index + 1}`}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div>
                        <button
                            type="button"
                            onClick={handleAddEgressRow}
                            className="px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
                        >
                            Add Endpoint
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
