import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Sidebar({ collapsed, onClose }) {
  const item = (to, label, icon) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${isActive ? 'bg-slate-100 font-medium bg-theme-surface' : 'hover:bg-slate-50 bg-theme-surface text-slate-700 text-theme-on'}`
      }
    >
      <span className="w-4">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-white border-r h-full transition-all duration-200 bg-theme-dark border-theme-dark`}> 
      <div className="h-full flex flex-col">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">IA</div>
            {!collapsed && <div className="font-semibold text-slate-800 text-theme-on">InstaAccess</div>}
          </div>
          {!collapsed && <ThemeToggle />}
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {item('/dashboard', 'Home', '🏠')}
          {item('/settings', 'Settings', '⚙️')}
          {item('/logs/connection', 'Connection Log', '📜')}
          {item('/logs/audit', 'Audit Log', '🔐')}
          {item('/about', 'About', 'ℹ️')}
        </nav>

        {/* <div className="px-3 py-4 border-t border-theme-dark">
          <button onClick={onClose} className="text-xs text-slate-500 text-theme-on">
          
          </button>
        </div> */}
      </div>
    </aside>
  )
}
