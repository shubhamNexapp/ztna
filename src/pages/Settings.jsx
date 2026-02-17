import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearConnectionEvents, appendAuditEvent } from '../utils/logService'
import { useToast } from '../contexts/ToastContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Settings() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [gateway, setGateway] = useState(localStorage.getItem('gateway') || '')
  const [instance, setInstance] = useState(localStorage.getItem('instance') || 'wg2')
  const [otpEnabled, setOtpEnabled] = useState(localStorage.getItem('otpEnabled') === 'true')
  const [localTheme, setLocalTheme] = useState(theme || 'system')

  useEffect(() => {
    setLocalTheme(theme)
  }, [theme])
  const toast = useToast()

  function handleSave() {
    localStorage.setItem('gateway', gateway)
    localStorage.setItem('instance', instance)
    localStorage.setItem('otpEnabled', otpEnabled ? 'true' : 'false')
    setTheme(localTheme)
    appendAuditEvent('SETTINGS_SAVED')
    toast.showToast('Settings saved', { type: 'info' })
  }

  function handleClearHistory() {
    if (!confirm('Clear connection history?')) return
    clearConnectionEvents()
    appendAuditEvent('CONNECTION_HISTORY_CLEARED')
    toast.showToast('Connection history cleared', { type: 'info' })
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow-sm bg-theme-surface max-w-3xl mx-auto min-h-[56vh]">
        <h2 className="text-lg font-semibold text-theme-on">Settings</h2>

        <section className="mt-4">
          <h3 className="font-medium">Connection Settings</h3>
          <div className="mt-2 grid grid-cols-1 gap-3">
            <label className="text-sm">Gateway</label>
            <input value={gateway} onChange={(e) => setGateway(e.target.value)} className="border px-3 py-2 rounded" placeholder="gw-01.example.local" />
            <label className="text-sm">Instance</label>
            <input value={instance} onChange={(e) => setInstance(e.target.value)} className="border px-3 py-2 rounded" />
          </div>
        </section>

        <section className="mt-4">
          <h3 className="font-medium">Appearance</h3>
          <div className="mt-2 flex items-center gap-3">
            <label className="text-sm">Theme</label>
            <select value={localTheme} onChange={(e) => setLocalTheme(e.target.value)} className="border px-3 py-2 rounded">
              <option value="system">System (default)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </section>

        {/* <section className="mt-4">
          <h3 className="font-medium">Logs & History</h3>
          <div className="mt-2 flex items-center gap-3">
            <button onClick={() => navigate('/logs/connection')} className="text-sm text-indigo-600 hover:underline">View Connection History</button>
            <button onClick={() => navigate('/logs/audit')} className="text-sm text-indigo-600 hover:underline">View Audit Log</button>
            <button onClick={handleClearHistory} className="text-sm text-rose-600 hover:underline">Clear Connection History</button>
          </div>
        </section> */}

        <div className="mt-6 flex items-center gap-3  fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded z-40">
          <button onClick={handleSave} className="btn btn-primary" aria-label="Save settings">Save</button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-outline">Back</button>
        </div>
      </div>
    </div>
  )
}
