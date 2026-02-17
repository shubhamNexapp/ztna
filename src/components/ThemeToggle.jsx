import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 bg-theme-surface text-sm text-theme-on ${className || ''}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
