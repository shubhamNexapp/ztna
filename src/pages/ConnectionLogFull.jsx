import React from 'react'
import { getConnectionEvents, clearConnectionEvents } from '../utils/logService'
import { useToast } from '../contexts/ToastContext'

export default function ConnectionLogFull() {
  const events = getConnectionEvents(500)
  const toast = useToast()

  function handleClear() {
    if (!confirm('Clear connection log? This will remove local events.')) return
    clearConnectionEvents()
    toast.showToast('Connection log cleared', { type: 'info' })
    setTimeout(() => window.location.reload(), 400)
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Connection Log</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { 
                navigator.clipboard.writeText(events.map(e => `${new Date(e.ts).toISOString()} ${e.event}`).join('\n')); 
                toast.showToast('Connection log copied', { type: 'info' }) 
              }}
              className="btn btn-ghost btn-sm"
              aria-label="Copy connection log"
            >
              Copy
            </button>
            <button onClick={handleClear} className="btn btn-danger btn-sm" aria-label="Clear connection log">Clear</button>
          </div>
        </div>

        {/* Center the log block and constrain width so content appears aligned and consistent */}
        <pre className="mt-4 p-6 h-96 overflow-auto bg-theme-dark text-theme-on rounded font-mono text-sm border-theme-dark max-w-3xl mx-auto text-left whitespace-pre-wrap">
{events.map(e => `${new Date(e.ts).toLocaleString()} ${e.event}`).join('\n')}
        </pre>
      </div>
    </div>
  )
}
