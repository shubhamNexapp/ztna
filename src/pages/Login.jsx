import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [instance, setInstance] = useState('wg2')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // Fake auth
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token')
      // also store instance for demo
      localStorage.setItem('instance', instance)
      navigate('/dashboard')
    } else {
      setError('Username or password is incorrect')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left panel: branding */}
        <div className="p-10 bg-gradient-to-b from-slate-50 to-white border-r hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-300 rounded-lg flex items-center justify-center shadow-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect width="20" height="20" rx="4" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold">InstaAccess</div>
              <div className="text-xs text-slate-500">Software-Defined Zero Trust Access Client</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold leading-tight text-slate-900 mb-3">Secure access, made simple.</h2>
          <p className="text-sm text-slate-500 mb-6">InstaAccess connects you to your organization using automatically synchronized access policies — before every connection.</p>

          {/* <div className="mt-6 p-4 bg-slate-50 border rounded-lg text-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-slate-700 font-medium">Device posture</div>
              <div className="text-xs text-slate-500">Compliant</div>
            </div>
            <div className="text-xs text-slate-500">Encryption: enabled · OS: Windows · Client: InstaAccess</div>
          </div> */}
        </div>

        {/* Right panel: form */}
        <div className="p-8 sm:p-10">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-1">Sign in</h3>
            <p className="text-sm text-slate-500 mb-6">Enter your credentials to access the dashboard</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Instance</label>
                <select
                  value={instance}
                  onChange={(e) => setInstance(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="wg2">wg2</option>
                  <option value="wg1">wg1</option>
                  <option value="prod">prod</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Username</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 21v-1c0-2.8-4-4.5-8-4.5s-8 1.7-8 4.5v1" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                {!username && <div className="text-sm text-red-500 mt-1">Username is required</div>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pr-10 pl-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3l18 18" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
                {!password && <div className="text-sm text-red-500 mt-1">Password is required</div>}
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                  >
                    Sign in
                  </button>
                </div>

                <a className="text-sm text-indigo-600 hover:underline" href="#">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
