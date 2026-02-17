import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLayout } from '../contexts/LayoutContext'
import { useToast } from '../contexts/ToastContext'
import LogBox from '../components/LogBox'
import { appendConnectionEvent, appendAuditEvent } from '../utils/logService'

export default function Dashboard() {

  console.log('Dashboard rendered==')

  const navigate = useNavigate()
  const { collapsed, toggle } = useLayout()
  const toast = useToast()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  function handleDisconnect() {
    appendConnectionEvent('DISCONNECT_CLICKED')
    appendAuditEvent('DISCONNECT_CLICKED')
    // simulate tunnel down
    appendConnectionEvent('TUNNEL_DOWN')
    toast.showToast('Disconnected (simulated)', { type: 'info' })
  }


  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggle()}
            className="p-2 bg-white rounded border shadow-sm"
            aria-label="Toggle sidebar"
          >
            {collapsed ? '➡️' : '⬅️'}
          </button>
          <h1 className="text-2xl font-semibold">Dashboard Check</h1>
        </div>

            <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600">{localStorage.getItem('instance') || 'wg2'}</div>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
              </div>
          </header>

            {/* Center and constrain the main dashboard column so cards align nicely */}
            <section className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">CONNECTED</div>
                  <div className="text-lg font-semibold">Instance: <span className="font-normal">{localStorage.getItem('instance') || 'prod-access'}</span></div>
                </div>

                <div className="flex items-center gap-3">
                      <div className="text-sm text-slate-500 text-right">
                        <div>IP: <span className="font-medium">10.10.0.23/32</span></div>
                        <div>Tunnel: <span className="font-medium">up</span></div>
                        <div>MTU: <span className="font-medium">1420</span></div>
                        <div>DNS: <span className="font-medium">10.10.0.1</span></div>
                        <div className="text-xs text-slate-400">TX 8 KB/s · RX 13 KB/s</div>
                      </div>
                  <button onClick={handleDisconnect} className="btn btn-disconnect">Disconnect</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded shadow-sm bg-theme-surface">
                <h3 className="font-semibold mb-2">Connection</h3>
                <dl className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
                  <dt className="text-slate-500">Gateway</dt>
                  <dd className="font-medium">gw-01.nexapp.local</dd>
                  <dt className="text-slate-500">Assigned IP</dt>
                  <dd className="font-medium">10.10.0.23/32</dd>
                  <dt className="text-slate-500">Instance</dt>
                  <dd className="font-medium">{localStorage.getItem('instance') || 'prod-access'}</dd>
                  <dt className="text-slate-500">DNS</dt>
                  <dd className="font-medium">10.10.0.1</dd>
                </dl>
              </div>

              <aside className="bg-white p-6 rounded shadow-sm bg-theme-surface">
                <h3 className="font-medium mb-2">Security</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded bg-theme-dark">
                    <div className="text-sm text-slate-500 text-theme-on">Authentication</div>
                    <div className="font-medium text-slate-800 text-theme-on">Active</div>
                  </div>
                  {/* <div className="p-3 bg-slate-50 rounded bg-theme-dark">
                    <div className="text-sm text-slate-500 text-theme-on">MFA</div>
                    <div className="font-medium text-slate-800 text-theme-on">Active</div>
                  </div> */}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* <div className="md:col-span-2">
                <LogBox />
              </div> */}

                <div className="flex flex-col gap-3">
                <button onClick={handleDisconnect} className="btn btn-disconnect">Disconnect</button>
                <button onClick={() => navigate('/settings')} className="btn btn-outline">Settings</button>
                <button onClick={() => navigate('/about')} className="btn btn-outline">About</button>
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
                <h4 className="font-medium">Uptime</h4>
                <div className="text-sm text-slate-600 mt-2">2h 30m 0s</div>
              </div>
              <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
                <h4 className="font-medium">RX / TX</h4>
                <div className="text-sm text-slate-600 mt-2">RX 137.6 MB · TX 48.4 MB</div>
              </div>
              <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
                <h4 className="font-medium">Last handshake</h4>
                <div className="text-sm text-slate-600 mt-2">2s</div>
              </div>
            </div> */}
          </section>
    </>
  )
}
