import React from 'react'
import { getAuditEvents } from '../utils/logService'
import { useToast } from '../contexts/ToastContext'

export default function AuditLog() {
    const events = getAuditEvents(1000)
    const toast = useToast()

    function handleCopy() {
        navigator.clipboard.writeText(events.map(e => `${new Date(e.ts).toISOString()} ${e.entry}`).join('\n'))
            toast.showToast('Audit log copied to clipboard', { type: 'info' })
    }

    return (
        <div className="p-6">
            <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold">Audit Log</h2>
                    <div className="flex items-center gap-2">
                                <button onClick={handleCopy} className="btn btn-ghost btn-sm" aria-label="Copy audit log">Copy</button>
                    </div>
                </div>

                    {/* Center the audit log block and constrain width for better alignment */}
                    <pre className="mt-4 p-6 h-96 overflow-auto bg-theme-dark text-theme-on rounded font-mono text-sm border-theme-dark max-w-3xl mx-auto text-left whitespace-pre-wrap">
    {events.map(e => `${new Date(e.ts).toLocaleString()} ${e.entry}`).join('\n')}
                    </pre>
            </div>
        </div>
    )
}
