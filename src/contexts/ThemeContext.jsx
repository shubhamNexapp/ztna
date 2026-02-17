import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // support 'system' | 'light' | 'dark'
  const getInitial = () => {
    try {
      const stored = localStorage.getItem('theme')
      if (!stored || stored === 'system') return 'system'
      return stored
    } catch (e) {
      return 'system'
    }
  }

  const [theme, setThemeState] = useState(getInitial)

  // apply theme: if system -> follow prefers-color-scheme
  useEffect(() => {
    const root = document.documentElement

    const apply = (t) => {
      if (t === 'dark') root.classList.add('dark')
      else root.classList.remove('dark')
    }

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      apply(mq.matches ? 'dark' : 'light')
      const handler = (e) => apply(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    } else {
      apply(theme)
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])

  const setTheme = (t) => setThemeState(t)
  const toggle = () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
