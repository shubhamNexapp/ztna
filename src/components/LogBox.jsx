import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getConnectionEvents } from '../utils/logService'

export default function LogBox({ limit = 12 }) {
  const events = getConnectionEvents(limit)
  const navigate = useNavigate()

  return (
    <div className="bg-slate-50 rounded p-3 font-mono text-sm text-slate-700 bg-theme-dark text-theme-on border-theme-dark">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">Connection Log</div>
        <div className="text-xs text-slate-400">Latest {events.length}</div>
      </div>

      <div className="h-36 overflow-auto bg-transparent p-2 rounded border border-transparent">
        {events.length === 0 ? (
          <div className="text-xs text-slate-400">No events yet</div>
        ) : (
          events.map((e) => (
            <div key={e.ts} className="py-0.5">
              <span className="text-xs text-slate-400 mr-2">{new Date(e.ts).toLocaleTimeString()}</span>
              <span className="">{e.event}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button onClick={() => navigate('/logs/connection')} className="btn btn-ghost btn-sm">View Full Log</button>
        <div className="text-xs text-slate-400">Read-only</div>
      </div>
    </div>
  )
}
