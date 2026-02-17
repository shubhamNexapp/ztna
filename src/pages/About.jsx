import React from 'react'

export default function About() {
  const meta = {
    name: 'InstaAccess',
    version: '0.0.1',
    build: 'dev-'+new Date().toISOString(),
    platform: navigator.platform || 'web'
  }

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow-sm bg-theme-surface">
        <h2 className="text-lg font-semibold">About</h2>
        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-600">
          <div>
            <dt className="font-medium">App Name</dt>
            <dd>{meta.name}</dd>
          </div>
          <div>
            <dt className="font-medium">Version</dt>
            <dd>{meta.version}</dd>
          </div>
          <div>
            <dt className="font-medium">Build</dt>
            <dd>{meta.build}</dd>
          </div>
          <div>
            <dt className="font-medium">Platform</dt>
            <dd>{meta.platform}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <h3 className="font-medium">Support</h3>
          <p className="text-sm text-slate-600 mt-2">Email: <a className="text-indigo-600" href="mailto:Techsupport@nexapp.co.in">Techsupport@nexapp.co.in</a></p>
          <p className="text-sm text-slate-600">Phone: 02067629999</p>
        </div>

        <div className="mt-6 text-xs text-slate-400">© 2026 Nexapp Technologies Pvt Ltd</div>
      </div>
    </div>
  )
}
